import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ProjectTimelineProps = {
  milestones: Project["milestones"];
  compact?: boolean;
};

export function ProjectTimeline({ milestones, compact = false }: ProjectTimelineProps) {
  return (
    <Reveal>
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div>
            <h2 className={compact ? "text-lg font-bold text-slate-950" : "text-2xl font-semibold"}>
              Project Timeline
            </h2>
          </div>
          <ol className={compact ? "space-y-5" : "grid gap-4 md:grid-cols-3"}>
            {milestones.map((milestone) => (
              <li
                key={milestone.label}
                className={
                  compact
                    ? "relative flex gap-4 pl-1"
                    : "rounded-2xl border border-border bg-background p-5"
                }
              >
                {compact ? (
                  <>
                    <span className="mt-1.5 h-3 w-3 rounded-full bg-violet-600 shadow-[0_0_0_5px_rgba(124,58,237,0.12)]" />
                    <div className="flex flex-1 justify-between gap-4 text-sm">
                      <span className="font-medium text-slate-800">
                        {milestone.label}
                      </span>
                      <span className="text-slate-500">{milestone.date}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-accent">
                      {milestone.date}
                    </p>
                    <h3 className="mt-2 font-semibold">{milestone.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {milestone.description}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </Reveal>
  );
}
