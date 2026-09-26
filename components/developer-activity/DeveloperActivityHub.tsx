"use client";

import { useState } from "react";
import { CombinedPlatformOverview } from "@/components/developer-activity/CombinedPlatformOverview";
import { UnifiedActivityFeed } from "@/components/developer-activity/UnifiedActivityFeed";
import { ContributionGraph } from "@/components/github/ContributionGraph";
import { GitHubOverview } from "@/components/github/GitHubOverview";
import { GitHubSignalPanel } from "@/components/github/GitHubSignalPanel";
import { GitHubStatsCards } from "@/components/github/GitHubStatsCards";
import { LanguageChart } from "@/components/github/LanguageChart";
import { PinnedRepositories } from "@/components/github/PinnedRepositories";
import { RecentActivity } from "@/components/github/RecentActivity";
import { LeetCodeDifficultyBreakdown } from "@/components/leetcode/LeetCodeDifficultyBreakdown";
import { LeetCodeOverview } from "@/components/leetcode/LeetCodeOverview";
import { LeetCodeRecentSubmissions } from "@/components/leetcode/LeetCodeRecentSubmissions";
import { LeetCodeStatsCards } from "@/components/leetcode/LeetCodeStatsCards";
import { LeetCodeTopicMasterySection } from "@/components/leetcode/LeetCodeTopicMastery";
import type {
  DeveloperActivityHubData,
  DeveloperActivityTab,
} from "@/types/developer-activity";

type DeveloperActivityHubProps = {
  data: DeveloperActivityHubData;
};

export function DeveloperActivityHub({ data }: DeveloperActivityHubProps) {
  const [activeTab, setActiveTab] = useState<DeveloperActivityTab>("combined");
  const { github, leetcode, unifiedFeed } = data;

  const tabs: Array<{ id: DeveloperActivityTab; label: string; icon: string; count?: string }> = [
    {
      id: "combined",
      label: "Combined Platform Hub",
      icon: "⚡",
      count: "Unified",
    },
    {
      id: "github",
      label: "GitHub Ecosystem",
      icon: "🐙",
      count: `${github.stats.repositories} Repos`,
    },
    {
      id: "leetcode",
      label: "LeetCode Problem Solving",
      icon: "🧠",
      count: `${leetcode.stats.totalSolved} Solved`,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Filter Tabs Navigation (Segmented Minimalist Control) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-6">
        <div className="inline-flex rounded-full border border-border bg-surface/90 p-1.5 shadow-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition duration-200 sm:px-6 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count && (
                  <span
                    className={`ml-1 hidden rounded-full px-2 py-0.5 text-[10px] font-black sm:inline-block ${
                      isActive
                        ? "bg-accent-foreground/20 text-accent-foreground"
                        : "bg-surface-elevated text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            GitHub: <strong className="text-foreground">{github.dataSource === "live" ? "Live" : "Cached"}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            LeetCode: <strong className="text-foreground">{leetcode.dataSource === "live" ? "Live" : "Snapshot"}</strong>
          </span>
        </div>
      </div>

      {/* Tab 1: Combined Platform View (Spacious, Zero-Crowding Flow) */}
      {activeTab === "combined" && (
        <div className="space-y-12">
          {/* Top Metrics & Dual Full-Width Platform Showcases */}
          <CombinedPlatformOverview data={data} />

          {/* Full-Width DSA Topic & Pattern Matrix */}
          <LeetCodeTopicMasterySection topics={leetcode.topicMastery} />

          {/* Full-Width Unified Chronological Telemetry Stream */}
          <UnifiedActivityFeed feed={unifiedFeed} />
        </div>
      )}

      {/* Tab 2: GitHub Dedicated View */}
      {activeTab === "github" && (
        <div className="space-y-8">
          <GitHubOverview data={github} />
          <GitHubStatsCards stats={github.stats} />
          <GitHubSignalPanel data={github} />

          <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div className="space-y-6">
              <PinnedRepositories repositories={github.pinnedRepositories} />
              <ContributionGraph
                days={github.contributionDays}
                totalContributions={github.stats.contributions}
              />
            </div>

            <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
              <LanguageChart languages={github.languages} />
              <RecentActivity activity={github.recentActivity} />
            </aside>
          </div>
        </div>
      )}

      {/* Tab 3: LeetCode Dedicated View */}
      {activeTab === "leetcode" && (
        <div className="space-y-8">
          <LeetCodeOverview data={leetcode} />
          <LeetCodeStatsCards data={leetcode} />
          <LeetCodeDifficultyBreakdown data={leetcode} />

          <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div className="space-y-6">
              <LeetCodeTopicMasterySection topics={leetcode.topicMastery} />
            </div>

            <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
              <LeetCodeRecentSubmissions submissions={leetcode.recentSubmissions} />
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
