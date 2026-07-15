"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectBrowserProps = {
  projects: Project[];
};

const filters = ["All", "AI", "Web Apps", "SaaS", "Mobile", "Tools"] as const;

const categoryLabels: Record<string, string> = {
  infinityai: "AI SaaS Platform",
  explorex: "AI Trip Planner",
  dailyessentials: "Grocery Platform",
  vyvo: "Chat & Social App",
  wishcart: "E-commerce Platform",
};

const projectVisuals: Record<string, string> = {
  infinityai: "from-[#17002f] via-[#4c1d95] to-[#070014]",
  explorex: "from-[#b9f4ff] via-[#38bdf8] to-[#03657a]",
  dailyessentials: "from-[#fff1dc] via-[#f59e42] to-[#9a3412]",
  vyvo: "from-[#270044] via-[#a21caf] to-[#3b0764]",
  wishcart: "from-[#041737] via-[#2563eb] to-[#05102a]",
};

function projectMatchesFilter(project: Project, filter: string) {
  if (filter === "All") {
    return true;
  }

  const haystack = [
    project.title,
    project.category,
    project.summary,
    project.stack.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  if (filter === "Web Apps") {
    return /next|react|web|commerce|dashboard|marketplace/.test(haystack);
  }

  return haystack.includes(filter.toLowerCase());
}

export function ProjectBrowser({ projects }: ProjectBrowserProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filteredProjects = useMemo(
    () => projects.filter((project) => projectMatchesFilter(project, filter)),
    [filter, projects],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-bold transition",
              item === filter
                ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                : "border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-accent",
            )}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm shadow-foreground/5"
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <div
                className={cn(
                  "relative h-56 overflow-hidden bg-gradient-to-br",
                  projectVisuals[project.slug] ?? projectVisuals.infinityai,
                )}
              >
                <div className="absolute inset-x-8 top-8 h-32 rounded-2xl border border-white/25 bg-black/20 shadow-2xl backdrop-blur-sm">
                  <div className="flex gap-2 border-b border-white/15 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-red-300" />
                    <span className="h-2 w-2 rounded-full bg-yellow-300" />
                    <span className="h-2 w-2 rounded-full bg-green-300" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 p-4">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-4 rounded bg-white/25"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black">{project.title}</h2>
                  <span className="mt-1 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                    {categoryLabels[project.slug] ?? project.category}
                  </span>
                </div>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <Link
                  href={project.liveUrl}
                  className="rounded-full border border-border px-4 py-2 text-xs font-bold hover:border-accent/50 hover:text-accent"
                >
                  Live Demo
                </Link>
                <Link
                  href={project.githubUrl}
                  className="rounded-full border border-border px-4 py-2 text-xs font-bold hover:border-accent/50 hover:text-accent"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
