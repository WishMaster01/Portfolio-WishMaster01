import { z } from "zod";
import { apiError, apiSuccess, readJson, validationError } from "@/lib/server/api";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getPrisma } from "@/lib/server/prisma";
import {
  buildSessionCookie,
  createSession,
  ensureAdminUser,
  verifyPassword,
} from "@/lib/server/auth";

export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(255),
});

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`login:${clientIp}`, {
    algorithm: "sliding-window",
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    const retrySeconds = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));
    return apiError(
      "TOO_MANY_ATTEMPTS",
      `Too many failed attempts. Please retry after ${retrySeconds} seconds.`,
      429,
      undefined,
      { "Retry-After": String(retrySeconds) },
    );
  }

  const body = await readJson(request);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const prisma = await getPrisma();
  if (!prisma) {
    return apiError(
      "DATABASE_UNAVAILABLE",
      "Authentication database is currently unavailable.",
      503,
    );
  }

  const email = parsed.data.email.toLowerCase().trim();
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // If user does not exist and it is the admin email, attempt initialization
  if (!user && (email === (process.env.ADMIN_EMAIL ?? "admin@wishmaster01.com").toLowerCase())) {
    await ensureAdminUser();
    user = await prisma.user.findUnique({
      where: { email },
    });
  }

  if (!user) {
    return apiError("INVALID_CREDENTIALS", "Invalid email or password.", 401);
  }

  const isPasswordValid = verifyPassword(parsed.data.password, user.passwordHash);
  if (!isPasswordValid) {
    return apiError("INVALID_CREDENTIALS", "Invalid email or password.", 401);
  }

  const session = await createSession(user.id);
  if (!session) {
    return apiError("SESSION_CREATION_FAILED", "Failed to initialize session.", 500);
  }

  const cookieHeader = buildSessionCookie(session.sessionToken, session.expiresAt);

  const response = apiSuccess(
    {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
    200,
  );

  response.headers.set("Set-Cookie", cookieHeader);
  return response;
}
