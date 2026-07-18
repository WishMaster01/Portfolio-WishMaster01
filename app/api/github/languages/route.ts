import { NextResponse } from "next/server";
import {
  getGitHubLanguages,
  getGitHubRepositories,
} from "@/server/github/github-service";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  try {
    const repositories = await getGitHubRepositories();
    const languages = await getGitHubLanguages(repositories);

    return NextResponse.json(
      {
        totalLanguages: languages.length,
        languages,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : 503;

    return NextResponse.json(
      {
        error: "GitHub language data could not be loaded.",
      },
      { status },
    );
  }
}
