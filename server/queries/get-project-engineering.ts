import { projectEngineerings } from "@/data/project-engineerings";
import { getProjectBySlug } from "@/data/projects";
import { getPrisma } from "@/lib/server/prisma";
import type {
  ProjectEngineering,
  ProjectEngineeringData,
} from "@/types/engineering";

type ProjectEngineeringRow = {
  title: string;
  slug: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  engineering?: unknown;
};

type ProjectDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
};

function isEngineeringData(value: unknown): value is ProjectEngineeringData {
  const candidate = value as ProjectEngineeringData | null;

  return Boolean(
    candidate &&
      typeof candidate.testingSummary === "string" &&
      Array.isArray(candidate.testSuites) &&
      Array.isArray(candidate.performance) &&
      Array.isArray(candidate.reliability) &&
      Array.isArray(candidate.security) &&
      Array.isArray(candidate.monitoring) &&
      Array.isArray(candidate.ciCd),
  );
}

export async function getProjectEngineering(
  slug: string,
): Promise<ProjectEngineering | null> {
  const prisma = await getPrisma();
  const project = prisma?.project as ProjectDelegate | undefined;

  if (project) {
    try {
      const row = (await project.findUnique({
        where: { slug },
        select: {
          title: true,
          slug: true,
          category: true,
          liveUrl: true,
          githubUrl: true,
          engineering: true,
        },
      })) as ProjectEngineeringRow | null;

      if (row && isEngineeringData(row.engineering)) {
        return {
          title: row.title,
          slug: row.slug,
          category: row.category,
          liveUrl: row.liveUrl,
          githubUrl: row.githubUrl,
          engineering: row.engineering,
        };
      }
    } catch {
      // Static fallback keeps the route usable before engineering JSON is migrated.
    }
  }

  const fallbackProject = getProjectBySlug(slug);
  const fallbackEngineering = projectEngineerings[slug];

  if (!fallbackProject || !fallbackEngineering) {
    return null;
  }

  return {
    title: fallbackProject.title,
    slug: fallbackProject.slug,
    category: fallbackProject.category,
    liveUrl: fallbackProject.liveUrl,
    githubUrl: fallbackProject.githubUrl,
    engineering: fallbackEngineering,
  };
}
