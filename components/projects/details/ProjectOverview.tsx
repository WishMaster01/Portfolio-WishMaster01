import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ProjectOverviewProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <Reveal>
      <Card className="h-full rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700">
              ▣
            </span>
            <h2 className="text-xl font-bold text-slate-950">Overview</h2>
          </div>
          <p className="text-sm leading-7 text-slate-600">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.highlights.slice(0, 3).map((highlight) => (
              <Badge key={highlight} variant="secondary">
                {highlight}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
