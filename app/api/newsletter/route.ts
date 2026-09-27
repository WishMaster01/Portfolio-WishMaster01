import { NextResponse } from "next/server";
import { NewsletterSubscriptionStatus } from "@prisma/client";
import { BloomFilter } from "@/lib/algorithms/bloom-filter";
import { apiError, readJson, validationError } from "@/lib/server/api";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getPrisma } from "@/lib/server/prisma";
import { newsletterSubscriptionSchema } from "@/lib/validation/forms";
import { sendNewsletterConfirmation } from "@/server/newsletter/newsletter-email";

export const runtime = "nodejs";

const newsletterBloomFilter = new BloomFilter(4096, 4);
const newsletterSeenEmails = new Set<string>();

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

async function saveNewsletterSubscription(input: {
  email: string;
  name?: string;
  source: string;
  consent: boolean;
}) {
  const prisma = await getPrisma();

  if (!prisma) {
    if (process.env.DATABASE_URL) {
      throw new Error("Database connection unavailable despite DATABASE_URL being set.");
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

  const existing = await prisma.newsletterSubscription.findUnique({
    where: { email: input.email },
  });

  if (existing?.status === NewsletterSubscriptionStatus.ACTIVE) {
    return {
      mode: "database",
      duplicate: true,
      subscription: existing,
    };
  }

  if (existing) {
    const subscription = await prisma.newsletterSubscription.update({
      where: { email: input.email },
      data: {
        name: input.name,
        source: input.source,
        consent: input.consent,
        status: NewsletterSubscriptionStatus.ACTIVE,
      },
    });

    return {
      mode: "database",
      duplicate: false,
      subscription,
    };
  }

  const subscription = await prisma.newsletterSubscription.create({
    data: {
      email: input.email,
      name: input.name,
      source: input.source,
      consent: input.consent,
      status: NewsletterSubscriptionStatus.ACTIVE,
    },
  });

  return {
    mode: "database",
    duplicate: false,
    subscription,
  };
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`newsletter:${clientIp}`, {
    algorithm: "sliding-window",
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    const retrySeconds = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));
    return apiError(
      "RATE_LIMITED",
      "Too many newsletter subscription attempts. Please wait a few minutes before trying again.",
      429,
      undefined,
      { "Retry-After": String(retrySeconds) },
    );
  }

  const body = await readJson(request);
  const parsed = newsletterSubscriptionSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const input = {
    ...parsed.data,
    email: parsed.data.email.toLowerCase().trim(),
  };
  const maybeSeen = newsletterBloomFilter.mightContain(input.email);

  if (maybeSeen && newsletterSeenEmails.has(input.email)) {
    return NextResponse.json(
      {
        success: true,
        data: {
          duplicate: true,
          mode: "in-memory-bloom-filter",
          message: "You are already subscribed to the engineering newsletter.",
        },
        // Legacy compatibility
        ok: true,
        mode: "in-memory-bloom-filter",
        duplicate: true,
        message: "You are already subscribed.",
      },
      { status: 200 },
    );
  }

  try {
    const result = await saveNewsletterSubscription(input);
    newsletterBloomFilter.add(input.email);

    if (!result.duplicate) {
      newsletterSeenEmails.add(input.email);
    }

    const confirmation = result.duplicate
      ? { skipped: true, reason: "Duplicate active subscriber." }
      : await sendNewsletterConfirmation({
          email: input.email,
          name: input.name,
        });

    return NextResponse.json(
      {
        success: true,
        data: {
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
        // Legacy compatibility
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
  } catch (error) {
    console.error("[Newsletter API Error]:", error);
    return apiError(
      "NEWSLETTER_FAILED",
      "Newsletter subscription could not be saved. Please try again in a moment.",
      500,
    );
  }
}
