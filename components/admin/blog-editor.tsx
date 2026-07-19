"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const starterBlog = {
  slug: "new-technical-article",
  title: "New Technical Article",
  excerpt: "Short article excerpt for listing cards.",
  summary: "Longer article summary for detail pages and SEO.",
  coverImage: "/blog/nextjs-architecture.png",
  image: "/blog/nextjs-architecture.png",
  coverAlt: "Technical article cover",
  readingTime: "6 min read",
  category: "Web Development",
  tags: ["Next.js", "TypeScript"],
  author: "WishMaster01",
  published: false,
  publishedAt: null,
  date: new Date().toISOString(),
  views: 0,
  content: [
    {
      heading: "Draft section",
      body: [
        "Write the article body as structured JSON. This keeps the renderer predictable before adding a richer editor.",
      ],
      bullets: ["Add context", "Explain implementation", "Include tradeoffs"],
    },
  ],
};

export function BlogEditor() {
  const [adminKey, setAdminKey] = useState("");
  const [payload, setPayload] = useState(() =>
    JSON.stringify(starterBlog, null, 2),
  );
  const [status, setStatus] = useState<string | null>(null);
  const isPayloadValid = useMemo(() => {
    try {
      JSON.parse(payload);
      return true;
    } catch {
      return false;
    }
  }, [payload]);

  async function createBlog() {
    setStatus(null);

    if (!adminKey.trim()) {
      setStatus("Enter your admin key before sending a protected request.");
      return;
    }

    if (!isPayloadValid) {
      setStatus("Blog JSON is invalid.");
      return;
    }

    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: payload,
    });
    const data = (await response.json().catch(() => null)) as
      | { error?: string; message?: string }
      | null;

    setStatus(
      response.ok
        ? "Blog article created successfully."
        : data?.message ?? data?.error ?? "Blog request failed.",
    );
  }

  return (
    <section
      id="blogs"
      className="rounded-[2rem] border border-border bg-surface/85 shadow-sm shadow-foreground/5 backdrop-blur"
    >
      <div className="border-b border-border p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          BlogEditor
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
          Structured blog editor
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sends structured article content to protected{" "}
          <code>POST /api/admin/blog</code>. This can later be replaced with
          MDX or rich-text editing without changing the protected route.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:p-6">
        <label className="grid gap-2">
          <span className="text-sm font-black">Admin key</span>
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            placeholder="ADMIN_API_KEY"
            className="h-12 rounded-2xl border border-border bg-background/70 px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black">Blog JSON</span>
          <textarea
            value={payload}
            onChange={(event) => setPayload(event.target.value)}
            rows={14}
            spellCheck={false}
            className="min-h-72 resize-y rounded-2xl border border-border bg-background/70 p-4 font-mono text-xs leading-6 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span
            className={
              isPayloadValid
                ? "text-sm font-bold text-emerald-500"
                : "text-sm font-bold text-red-500"
            }
          >
            {isPayloadValid ? "JSON valid" : "JSON invalid"}
          </span>
          <Button type="button" onClick={createBlog}>
            Create Blog Draft
          </Button>
        </div>

        {status ? (
          <p className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm font-bold text-muted-foreground">
            {status}
          </p>
        ) : null}
      </div>
    </section>
  );
}
