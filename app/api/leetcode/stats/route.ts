import { NextResponse } from "next/server";
import { getLeetCodeDashboard } from "@/server/leetcode/leetcode-service";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const leetcode = await getLeetCodeDashboard();

  return NextResponse.json(leetcode, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
