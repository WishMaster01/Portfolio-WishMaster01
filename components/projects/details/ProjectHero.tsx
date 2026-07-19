import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

type ProjectHeroProps = {
  project: Project;
};

const projectVisuals: Record<string, string> = {
  infinityai: "from-[#17002f] via-[#6d28d9] to-[#070014]",
  explorex: "from-[#0f766e] via-[#38bdf8] to-[#082f49]",
  dailyessentials: "from-[#7c2d12] via-[#fb923c] to-[#fff7ed]",
  vyvo: "from-[#270044] via-[#a21caf] to-[#3b0764]",
  wishcart: "from-[#041737] via-[#2563eb] to-[#05102a]",
};

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <Reveal>
      <section className="overflow-hidden rounded-[2.25rem] border border-border bg-surface/95 shadow-xl shadow-foreground/5">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(112px,34vw)] gap-0 md:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0 p-4 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge>{project.status}</Badge>
              <Badge variant="secondary">{project.year}</Badge>
              <Badge variant="secondary">{project.timeline}</Badge>
            </div>

            <h1 className="mt-4 text-[clamp(2rem,8vw,3.75rem)] font-black leading-none tracking-[-0.06em] text-foreground sm:mt-6 sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-2 text-base font-black text-accent sm:mt-3 sm:text-xl">
              {project.category}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
              {project.description}
            </p>

            <div className="mt-5 hidden gap-3 sm:grid sm:grid-cols-3 sm:mt-6">
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                  Role
                </p>
                <p className="mt-2 font-black text-foreground">{project.role}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                  Focus
                </p>
                <p className="mt-2 font-black text-foreground">
                  {project.stack[0]}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                  Build Type
                </p>
                <p className="mt-2 font-black text-foreground">{project.status}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-4 py-2.5 text-xs font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent/90 sm:px-5 sm:py-3 sm:text-sm"
              >
                Live Demo →
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background px-4 py-2.5 text-xs font-black text-foreground transition hover:border-accent/40 hover:text-accent sm:px-5 sm:py-3 sm:text-sm"
              >
                GitHub
              </a>
              <Link
                href={`/projects/${project.slug}/case-study`}
                className="rounded-full border border-accent/35 bg-accent/10 px-4 py-2.5 text-xs font-black text-accent transition hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground sm:px-5 sm:py-3 sm:text-sm"
              >
                Full Case Study
              </Link>
              <Link
                href="/contact"
                className="hidden rounded-full border border-border bg-background px-5 py-3 text-sm font-black text-foreground transition hover:border-accent/40 hover:text-accent sm:inline-flex"
              >
                Discuss project
              </Link>
            </div>
          </div>

          <div
            className={`relative min-h-[260px] overflow-hidden bg-gradient-to-br sm:min-h-[360px] ${
              projectVisuals[project.slug] ?? projectVisuals.infinityai
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.26),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.18),transparent_34%)]" />
            <div className="absolute inset-x-3 top-8 rounded-2xl border border-white/25 bg-black/25 p-3 shadow-2xl backdrop-blur-md sm:inset-x-8 sm:top-10 sm:rounded-[2rem] sm:p-5">
              <div className="flex gap-1.5 border-b border-white/15 pb-3 sm:gap-2 sm:pb-4">
                <span className="h-2 w-2 rounded-full bg-red-300 sm:h-3 sm:w-3" />
                <span className="h-2 w-2 rounded-full bg-yellow-300 sm:h-3 sm:w-3" />
                <span className="h-2 w-2 rounded-full bg-green-300 sm:h-3 sm:w-3" />
              </div>
              <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-[1.1fr_0.9fr] sm:gap-5">
                <div className="space-y-2 sm:space-y-3">
                  <span className="block h-3 rounded-full bg-white/75 sm:h-5" />
                  <span className="block h-2.5 w-5/6 rounded-full bg-white/35 sm:h-4" />
                  <span className="block h-2.5 w-3/4 rounded-full bg-white/25 sm:h-4" />
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
                    <span className="h-10 rounded-xl bg-white/20 sm:h-16 sm:rounded-2xl" />
                    <span className="h-10 rounded-xl bg-white/20 sm:h-16 sm:rounded-2xl" />
                  </div>
                </div>
                <div className="hidden rounded-3xl border border-white/20 bg-white/15 p-4 sm:block">
                  <div className="grid gap-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl bg-black/20 p-3 text-white">
                        <p className="text-xl font-black">{metric.value}</p>
                        <p className="text-xs opacity-75">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-3 right-3 flex flex-wrap gap-1.5 sm:bottom-8 sm:left-8 sm:right-8 sm:gap-2">
              {project.stack.slice(0, 5).map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
