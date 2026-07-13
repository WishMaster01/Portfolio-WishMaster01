import { articles } from "@/data/blog";
import type { Article } from "@/types/article";
import { getPrisma } from "@/lib/server/prisma";

type BlogDelegate = {
  findMany: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
};

function getBlogDelegate(prisma: Record<string, unknown> | null) {
  return prisma?.blogPost as BlogDelegate | undefined;
}

function mapBlogPost(row: unknown): Article {
  const post = row as Record<string, unknown>;
  const date = post.date;

  return {
    slug: String(post.slug),
    title: String(post.title),
    excerpt: String(post.excerpt),
    date: date instanceof Date ? date.toISOString().slice(0, 10) : String(date),
    readingTime: String(post.readingTime),
    category: String(post.category),
  };
}

export async function listBlogs(filters?: { category?: string }) {
  const prisma = await getPrisma();
  const blogPost = getBlogDelegate(prisma);

  if (blogPost) {
    try {
      const posts = await blogPost.findMany({
        where: {
          published: true,
          ...(filters?.category ? { category: filters.category } : {}),
        },
        orderBy: { date: "desc" },
      });

      if (Array.isArray(posts)) {
        return posts.map(mapBlogPost);
      }
    } catch {
      // Static fallback keeps public routes available before DB setup.
    }
  }

  return articles.filter((article) =>
    filters?.category ? article.category === filters.category : true,
  );
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
