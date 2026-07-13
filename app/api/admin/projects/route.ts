import { NextResponse } from "next/server";
import {
  databaseUnavailable,
  readJson,
  validationError,
} from "@/lib/server/api";
import { requireAdmin } from "@/lib/server/admin";
import {
  createProject,
  listProjects,
} from "@/lib/server/repositories/projects";
import { projectInputSchema } from "@/lib/validation/admin-project";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  const body = await readJson(request);
  const parsed = projectInputSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const project = await createProject(parsed.data);

    if (!project) {
      return databaseUnavailable();
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error: "Project could not be created.",
        message: "Check for duplicate slugs or invalid relational data.",
      },
      { status: 409 },
    );
  }
}
