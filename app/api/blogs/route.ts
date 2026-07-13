import { NextResponse } from "next/server";
import { listBlogs } from "@/lib/server/repositories/blogs";
import { blogQuerySchema } from "@/lib/validation/query";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = blogQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const articles = await listBlogs(parsed.data);

  return NextResponse.json({ articles });
}
