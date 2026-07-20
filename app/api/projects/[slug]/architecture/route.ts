import { NextResponse } from "next/server";
import { getProjectArchitecture } from "@/server/queries/get-project-architecture";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const project = await getProjectArchitecture(slug);

  if (!project) {
    return NextResponse.json(
      {
        error: "Architecture not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(project);
}
