export type LeetCodeDifficultyStats = {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
  submissions: number;
};

export type LeetCodeRecentSubmission = {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: string;
  difficulty?: "Easy" | "Medium" | "Hard";
};

export type LeetCodeLanguageStat = {
  languageName: string;
  problemsSolved: number;
  percentage: number;
};

export type LeetCodeProfile = {
  username: string;
  realName: string;
  aboutMe: string;
  avatarUrl: string;
  country: string;
  ranking: number;
  reputation: number;
  profileUrl: string;
  githubUrl?: string;
};

export type LeetCodeTopicMastery = {
  title: string;
  category: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  solvedEstimate: number;
  patterns: readonly string[];
  complexity: string;
  practiceProblems: readonly string[];
};

export type LeetCodeDashboardData = {
  profile: LeetCodeProfile;
  stats: {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    easyTotal: number;
    mediumSolved: number;
    mediumTotal: number;
    hardSolved: number;
    hardTotal: number;
    acceptanceRate: number;
    ranking: number;
    reputation: number;
  };
  difficultyBreakdown: LeetCodeDifficultyStats[];
  languageStats: LeetCodeLanguageStat[];
  recentSubmissions: LeetCodeRecentSubmission[];
  topicMastery: LeetCodeTopicMastery[];
  submissionCalendar: Record<string, number>;
  generatedAt: string;
  dataSource: "live" | "cached";
};
