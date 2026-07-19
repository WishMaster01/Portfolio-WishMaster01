import { NextResponse } from "next/server";
import { readJson, validationError } from "@/lib/server/api";
import { getPrisma } from "@/lib/server/prisma";
import { userPreferencesSchema } from "@/lib/validation/user-preferences";

type UserPreferenceDelegate = {
  upsert: (args: unknown) => Promise<unknown>;
};

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const userId = request.headers.get("x-user-id")?.trim();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Authentication required.",
        message:
          "Attach authenticated user identity before saving theme preferences.",
      },
      { status: 401 },
    );
  }

  const body = await readJson(request);
  const parsed = userPreferencesSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const prisma = await getPrisma();
  const userPreference = prisma?.userPreference as
    | UserPreferenceDelegate
    | undefined;

  if (!userPreference) {
    return NextResponse.json(
      {
        ok: true,
        mode: "validated-only",
        message:
          "Preferences validated. Run Prisma migration to enable database persistence.",
        preferences: parsed.data,
      },
      { status: 202 },
    );
  }

  const preferences = await userPreference.upsert({
    where: { userId },
    update: parsed.data,
    create: {
      userId,
      ...parsed.data,
    },
  });

  return NextResponse.json({
    ok: true,
    mode: "database",
    preferences,
  });
}
