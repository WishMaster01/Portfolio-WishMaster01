import { resume } from "@/data/resume";
import { getPrisma } from "@/lib/server/prisma";

export async function getResumeProfile() {
  const prisma = await getPrisma();

  if (prisma) {
    try {
      const profile = await prisma.resumeProfile.findUnique({
        where: { id: "primary" },
      });

      if (profile) {
        return profile;
      }
    } catch (error) {
      if (process.env.DATABASE_URL) {
        console.error("[Resume] Database error fetching resume profile:", error);
      }
    }
  }

  return resume;
}
