"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const starterProject = {
  slug: "new-project",
  title: "New Project",
  category: "SaaS Platform",
  year: "2026",
  status: "Draft",
  role: "Full-stack developer",
  timeline: "4 weeks",
  summary: "Short project summary.",
  description: "Detailed project description.",
  problem: "Problem statement.",
  solution: "Solution overview.",
  impact: "Expected impact.",
  stack: ["Next.js", "TypeScript", "PostgreSQL"],
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  features: [],
  architecture: { summary: "Layered architecture", layers: [] },
  screenshots: [],
  challenges: [],
  futureScope: ["Admin editing", "Analytics"],
  githubUrl: "https://github.com/WishMaster01",
  liveUrl: "/projects/new-project",
  milestones: [],
  highlights: ["Typed content", "Responsive UI"],
  metrics: [],
  sections: [],
  featured: false,
  sortOrder: 10,
};

export function ProjectForm() {
  const [adminKey, setAdminKey] = useState("");
  const [payload, setPayload] = useState(() =>
    JSON.stringify(starterProject, null, 2),
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

  async function createProject() {
    setStatus(null);

    if (!adminKey.trim()) {
      setStatus("Enter your admin key before sending a protected request.");
      return;
    }

    if (!isPayloadValid) {
      setStatus("Project JSON is invalid.");
      return;
    }

    const response = await fetch("/api/admin/projects", {
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
        ? "Project created successfully."
        : data?.message ?? data?.error ?? "Project request failed.",
    );
  }

  return (
    <section
      id="projects"
      className="rounded-[2rem] border border-border bg-surface/85 shadow-sm shadow-foreground/5 backdrop-blur"
    >
      <div className="border-b border-border p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          ProjectForm
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
          Admin-ready project creation
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sends JSON to protected <code>POST /api/admin/projects</code>. The
          admin key is entered manually and is never stored by this component.
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
          <span className="text-sm font-black">Project JSON</span>
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
          <Button type="button" onClick={createProject}>
            Create Project
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
