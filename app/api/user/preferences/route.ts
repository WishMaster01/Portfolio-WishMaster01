import { NextResponse } from "next/server";
import { apiError, apiSuccess, readJson, validationError } from "@/lib/server/api";
import { getPrisma } from "@/lib/server/prisma";
import { validateSession } from "@/lib/server/auth";
import { userPreferencesSchema } from "@/lib/validation/user-preferences";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await validateSession(request);

  if (!auth) {
    return apiSuccess({
      mode: "defaults",
      preferences: {
        preferredTheme: "system",
        reducedMotion: false,
        fontScale: 1,
      },
    });
  }

  const prisma = await getPrisma();
  if (!prisma) {
    return apiError("DATABASE_UNAVAILABLE", "Database connection unavailable.", 503);
  }

  const preferences = await prisma.userPreference.findUnique({
    where: { userId: auth.user.id },
  });

  return apiSuccess({
    mode: "database",
    preferences: preferences ?? {
      preferredTheme: "system",
      reducedMotion: false,
      fontScale: 1,
    },
  });
}

export async function PATCH(request: Request) {
  // Eliminate client-controlled identity: derive user strictly from validated session
  const auth = await validateSession(request);

  const body = await readJson(request);
  const parsed = userPreferencesSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  // If visitor is not authenticated, validate preferences and instruct client-side persistence
  if (!auth) {
    return NextResponse.json(
      {
        success: true,
        data: {
          mode: "client-stored",
          message: "Preferences verified. Sign in to synchronize preferences across devices.",
          preferences: parsed.data,
        },
        // Legacy compatibility
        ok: true,
        preferences: parsed.data,
      },
      { status: 200 },
    );
  }

  const prisma = await getPrisma();
  if (!prisma) {
    return apiError("DATABASE_UNAVAILABLE", "Database unavailable for syncing preferences.", 503);
  }

  try {
    const preferences = await prisma.userPreference.upsert({
      where: { userId: auth.user.id },
      update: parsed.data,
      create: {
        userId: auth.user.id,
        ...parsed.data,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        mode: "database",
        preferences,
      },
      // Legacy compatibility
      ok: true,
      mode: "database",
      preferences,
    });
  } catch (error) {
    console.error("[Preferences] Failed to persist user preferences:", error);
    return apiError("DATABASE_ERROR", "Failed to update preferences.", 500);
  }
}
