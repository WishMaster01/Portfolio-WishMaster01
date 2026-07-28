"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { RecruiterProject } from "@/types/recruiter";
import { trackRecruiterEvent } from "./recruiter-analytics";

type RecruiterProjectGridProps = {
  projects: RecruiterProject[];
};

export function RecruiterProjectGrid({ projects }: RecruiterProjectGridProps) {
  return (
    <section id="projects" aria-labelledby="recruiter-projects-heading">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Top three projects
        </p>
        <h2
          id="recruiter-projects-heading"
          className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl"
        >
          Best evidence of current engineering direction
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <article className="group h-full overflow-hidden rounded-[2rem] border border-border bg-surface/85 shadow-sm shadow-foreground/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
              <div className="relative h-40 overflow-hidden bg-linear-to-br from-accent/20 via-surface-elevated to-background">
                <div className="absolute inset-5 rounded-2xl border border-border/70 bg-background/65 p-4 shadow-xl shadow-foreground/5">
                  <div className="flex gap-1.5 border-b border-border pb-3">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mt-4 grid gap-2">
                    <span className="h-3 rounded-full bg-accent/45" />
                    <span className="h-3 w-4/5 rounded-full bg-foreground/15" />
                    <span className="h-3 w-2/3 rounded-full bg-foreground/10" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                  {project.category}
                </span>
                <h3 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {project.shortSummary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <TrackedProjectLink
                    href={`/projects/${project.slug}`}
                    label="Overview"
                    target={project.slug}
                  />
                  <TrackedProjectLink
                    href={`/projects/${project.slug}/case-study`}
                    label="Case Study"
                    target={`${project.slug}:case-study`}
                  />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TrackedProjectLink({
  href,
  label,
  target,
}: {
  href: string;
  label: string;
  target: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-full border border-border bg-background px-4 py-2 text-xs font-black transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
      onClick={() => trackRecruiterEvent("recruiter_project_clicked", target)}
    >
      {label}
    </Link>
  );
}
