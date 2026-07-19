import { NextResponse } from "next/server";
import { readJson, validationError } from "@/lib/server/api";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getPrisma } from "@/lib/server/prisma";
import { newsletterSubscriptionSchema } from "@/lib/validation/forms";
import { sendNewsletterConfirmation } from "@/server/newsletter/newsletter-email";

type NewsletterSubscriberDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
};

type NewsletterSubscriptionDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
};

type NewsletterSubscriberRecord = {
  id?: string;
  email?: string;
  subscribed?: boolean;
};

type NewsletterSubscriptionRecord = {
  id?: string;
  email?: string;
  status?: string;
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

async function saveNewsletterSubscriber(input: {
  email: string;
  name?: string;
  source: string;
  consent: boolean;
}) {
  const prisma = await getPrisma();
  const newsletterSubscriber = prisma?.newsletterSubscriber as
    | NewsletterSubscriberDelegate
    | undefined;
  const newsletterSubscription = prisma?.newsletterSubscription as
    | NewsletterSubscriptionDelegate
    | undefined;

  if (newsletterSubscriber) {
    const existing = (await newsletterSubscriber.findUnique({
      where: { email: input.email },
    })) as NewsletterSubscriberRecord | null;

    if (existing?.subscribed) {
      return {
        mode: "database",
        duplicate: true,
        subscription: existing,
      };
    }

    if (existing) {
      const subscription = await newsletterSubscriber.update({
        where: { email: input.email },
        data: { subscribed: true },
      });

      return {
        mode: "database",
        duplicate: false,
        subscription,
      };
    }

    const subscription = await newsletterSubscriber.create({
      data: {
        email: input.email,
        subscribed: true,
      },
    });

    return {
      mode: "database",
      duplicate: false,
      subscription,
    };
  }

  if (newsletterSubscription) {
    const existing = (await newsletterSubscription.findUnique({
      where: { email: input.email },
    })) as NewsletterSubscriptionRecord | null;

    if (existing?.status === "ACTIVE") {
      return {
        mode: "database",
        duplicate: true,
        subscription: existing,
      };
    }

    if (existing) {
      const subscription = await newsletterSubscription.update({
        where: { email: input.email },
        data: {
          name: input.name,
          source: input.source,
          consent: input.consent,
          status: "ACTIVE",
        },
      });

      return {
        mode: "database",
        duplicate: false,
        subscription,
      };
    }

    const subscription = await newsletterSubscription.create({
      data: {
        ...input,
        status: "ACTIVE",
      },
    });

    return {
      mode: "database",
      duplicate: false,
      subscription,
    };
  }

  return {
    mode: "validated-only",
    duplicate: false,
    subscription: {
      id: crypto.randomUUID(),
      email: input.email,
      subscribed: true,
    },
  };
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`newsletter:${clientIp}`, {
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many newsletter attempts.",
        message: "Please wait a few minutes before trying again.",
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
  const parsed = newsletterSubscriptionSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const input = {
    ...parsed.data,
    email: parsed.data.email.toLowerCase(),
  };

  try {
    const result = await saveNewsletterSubscriber(input);
    const confirmation = result.duplicate
      ? { skipped: true, reason: "Duplicate active subscriber." }
      : await sendNewsletterConfirmation({
          email: input.email,
          name: input.name,
        });

    return NextResponse.json(
      {
        ok: true,
        mode: result.mode,
        duplicate: result.duplicate,
        subscription: result.subscription,
        notification:
          "error" in confirmation && confirmation.error
            ? "email-failed"
            : confirmation.skipped
              ? "email-skipped"
              : "email-sent",
        message: result.duplicate
          ? "You are already subscribed."
          : "Subscription successful. Please check your inbox for confirmation.",
      },
      { status: result.duplicate ? 200 : result.mode === "database" ? 201 : 202 },
    );
  } catch {
    return NextResponse.json(
      {
        error: "Newsletter subscription could not be saved.",
        message: "Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
