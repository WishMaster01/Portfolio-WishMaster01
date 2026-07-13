import { NextResponse } from "next/server";
import {
  databaseUnavailable,
  notFound,
  readJson,
  validationError,
} from "@/lib/server/api";
import { requireAdmin } from "@/lib/server/admin";
import {
  deleteProject,
  findProject,
  updateProject,
} from "@/lib/server/repositories/projects";
import { projectPatchSchema } from "@/lib/validation/admin-project";

type ProjectAdminRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: ProjectAdminRouteContext,
) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const { slug } = await params;
  const project = await findProject(slug);

  if (!project) {
    return notFound("Project");
  }

  return NextResponse.json({ project });
}

export async function PATCH(
  request: Request,
  { params }: ProjectAdminRouteContext,
) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const body = await readJson(request);
  const parsed = projectPatchSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const { slug } = await params;

  try {
    const project = await updateProject(slug, parsed.data);

    if (!project) {
      return databaseUnavailable();
    }

    return NextResponse.json({ project });
  } catch {
    return notFound("Project");
  }
}

export async function DELETE(
  request: Request,
  { params }: ProjectAdminRouteContext,
) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const { slug } = await params;

  try {
    const project = await deleteProject(slug);

    if (!project) {
      return databaseUnavailable();
    }

    return NextResponse.json({ project });
  } catch {
    return notFound("Project");
  }
}
