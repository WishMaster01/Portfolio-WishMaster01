import { articles } from "@/data/blog";
import type { Article } from "@/types/article";
import { getPrisma } from "@/lib/server/prisma";

type BlogFilters = {
  category?: string;
  tag?: string;
  q?: string;
};

type BlogDelegate = {
  findMany: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

type BlogInput = Omit<Article, "date" | "image" | "publishedAt"> & {
  image?: string;
  date?: string | Date;
  published?: boolean;
  publishedAt?: string | Date;
  views?: number;
};

function getBlogDelegate(prisma: Record<string, unknown> | null) {
  return prisma?.blogPost as BlogDelegate | undefined;
}

function normalizeDate(value: unknown, fallback: string) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && value.length) {
    return value.slice(0, 10);
  }

  return fallback;
}

function normalizeContent(value: unknown, fallback: Article["content"]) {
  if (Array.isArray(value)) {
    return value as Article["content"];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as Article["content"]) : fallback;
    } catch {
      return fallback;
    }
  }

  return fallback;
}

function mapBlogPost(row: unknown): Article {
  const post = row as Record<string, unknown>;
  const fallback =
    articles.find((article) => article.slug === String(post.slug)) ??
    articles[0];

  return {
    id: typeof post.id === "string" ? post.id : undefined,
    slug: String(post.slug),
    title: String(post.title),
    excerpt: String(post.excerpt),
    date: normalizeDate(post.date ?? post.publishedAt, fallback.date),
    publishedAt: normalizeDate(post.publishedAt ?? post.date, fallback.date),
    readingTime: String(post.readingTime ?? fallback.readingTime),
    category: String(post.category ?? fallback.category),
    image: String(post.image ?? post.coverImage ?? fallback.image),
    coverImage: String(post.coverImage ?? post.image ?? fallback.image),
    author: String(post.author ?? fallback.author),
    tags: Array.isArray(post.tags) ? post.tags.map(String) : fallback.tags,
    coverAlt: String(post.coverAlt ?? fallback.coverAlt),
    summary: String(post.summary ?? post.excerpt ?? fallback.summary),
    published:
      typeof post.published === "boolean" ? post.published : fallback.published,
    views:
      typeof post.views === "number"
        ? post.views
        : typeof fallback.views === "number"
          ? fallback.views
          : 0,
    content: normalizeContent(post.content, fallback.content),
  };
}

function articleMatchesFilters(article: Article, filters?: BlogFilters) {
  const matchesCategory =
    !filters?.category || article.category === filters.category;
  const matchesTag = !filters?.tag || article.tags.includes(filters.tag);
  const searchable = [
    article.title,
    article.excerpt,
    article.summary,
    article.category,
    article.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();
  const matchesQuery =
    !filters?.q || searchable.includes(filters.q.toLowerCase());

  return matchesCategory && matchesTag && matchesQuery;
}

function blogWhere(filters?: BlogFilters, publicOnly = true) {
  return {
    ...(publicOnly ? { published: true } : {}),
    ...(filters?.category ? { category: filters.category } : {}),
    ...(filters?.tag ? { tags: { has: filters.tag } } : {}),
    ...(filters?.q
      ? {
          OR: [
            { title: { contains: filters.q, mode: "insensitive" } },
            { excerpt: { contains: filters.q, mode: "insensitive" } },
            { summary: { contains: filters.q, mode: "insensitive" } },
            { category: { contains: filters.q, mode: "insensitive" } },
            { tags: { has: filters.q } },
          ],
        }
      : {}),
  };
}

function blogWriteData(input: Partial<BlogInput>) {
  return {
    ...input,
    ...(input.coverImage || input.image
      ? { coverImage: input.coverImage ?? input.image }
      : {}),
    ...(input.image || input.coverImage
      ? { image: input.image ?? input.coverImage }
      : {}),
    ...(input.content
      ? { content: input.content as unknown as Record<string, unknown>[] }
      : {}),
    ...(input.date
      ? { date: input.date instanceof Date ? input.date : new Date(input.date) }
      : {}),
    ...(input.publishedAt
      ? {
          publishedAt:
            input.publishedAt instanceof Date
              ? input.publishedAt
              : new Date(input.publishedAt),
        }
      : {}),
  };
}

export async function listBlogs(filters?: BlogFilters) {
  const prisma = await getPrisma();
  const blogPost = getBlogDelegate(prisma);

  if (blogPost) {
    try {
      const posts = await blogPost.findMany({
        where: blogWhere(filters),
        orderBy: [{ date: "desc" }, { views: "desc" }],
      });

      if (Array.isArray(posts)) {
        return posts.map(mapBlogPost);
      }
    } catch {
      // Static fallback keeps public routes available before DB setup.
    }
  }

  return articles.filter((article) => articleMatchesFilters(article, filters));
}

export async function findBlogBySlug(slug: string) {
  const prisma = await getPrisma();
  const blogPost = getBlogDelegate(prisma);

  if (blogPost) {
    try {
      const post = await blogPost.findUnique({
        where: { slug },
      });

      if (post) {
        return mapBlogPost(post);
      }
    } catch {
      // Static fallback keeps public routes available before DB setup.
    }
  }

  return articles.find((article) => article.slug === slug) ?? null;
}

export async function listAdminBlogs(filters?: BlogFilters) {
  const prisma = await getPrisma();
  const blogPost = getBlogDelegate(prisma);

  if (!blogPost) {
    return null;
  }

  const posts = await blogPost.findMany({
    where: blogWhere(filters, false),
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
  });

  return Array.isArray(posts) ? posts.map(mapBlogPost) : [];
}

export async function createBlog(input: BlogInput) {
  const prisma = await getPrisma();
  const blogPost = getBlogDelegate(prisma);

  if (!blogPost) {
    return null;
  }

  const now = new Date();
  const created = await blogPost.create({
    data: {
      ...blogWriteData(input),
      date: input.date
        ? new Date(input.date)
        : input.publishedAt
          ? new Date(input.publishedAt)
          : now,
      publishedAt: input.publishedAt
        ? new Date(input.publishedAt)
        : input.published
          ? now
          : null,
    },
  });

  return mapBlogPost(created);
}

export async function updateBlog(id: string, input: Partial<BlogInput>) {
  const prisma = await getPrisma();
  const blogPost = getBlogDelegate(prisma);

  if (!blogPost) {
    return null;
  }

  const updated = await blogPost.update({
    where: { id },
    data: blogWriteData(input),
  });

  return mapBlogPost(updated);
}

export async function deleteBlog(id: string) {
  const prisma = await getPrisma();
  const blogPost = getBlogDelegate(prisma);

  if (!blogPost) {
    return null;
  }

  const deleted = await blogPost.delete({
    where: { id },
  });

  return mapBlogPost(deleted);
}
