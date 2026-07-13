type PrismaClientConstructor = new () => Record<string, unknown>;

type PrismaModule = {
  PrismaClient: PrismaClientConstructor;
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

export async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (globalThis.__wishmasterPrisma) {
    return globalThis.__wishmasterPrisma;
  }

  try {
    const { PrismaClient } = await importPrismaClient();
    globalThis.__wishmasterPrisma = new PrismaClient();
    return globalThis.__wishmasterPrisma;
  } catch {
    return null;
  }
}
