import { NextResponse } from "next/server";
import { listProjects } from "@/lib/server/repositories/projects";
import { projectQuerySchema } from "@/lib/validation/query";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = projectQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    featured: searchParams.get("featured") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const projects = await listProjects(parsed.data);

  return NextResponse.json({ projects });
}
