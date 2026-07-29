"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { projectCaseStudies } from "@/data/project-case-studies";
import type { ProjectCaseStudyInput } from "@/lib/validation/project-case-study";

type CaseStudyEditorProps = {
  defaultSlug?: string;
};

function getInitialCaseStudy(slug: string): ProjectCaseStudyInput {
  const source = projectCaseStudies[slug];

  if (!source) {
    return {
      background: "",
      problem: "",
      targetUsers: "",
      role: "",
      constraints: [],
      goals: [],
      process: [{ phase: "Discovery", description: "Describe the discovery phase." }],
      outcomes: [],
      lessons: [],
      futureScope: [],
    };
  }

  return {
    ...source,
    futureScope: [],
  };
}

export function CaseStudyEditor({ defaultSlug = "infinityai" }: CaseStudyEditorProps) {
  const [slug, setSlug] = useState(defaultSlug);
  const [adminKey, setAdminKey] = useState("");
  const [form, setForm] = useState<ProjectCaseStudyInput>(() =>
    getInitialCaseStudy(defaultSlug),
  );
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  );
  const [statusDetail, setStatusDetail] = useState<string | null>(null);

  const slugOptions = useMemo(
    () => projects.map((project) => project.slug),
    [],
  );

  function handleSlugChange(nextSlug: string) {
    setSlug(nextSlug);
    setForm(getInitialCaseStudy(nextSlug));
    setStatus("idle");
    setStatusDetail(null);
  }

  async function handleSave() {
    setStatus("saving");
    setStatusDetail(null);

    if (!adminKey.trim()) {
      setStatus("error");
      setStatusDetail("Enter your admin key before sending a protected request.");
      return;
    }

    try {
      const response = await fetch(`/api/projects/${slug}/case-study`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json().catch(() => null)) as
        | {
            success?: boolean;
            message?: string;
            code?: string;
            errors?: { formErrors: string[]; fieldErrors: Record<string, string[]> };
          }
        | null;

      if (!response.ok) {
        const fieldMessages = data?.errors?.fieldErrors
          ? Object.entries(data.errors.fieldErrors)
              .flatMap(([field, messages]) =>
                (messages ?? []).map((message) => `${field}: ${message}`),
              )
              .join(" ")
          : null;

        setStatus("error");
        setStatusDetail(
          fieldMessages ??
            data?.message ??
            data?.code ??
            "The update could not be saved.",
        );
        return;
      }

      setStatus("success");
      setStatusDetail(data?.message ?? "Case study saved successfully.");
    } catch {
      setStatus("error");
      setStatusDetail("The update could not be saved.");
    }
  }

  return (
    <section
      id="case-study"
      className="rounded-4xl border border-border bg-surface/85 shadow-sm shadow-foreground/5 backdrop-blur"
    >
      <div className="border-b border-border p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          CaseStudyEditor
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
          Admin case study updates
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sends validated JSON to protected{" "}
          <code>PATCH /api/projects/[slug]/case-study</code>. The admin key is
          entered manually and is never stored by this component.
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
          <span className="text-sm font-black">Project slug</span>
          <select
            value={slug}
            onChange={(event) => handleSlugChange(event.target.value)}
            className="h-12 rounded-2xl border border-border bg-background/70 px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          >
            {slugOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2" htmlFor="case-study-background">
          <span className="text-sm font-black">Background</span>
          <textarea
            id="case-study-background"
            value={form.background}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                background: event.target.value,
              }))
            }
            className="min-h-32 w-full rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </label>

        <label className="grid gap-2" htmlFor="case-study-problem">
          <span className="text-sm font-black">Problem</span>
          <textarea
            id="case-study-problem"
            value={form.problem}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                problem: event.target.value,
              }))
            }
            className="min-h-40 w-full rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </label>

        <label className="grid gap-2" htmlFor="case-study-target-users">
          <span className="text-sm font-black">Target users</span>
          <textarea
            id="case-study-target-users"
            value={form.targetUsers}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                targetUsers: event.target.value,
              }))
            }
            className="min-h-24 w-full rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Process, outcomes, and list fields are included from the loaded
            template and validated on save.
          </p>
          <Button
            type="button"
            onClick={handleSave}
            disabled={status === "saving"}
          >
            {status === "saving" ? "Saving..." : "Save case study"}
          </Button>
        </div>

        {status === "success" ? (
          <p
            role="status"
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-600 dark:text-emerald-300"
          >
            {statusDetail ?? "Case study saved successfully."}
          </p>
        ) : null}

        {status === "error" ? (
          <p
            role="alert"
            className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-600 dark:text-red-300"
          >
            {statusDetail ?? "The update could not be saved."}
          </p>
        ) : null}
      </div>
    </section>
  );
}
