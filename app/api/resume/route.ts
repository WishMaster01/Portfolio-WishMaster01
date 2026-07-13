import { NextResponse } from "next/server";
import { getResumeProfile } from "@/lib/server/repositories/resume";

export const runtime = "nodejs";

export async function GET() {
  const resume = await getResumeProfile();

  return NextResponse.json({ resume });
}
