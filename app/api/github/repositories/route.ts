import { NextResponse } from "next/server";
import { getGitHubRepositories } from "@/server/github/github-service";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  try {
    const repositories = await getGitHubRepositories();
    const totals = {
      repositories: repositories.length,
      stars: repositories.reduce((sum, repo) => sum + repo.stars, 0),
      forks: repositories.reduce((sum, repo) => sum + repo.forks, 0),
      watchers: repositories.reduce((sum, repo) => sum + repo.watchers, 0),
    };

    return NextResponse.json(
      {
        totals,
        repositories,
        topRepositories: repositories.slice(0, 8),
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
        error: "GitHub repositories could not be loaded.",
      },
      { status },
    );
  }
}
