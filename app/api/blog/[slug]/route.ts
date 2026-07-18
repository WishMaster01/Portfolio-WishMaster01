import { NextResponse } from "next/server";
import { notFound } from "@/lib/server/api";
import { findBlogBySlug } from "@/lib/server/repositories/blogs";

type BlogRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: BlogRouteContext) {
  const { slug } = await params;
  const article = await findBlogBySlug(slug);

  if (!article) {
    return notFound("Blog post");
  }

  return NextResponse.json({ article });
}
