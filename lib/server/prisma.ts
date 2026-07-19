type PrismaClientConstructor = new (
  options?: Record<string, unknown>,
) => Record<string, unknown>;

type PrismaModule = {
  PrismaClient: PrismaClientConstructor;
};

type PrismaPgConstructor = new (
  config: Record<string, unknown>,
) => Record<string, unknown>;

type PrismaPgModule = {
  PrismaPg: PrismaPgConstructor;
};

declare global {
  var __wishmasterPrisma: Record<string, unknown> | undefined;
}

async function importPrismaClient() {
  const dynamicImport = new Function(
    "specifier",
    "return import(specifier)",
  ) as (specifier: string) => Promise<PrismaModule>;

  return dynamicImport("@prisma/client");
}

async function importPrismaPg() {
  const dynamicImport = new Function(
    "specifier",
    "return import(specifier)",
  ) as (specifier: string) => Promise<PrismaPgModule>;

  return dynamicImport("@prisma/adapter-pg");
}

function normalizePostgresConnectionString(connectionString: string) {
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

export async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (globalThis.__wishmasterPrisma) {
    return globalThis.__wishmasterPrisma;
  }

  try {
    const { PrismaClient } = await importPrismaClient();
    const { PrismaPg } = await importPrismaPg();
    const adapter = new PrismaPg({
      connectionString: normalizePostgresConnectionString(
        process.env.DATABASE_URL,
      ),
    });

    globalThis.__wishmasterPrisma = new PrismaClient({ adapter });
    return globalThis.__wishmasterPrisma;
  } catch {
    return null;
  }
}
