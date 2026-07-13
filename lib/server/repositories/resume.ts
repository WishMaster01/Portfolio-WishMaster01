import { resume } from "@/data/resume";
import { getPrisma } from "@/lib/server/prisma";

type ResumeDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
};

function getResumeDelegate(prisma: Record<string, unknown> | null) {
  return prisma?.resumeProfile as ResumeDelegate | undefined;
}

export async function getResumeProfile() {
  const prisma = await getPrisma();
  const resumeProfile = getResumeDelegate(prisma);

  if (resumeProfile) {
    try {
      const profile = await resumeProfile.findUnique({
        where: { id: "primary" },
      });

      if (profile) {
        return profile;
      }
    } catch {
      // Static fallback keeps public routes available before DB setup.
    }
  }

  return resume;
}
