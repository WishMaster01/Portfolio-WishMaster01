import { projectCaseStudies } from "@/data/project-case-studies";
import { getProjectBySlug } from "@/data/projects";
import { getPrisma } from "@/lib/server/prisma";
import type {
  ProjectCaseStudy,
  ProjectCaseStudyData,
} from "@/types/case-study";

type ProjectCaseStudyRow = {
  title: string;
  slug: string;
  coverImage?: string | null;
  liveUrl: string;
  githubUrl: string;
  caseStudy?: unknown;
  screenshots?: Array<{ image?: string }> | unknown;
};

type ProjectDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
};

function isCaseStudyData(value: unknown): value is ProjectCaseStudyData {
  const candidate = value as ProjectCaseStudyData | null;

  return Boolean(
    candidate &&
      typeof candidate.background === "string" &&
      typeof candidate.problem === "string" &&
      typeof candidate.targetUsers === "string" &&
      typeof candidate.role === "string" &&
      Array.isArray(candidate.constraints) &&
      Array.isArray(candidate.goals) &&
      Array.isArray(candidate.process) &&
      Array.isArray(candidate.outcomes) &&
      Array.isArray(candidate.lessons) &&
      (candidate.futureScope === undefined ||
        Array.isArray(candidate.futureScope)),
  );
}

function getCoverImage(row: ProjectCaseStudyRow) {
  if (row.coverImage) {
    return row.coverImage;
  }

  if (Array.isArray(row.screenshots)) {
    const screenshot = row.screenshots.find(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "image" in item &&
        typeof item.image === "string",
    ) as { image?: string } | undefined;

    if (screenshot?.image) {
      return screenshot.image;
    }
  }

  return "/window.svg";
}

export async function getProjectCaseStudy(
  slug: string,
): Promise<ProjectCaseStudy | null> {
  const prisma = await getPrisma();
  const project = prisma?.project as ProjectDelegate | undefined;

  if (project) {
    try {
      const row = (await project.findUnique({
        where: { slug },
        select: {
          title: true,
          slug: true,
          liveUrl: true,
          githubUrl: true,
          screenshots: true,
          caseStudy: true,
        },
      })) as ProjectCaseStudyRow | null;

      if (row && isCaseStudyData(row.caseStudy)) {
        return {
          title: row.title,
          slug: row.slug,
          coverImage: getCoverImage(row),
          liveUrl: row.liveUrl,
          githubUrl: row.githubUrl,
          caseStudy: row.caseStudy,
        };
      }
    } catch {
      // Fallback below keeps the route usable before the caseStudy DB field is migrated.
    }
  }

  const fallbackProject = getProjectBySlug(slug);
  const fallbackCaseStudy = projectCaseStudies[slug];

  if (!fallbackProject || !fallbackCaseStudy) {
    return null;
  }

  return {
    title: fallbackProject.title,
    slug: fallbackProject.slug,
    coverImage: fallbackProject.screenshots[0]?.image ?? "/window.svg",
    liveUrl: fallbackProject.liveUrl,
    githubUrl: fallbackProject.githubUrl,
    caseStudy: fallbackCaseStudy,
  };
}
