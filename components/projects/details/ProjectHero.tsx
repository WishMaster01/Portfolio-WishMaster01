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
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{project.status}</Badge>
              <Badge variant="secondary">{project.year}</Badge>
              <Badge variant="secondary">{project.timeline}</Badge>
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-[-0.06em] text-foreground sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-3 text-xl font-black text-accent">
              {project.category}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
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

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-5 py-3 text-sm font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent/90"
              >
                Live Demo →
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background px-5 py-3 text-sm font-black text-foreground transition hover:border-accent/40 hover:text-accent"
              >
                GitHub
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-border bg-background px-5 py-3 text-sm font-black text-foreground transition hover:border-accent/40 hover:text-accent"
              >
                Discuss project
              </Link>
            </div>
          </div>

          <div
            className={`relative min-h-[360px] overflow-hidden bg-gradient-to-br ${
              projectVisuals[project.slug] ?? projectVisuals.infinityai
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.26),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.18),transparent_34%)]" />
            <div className="absolute inset-x-8 top-10 rounded-[2rem] border border-white/25 bg-black/25 p-5 shadow-2xl backdrop-blur-md">
              <div className="flex gap-2 border-b border-white/15 pb-4">
                <span className="h-3 w-3 rounded-full bg-red-300" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-green-300" />
              </div>
              <div className="mt-6 grid grid-cols-[1.1fr_0.9fr] gap-5">
                <div className="space-y-3">
                  <span className="block h-5 rounded-full bg-white/75" />
                  <span className="block h-4 w-5/6 rounded-full bg-white/35" />
                  <span className="block h-4 w-3/4 rounded-full bg-white/25" />
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <span className="h-16 rounded-2xl bg-white/20" />
                    <span className="h-16 rounded-2xl bg-white/20" />
                  </div>
                </div>
                <div className="rounded-3xl border border-white/20 bg-white/15 p-4">
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
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2">
              {project.stack.slice(0, 5).map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-white backdrop-blur"
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
