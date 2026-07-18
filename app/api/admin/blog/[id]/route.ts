import { NextResponse } from "next/server";
import {
  databaseUnavailable,
  notFound,
  readJson,
  validationError,
} from "@/lib/server/api";
import { requireAdmin } from "@/lib/server/admin";
import {
  deleteBlog,
  updateBlog,
} from "@/lib/server/repositories/blogs";
import { blogPatchSchema } from "@/lib/validation/admin-blog";

type BlogAdminRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: BlogAdminRouteContext,
) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const body = await readJson(request);
  const parsed = blogPatchSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const { id } = await params;

  try {
    const article = await updateBlog(id, parsed.data);

    if (!article) {
      return databaseUnavailable();
    }

    return NextResponse.json({ article });
  } catch {
    return notFound("Blog post");
  }
}

export async function DELETE(
  request: Request,
  { params }: BlogAdminRouteContext,
) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const { id } = await params;

  try {
    const article = await deleteBlog(id);

    if (!article) {
      return databaseUnavailable();
    }

    return NextResponse.json({ article });
  } catch {
    return notFound("Blog post");
  }
}
