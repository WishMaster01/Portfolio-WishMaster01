import { NextResponse } from "next/server";
import { apiError, readJson, validationError } from "@/lib/server/api";
import { checkRateLimit, getClientIp, RATE_LIMIT_PRESETS } from "@/lib/server/rate-limit";
import { dsaSubmissionSchema } from "@/lib/validation/dsa-submission";
import { submitToJudge0 } from "@/server/judge0/judge0-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`dsa-submit:${clientIp}`, RATE_LIMIT_PRESETS.dsa);

  if (!rateLimit.allowed) {
    const retrySeconds = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));
    return apiError(
      "RATE_LIMITED",
      "Too many code submission attempts. Please wait before executing again.",
      429,
      undefined,
      { "Retry-After": String(retrySeconds) },
    );
  }

  const body = await readJson(request);
  const parsed = dsaSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const submission = await submitToJudge0(parsed.data);

    if ("error" in submission) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: submission.error,
            message: submission.message,
          },
          // Legacy compatibility
          message: submission.message,
        },
        { status: submission.status },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        result: submission.result,
      },
      // Legacy compatibility
      result: submission.result,
    });
  } catch (error) {
    console.error("[DSA Submission Error]:", error);
    return apiError(
      "SUBMISSION_FAILED",
      "Code execution sandbox could not be reached. Check API URL, key, and network connectivity.",
      502,
    );
  }
}
