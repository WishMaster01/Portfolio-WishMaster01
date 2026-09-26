import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type LeetCodeStatsCardsProps = {
  data: LeetCodeDashboardData;
};

export function LeetCodeStatsCards({ data }: LeetCodeStatsCardsProps) {
  const { stats, languageStats } = data;
  const primaryLang = languageStats[0]?.languageName || "Java";
  const primaryLangCount = languageStats[0]?.problemsSolved || 132;

  const cards = [
    {
      label: "Total Solved",
      value: stats.totalSolved,
      detail: `Out of ${stats.totalQuestions} platform questions`,
      color: "text-amber-500",
      accentBg: "bg-amber-500",
    },
    {
      label: "Easy Solved",
      value: stats.easySolved,
      detail: "Fundamentals & linear structure practice",
      color: "text-emerald-500",
      accentBg: "bg-emerald-500",
    },
    {
      label: "Medium Solved",
      value: stats.mediumSolved,
      detail: "Trees, graphs, sliding window & DP",
      color: "text-amber-500",
      accentBg: "bg-amber-500",
    },
    {
      label: "Hard Solved",
      value: stats.hardSolved,
      detail: "Complex state, monotonic & recursive proofs",
      color: "text-rose-500",
      accentBg: "bg-rose-500",
    },
    {
      label: "Primary DSA Stack",
      value: `${primaryLang}`,
      detail: `${primaryLangCount} verified solutions in ${primaryLang}`,
      color: "text-accent",
      accentBg: "bg-accent",
    },
    {
      label: "Acceptance Rate",
      value: `${stats.acceptanceRate}%`,
      detail: "High submission accuracy on first attempts",
      color: "text-emerald-500",
      accentBg: "bg-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
      {cards.map((card, index) => (
        <Reveal key={card.label} delay={(index % 6) * 0.04}>
          <Card className="group h-full overflow-hidden rounded-3xl bg-surface/95 transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10">
            <CardContent className="relative p-4 sm:p-5">
              <div
                className={`absolute right-0 top-0 h-16 w-16 rounded-bl-full ${card.accentBg}/10 transition group-hover:${card.accentBg}/20 sm:h-20 sm:w-20`}
              />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-border/40">
                <div
                  className={`h-full w-1/2 rounded-full ${card.accentBg} transition duration-500 group-hover:w-full`}
                />
              </div>
              <p className={`relative text-2xl font-black sm:text-3xl ${card.color}`}>
                {card.value}
              </p>
              <p className="relative mt-1 text-sm font-black text-foreground sm:text-base">
                {card.label}
              </p>
              <p className="relative mt-2 hidden text-xs leading-5 text-muted-foreground sm:mt-3 sm:block">
                {card.detail}
              </p>
            </CardContent>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
