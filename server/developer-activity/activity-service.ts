import { getGitHubDashboard } from "@/server/github/github-service";
import { getLeetCodeDashboard } from "@/server/leetcode/leetcode-service";
import type {
  CombinedPlatformMetrics,
  DeveloperActivityHubData,
  UnifiedActivityItem,
} from "@/types/developer-activity";

export async function getDeveloperActivityHub(): Promise<DeveloperActivityHubData> {
  const [githubResult, leetcodeResult] = await Promise.allSettled([
    getGitHubDashboard(),
    getLeetCodeDashboard(),
  ]);

  const github =
    githubResult.status === "fulfilled"
      ? githubResult.value
      : (await import("@/server/github/github-service")).getGitHubDashboard();

  const leetcode =
    leetcodeResult.status === "fulfilled"
      ? leetcodeResult.value
      : (await import("@/server/leetcode/leetcode-service")).getLeetCodeDashboard();

  const [resolvedGitHub, resolvedLeetCode] = await Promise.all([
    Promise.resolve(github),
    Promise.resolve(leetcode),
  ]);

  // Merge feeds into a single unified chronological stream
  const feed: UnifiedActivityItem[] = [];

  // GitHub items
  resolvedGitHub.recentActivity.forEach((act) => {
    feed.push({
      id: `gh-${act.id}`,
      platform: "github",
      title: act.label,
      subtitle: act.repo,
      timestamp: act.createdAt,
      url: act.url,
      type: act.type,
      badge: "GitHub",
      badgeVariant: "accent",
    });
  });

  // LeetCode items
  resolvedLeetCode.recentSubmissions.forEach((sub) => {
    const timestampMs = Number(sub.timestamp) * 1000;
    const dateStr = !isNaN(timestampMs) && timestampMs > 0
      ? new Date(timestampMs).toISOString()
      : new Date().toISOString();

    const difficulty = sub.difficulty || "Medium";
    const badgeVariant =
      difficulty === "Hard"
        ? "rose"
        : difficulty === "Medium"
          ? "amber"
          : "emerald";

    feed.push({
      id: `lc-${sub.id}`,
      platform: "leetcode",
      title: `Accepted: ${sub.title}`,
      subtitle: `LeetCode Problem • ${difficulty} Difficulty`,
      timestamp: dateStr,
      url: `https://leetcode.com/problems/${sub.titleSlug}/`,
      type: "AcceptedSubmission",
      badge: `LeetCode ${difficulty}`,
      badgeVariant,
    });
  });

  // Sort by timestamp descending
  feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const totalContributions = resolvedGitHub.stats.contributions;
  const totalSolved = resolvedLeetCode.stats.totalSolved;
  const easySolved = resolvedLeetCode.stats.easySolved;
  const mediumSolved = resolvedLeetCode.stats.mediumSolved;
  const hardSolved = resolvedLeetCode.stats.hardSolved;

  const metrics: CombinedPlatformMetrics = {
    totalEngineeringSignals: totalContributions + totalSolved,
    totalCodeContributions: totalContributions,
    totalDsaProblemsSolved: totalSolved,
    totalRepositories: resolvedGitHub.stats.repositories,
    featuredProjectsCount: 5,
    primaryLanguage: "TypeScript & Java",
    problemSolvingRatio: {
      easy: easySolved,
      medium: mediumSolved,
      hard: hardSolved,
    },
    globalLeetCodeRank: resolvedLeetCode.stats.ranking,
    gitHubFollowers: resolvedGitHub.stats.followers,
    gitHubStars: resolvedGitHub.stats.stars,
  };

  return {
    github: resolvedGitHub,
    leetcode: resolvedLeetCode,
    metrics,
    unifiedFeed: feed,
    generatedAt: new Date().toISOString(),
  };
}
