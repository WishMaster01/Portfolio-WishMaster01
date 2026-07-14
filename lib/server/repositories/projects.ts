import { getProjectBySlug, projects } from "@/data/projects";
import type { Project } from "@/types/project";
import { getPrisma } from "@/lib/server/prisma";

type ProjectDelegate = {
  findMany: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

type ProjectInput = Omit<Project, "sections" | "metrics"> & {
  sections: Project["sections"];
  metrics: Project["metrics"];
  featured?: boolean;
  sortOrder?: number;
};

function getProjectDelegate(prisma: Record<string, unknown> | null) {
  return prisma?.project as ProjectDelegate | undefined;
}

function mapProject(row: unknown): Project {
  const project = row as Project & {
    metrics?: Project["metrics"];
    sections?: Project["sections"];
  };

  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    status: project.status,
    role: project.role,
    timeline: project.timeline,
    summary: project.summary,
    description: project.description ?? project.summary,
    problem: project.problem,
    solution: project.solution,
    impact: project.impact,
    stack: project.stack ?? [],
    technologies: project.technologies ?? project.stack ?? [],
    features: project.features ?? [],
    architecture:
      project.architecture ?? {
        summary: "Architecture details are not available yet.",
        layers: [],
      },
    screenshots: project.screenshots ?? [],
    challenges: project.challenges ?? [],
    futureScope: project.futureScope ?? [],
    githubUrl: project.githubUrl ?? "",
    liveUrl: project.liveUrl ?? `/projects/${project.slug}`,
    milestones: project.milestones ?? [],
    highlights: project.highlights ?? [],
    metrics: project.metrics ?? [],
    sections: project.sections ?? [],
  };
}

function projectInclude() {
  return {
    metrics: { orderBy: { sortOrder: "asc" } },
    sections: { orderBy: { sortOrder: "asc" } },
  };
}

function projectWriteData(input: ProjectInput) {
  return {
    slug: input.slug,
    title: input.title,
    category: input.category,
    year: input.year,
    status: input.status,
    role: input.role,
    timeline: input.timeline,
    summary: input.summary,
    description: input.description,
    problem: input.problem,
    solution: input.solution,
    impact: input.impact,
    stack: input.stack,
    technologies: input.technologies,
    features: input.features as unknown as Record<string, unknown>[],
    architecture: input.architecture as unknown as Record<string, unknown>,
    screenshots: input.screenshots as unknown as Record<string, unknown>[],
    challenges: input.challenges as unknown as Record<string, unknown>[],
    futureScope: input.futureScope,
    githubUrl: input.githubUrl,
    liveUrl: input.liveUrl,
    milestones: input.milestones as unknown as Record<string, unknown>[],
    highlights: input.highlights,
    featured: input.featured ?? false,
    sortOrder: input.sortOrder ?? 0,
    metrics: {
      create: input.metrics.map((metric, index) => ({
        ...metric,
        sortOrder: index,
      })),
    },
    sections: {
      create: input.sections.map((section, index) => ({
        ...section,
        sortOrder: index,
      })),
    },
  };
}

export async function listProjects(filters?: {
  category?: string;
  featured?: boolean;
}) {
  const prisma = await getPrisma();
  const project = getProjectDelegate(prisma);

  if (project) {
    try {
      const rows = await project.findMany({
        where: {
          ...(filters?.category ? { category: filters.category } : {}),
          ...(typeof filters?.featured === "boolean"
            ? { featured: filters.featured }
            : {}),
        },
        include: projectInclude(),
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      });

      if (Array.isArray(rows)) {
        return rows.map(mapProject);
      }
    } catch {
      // Static fallback keeps public routes available before DB setup.
    }
  }

  return projects.filter((item, index) => {
    if (filters?.category && item.category !== filters.category) {
      return false;
    }

    if (typeof filters?.featured === "boolean") {
      return filters.featured ? index < 3 : index >= 3;
    }

    return true;
  });
}

export async function findProject(slug: string) {
  const prisma = await getPrisma();
  const project = getProjectDelegate(prisma);

  if (project) {
    try {
      const row = await project.findUnique({
        where: { slug },
        include: projectInclude(),
      });

      if (row) {
        return mapProject(row);
      }
    } catch {
      // Static fallback keeps public routes available before DB setup.
    }
  }

  return getProjectBySlug(slug) ?? null;
}

export async function createProject(input: ProjectInput) {
  const prisma = await getPrisma();
  const project = getProjectDelegate(prisma);

  if (!project) {
    return null;
  }

  const created = await project.create({
    data: projectWriteData(input),
    include: projectInclude(),
  });

  return mapProject(created);
}

export async function updateProject(slug: string, input: Partial<ProjectInput>) {
  const prisma = await getPrisma();
  const project = getProjectDelegate(prisma);

  if (!project) {
    return null;
  }

  const updated = await project.update({
    where: { slug },
    data: {
      ...input,
      ...(input.metrics
        ? {
            metrics: {
              deleteMany: {},
              create: input.metrics.map((metric, index) => ({
                ...metric,
                sortOrder: index,
              })),
            },
          }
        : {}),
      ...(input.sections
        ? {
            sections: {
              deleteMany: {},
              create: input.sections.map((section, index) => ({
                ...section,
                sortOrder: index,
              })),
            },
          }
        : {}),
    },
    include: projectInclude(),
  });

  return mapProject(updated);
}

export async function deleteProject(slug: string) {
  const prisma = await getPrisma();
  const project = getProjectDelegate(prisma);

  if (!project) {
    return null;
  }

  const deleted = await project.delete({
    where: { slug },
    include: projectInclude(),
  });

  return mapProject(deleted);
}
