import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";

export function ProjectSection() {
  return (
    <Card className="rounded-3xl bg-surface">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">Projects</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Selected portfolio case studies with production-style structure.
            </p>
          </div>
          <Link href="/projects" className="text-sm font-black text-accent">
            View all projects
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.slice(0, 6).map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="rounded-2xl border border-border bg-background/70 p-5 transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-black">{project.title}</h3>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-black text-accent">
                  {project.category}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] font-bold text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
