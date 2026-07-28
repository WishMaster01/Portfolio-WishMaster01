import { NextResponse } from "next/server";
import { getProjectEngineering } from "@/server/queries/get-project-engineering";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const project = await getProjectEngineering(slug);

  if (!project) {
    return NextResponse.json(
      {
        error: "Engineering data not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(project);
}
