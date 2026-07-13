"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectBrowserProps = {
  projects: Project[];
};

export function ProjectBrowser({ projects }: ProjectBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        category === "All" || project.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [
          project.title,
          project.category,
          project.summary,
          project.role,
          project.stack.join(" "),
          project.highlights.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, projects, query]);

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="space-y-5 p-4 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <label className="sr-only" htmlFor="project-search">
                Search projects
              </label>
              <input
                id="project-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by project, stack, category, or highlight..."
                className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
              />
            </div>
            <Badge variant="secondary">
              {filteredProjects.length} of {projects.length} shown
            </Badge>
          </div>
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            aria-label="Project category filters"
          >
            {categories.map((item) => {
              const isActive = item === category;

              return (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    "whitespace-nowrap rounded-full border border-border px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-surface text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={isActive}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="popLayout">
        {filteredProjects.length ? (
          <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.22 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-semibold">No projects found</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clear the search or choose another category.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
