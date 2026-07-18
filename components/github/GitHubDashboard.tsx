import { ContributionGraph } from "@/components/github/ContributionGraph";
import { GitHubOverview } from "@/components/github/GitHubOverview";
import { GitHubSignalPanel } from "@/components/github/GitHubSignalPanel";
import { GitHubStatsCards } from "@/components/github/GitHubStatsCards";
import { LanguageChart } from "@/components/github/LanguageChart";
import { PinnedRepositories } from "@/components/github/PinnedRepositories";
import { RecentActivity } from "@/components/github/RecentActivity";
import { getGitHubDashboard } from "@/server/github/github-service";

export async function GitHubDashboard() {
  const dashboard = await getGitHubDashboard();

  return (
    <div className="space-y-8">
      {dashboard.warning ? (
        <div className="rounded-3xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm font-semibold leading-6 text-accent">
          {dashboard.warning}
        </div>
      ) : null}

      <GitHubOverview data={dashboard} />
      <GitHubStatsCards stats={dashboard.stats} />
      <GitHubSignalPanel data={dashboard} />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <PinnedRepositories repositories={dashboard.pinnedRepositories} />
          <ContributionGraph
            days={dashboard.contributionDays}
            totalContributions={dashboard.stats.contributions}
          />
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <LanguageChart languages={dashboard.languages} />
          <RecentActivity activity={dashboard.recentActivity} />
        </aside>
      </div>
    </div>
  );
}
