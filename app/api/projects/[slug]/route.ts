import { NextResponse } from "next/server";
import { notFound } from "@/lib/server/api";
import { findProject } from "@/lib/server/repositories/projects";

type ProjectRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: ProjectRouteContext) {
  const { slug } = await params;
  const project = await findProject(slug);

  if (!project) {
    return notFound("Project");
  }

  return NextResponse.json({ project });
}
