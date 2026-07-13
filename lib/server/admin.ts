import { NextResponse } from "next/server";

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

  const providedKey = request.headers.get("x-admin-key");

  if (providedKey !== configuredKey) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  return null;
}
