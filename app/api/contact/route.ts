import { NextResponse } from "next/server";
import { readJson, validationError } from "@/lib/server/api";
import { getPrisma } from "@/lib/server/prisma";
import { contactSubmissionSchema } from "@/lib/validation/forms";

type ContactDelegate = {
  create: (args: unknown) => Promise<unknown>;
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await readJson(request);
  const parsed = contactSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const submission = { ...parsed.data };
  delete submission.website;

  const prisma = await getPrisma();
  const contactSubmission = prisma?.contactSubmission as
    | ContactDelegate
    | undefined;

  if (contactSubmission) {
    try {
      const record = await contactSubmission.create({
        data: submission,
      });

      return NextResponse.json(
        {
          ok: true,
          mode: "database",
          submission: record,
        },
        { status: 201 },
      );
    } catch {
      return NextResponse.json(
        {
          error: "Contact submission could not be saved.",
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
        "Submission validated. Connect DATABASE_URL and run Prisma setup to persist submissions.",
    },
    { status: 202 },
  );
}
