import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type RelatedProjectsProps = {
  projects: Project[];
};

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Related Projects
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-foreground">
          Similar product and engineering patterns
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Ranked with cosine similarity plus Jaccard overlap across stack,
          technologies, and product intent.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.slug} className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-5">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                {project.category}
              </span>
              <h3 className="mt-4 text-xl font-black text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-bold text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-5 inline-flex rounded-full bg-accent px-4 py-2 text-xs font-black text-accent-foreground transition hover:opacity-90"
              >
                Open project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
