"use client";

import { useMemo, useState } from "react";
import { compareProjects } from "@/lib/projects/project-comparison";
import type { Project } from "@/types/project";

type ProjectComparisonProps = {
  projects: Project[];
};

function percentage(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function ProjectComparison({ projects }: ProjectComparisonProps) {
  const [primarySlug, setPrimarySlug] = useState(projects[0]?.slug ?? "");
  const [secondarySlug, setSecondarySlug] = useState(
    projects[1]?.slug ?? projects[0]?.slug ?? "",
  );

  const primary =
    projects.find((project) => project.slug === primarySlug) ?? projects[0];
  const secondary =
    projects.find((project) => project.slug === secondarySlug) ??
    projects[1] ??
    projects[0];

  const comparison = useMemo(() => {
    if (!primary || !secondary) {
      return null;
    }

    return compareProjects(primary, secondary);
  }, [primary, secondary]);

  if (!primary || !secondary || !comparison) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-border bg-surface/95 p-5 shadow-sm shadow-foreground/5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
            Project Comparison
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-foreground">
            Weighted graph comparison across real case studies
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            Cosine similarity measures narrative overlap, Jaccard similarity
            scores shared technologies, and dynamic programming extracts the
            longest shared stack sequence.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="min-w-0">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
              Primary
            </span>
            <select
              value={primarySlug}
              onChange={(event) => setPrimarySlug(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
            >
              {projects.map((project) => (
                <option key={project.slug} value={project.slug}>
                  {project.title}
                </option>
              ))}
            </select>
          </label>

          <label className="min-w-0">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
              Secondary
            </span>
            <select
              value={secondarySlug}
              onChange={(event) => setSecondarySlug(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
            >
              {projects.map((project) => (
                <option key={project.slug} value={project.slug}>
                  {project.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-accent/20 bg-accent p-5 text-accent-foreground">
          <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
            Compatibility
          </p>
          <p className="mt-3 text-4xl font-black">
            {percentage(comparison.compatibilityScore)}
          </p>
          <p className="mt-3 text-sm leading-6 opacity-90">
            Combined score for architecture overlap, shared stack paths, and
            product-domain proximity.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Cosine similarity",
              value: percentage(comparison.cosineSimilarity),
            },
            {
              label: "Tag similarity",
              value: percentage(comparison.tagSimilarity),
            },
            {
              label: "Graph weight",
              value: percentage(comparison.graphWeight),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-background/70 p-4"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-3 text-2xl font-black text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background/70 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
            Shared technologies
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {comparison.commonTechnologies.length > 0 ? (
              comparison.commonTechnologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground"
                >
                  {technology}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                No direct overlap detected.
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background/70 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
            Longest shared stack path
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {comparison.sharedSequence.length > 0 ? (
              comparison.sharedSequence.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-black text-accent"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Dynamic programming found no ordered stack sequence in common.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
