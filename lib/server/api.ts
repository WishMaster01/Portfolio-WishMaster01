import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function validationError(error: ZodError) {
  return NextResponse.json(
    {
      error: "Validation failed.",
      fields: error.flatten().fieldErrors,
    },
    { status: 400 },
  );
}

export function notFound(entity = "Resource") {
  return NextResponse.json(
    {
      error: `${entity} not found.`,
    },
    { status: 404 },
  );
}

export function databaseUnavailable() {
  return NextResponse.json(
    {
      error: "Database is not available.",
      message:
        "Set DATABASE_URL, run Prisma generate/migrate, and retry this operation.",
    },
    { status: 503 },
  );
}
