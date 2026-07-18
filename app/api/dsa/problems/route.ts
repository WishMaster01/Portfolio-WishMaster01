import { NextResponse } from "next/server";
import { dsaPracticeProblems } from "@/data/dsa";

export const runtime = "nodejs";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");
  const problems = topic
    ? dsaPracticeProblems.filter((problem) => problem.topicSlug === topic)
    : dsaPracticeProblems;

  return NextResponse.json({ problems });
}
