import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type LeetCodeDifficultyBreakdownProps = {
  data: LeetCodeDashboardData;
};

export function LeetCodeDifficultyBreakdown({ data }: LeetCodeDifficultyBreakdownProps) {
  const { stats } = data;
  const total = stats.totalSolved || 1;

  const easyPercent = Math.round((stats.easySolved / total) * 100);
  const mediumPercent = Math.round((stats.mediumSolved / total) * 100);
  const hardPercent = Math.round((stats.hardSolved / total) * 100);

  const tiers = [
    {
      label: "Easy",
      solved: stats.easySolved,
      total: stats.easyTotal,
      share: easyPercent,
      color: "text-emerald-500",
      bgBar: "bg-emerald-500",
      badgeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      desc: "Fundamental patterns, arrays, two pointers, and basic recursion",
    },
    {
      label: "Medium",
      solved: stats.mediumSolved,
      total: stats.mediumTotal,
      share: mediumPercent,
      color: "text-amber-500",
      bgBar: "bg-amber-500",
      badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      desc: "Core interview bar: trees, graphs, dynamic programming & heaps",
    },
    {
      label: "Hard",
      solved: stats.hardSolved,
      total: stats.hardTotal,
      share: hardPercent,
      color: "text-rose-500",
      bgBar: "bg-rose-500",
      badgeBg: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      desc: "Complex monotonic stacks, multi-state DP & segment structures",
    },
  ];

  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-500">
                Difficulty Spectrum
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Problem Distribution & Complexity Tiering
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-500">
                {mediumPercent}% Medium Focus
              </span>
            </div>
          </div>

          {/* Combined stacked spectrum bar */}
          <div className="mt-6">
            <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-surface-elevated ring-1 ring-border/60">
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${easyPercent}%` }}
                title={`Easy: ${stats.easySolved} (${easyPercent}%)`}
              />
              <div
                className="h-full bg-amber-500 transition-all duration-700"
                style={{ width: `${mediumPercent}%` }}
                title={`Medium: ${stats.mediumSolved} (${mediumPercent}%)`}
              />
              <div
                className="h-full bg-rose-500 transition-all duration-700"
                style={{ width: `${hardPercent}%` }}
                title={`Hard: ${stats.hardSolved} (${hardPercent}%)`}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Easy ({easyPercent}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium ({mediumPercent}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" /> Hard ({hardPercent}%)
              </span>
            </div>
          </div>

          {/* Tier details cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.label}
                className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-border/80"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-black ${tier.badgeBg}`}>
                    {tier.label}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">
                    {tier.share}% of total
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className={`text-3xl font-black ${tier.color}`}>
                    {tier.solved}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">
                    / {tier.total} on LC
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                  <div
                    className={`h-full rounded-full ${tier.bgBar}`}
                    style={{ width: `${Math.min(100, Math.round((tier.solved / tier.total) * 100 * 5))}%` }}
                  />
                </div>

                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
