"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type BlogDraft = {
  title: string;
  category: string;
  tags: string;
  excerpt: string;
  content: string;
  adminKey: string;
  coverImage: string;
};

const initialDraft: BlogDraft = {
  title: "",
  category: "Web Development",
  tags: "",
  excerpt: "",
  content: "",
  adminKey: "",
  coverImage: "/blog/nextjs-architecture.png",
};

export function CreateBlogForm() {
  const [draft, setDraft] = useState(initialDraft);
  const [status, setStatus] = useState("");

  const slug = useMemo(
    () =>
      draft.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    [draft.title],
  );

  function updateField(field: keyof BlogDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function saveDraft() {
    const drafts = JSON.parse(
      window.localStorage.getItem("wishmaster01-blog-drafts") ?? "[]",
    ) as BlogDraft[];

    window.localStorage.setItem(
      "wishmaster01-blog-drafts",
      JSON.stringify([{ ...draft }, ...drafts]),
    );
    setStatus("Draft saved in this browser.");
  }

  function resetDraft() {
    setDraft(initialDraft);
    setStatus("");
  }

  async function publishDraft() {
    setStatus("Publishing...");

    const tags = draft.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": draft.adminKey,
      },
      body: JSON.stringify({
        slug: slug || "my-blog-post",
        title: draft.title,
        excerpt: draft.excerpt,
        summary: draft.excerpt,
        content: [
          {
            heading: "Overview",
            body: draft.content
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
          },
        ],
        coverImage: draft.coverImage,
        image: draft.coverImage,
        coverAlt: `Cover image for ${draft.title}`,
        category: draft.category,
        tags: tags.length ? tags : ["Technical"],
        published: true,
        publishedAt: new Date().toISOString(),
        readingTime: "5 min read",
        author: "WishMaster01",
        views: 0,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        message?: string;
      } | null;
      setStatus(payload?.message ?? payload?.error ?? "Publish failed.");
      return;
    }

    setStatus("Published through protected admin API.");
  }

  const exported = `{
  slug: "${slug || "my-blog-post"}",
  title: "${draft.title || "Untitled Blog"}",
  excerpt: "${draft.excerpt || "Short summary..."}",
  date: "${new Date().toISOString().slice(0, 10)}",
  readingTime: "5 min read",
  category: "${draft.category}",
  image: "/blog/nextjs-architecture.png",
  coverImage: "${draft.coverImage}",
  coverAlt: "Cover image for ${draft.title || "Untitled Blog"}",
  author: "WishMaster01",
  tags: [${draft.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => `"${tag}"`)
    .join(", ")}],
  summary: "${draft.excerpt || "Longer summary..."}",
}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-2">
          <label className="text-sm font-black" htmlFor="title">
            Blog Title
          </label>
          <input
            id="title"
            value={draft.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="How I built an AI SaaS dashboard"
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-black" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={draft.category}
              onChange={(event) => updateField("category", event.target.value)}
              className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
            >
              <option>Web Development</option>
              <option>AI</option>
              <option>Backend</option>
              <option>DSA</option>
              <option>Career</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-black" htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              value={draft.tags}
              onChange={(event) => updateField("tags", event.target.value)}
              placeholder="Next.js, AI, SaaS"
              className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-black" htmlFor="coverImage">
            Cover Image
          </label>
          <select
            id="coverImage"
            value={draft.coverImage}
            onChange={(event) =>
              updateField("coverImage", event.target.value)
            }
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          >
            <option value="/blog/nextjs-architecture.png">
              Next.js Architecture
            </option>
            <option value="/blog/how-i-built-infinityai.png">
              InfinityAI
            </option>
            <option value="/blog/ai-trip-planners.png">AI Trip Planner</option>
            <option value="/blog/full-stack-authentication.png">
              Authentication
            </option>
            <option value="/blog/postgres-prisma.png">
              Prisma PostgreSQL
            </option>
            <option value="/blog/razorpay-vs-stripe.png">
              Payment Integration
            </option>
            <option value="/blog/socketio-realtime-chat.png">
              Real-Time Chat
            </option>
            <option value="/blog/deploying-nextjs-apps.png">
              Next.js Deployment
            </option>
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-black" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={draft.excerpt}
            onChange={(event) => updateField("excerpt", event.target.value)}
            rows={3}
            placeholder="Write a short preview for the blog card..."
            className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-black" htmlFor="content">
            Blog Content
          </label>
          <textarea
            id="content"
            value={draft.content}
            onChange={(event) => updateField("content", event.target.value)}
            rows={12}
            placeholder="Write your full blog draft here..."
            className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={saveDraft}>
            Save Draft
          </Button>
          <Button type="button" variant="secondary" onClick={publishDraft}>
            Publish with Admin API
          </Button>
          <Button type="button" variant="secondary" onClick={resetDraft}>
            Reset
          </Button>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-black" htmlFor="adminKey">
            Admin API Key
          </label>
          <input
            id="adminKey"
            value={draft.adminKey}
            onChange={(event) => updateField("adminKey", event.target.value)}
            placeholder="Matches ADMIN_API_KEY in .env"
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
          <p className="text-xs leading-5 text-muted-foreground">
            This key is sent only as the protected request header. Do not use
            this page as a public admin dashboard without authentication.
          </p>
        </div>
        {status ? (
          <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm font-bold text-accent">
            {status}
          </p>
        ) : null}
      </form>

      <aside className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-black">Generated Data Preview</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This draft creator saves locally. When you are ready to publish, copy
          this structure into `data/blog.ts` or connect it to an authenticated
          admin API.
        </p>
        <pre className="mt-5 max-h-[520px] overflow-auto rounded-2xl border border-border bg-background p-4 text-xs leading-6 text-muted-foreground">
          <code>{exported}</code>
        </pre>
      </aside>
    </div>
  );
}
