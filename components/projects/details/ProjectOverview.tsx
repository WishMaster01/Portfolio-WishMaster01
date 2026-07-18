import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ProjectOverviewProps = {
  project: Project;
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <Reveal>
      <Card className="h-full rounded-[2rem] bg-surface/95 transition hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10">
        <CardContent className="space-y-5 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Overview
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              What this project demonstrates
            </h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            {project.summary}
          </p>
          <div className="grid gap-3">
            {project.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-border bg-background/70 p-3 text-sm font-semibold text-foreground"
              >
                {highlight}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
