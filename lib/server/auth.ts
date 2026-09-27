import crypto from "crypto";
import { UserRole } from "@prisma/client";
import { getPrisma } from "./prisma";

export const AUTH_COOKIE_NAME = "auth_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
};

export type AuthenticatedSession = {
  id: string;
  sessionToken: string;
  userId: string;
  expiresAt: Date;
};

export type AuthContext = {
  user: AuthenticatedUser;
  session: AuthenticatedSession;
};

/**
 * Hash a password securely using scrypt with a cryptographic salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

/**
 * Verify a plaintext password against a stored scrypt hash using timing-safe comparison.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;

    const keyBuffer = Buffer.from(key, "hex");
    const derivedBuffer = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
  } catch {
    return false;
  }
}

/**
 * Extract a cookie value by name from standard Cookie header.
 */
export function getCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

/**
 * Create a new database-backed session for a user.
 */
export async function createSession(userId: string): Promise<AuthenticatedSession | null> {
  const prisma = await getPrisma();
  if (!prisma) return null;

  const sessionToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expiresAt,
    },
  });

  return session;
}

/**
 * Validate session from incoming request. Automatically cleans expired sessions.
 */
export async function validateSession(request: Request): Promise<AuthContext | null> {
  const cookieHeader = request.headers.get("cookie");
  const sessionToken = getCookieValue(cookieHeader, AUTH_COOKIE_NAME);

  if (!sessionToken) {
    return null;
  }

  const prisma = await getPrisma();
  if (!prisma) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  // Check expiration
  if (session.expiresAt.getTime() <= Date.now()) {
    // Delete expired session asynchronously
    void prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return {
    user: session.user,
    session: {
      id: session.id,
      sessionToken: session.sessionToken,
      userId: session.userId,
      expiresAt: session.expiresAt,
    },
  };
}

/**
 * Destroy a session by token.
 */
export async function destroySession(sessionToken: string): Promise<boolean> {
  const prisma = await getPrisma();
  if (!prisma) return false;

  try {
    await prisma.session.delete({
      where: { sessionToken },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate Set-Cookie header for an established session.
 */
export function buildSessionCookie(sessionToken: string, expiresAt: Date): string {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${AUTH_COOKIE_NAME}=${encodeURIComponent(sessionToken)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Expires=${expiresAt.toUTCString()}`,
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];

  if (isProd) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

/**
 * Generate Set-Cookie header to clear the session cookie.
 */
export function buildClearSessionCookie(): string {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${AUTH_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "Max-Age=0",
  ];

  if (isProd) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

/**
 * Ensure an admin user exists or can be authenticated.
 */
export async function ensureAdminUser(): Promise<AuthenticatedUser | null> {
  const prisma = await getPrisma();
  if (!prisma) return null;

  // Check for any existing admin
  const existingAdmin = await prisma.user.findFirst({
    where: { role: UserRole.ADMIN },
    select: { id: true, email: true, name: true, role: true },
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  // Seed default admin if none exists
  const adminEmail = process.env.ADMIN_EMAIL || "admin@wishmaster01.com";
  const adminPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_API_KEY || "WishMaster#Admin2026";
  const passwordHash = hashPassword(adminPassword);

  const newAdmin = await prisma.user.create({
    data: {
      email: adminEmail.toLowerCase().trim(),
      name: "Sumit Yadav (Admin)",
      passwordHash,
      role: UserRole.ADMIN,
    },
    select: { id: true, email: true, name: true, role: true },
  });

  return newAdmin;
}

/**
 * Validate admin session in Server Components using the Next.js cookie store.
 */
export async function getAdminUserFromCookieStore(cookieStore: {
  get: (name: string) => { value: string } | undefined;
}): Promise<AuthenticatedUser | null> {
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const prisma = await getPrisma();
  if (!prisma) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: {
        select: { id: true, email: true, name: true, role: true },
      },
    },
  });

  if (!session || session.expiresAt.getTime() <= Date.now()) {
    return null;
  }

  if (session.user.role !== UserRole.ADMIN) {
    return null;
  }

  return session.user;
}
