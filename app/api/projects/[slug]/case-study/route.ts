import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/admin";
import { databaseUnavailable, readJson } from "@/lib/server/api";
import { updateProjectCaseStudy } from "@/lib/server/repositories/project-case-study";
import { getProjectCaseStudy } from "@/server/queries/get-project-case-study";
import { projectCaseStudySchema } from "@/lib/validation/project-case-study";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const runtime = "nodejs";

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const project = await getProjectCaseStudy(slug);

  if (!project) {
    return NextResponse.json(
      {
        success: false,
        code: "PROJECT_NOT_FOUND",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    slug: project.slug,
    caseStudy: project.caseStudy,
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const authResponse = requireAdmin(request);

  if (authResponse) {
    return authResponse;
  }

  try {
    const { slug } = await context.params;
    const body = await readJson(request);

    if (body === null) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "Request body must be valid JSON.",
        },
        { status: 400 },
      );
    }

    const parsed = projectCaseStudySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const updated = await updateProjectCaseStudy(slug, parsed.data);

    if (updated === null) {
      return databaseUnavailable();
    }

    if (updated === undefined) {
      return NextResponse.json(
        {
          success: false,
          code: "PROJECT_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/projects/${slug}/case-study`);

    return NextResponse.json({
      success: true,
      message: "Case study updated successfully.",
      slug,
      caseStudy: parsed.data,
    });
  } catch (error) {
    console.error("Case study update failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_ERROR",
        message: "Unable to update the case study.",
      },
      { status: 500 },
    );
  }
}
