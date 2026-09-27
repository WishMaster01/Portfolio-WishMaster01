import { getProjectBySlug, projects } from "@/data/projects";
import { getPrisma } from "@/lib/server/prisma";
import {
  binarySearchByKey,
  decodeCursor,
  encodeCursor,
  type CursorPage,
} from "@/lib/server/pagination";
import type { Project } from "@/types/project";
import type { Prisma } from "@prisma/client";

type ProjectInput = Omit<Project, "sections" | "metrics"> & {
  sections: Project["sections"];
  metrics: Project["metrics"];
  featured?: boolean;
  sortOrder?: number;
};

type ProjectFilters = {
  category?: string;
  featured?: boolean;
};

type ProjectPageFilters = ProjectFilters & {
  cursor?: string;
  limit?: number;
};

const staticProjectsBySlug = [...projects].sort((left, right) =>
  left.slug.localeCompare(right.slug),
);
const staticCategoryIndex = projects.reduce((index, project) => {
  const bucket = index.get(project.category) ?? [];
  bucket.push(project);
  index.set(project.category, bucket);
  return index;
}, new Map<string, Project[]>());

const projectInclude = {
  metrics: { orderBy: { sortOrder: "asc" as const } },
  sections: { orderBy: { sortOrder: "asc" as const } },
} satisfies Prisma.ProjectInclude;

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: typeof projectInclude;
}>;

function mapProject(project: ProjectWithRelations): Project {
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
    features: (project.features as Project["features"]) ?? [],
    architecture:
      (project.architecture as Project["architecture"]) ?? {
        summary: "Architecture details are not available yet.",
        layers: [],
      },
    screenshots: (project.screenshots as Project["screenshots"]) ?? [],
    challenges: (project.challenges as Project["challenges"]) ?? [],
    futureScope: project.futureScope ?? [],
    githubUrl: project.githubUrl ?? "",
    liveUrl: project.liveUrl ?? `/projects/${project.slug}`,
    milestones: (project.milestones as Project["milestones"]) ?? [],
    highlights: project.highlights ?? [],
    metrics: (project.metrics ?? []).map((m) => ({ label: m.label, value: m.value })),
    sections: (project.sections ?? []).map((s) => ({ title: s.title, body: s.body })),
  };
}

