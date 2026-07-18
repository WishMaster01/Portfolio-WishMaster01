import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubDashboardData } from "@/types/github";

type GitHubSignalPanelProps = {
  data: GitHubDashboardData;
};

export function GitHubSignalPanel({ data }: GitHubSignalPanelProps) {
  const topRepository = data.repositories[0] ?? data.pinnedRepositories[0];
  const topLanguage = data.languages[0];
  const activeRepositories = data.repositories.filter(
    (repo) => !repo.isArchived && !repo.isFork,
  ).length;
  const averageStars =
    data.repositories.length > 0
      ? Math.round((data.stats.stars / data.repositories.length) * 10) / 10
      : 0;

  const signals = [
    {
      label: "Repository Health",
      value: `${activeRepositories}/${data.repositories.length}`,
      detail: "Active public repositories excluding forks and archives",
    },
    {
      label: "Primary Language",
      value: topLanguage?.name ?? "Pending",
      detail: topLanguage
        ? `${topLanguage.percentage}% of detected repository code`
        : "Language aggregation loads after repository data is available",
    },
    {
      label: "Top Ranked Repo",
      value: topRepository?.name ?? "Pending",
      detail: topRepository
        ? `${topRepository.stars} stars, ${topRepository.forks} forks, rank score ${topRepository.rankScore}`
        : "Repository ranking will appear after GitHub data is available",
    },
    {
      label: "Average Stars",
      value: String(averageStars),
      detail: "Stars averaged across fetched public repositories",
    },
  ];

  return (
    <Reveal>
      <Card className="theme-accent-glow overflow-hidden rounded-[2.25rem] border-accent/30 bg-surface/95">
        <CardContent className="relative p-0">
          <div className="github-signal-grid absolute inset-0 opacity-80" />
          <div className="github-scanline absolute inset-x-0 top-0 h-24" />
          <div className="relative grid gap-4 p-4 sm:p-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-5">
            <div className="rounded-[2rem] border border-border bg-background/70 p-4 sm:p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                Runtime Signals
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-foreground sm:text-3xl">
                GitHub telemetry layer
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This panel turns raw GitHub API responses into recruiter-readable
                engineering signals: activity, language distribution, repository
                strength, and codebase health.
              </p>
              <p className="mt-5 rounded-2xl bg-accent/10 px-4 py-3 text-xs font-bold text-accent">
                Last generated: {new Date(data.generatedAt).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {signals.map((signal, index) => (
                <div
                  key={signal.label}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-border bg-background/70 p-3 transition hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/10 sm:p-5"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
                  <p className="relative text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                    Signal {index + 1}
                  </p>
                  <h3 className="relative mt-2 line-clamp-1 text-lg font-black text-foreground sm:text-2xl">
                    {signal.value}
                  </h3>
                  <p className="relative mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
                    {signal.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
