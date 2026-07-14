import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="mb-8 flex flex-col gap-6 rounded-[28px] bg-transparent sm:flex-row sm:items-center">
      <div className="grid h-44 w-full shrink-0 place-items-center overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,#7c3aed,transparent_38%),linear-gradient(135deg,#050014,#1e1065)] p-8 shadow-2xl shadow-violet-500/20 sm:w-44">
        <Image
          src={project.screenshots[0]?.image ?? "/window.svg"}
          alt={`${project.title} visual preview`}
          width={112}
          height={112}
          className="h-24 w-24 opacity-80 invert"
          priority
        />
      </div>
      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {project.title}
          </h1>
          <Badge>Featured Project</Badge>
        </div>
        <p className="text-xl font-semibold text-slate-900">{project.category}</p>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.stack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
