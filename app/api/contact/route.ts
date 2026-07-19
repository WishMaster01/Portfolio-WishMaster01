import { NextResponse } from "next/server";
import { readJson, validationError } from "@/lib/server/api";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getPrisma } from "@/lib/server/prisma";
import { contactSubmissionSchema } from "@/lib/validation/forms";
import { sendContactNotification } from "@/server/contact/contact-email";

type ContactDelegate = {
  create: (args: unknown) => Promise<unknown>;
};

type ContactRecord = {
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
};

export const runtime = "nodejs";

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function sanitizeText(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function looksSpammy(input: ContactRecord) {
  const joined = `${input.name} ${input.subject} ${input.message}`.toLowerCase();
  const links = input.message.match(/https?:\/\//gi)?.length ?? 0;

  return (
    links > 4 ||
    /(casino|crypto giveaway|loan approval|viagra|telegram pump)/i.test(joined)
  );
}

async function saveContactMessage(input: ContactRecord) {
  const prisma = await getPrisma();
  const contactMessage = prisma?.contactMessage as ContactDelegate | undefined;
  const contactSubmission = prisma?.contactSubmission as
    | ContactDelegate
    | undefined;

  if (contactMessage) {
    return contactMessage.create({
      data: {
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
        status: "NEW",
      },
    });
  }

  if (contactSubmission) {
    return contactSubmission.create({
      data: {
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
        source: input.source ?? "portfolio-contact-page",
        status: "NEW",
      },
    });
  }

  return null;
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`contact:${clientIp}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many contact attempts.",
        message: "Please wait a few minutes before sending another message.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  const body = await readJson(request);
  const parsed = contactSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  if (parsed.data.website) {
    return NextResponse.json(
      {
        error: "Spam detected.",
      },
      { status: 400 },
    );
  }

  const sanitized: ContactRecord = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeText(parsed.data.email).toLowerCase(),
    subject: sanitizeText(parsed.data.subject),
    message: sanitizeText(parsed.data.message),
    source: sanitizeText(parsed.data.source),
  };

  if (looksSpammy(sanitized)) {
    return NextResponse.json(
      {
        error: "Message rejected.",
        message:
          "The message looked like spam. Please remove excessive links or suspicious promotional text.",
      },
      { status: 400 },
    );
  }

  try {
    const record = await saveContactMessage(sanitized);
    const emailResult = await sendContactNotification(sanitized);

    return NextResponse.json(
      {
        ok: true,
        mode: record ? "database" : "validated-only",
        message:
          "Message sent successfully. I will get back to you as soon as possible.",
        notification:
          "error" in emailResult && emailResult.error
            ? "email-failed"
            : emailResult.skipped
              ? "email-skipped"
              : "email-sent",
      },
      { status: record ? 201 : 202 },
    );
  } catch {
    return NextResponse.json(
      {
        error: "Contact submission could not be saved.",
        message:
          "Please try again or email directly if the issue continues.",
      },
      { status: 500 },
    );
  }
}