function projectWriteData(input: ProjectInput): Prisma.ProjectCreateInput {
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
    features: input.features as unknown as Prisma.InputJsonValue,
    architecture: input.architecture as unknown as Prisma.InputJsonValue,
    screenshots: input.screenshots as unknown as Prisma.InputJsonValue,
    challenges: input.challenges as unknown as Prisma.InputJsonValue,
    futureScope: input.futureScope,
    githubUrl: input.githubUrl,
    liveUrl: input.liveUrl,
    milestones: input.milestones as unknown as Prisma.InputJsonValue,
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

function filterStaticProjects(filters?: ProjectFilters) {
  const categoryProjects = filters?.category
    ? staticCategoryIndex.get(filters.category) ?? []
    : staticProjectsBySlug;

  return categoryProjects.filter((item) => {
    if (typeof filters?.featured === "boolean") {
      const isFeatured = projects.slice(0, 3).some((project) => project.slug === item.slug);
      return filters.featured ? isFeatured : !isFeatured;
    }

    return true;
  });
}

export async function listProjects(filters?: ProjectFilters): Promise<Project[]> {
  const prisma = await getPrisma();

  if (prisma) {
    try {
      const rows = await prisma.project.findMany({
        where: {
          ...(filters?.category ? { category: filters.category } : {}),
          ...(typeof filters?.featured === "boolean"
            ? { featured: filters.featured }
            : {}),
        },
        include: projectInclude,
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      });

      if (rows.length > 0) {
        return rows.map(mapProject);
      }
    } catch (error) {
      if (process.env.DATABASE_URL) {
        console.error("[Project Repository] Database error:", error);
        throw error;
      }
    }
  }

  return filterStaticProjects(filters);
}

export async function listProjectsPage(
  filters?: ProjectPageFilters,
): Promise<CursorPage<Project>> {
  const limit = Math.min(24, Math.max(1, filters?.limit ?? 6));
  const prisma = await getPrisma();
  const cursorSlug = decodeCursor(filters?.cursor);

  if (prisma) {
    try {
      const rows = await prisma.project.findMany({
        where: {
          ...(filters?.category ? { category: filters.category } : {}),
          ...(typeof filters?.featured === "boolean"
            ? { featured: filters.featured }
            : {}),
        },
        include: projectInclude,
        orderBy: [{ slug: "asc" }],
        take: limit + 1,
        ...(cursorSlug
          ? {
              cursor: { slug: cursorSlug },
              skip: 1,
            }
          : {}),
      });

      if (rows.length > 0) {
        const mapped = rows.map(mapProject);
        const hasMore = mapped.length > limit;
        const items = hasMore ? mapped.slice(0, limit) : mapped;

        return {
          items,
          hasMore,
          nextCursor: hasMore ? encodeCursor(items.at(-1)?.slug ?? "") : null,
        };
      }
    } catch (error) {
      if (process.env.DATABASE_URL) {
        console.error("[Project Repository] Pagination query error:", error);
        throw error;
      }
    }
  }

  const source = filterStaticProjects(filters);
  const startIndex = cursorSlug
    ? binarySearchByKey(source, cursorSlug, (item) => item.slug) + 1
    : 0;
  const slice = source.slice(startIndex, startIndex + limit + 1);
  const hasMore = slice.length > limit;
  const items = hasMore ? slice.slice(0, limit) : slice;

  return {
    items,
    hasMore,
    nextCursor: hasMore ? encodeCursor(items.at(-1)?.slug ?? "") : null,
  };
}

export async function findProject(slug: string): Promise<Project | null> {
  const prisma = await getPrisma();

  if (prisma) {
    try {
      const row = await prisma.project.findUnique({
        where: { slug },
        include: projectInclude,
      });

      if (row) {
        return mapProject(row);
      }
    } catch (error) {
      if (process.env.DATABASE_URL) {
        console.error(`[Project Repository] Database error fetching ${slug}:`, error);
        throw error;
      }
    }
  }

  return getProjectBySlug(slug) ?? null;
}

export async function createProject(input: ProjectInput): Promise<Project | null> {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  const created = await prisma.project.create({
    data: projectWriteData(input),
    include: projectInclude,
  });

  return mapProject(created);
}

export async function updateProject(
  slug: string,
  input: Partial<ProjectInput>,
): Promise<Project | null> {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  const { metrics, sections, ...fields } = input;

  const data: Prisma.ProjectUpdateInput = {
    ...fields,
  };

  if (fields.features !== undefined) {
    data.features = fields.features as unknown as Prisma.InputJsonValue;
  }
  if (fields.architecture !== undefined) {
    data.architecture = fields.architecture as unknown as Prisma.InputJsonValue;
  }
  if (fields.screenshots !== undefined) {
    data.screenshots = fields.screenshots as unknown as Prisma.InputJsonValue;
  }
  if (fields.challenges !== undefined) {
    data.challenges = fields.challenges as unknown as Prisma.InputJsonValue;
  }
  if (fields.milestones !== undefined) {
    data.milestones = fields.milestones as unknown as Prisma.InputJsonValue;
  }

  if (metrics) {
    data.metrics = {
      deleteMany: {},
      create: metrics.map((metric, index) => ({
        label: metric.label,
        value: metric.value,
        sortOrder: index,
      })),
    };
  }

  if (sections) {
    data.sections = {
      deleteMany: {},
      create: sections.map((section, index) => ({
        title: section.title,
        body: section.body,
        sortOrder: index,
      })),
    };
  }

  const updated = await prisma.project.update({
    where: { slug },
    data,
    include: projectInclude,
  });

  return mapProject(updated);
}

export async function deleteProject(slug: string): Promise<Project | null> {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  const deleted = await prisma.project.delete({
    where: { slug },
    include: projectInclude,
  });

  return mapProject(deleted);
}
