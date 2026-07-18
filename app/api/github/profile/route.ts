import { NextResponse } from "next/server";
import { getGitHubDashboard } from "@/server/github/github-service";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const dashboard = await getGitHubDashboard();

  return NextResponse.json(dashboard, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
