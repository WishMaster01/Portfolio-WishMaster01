import { NextResponse } from "next/server";
import { listProjectsPage } from "@/lib/server/repositories/projects";
import { projectQuerySchema } from "@/lib/validation/query";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = projectQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    featured: searchParams.get("featured") ?? undefined,
    cursor: searchParams.get("cursor") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const page = await listProjectsPage(parsed.data);

  return NextResponse.json({
    projects: page.items,
    pageInfo: {
      nextCursor: page.nextCursor,
      hasMore: page.hasMore,
    },
  });
}
