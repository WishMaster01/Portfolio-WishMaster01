import { NextResponse } from "next/server";
import { getDeveloperActivityHub } from "@/server/developer-activity/activity-service";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const activity = await getDeveloperActivityHub();

  return NextResponse.json(activity, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
