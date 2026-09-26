import type { GitHubDashboardData } from "@/types/github";
import type { LeetCodeDashboardData } from "@/types/leetcode";

export type DeveloperActivityTab = "combined" | "github" | "leetcode";

export type UnifiedActivityItem = {
  id: string;
  platform: "github" | "leetcode";
  title: string;
  subtitle: string;
  timestamp: string;
  url: string;
  type: string;
  badge: string;
  badgeVariant: "accent" | "emerald" | "amber" | "rose" | "neutral";
};

export type CombinedPlatformMetrics = {
  totalEngineeringSignals: number; // GitHub contributions + LeetCode submissions
  totalCodeContributions: number; // GitHub total contributions (e.g. 137+)
  totalDsaProblemsSolved: number; // LeetCode total solved (e.g. 149+)
  totalRepositories: number;
  featuredProjectsCount: number;
  primaryLanguage: string;
  problemSolvingRatio: {
    easy: number;
    medium: number;
    hard: number;
  };
  globalLeetCodeRank: number;
  gitHubFollowers: number;
  gitHubStars: number;
};

export type DeveloperActivityHubData = {
  github: GitHubDashboardData;
  leetcode: LeetCodeDashboardData;
  metrics: CombinedPlatformMetrics;
  unifiedFeed: UnifiedActivityItem[];
  generatedAt: string;
};
