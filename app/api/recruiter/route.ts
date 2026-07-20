import { NextResponse } from "next/server";
import { readJson, validationError } from "@/lib/server/api";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getPrisma } from "@/lib/server/prisma";
import { recruiterAnalyticsEventSchema } from "@/lib/validation/recruiter-analytics";
import { getRecruiterProfile } from "@/server/queries/get-recruiter-profile";

type RecruiterAnalyticsDelegate = {
  create: (args: unknown) => Promise<unknown>;
};

type AdminAuditLogDelegate = {
  create: (args: unknown) => Promise<unknown>;
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

export async function GET() {
  const data = await getRecruiterProfile();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`recruiter-analytics:${clientIp}`, {
    limit: 40,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many analytics events.",
      },
      { status: 429 },
    );
  }

  const body = await readJson(request);
  const parsed = recruiterAnalyticsEventSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const prisma = await getPrisma();
  const recruiterAnalyticsEvent = prisma?.recruiterAnalyticsEvent as
    | RecruiterAnalyticsDelegate
    | undefined;
  const adminAuditLog = prisma?.adminAuditLog as
    | AdminAuditLogDelegate
    | undefined;

  if (recruiterAnalyticsEvent) {
    await recruiterAnalyticsEvent
      .create({
        data: {
          event: parsed.data.event,
          target: parsed.data.target,
          metadata: {
            userAgent: request.headers.get("user-agent"),
            referrer: request.headers.get("referer"),
          },
        },
      })
      .catch(() => null);
  } else if (adminAuditLog) {
    await adminAuditLog
      .create({
        data: {
          action: parsed.data.event,
          entity: "RecruiterAnalytics",
          metadata: {
            target: parsed.data.target,
            userAgent: request.headers.get("user-agent"),
            referrer: request.headers.get("referer"),
          },
        },
      })
      .catch(() => null);
  }

  return NextResponse.json({
    ok: true,
  });
}
