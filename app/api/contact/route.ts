import { NextResponse } from "next/server";
import { ContactSubmissionStatus } from "@prisma/client";
import { apiError, readJson, validationError } from "@/lib/server/api";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getPrisma } from "@/lib/server/prisma";
import { contactSubmissionSchema } from "@/lib/validation/forms";
import { sendContactNotification } from "@/server/contact/contact-email";

type ContactRecord = {
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
};

export const runtime = "nodejs";

function getClientIp(request: Request): string {
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

function sanitizeText(value: string): string {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function looksSpammy(input: ContactRecord): boolean {
  const joined = `${input.name} ${input.subject} ${input.message}`.toLowerCase();
  const links = input.message.match(/https?:\/\//gi)?.length ?? 0;

  return (
    links > 4 ||
    /(casino|crypto giveaway|loan approval|viagra|telegram pump)/i.test(joined)
  );
}

async function saveContactSubmission(input: ContactRecord) {
  const prisma = await getPrisma();
  if (!prisma) {
    return null;
  }

  return prisma.contactSubmission.create({
    data: {
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      source: input.source ?? "portfolio-contact-page",
      status: ContactSubmissionStatus.NEW,
    },
  });
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`contact:${clientIp}`, {
    algorithm: "token-bucket",
    capacity: 5,
    refillTokens: 1,
    refillIntervalMs: 3 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    const retrySeconds = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));
    return apiError(
      "RATE_LIMITED",
      "Too many contact attempts. Please wait a few minutes before sending another message.",
      429,
      undefined,
      { "Retry-After": String(retrySeconds) },
    );
  }

  const body = await readJson(request);
  const parsed = contactSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  if (parsed.data.website) {
    return apiError("SPAM_DETECTED", "Spam honeypot triggered.", 400);
  }

  const sanitized: ContactRecord = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeText(parsed.data.email).toLowerCase(),
    subject: sanitizeText(parsed.data.subject),
    message: sanitizeText(parsed.data.message),
    source: sanitizeText(parsed.data.source),
  };

  if (looksSpammy(sanitized)) {
    return apiError(
      "MESSAGE_REJECTED",
      "The message looked like spam. Please remove excessive links or suspicious promotional text.",
      400,
    );
  }

  try {
    const record = await saveContactSubmission(sanitized);

    // If database is configured but failed to save record, fail explicitly
    if (process.env.DATABASE_URL && !record) {
      return apiError(
        "DATABASE_ERROR",
        "Could not connect to database to persist contact submission.",
        503,
      );
    }

    const emailResult = await sendContactNotification(sanitized);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: record?.id,
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
        // Legacy compatibility
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
  } catch (error) {
    console.error("[Contact API] Error processing submission:", error);
    return apiError(
      "CONTACT_SUBMISSION_FAILED",
      "Contact submission could not be saved. Please try again or email directly if the issue continues.",
      500,
    );
  }
}
