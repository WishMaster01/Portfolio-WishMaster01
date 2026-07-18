import type { PracticeProblem } from "@/types/dsa";

type ProblemListProps = {
  problems: PracticeProblem[];
};

export function ProblemList({ problems }: ProblemListProps) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5">
      <h2 className="text-xl font-black">Related problems</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Use these as read-only practice prompts. Solve them locally or on a
        trusted coding platform.
      </p>
      <div className="mt-5 grid gap-3">
        {problems.map((problem) => (
          <div
            key={problem.title}
            className="rounded-2xl border border-border bg-background/70 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-black">{problem.title}</h3>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-black text-accent">
                {problem.difficulty}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Pattern: {problem.pattern}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
