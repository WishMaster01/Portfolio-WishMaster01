import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    status: "live",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  }, { status: 200 });
}
