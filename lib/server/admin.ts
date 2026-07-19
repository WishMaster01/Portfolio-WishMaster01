import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

function getProvidedAdminKey(request: Request) {
  const headerKey = request.headers.get("x-admin-key");

  if (headerKey) {
    return headerKey;
  }

  const authorization = request.headers.get("authorization");

  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice("bearer ".length).trim();
  }

  return null;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function keysMatch(providedKey: string, configuredKey: string) {
  return timingSafeEqual(hash(providedKey), hash(configuredKey));
}

export function requireAdmin(request: Request) {
  const configuredKey = process.env.ADMIN_API_KEY;

  if (!configuredKey) {
    return NextResponse.json(
      {
        error: "Admin API is not configured.",
        message: "Set ADMIN_API_KEY before enabling admin mutations.",
      },
      { status: 503 },
    );
  }

  const providedKey = getProvidedAdminKey(request);

  if (!providedKey || !keysMatch(providedKey, configuredKey)) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
        message:
          "Provide a valid admin key through x-admin-key or Authorization: Bearer.",
      },
      { status: 401 },
    );
  }

  return null;
}
