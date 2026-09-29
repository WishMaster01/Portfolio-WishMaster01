import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/prisma";

export const runtime = "nodejs";

export async function GET() {
  const checks: Record<string, "ok" | "degraded" | "unconfigured" | "failed"> = {
    process: "ok",
    database: "unconfigured",
    memory: "ok",
  };

  let isReady = true;

  // 1. Check Memory Pressure
  try {
    const mem = process.memoryUsage();
    // If heap used exceeds 1.5GB, mark degraded
    if (mem.heapUsed > 1.5 * 1024 * 1024 * 1024) {
      checks.memory = "degraded";
    }
  } catch {
    checks.memory = "failed";
  }

  // 2. Check Database Connectivity
  const prisma = getPrismaClient();
  if (prisma) {
    try {
      const dbPromise = prisma.$queryRaw`SELECT 1`;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database check timeout")), 3000),
      );

      await Promise.race([dbPromise, timeoutPromise]);
      checks.database = "ok";
    } catch {
      checks.database = "failed";
      isReady = false;
    }
  }

  const statusCode = isReady ? 200 : 503;

  return NextResponse.json(
    {
      status: isReady ? "ready" : "not_ready",
      checks,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode },
  );
}
