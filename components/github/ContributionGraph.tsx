import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubContributionDay } from "@/types/github";
import { cn } from "@/lib/utils";

type ContributionGraphProps = {
  days: GitHubContributionDay[];
  totalContributions: number;
};

const levelClasses = [
  "bg-surface-elevated",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
] as const;

export function ContributionGraph({
  days,
  totalContributions,
}: ContributionGraphProps) {
  const visibleDays = days.slice(-168);

  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                Contribution Activity
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Last 24 weeks of coding signals
              </h2>
            </div>
            <p className="text-sm font-black text-accent">
              {totalContributions} yearly contributions
            </p>
          </div>

          <div className="relative mt-6 overflow-x-auto rounded-2xl border border-border bg-background/70 p-4">
            <div className="github-scanline pointer-events-none absolute inset-x-0 top-0 h-12" />
            <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
              {visibleDays.map((day) => (
                <span
                  key={day.date}
                  title={`${day.date}: ${day.count} contributions`}
                  className={cn(
                    "h-3 w-3 rounded-[4px] ring-1 ring-border/60",
                    levelClasses[day.level],
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 text-xs font-bold text-muted-foreground">
            <span>Less</span>
            {levelClasses.map((className, index) => (
              <span
                key={className}
                className={cn("h-3 w-3 rounded-[4px]", className)}
                aria-label={`Contribution intensity ${index}`}
              />
            ))}
            <span>More</span>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
