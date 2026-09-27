import type { ProjectCaseStudyInput } from "@/lib/validation/project-case-study";
import { getPrisma } from "@/lib/server/prisma";
import type { Prisma } from "@prisma/client";

export async function updateProjectCaseStudy(
  slug: string,
  caseStudy: ProjectCaseStudyInput,
) {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  try {
    const existing = await prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing) {
      return undefined;
    }

    const updated = await prisma.project.update({
      where: { slug },
      data: {
        caseStudy: caseStudy as unknown as Prisma.InputJsonValue,
      },
      select: {
        slug: true,
        caseStudy: true,
      },
    });

    return updated;
  } catch (error) {
    console.error(`[Project Case Study] Error updating ${slug}:`, error);
    return undefined;
  }
}
