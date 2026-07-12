import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full overflow-hidden" id={project.slug}>
      <CardContent className="flex h-full flex-col gap-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="secondary">{project.category}</Badge>
            <h3 className="text-xl font-semibold">{project.title}</h3>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <Link
          href={`/projects#${project.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          View case study
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
