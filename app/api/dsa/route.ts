import { NextResponse } from "next/server";
import { algorithmTopics } from "@/data/dsa";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({ topics: algorithmTopics });
}
