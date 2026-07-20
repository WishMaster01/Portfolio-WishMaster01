import { projectArchitectures } from "@/data/project-architectures";
import { getProjectBySlug } from "@/data/projects";
import { getPrisma } from "@/lib/server/prisma";
import type {
  ProjectArchitecture,
  ProjectArchitectureData,
} from "@/types/architecture";

type ProjectArchitectureRow = {
  title: string;
  slug: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  architecture?: unknown;
};

type ProjectDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
};

function isArchitectureData(value: unknown): value is ProjectArchitectureData {
  const candidate = value as ProjectArchitectureData | null;

  return Boolean(
    candidate &&
      typeof candidate.summary === "string" &&
      typeof candidate.diagramDefinition === "string" &&
      Array.isArray(candidate.components) &&
      Array.isArray(candidate.requestFlow) &&
      Array.isArray(candidate.dataFlow) &&
      Array.isArray(candidate.apiFlow) &&
      Array.isArray(candidate.securityFlow) &&
      Array.isArray(candidate.scalingStrategy) &&
      Array.isArray(candidate.deployment) &&
      Array.isArray(candidate.decisions) &&
      Array.isArray(candidate.risks),
  );
}

export async function getProjectArchitecture(
  slug: string,
): Promise<ProjectArchitecture | null> {
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
          architecture: true,
        },
      })) as ProjectArchitectureRow | null;

      if (row && isArchitectureData(row.architecture)) {
        return {
          title: row.title,
          slug: row.slug,
          category: row.category,
          liveUrl: row.liveUrl,
          githubUrl: row.githubUrl,
          architecture: row.architecture,
        };
      }
    } catch {
      // Static fallback keeps the route usable before rich architecture JSON is migrated.
    }
  }

  const fallbackProject = getProjectBySlug(slug);
  const fallbackArchitecture = projectArchitectures[slug];

  if (!fallbackProject || !fallbackArchitecture) {
    return null;
  }

  return {
    title: fallbackProject.title,
    slug: fallbackProject.slug,
    category: fallbackProject.category,
    liveUrl: fallbackProject.liveUrl,
    githubUrl: fallbackProject.githubUrl,
    architecture: fallbackArchitecture,
  };
}
