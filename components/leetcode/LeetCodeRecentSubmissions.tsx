import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { LeetCodeRecentSubmission } from "@/types/leetcode";

type LeetCodeRecentSubmissionsProps = {
  submissions: LeetCodeRecentSubmission[];
};

export function LeetCodeRecentSubmissions({ submissions }: LeetCodeRecentSubmissionsProps) {
  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-500">
              Recent Submissions
            </p>
            <span className="text-xs font-bold text-muted-foreground">
              Accepted Solutions
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Latest LeetCode Problem Solves
          </h2>

          {submissions.length > 0 ? (
            <div className="mt-6 space-y-3">
              {submissions.slice(0, 6).map((sub) => {
                const diffColor =
                  sub.difficulty === "Hard"
                    ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    : sub.difficulty === "Medium"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";

                return (
                  <a
                    key={sub.id}
                    href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-amber-500/5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-foreground transition group-hover:text-amber-500 line-clamp-1">
                        {sub.title}
                      </p>
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${diffColor}`}>
                        {sub.difficulty ?? "Accepted"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Status: <strong className="text-emerald-500">Accepted (AC)</strong></span>
                      <span className="font-medium text-amber-500">Solve problem →</span>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Recent submissions will appear when LeetCode activity is available.
            </p>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}
