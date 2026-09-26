import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { ContributionGraph } from "@/components/github/ContributionGraph";
import { LeetCodeDifficultyBreakdown } from "@/components/leetcode/LeetCodeDifficultyBreakdown";
import type { DeveloperActivityHubData } from "@/types/developer-activity";

type CombinedPlatformOverviewProps = {
  data: DeveloperActivityHubData;
};

export function CombinedPlatformOverview({ data }: CombinedPlatformOverviewProps) {
  const { github, leetcode, metrics } = data;

  const summaryCards = [
    {
      title: "GitHub Velocity",
      value: metrics.totalCodeContributions,
      suffix: " commits/yr",
      description: `${github.stats.repositories} public repositories across Next.js, Node.js & AI`,
      gradient: "from-accent/20 via-accent/5 to-transparent",
      accent: "text-accent",
    },
    {
      title: "LeetCode Solved",
      value: metrics.totalDsaProblemsSolved,
      suffix: " problems",
      description: `${leetcode.stats.mediumSolved} Medium + ${leetcode.stats.hardSolved} Hard core algorithmic patterns`,
      gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
      accent: "text-amber-500",
    },
    {
      title: "Submission Accuracy",
      value: `${leetcode.stats.acceptanceRate}%`,
      suffix: " accuracy",
      description: "High first-attempt accuracy across competitive algorithmic submissions",
      gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      accent: "text-emerald-500",
    },
    {
      title: "Polyglot Stacks",
      value: "TypeScript & Java",
      suffix: "",
      description: "TypeScript for scalable full-stack web, Java for data structures & algorithms",
      gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
      accent: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-10">
      {/* 1. Top High-Level Metric Cards (Spacious 4-Card Grid) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, idx) => (
          <Reveal key={card.title} delay={idx * 0.05}>
            <Card className="relative overflow-hidden rounded-[2rem] border-border bg-surface/90 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <CardContent className="p-6">
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${card.gradient} blur-2xl`}
                />
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                  {card.title}
                </p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className={`text-3xl font-black sm:text-4xl ${card.accent}`}>
                    {card.value}
                  </span>
                  {card.suffix && (
                    <span className="text-xs font-bold text-muted-foreground">
                      {card.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-2.5 text-xs leading-5 text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* 2. Full-Width GitHub Engineering Section (Spacious, Uncrowded) */}
      <div className="space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between px-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                  Platform 01 • Codebase Architecture
                </p>
              </div>
              <h2 className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
                GitHub Engineering &amp; Repository Velocity
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                {github.dataSource === "live" ? "Live GitHub Sync" : "Verified Snapshot"}
              </span>
              <a
                href={github.profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black text-accent hover:underline sm:text-sm"
              >
                github.com/{github.profile.username} ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Full-width Contribution Heatmap */}
        <ContributionGraph
          days={github.contributionDays}
          totalContributions={github.stats.contributions}
        />

        {/* Flagship Repositories Grid (Spacious 3-Column Display) */}
        <div className="grid gap-4 md:grid-cols-3">
          {github.pinnedRepositories.slice(0, 3).map((repo, idx) => (
            <Reveal key={repo.name} delay={idx * 0.06}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/90 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-accent">
                      Flagship Repo
                    </span>
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-black text-accent">
                      ★ {repo.stars}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-lg font-black text-foreground transition group-hover:text-accent">
                    {repo.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {repo.language}
                  </span>
                  <span className="font-bold text-accent group-hover:translate-x-0.5 transition-transform">
                    Inspect Code →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 3. Full-Width LeetCode Problem Solving Section (Spacious, Uncrowded) */}
      <div className="space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between px-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-500">
                  Platform 02 • Algorithmic Rigor
                </p>
              </div>
              <h2 className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
                LeetCode Problem Solving &amp; DSA Discipline
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-500">
                {leetcode.dataSource === "live" ? "Live LeetCode Sync" : "Verified Snapshot"}
              </span>
              <a
                href={leetcode.profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black text-amber-500 hover:underline sm:text-sm"
              >
                leetcode.com/u/{leetcode.profile.username} ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Full-width Difficulty Spectrum & Tier Breakdown */}
        <LeetCodeDifficultyBreakdown data={leetcode} />

        {/* Recent Accepted Solutions (Spacious 4-Column Display) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leetcode.recentSubmissions.slice(0, 4).map((sub, idx) => {
            const diffColor =
              sub.difficulty === "Hard"
                ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                : sub.difficulty === "Medium"
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";

            return (
              <Reveal key={sub.id} delay={idx * 0.05}>
                <a
                  href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/90 p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-amber-500/5 hover:shadow-md hover:shadow-amber-500/5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${diffColor}`}>
                        {sub.difficulty ?? "Medium"}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500">
                        Accepted ✓
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-black text-foreground transition group-hover:text-amber-500 line-clamp-1">
                      {sub.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Pattern verified in Java
                    </p>
                  </div>

                  <div className="mt-3 border-t border-border/60 pt-2.5 flex items-center justify-between text-xs font-bold text-amber-500">
                    <span>Solve problem</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* 4. Strategic Engineering Bridge Card */}
      <Reveal>
        <Card className="rounded-[2.25rem] border border-border bg-surface/80 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                Engineering Synergy
              </span>
              <h3 className="mt-2 text-xl font-black text-foreground sm:text-2xl">
                Bridging Full-Stack Systems &amp; Low-Level Algorithm Rigor
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                Most web developers only know framework APIs; competitive programmers often lack full-stack product intuition.
                This portfolio combines both: production SaaS architecture (Next.js 16, PostgreSQL, Prisma, Redis) with 149+ verified algorithm solutions implemented from first principles.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/engineering"
                className="rounded-full bg-accent px-5 py-2.5 text-xs font-black text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent/90 sm:text-sm"
              >
                Inspect 11 In-Repo Algorithms →
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-border bg-background px-5 py-2.5 text-xs font-bold text-foreground transition hover:border-accent/40 sm:text-sm"
              >
                Flagship Case Studies
              </Link>
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
