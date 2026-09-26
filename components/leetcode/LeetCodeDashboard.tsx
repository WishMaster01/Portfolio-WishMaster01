import { LeetCodeDifficultyBreakdown } from "@/components/leetcode/LeetCodeDifficultyBreakdown";
import { LeetCodeOverview } from "@/components/leetcode/LeetCodeOverview";
import { LeetCodeRecentSubmissions } from "@/components/leetcode/LeetCodeRecentSubmissions";
import { LeetCodeStatsCards } from "@/components/leetcode/LeetCodeStatsCards";
import { LeetCodeTopicMasterySection } from "@/components/leetcode/LeetCodeTopicMastery";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type LeetCodeDashboardProps = {
  data: LeetCodeDashboardData;
};

export function LeetCodeDashboard({ data }: LeetCodeDashboardProps) {
  return (
    <div className="space-y-8">
      <LeetCodeOverview data={data} />
      <LeetCodeStatsCards data={data} />
      <LeetCodeDifficultyBreakdown data={data} />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <LeetCodeTopicMasterySection topics={data.topicMastery} />
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <LeetCodeRecentSubmissions submissions={data.recentSubmissions} />
        </aside>
      </div>
    </div>
  );
}
