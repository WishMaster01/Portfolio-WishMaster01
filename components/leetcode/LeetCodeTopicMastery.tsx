import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { LeetCodeTopicMastery } from "@/types/leetcode";

type LeetCodeTopicMasteryProps = {
  topics: LeetCodeTopicMastery[];
};

export function LeetCodeTopicMasterySection({ topics }: LeetCodeTopicMasteryProps) {
  const visibleTopics = topics.slice(0, 8);

  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-500">
                Pattern Matrix
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Algorithmic Topic Mastery
              </h2>
            </div>
            <a
              href="/engineering"
              className="text-sm font-black text-amber-500 hover:underline"
            >
              Explore In-Repository Algorithms →
            </a>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleTopics.map((topic) => (
              <div
                key={topic.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-1 hover:border-amber-500/40 hover:bg-amber-500/5 hover:shadow-lg hover:shadow-amber-500/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      {topic.difficulty}
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-black text-amber-500">
                      ~{topic.solvedEstimate} Solved
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-black text-foreground transition group-hover:text-amber-500">
                    {topic.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-muted-foreground line-clamp-1">
                    {topic.category}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {topic.patterns.slice(0, 3).map((pattern) => (
                      <span
                        key={pattern}
                        className="rounded-md border border-border/80 bg-surface px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-border/60 pt-3">
                  <p className="text-[10px] font-bold text-muted-foreground">
                    Benchmark: <span className="font-mono text-foreground">{topic.complexity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
