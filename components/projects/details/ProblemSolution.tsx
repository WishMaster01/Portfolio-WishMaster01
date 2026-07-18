import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

type ProblemSolutionProps = {
  problem: string;
  solution: string;
  impact: string;
};

export function ProblemSolution({
  problem,
  solution,
  impact,
}: ProblemSolutionProps) {
  const items = [
    { title: "Problem", body: problem },
    { title: "Solution", body: solution },
    { title: "Impact", body: impact },
  ];

  return (
    <Reveal delay={0.05}>
      <Card className="h-full rounded-[2rem] bg-surface/95 transition hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10">
        <CardContent className="space-y-4 p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Problem → Solution → Impact
          </p>
          {items.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-background/70 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent text-xs font-black text-accent-foreground">
                  {index + 1}
                </span>
                <h2 className="font-black text-foreground">{item.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </Reveal>
  );
}
