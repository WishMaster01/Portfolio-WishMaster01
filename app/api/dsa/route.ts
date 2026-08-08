import { NextResponse } from "next/server";
import { allAlgorithmTopics } from "@/data/dsa";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({ topics: allAlgorithmTopics });
}
