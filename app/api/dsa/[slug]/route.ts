import { NextResponse } from "next/server";
import { getAlgorithmTopicBySlug } from "@/data/dsa";
import { notFound } from "@/lib/server/api";

type DsaApiRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: DsaApiRouteContext) {
  const { slug } = await params;
  const topic = getAlgorithmTopicBySlug(slug);

  if (!topic) {
    return notFound("DSA topic");
  }

  return NextResponse.json({ topic });
}
