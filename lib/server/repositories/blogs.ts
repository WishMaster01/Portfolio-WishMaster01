import { articles } from "@/data/blog";
import type { Article } from "@/types/article";
import { getPrisma } from "@/lib/server/prisma";
import type { BlogPost, Prisma } from "@prisma/client";

type BlogFilters = {
  category?: string;
  tag?: string;
  q?: string;
};

type BlogInput = Omit<Article, "date" | "image" | "publishedAt"> & {
  image?: string;
  date?: string | Date;
  published?: boolean;
  publishedAt?: string | Date;
  views?: number;
};

function normalizeDate(value: unknown, fallback: string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && value.length) {
    return value.slice(0, 10);
  }

  return fallback;
}

function normalizeContent(value: unknown, fallback: Article["content"]): Article["content"] {
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

function mapBlogPost(post: BlogPost): Article {
  const fallback =
    articles.find((article) => article.slug === post.slug) ??
    articles[0];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: normalizeDate(post.date ?? post.publishedAt, fallback.date),
    publishedAt: normalizeDate(post.publishedAt ?? post.date, fallback.date),
    readingTime: post.readingTime ?? fallback.readingTime,
    category: post.category ?? fallback.category,
    image: post.image ?? post.coverImage ?? fallback.image,
    coverImage: post.coverImage ?? post.image ?? fallback.image,
    author: post.author ?? fallback.author,
    tags: Array.isArray(post.tags) ? post.tags : fallback.tags,
    coverAlt: post.coverAlt ?? fallback.coverAlt,
    summary: post.summary ?? post.excerpt ?? fallback.summary,
    published: typeof post.published === "boolean" ? post.published : fallback.published,
    views: typeof post.views === "number" ? post.views : 0,
    content: normalizeContent(post.content, fallback.content),
  };
}

function articleMatchesFilters(article: Article, filters?: BlogFilters): boolean {
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

function blogWhere(filters?: BlogFilters, publicOnly = true): Prisma.BlogPostWhereInput {
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

function blogWriteData(input: Partial<BlogInput>): Prisma.BlogPostUpdateInput {
  const data: Prisma.BlogPostUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.slug !== undefined) data.slug = input.slug;
  if (input.excerpt !== undefined) data.excerpt = input.excerpt;
  if (input.summary !== undefined) data.summary = input.summary;
  if (input.readingTime !== undefined) data.readingTime = input.readingTime;
  if (input.category !== undefined) data.category = input.category;
  if (input.tags !== undefined) data.tags = input.tags;
  if (input.author !== undefined) data.author = input.author;
  if (input.published !== undefined) data.published = input.published;
  if (input.views !== undefined) data.views = input.views;
  if (input.coverAlt !== undefined) data.coverAlt = input.coverAlt;

  if (input.coverImage || input.image) {
    data.coverImage = input.coverImage ?? input.image;
    data.image = input.image ?? input.coverImage;
  }

  if (input.content) {
    data.content = input.content as unknown as Prisma.InputJsonValue;
  }

  if (input.date) {
    data.date = input.date instanceof Date ? input.date : new Date(input.date);
  }

  if (input.publishedAt) {
    data.publishedAt =
      input.publishedAt instanceof Date
        ? input.publishedAt
        : new Date(input.publishedAt);
  }

  return data;
}

export async function listBlogs(filters?: BlogFilters): Promise<Article[]> {
  const prisma = await getPrisma();

  if (prisma) {
    try {
      const posts = await prisma.blogPost.findMany({
        where: blogWhere(filters),
        orderBy: [{ date: "desc" }, { views: "desc" }],
      });

      if (posts.length > 0) {
        return posts.map(mapBlogPost);
      }
    } catch (error) {
      if (process.env.DATABASE_URL) {
        console.error("[Blog Repository] Database error:", error);
        throw error;
      }
    }
  }

  return articles.filter((article) => articleMatchesFilters(article, filters));
}

export async function findBlogBySlug(slug: string): Promise<Article | null> {
  const prisma = await getPrisma();

  if (prisma) {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (post) {
        return mapBlogPost(post);
      }
    } catch (error) {
      if (process.env.DATABASE_URL) {
        console.error(`[Blog Repository] Database error fetching ${slug}:`, error);
        throw error;
      }
    }
  }

  return articles.find((article) => article.slug === slug) ?? null;
}

export async function listAdminBlogs(filters?: BlogFilters): Promise<Article[] | null> {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  const posts = await prisma.blogPost.findMany({
    where: blogWhere(filters, false),
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
  });

  return posts.map(mapBlogPost);
}

export async function createBlog(input: BlogInput): Promise<Article | null> {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  const now = new Date();
  const created = await prisma.blogPost.create({
    data: {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      summary: input.summary,
      readingTime: input.readingTime,
      category: input.category,
      tags: input.tags,
      author: input.author ?? "WishMaster01",
      coverImage: input.coverImage ?? input.image ?? "/images/blog/default.jpg",
      image: input.image ?? input.coverImage ?? "/images/blog/default.jpg",
      coverAlt: input.coverAlt ?? input.title,
      content: input.content as unknown as Prisma.InputJsonValue,
      published: input.published ?? true,
      views: input.views ?? 0,
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

export async function updateBlog(id: string, input: Partial<BlogInput>): Promise<Article | null> {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  const updated = await prisma.blogPost.update({
    where: { id },
    data: blogWriteData(input),
  });

  return mapBlogPost(updated);
}

export async function deleteBlog(id: string): Promise<Article | null> {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  const deleted = await prisma.blogPost.delete({
    where: { id },
  });

  return mapBlogPost(deleted);
}
