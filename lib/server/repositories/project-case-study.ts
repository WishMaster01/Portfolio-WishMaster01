import type { ProjectCaseStudyInput } from "@/lib/validation/project-case-study";
import { getPrisma } from "@/lib/server/prisma";

type ProjectDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
};

function getProjectDelegate(prisma: Record<string, unknown> | null) {
  return prisma?.project as ProjectDelegate | undefined;
}

export async function updateProjectCaseStudy(
  slug: string,
  caseStudy: ProjectCaseStudyInput,
) {
  const prisma = await getPrisma();
  const project = getProjectDelegate(prisma);

  if (!project) {
    return null;
  }

  try {
    const existing = (await project.findUnique({
      where: { slug },
      select: { id: true },
    })) as { id: string } | null;

    if (!existing) {
      return undefined;
    }

    const updated = await project.update({
      where: { slug },
      data: {
        caseStudy,
      },
      select: {
        slug: true,
        caseStudy: true,
      },
    });

    return updated;
  } catch {
    return undefined;
  }
}
