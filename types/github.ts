export type GitHubProfile = {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  profileUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
};

export type GitHubRepository = {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  topics: string[];
  isFork: boolean;
  isArchived: boolean;
  pushedAt: string;
  rankScore: number;
};

export type GitHubLanguage = {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
};

export type GitHubContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubActivity = {
  id: string;
  type: string;
  repo: string;
  url: string;
  createdAt: string;
  label: string;
};

export type GitHubDashboardData = {
  profile: GitHubProfile;
  stats: {
    repositories: number;
    followers: number;
    stars: number;
    forks: number;
    languages: number;
    contributions: number;
  };
  repositories: GitHubRepository[];
  pinnedRepositories: GitHubRepository[];
  languages: GitHubLanguage[];
  contributionDays: GitHubContributionDay[];
  recentActivity: GitHubActivity[];
  generatedAt: string;
  rateLimit?: {
    remaining: string | null;
    reset: string | null;
  };
  warning?: string;
};
