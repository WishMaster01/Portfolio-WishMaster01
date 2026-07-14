import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

type ProblemSolutionProps = {
  problem: string;
  solution: string;
  impact: string;
  compact?: boolean;
};

export function ProblemSolution({
  problem,
  solution,
  impact,
  compact = false,
}: ProblemSolutionProps) {
  const items = compact
    ? [{ title: "Problem Solved", body: problem, icon: "⌘" }]
    : [
    { title: "Problem solved", body: problem },
    { title: "Solution", body: solution },
    { title: "Impact", body: impact },
      ];

  return (
    <Reveal>
      <Card className="h-full rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent
          className={
            compact ? "space-y-4 p-6" : "grid gap-6 p-6 md:grid-cols-3"
          }
        >
          {items.map((item) => (
            <div key={item.title} className="space-y-2">
              <div className="flex items-center gap-3">
                {"icon" in item ? (
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700">
                    {item.icon}
                  </span>
                ) : null}
                <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                {item.body}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </Reveal>
  );
}
