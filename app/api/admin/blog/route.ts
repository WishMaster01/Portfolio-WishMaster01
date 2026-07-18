import { NextResponse } from "next/server";
import {
  databaseUnavailable,
  readJson,
  validationError,
} from "@/lib/server/api";
import { requireAdmin } from "@/lib/server/admin";
import {
  createBlog,
  listAdminBlogs,
} from "@/lib/server/repositories/blogs";
import { blogInputSchema } from "@/lib/validation/admin-blog";
import { blogQuerySchema } from "@/lib/validation/query";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const { searchParams } = new URL(request.url);
  const parsed = blogQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    tag: searchParams.get("tag") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const articles = await listAdminBlogs(parsed.data);

  if (!articles) {
    return databaseUnavailable();
  }

  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const body = await readJson(request);
  const parsed = blogInputSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const article = await createBlog({
      ...parsed.data,
      image: parsed.data.image ?? parsed.data.coverImage,
      date: parsed.data.date ?? parsed.data.publishedAt ?? new Date(),
    });

    if (!article) {
      return databaseUnavailable();
    }

    return NextResponse.json({ article }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error: "Blog post could not be created.",
        message: "Check for duplicate slugs or invalid blog data.",
      },
      { status: 409 },
    );
  }
}
