import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { validateSession } from "./auth";
import { UserRole } from "@prisma/client";
import { forbidden, unauthorized } from "./api";

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
  try {
    return timingSafeEqual(hash(providedKey), hash(configuredKey));
  } catch {
    return false;
  }
}

export async function requireAdmin(request: Request): Promise<NextResponse | null> {
  // 1. Session-based authentication with ADMIN role check
  try {
    const authContext = await validateSession(request);
    if (authContext) {
      if (authContext.user.role === UserRole.ADMIN) {
        return null; // Authorized
      }
      return forbidden("Administrator role required to access this resource.");
    }
  } catch {
    // If DB check fails, continue to key verification
  }

  // 2. Token / API Key fallback for automation scripts and tooling
  const configuredKey = process.env.ADMIN_API_KEY;
  const providedKey = getProvidedAdminKey(request);

  if (configuredKey && providedKey && keysMatch(providedKey, configuredKey)) {
    return null; // Authorized via key
  }

  return unauthorized("Valid administrator session or admin key required.");
}
