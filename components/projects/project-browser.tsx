"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectBrowserProps = {
  projects: Project[];
};

const filters = [
  "All",
  "AI",
  "Web Apps",
  "SaaS",
  "Commerce",
  "Dashboard",
] as const;

const projectVisuals: Record<string, string> = {
  infinityai: "from-[#17002f] via-[#6d28d9] to-[#070014]",
  explorex: "from-[#0f766e] via-[#38bdf8] to-[#082f49]",
  dailyessentials: "from-[#7c2d12] via-[#fb923c] to-[#fff7ed]",
  vyvo: "from-[#270044] via-[#a21caf] to-[#3b0764]",
  wishcart: "from-[#041737] via-[#2563eb] to-[#05102a]",
};

function projectMatchesFilter(project: Project, filter: string) {
  if (filter === "All") return true;

  const haystack = [
    project.title,
    project.category,
    project.summary,
    project.stack.join(" "),
    project.technologies.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  if (filter === "Web Apps") {
    return /next|react|web|app|platform|marketplace/.test(haystack);
  }

  if (filter === "Commerce") {
    return /commerce|marketplace|cart|checkout|grocery|storefront/.test(
      haystack,
    );
  }

  if (filter === "Dashboard") {
    return /dashboard|metrics|wellness|data|chart/.test(haystack);
  }

  return haystack.includes(filter.toLowerCase());
}

export function ProjectBrowser({ projects }: ProjectBrowserProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter = projectMatchesFilter(project, filter);
      const haystack = [
        project.title,
        project.category,
        project.summary,
        project.description,
        project.stack.join(" "),
        project.technologies.join(" "),
        project.highlights.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesFilter &&
        (!normalizedQuery || haystack.includes(normalizedQuery))
      );
    });
  }, [filter, projects, query]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_360px] lg:gap-5">
        <div className="rounded-[2rem] border border-border bg-surface/95 p-4 shadow-sm shadow-foreground/5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                Project Explorer
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-foreground">
                Filter case studies by product area
              </h2>
            </div>
            <label className="min-w-0 lg:w-80">
              <span className="sr-only">Search projects</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, stack, features..."
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition placeholder:text-muted-foreground focus:border-accent"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-bold transition",
                  item === filter
                    ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                    : "border-border bg-background text-muted-foreground hover:border-accent/40 hover:text-accent",
                )}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-accent/20 bg-accent p-4 text-accent-foreground shadow-xl shadow-accent/20 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] opacity-80">
            Portfolio Scope
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-background/15 p-3">
              <p className="text-2xl font-black">{projects.length}</p>
              <p className="mt-1 text-xs opacity-85">Case studies</p>
            </div>
            <div className="rounded-2xl bg-background/15 p-3">
              <p className="text-2xl font-black">5</p>
              <p className="mt-1 text-xs opacity-85">Domains</p>
            </div>
            <div className="rounded-2xl bg-background/15 p-3">
              <p className="text-2xl font-black">AI</p>
              <p className="mt-1 text-xs opacity-85">Direction</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        layout
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.slug}
            layout
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: (index % 6) * 0.04, duration: 0.32 }}
            className="group overflow-hidden rounded-[2rem] border border-border bg-surface/95 shadow-sm shadow-foreground/5 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <div
                className={cn(
                  "relative h-44 overflow-hidden bg-gradient-to-br sm:h-60",
                  projectVisuals[project.slug] ?? projectVisuals.infinityai,
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_20%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.18),transparent_30%)]" />
                <div className="absolute left-4 right-4 top-6 rounded-2xl border border-white/25 bg-black/25 p-3 shadow-2xl backdrop-blur-md sm:left-6 sm:right-6 sm:top-8 sm:rounded-3xl sm:p-4">
                  <div className="flex gap-2 border-b border-white/15 pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
                  </div>
                  <div className="mt-4 grid grid-cols-[1.3fr_0.7fr] gap-4">
                    <div className="space-y-2">
                      <span className="block h-4 rounded-full bg-white/70" />
                      <span className="block h-3 w-3/4 rounded-full bg-white/35" />
                      <span className="block h-3 w-2/3 rounded-full bg-white/25" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Array.from({ length: 4 }).map((_, visualIndex) => (
                        <span
                          key={visualIndex}
                          className="aspect-square rounded-xl bg-white/25"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur">
                    {project.category}
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur transition group-hover:translate-x-1">
                    View case study →
                  </span>
                </div>
              </div>
            </Link>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.03em] text-foreground">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm font-bold text-accent">
                    {project.role}
                  </p>
                </div>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
                  {project.year}
                </span>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                {project.summary}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {project.metrics.slice(0, 3).map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-border bg-background/70 p-2.5 sm:p-3"
                  >
                    <p className="font-black text-foreground">{metric.value}</p>
                    <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 5).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded-full bg-accent px-4 py-2 text-xs font-black text-accent-foreground shadow-sm shadow-accent/20 transition hover:bg-accent/90"
                >
                  Details
                </Link>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs font-black text-foreground transition hover:border-accent/50 hover:text-accent"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-[2rem] border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-black text-foreground">
            No projects found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search term or switch the filter back to All.
          </p>
        </div>
      ) : null}
    </div>
  );
}
