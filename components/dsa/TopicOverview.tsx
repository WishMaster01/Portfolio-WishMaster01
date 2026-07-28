import type { AlgorithmTopic } from "@/types/dsa";
import { Card, CardContent } from "@/components/ui/card";
import { ComplexityBadge } from "@/components/dsa/ComplexityBadge";

type TopicOverviewProps = {
  topic: AlgorithmTopic;
};

export function TopicOverview({ topic }: TopicOverviewProps) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-[2rem] border-accent/20 bg-surface/95">
        <CardContent className="relative p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-linear(circle_at_12%_10%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_30%)]" />
          <div className="relative">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                {topic.category}
              </span>
              <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-black text-foreground">
                {topic.difficulty}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              {topic.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              {topic.explanation}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {topic.patterns.map((pattern) => (
                <span
                  key={pattern}
                  className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-bold text-muted-foreground"
                >
                  {pattern}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <ComplexityBadge label="Time" value={topic.timeComplexity} />
        <ComplexityBadge label="Space" value={topic.spaceComplexity} />
      </div>
    </div>
  );
}
