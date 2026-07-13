import { NextResponse } from "next/server";
import { readJson, validationError } from "@/lib/server/api";
import { getPrisma } from "@/lib/server/prisma";
import { newsletterSubscriptionSchema } from "@/lib/validation/forms";

type NewsletterDelegate = {
  upsert: (args: unknown) => Promise<unknown>;
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await readJson(request);
  const parsed = newsletterSubscriptionSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const prisma = await getPrisma();
  const newsletterSubscription = prisma?.newsletterSubscription as
    | NewsletterDelegate
    | undefined;

  if (newsletterSubscription) {
    try {
      const subscription = await newsletterSubscription.upsert({
        where: { email: parsed.data.email },
        update: {
          name: parsed.data.name,
          source: parsed.data.source,
          consent: parsed.data.consent,
          status: "ACTIVE",
        },
        create: {
          ...parsed.data,
          status: "ACTIVE",
        },
      });

      return NextResponse.json(
        {
          ok: true,
          mode: "database",
          subscription,
        },
        { status: 201 },
      );
    } catch {
      return NextResponse.json(
        {
          error: "Newsletter subscription could not be saved.",
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    {
      ok: true,
      mode: "validated-only",
      id: crypto.randomUUID(),
      message:
        "Subscription validated. Connect DATABASE_URL and run Prisma setup to persist subscriptions.",
    },
    { status: 202 },
  );
}
