import { recruiterProfile, recruiterProjects } from "@/data/recruiter";
import { getPrisma } from "@/lib/server/prisma";
import { rankRecruiterProjects } from "@/lib/recruiter/project-ranking";
import type {
  RecruiterProfileData,
  RecruiterProfileResult,
  RecruiterProject,
} from "@/types/recruiter";

type RecruiterProfileDelegate = {
  findFirst: (args: unknown) => Promise<unknown>;
};

type ProjectDelegate = {
  findMany: (args: unknown) => Promise<unknown>;
};

type RecruiterProfileRow = Partial<RecruiterProfileData> & {
  published?: boolean;
};

type RecruiterProjectRow = Partial<RecruiterProject> & {
  summary?: string;
  shortSummary?: string;
  impact?: string;
  stack?: string[];
  technologies?: string[];
  highlights?: string[];
  metrics?: Array<{ label?: string; value?: string }> | unknown;
  screenshots?: Array<{ image?: string }> | unknown;
};

function parseStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.map(String) : fallback;
}

function parseEducation(
  value: unknown,
  fallback: RecruiterProfileData["education"],
) {
  return Array.isArray(value)
    ? (value as RecruiterProfileData["education"])
    : fallback;
}

function parseExperience(
  value: unknown,
  fallback: RecruiterProfileData["experienceSummary"],
) {
  return Array.isArray(value)
    ? (value as RecruiterProfileData["experienceSummary"])
    : fallback;
}

function normalizeProfile(row: RecruiterProfileRow): RecruiterProfileData {
  return {
    name: row.name ?? recruiterProfile.name,
    headline: row.headline ?? recruiterProfile.headline,
    summary: row.summary ?? recruiterProfile.summary,
    availability: row.availability ?? recruiterProfile.availability,
    targetRoles: parseStringArray(row.targetRoles, recruiterProfile.targetRoles),
    preferredLocations: parseStringArray(
      row.preferredLocations,
      recruiterProfile.preferredLocations,
    ),
    workModes: parseStringArray(row.workModes, recruiterProfile.workModes),
    topSkills: parseStringArray(row.topSkills, recruiterProfile.topSkills),
    highlights: parseStringArray(row.highlights, recruiterProfile.highlights),
    education: parseEducation(row.education, recruiterProfile.education),
    experienceSummary: parseExperience(
      row.experienceSummary,
      recruiterProfile.experienceSummary,
    ),
    resumeUrl: row.resumeUrl ?? recruiterProfile.resumeUrl,
    githubUrl: row.githubUrl ?? recruiterProfile.githubUrl,
    linkedinUrl: row.linkedinUrl ?? recruiterProfile.linkedinUrl,
    email: row.email ?? recruiterProfile.email,
  };
}

function getCoverImage(row: RecruiterProjectRow) {
  if (row.coverImage) {
    return row.coverImage;
  }

  if (Array.isArray(row.screenshots)) {
    const first = row.screenshots.find(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "image" in item &&
        typeof item.image === "string",
    ) as { image?: string } | undefined;

    if (first?.image) {
      return first.image;
    }
  }

  return "/window.svg";
}

function normalizeProject(row: RecruiterProjectRow): RecruiterProject {
  return {
    title: row.title ?? "Untitled Project",
    slug: row.slug ?? "project",
    shortSummary: row.shortSummary ?? row.summary ?? "Project summary.",
    category: row.category ?? "Project",
    coverImage: getCoverImage(row),
    liveUrl: row.liveUrl ?? "#",
    githubUrl: row.githubUrl ?? "#",
  };
}

export async function getRecruiterProfile(): Promise<RecruiterProfileResult> {
  const prisma = await getPrisma();
  const recruiterProfileDelegate = prisma?.recruiterProfile as
    | RecruiterProfileDelegate
    | undefined;
  const projectDelegate = prisma?.project as ProjectDelegate | undefined;

  if (recruiterProfileDelegate && projectDelegate) {
    try {
      const [profile, projects] = await Promise.all([
        recruiterProfileDelegate.findFirst({
          where: {
            published: true,
          },
        }),
        projectDelegate.findMany({
          where: {
            published: true,
            featured: true,
          },
          select: {
            title: true,
            slug: true,
            summary: true,
            category: true,
            impact: true,
            stack: true,
            technologies: true,
            highlights: true,
            screenshots: true,
            liveUrl: true,
            githubUrl: true,
            metrics: {
              select: {
                label: true,
                value: true,
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
      ]);

      if (profile) {
        const rankedProjects = Array.isArray(projects)
          ? rankRecruiterProjects(
              projects.map((project) => project as RecruiterProjectRow),
            )
          : recruiterProjects;

        return {
          profile: normalizeProfile(profile as RecruiterProfileRow),
          projects: Array.isArray(rankedProjects)
            ? rankedProjects.map((project) =>
                normalizeProject(project as RecruiterProjectRow),
              )
            : recruiterProjects,
        };
      }
    } catch {
      // Static fallback keeps recruiter mode usable before DB migration/seed.
    }
  }

  return {
    profile: recruiterProfile,
    projects: recruiterProjects,
  };
}
