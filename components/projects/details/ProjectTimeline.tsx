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
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-5 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Timeline
            </p>
            <h2 className={compact ? "mt-2 text-xl font-black text-foreground" : "mt-2 text-2xl font-black text-foreground"}>
              Project Timeline
            </h2>
          </div>
          <ol className={compact ? "space-y-4" : "grid gap-4 md:grid-cols-3"}>
            {milestones.map((milestone, index) => (
              <li
                key={milestone.label}
                className={
                  compact
                    ? "relative rounded-2xl border border-border bg-background/70 p-4"
                    : "rounded-2xl border border-border bg-background/70 p-5"
                }
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-black text-accent-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-accent">
                      {milestone.date}
                    </p>
                    <h3 className="font-black text-foreground">
                      {milestone.label}
                    </h3>
                  </div>
                </div>
                {!compact ? (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {milestone.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </Reveal>
  );
}
