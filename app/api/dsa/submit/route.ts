import { NextResponse } from "next/server";
import { readJson, validationError } from "@/lib/server/api";
import { dsaSubmissionSchema } from "@/lib/validation/dsa-submission";
import { submitToJudge0 } from "@/server/judge0/judge0-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
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
          error: submission.error,
          message: submission.message,
        },
        { status: submission.status },
      );
    }

    return NextResponse.json({ result: submission.result });
  } catch {
    return NextResponse.json(
      {
        error: "Code submission failed.",
        message:
          "Judge0 could not be reached. Check the API URL, key, host header, and quota.",
      },
      { status: 502 },
    );
  }
}
