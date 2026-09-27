import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var __wishmasterPrisma: PrismaClient | undefined;
}

function normalizePostgresConnectionString(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    const sslMode = url.searchParams.get("sslmode");

    if (
      sslMode &&
      ["prefer", "require", "verify-ca"].includes(sslMode.toLowerCase()) &&
      !url.searchParams.has("uselibpqcompat")
    ) {
      url.searchParams.set("sslmode", "verify-full");
    }

    return url.toString();
  } catch {
    return connectionString;
  }
}

export function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (globalThis.__wishmasterPrisma) {
    return globalThis.__wishmasterPrisma;
  }

  try {
    const adapter = new PrismaPg({
      connectionString: normalizePostgresConnectionString(
        process.env.DATABASE_URL,
      ),
    });

    globalThis.__wishmasterPrisma = new PrismaClient({ adapter });
    return globalThis.__wishmasterPrisma;
  } catch (error) {
    console.error("[Prisma] Failed to initialize PrismaClient:", error);
    return null;
  }
}

export async function getPrisma(): Promise<PrismaClient | null> {
  return getPrismaClient();
}
