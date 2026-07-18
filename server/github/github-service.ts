import type {
  GitHubActivity,
  GitHubContributionDay,
  GitHubDashboardData,
  GitHubLanguage,
  GitHubProfile,
  GitHubRepository,
} from "@/types/github";

const githubApiBase = "https://api.github.com";
const githubGraphqlUrl = "https://api.github.com/graphql";
const revalidateSeconds = 3600;

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Prisma: "#0c344b",
  SQL: "#336791",
};

type GitHubUserApi = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
};

type GitHubRepoApi = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
  created_at: string;
};

type GitHubEventApi = {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
};

type GitHubPinnedNode = {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  isPrivate: boolean;
  primaryLanguage: { name: string } | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
};

type GitHubGraphqlResponse = {
  data?: {
    user?: {
      pinnedItems: {
        nodes: GitHubPinnedNode[];
      };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

class GitHubApiError extends Error {
  status: number;
  remaining: string | null;
  reset: string | null;

  constructor(message: string, response: Response) {
    super(message);
    this.name = "GitHubApiError";
    this.status = response.status;
    this.remaining = response.headers.get("x-ratelimit-remaining");
    this.reset = response.headers.get("x-ratelimit-reset");
  }
}

function getUsername() {
  return process.env.GITHUB_USERNAME || "WishMaster01";
}

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function githubFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...getHeaders(),
      ...(init?.headers ?? {}),
    },
    next: {
      revalidate: revalidateSeconds,
    },
  });

  if (!response.ok) {
    throw new GitHubApiError(`GitHub request failed: ${response.status}`, response);
  }

  return response.json() as Promise<T>;
}

function rankRepository(repo: GitHubRepoApi) {
  const pushedAt = new Date(repo.pushed_at).getTime();
  const daysSincePush = Number.isFinite(pushedAt)
    ? Math.max(1, (Date.now() - pushedAt) / 86_400_000)
    : 365;
  const recencyBoost = Math.max(0, 90 - daysSincePush) / 10;

  return (
    repo.stargazers_count * 3 +
    repo.forks_count * 2 +
    repo.watchers_count +
    (repo.topics?.length ?? 0) +
    recencyBoost -
    (repo.fork ? 8 : 0) -
    (repo.archived ? 10 : 0)
  );
}

function mapRepository(repo: GitHubRepoApi): GitHubRepository {
  return {
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description ?? "Repository by WishMaster01.",
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    language: repo.language ?? "Unknown",
    topics: repo.topics ?? [],
    isFork: repo.fork,
    isArchived: repo.archived,
    pushedAt: repo.pushed_at,
    rankScore: Math.round(rankRepository(repo)),
  };
}

function mapActivity(event: GitHubEventApi): GitHubActivity {
  const labels: Record<string, string> = {
    PushEvent: "Pushed commits",
    CreateEvent: "Created a repository or branch",
    PullRequestEvent: "Worked on a pull request",
    IssuesEvent: "Updated an issue",
    WatchEvent: "Starred a repository",
    ForkEvent: "Forked a repository",
  };

  return {
    id: event.id,
    type: event.type,
    repo: event.repo.name,
    url: `https://github.com/${event.repo.name}`,
    createdAt: event.created_at,
    label: labels[event.type] ?? event.type.replace(/Event$/, ""),
  };
}

function mapContributionLevel(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function fallbackContributionDays(): GitHubContributionDay[] {
  const today = new Date();

  return Array.from({ length: 84 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (83 - index));

    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0,
    };
  });
}

async function getGitHubGraphqlData(username: string, repositories: GitHubRepository[]) {
  if (!process.env.GITHUB_TOKEN) {
    return {
      pinnedRepositories: repositories.slice(0, 6),
      contributionDays: fallbackContributionDays(),
      totalContributions: 0,
      warning:
        "Add GITHUB_TOKEN to enable pinned repositories and contribution calendar data.",
    };
  }

  const query = `
    query GitHubPortfolioDashboard($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              nameWithOwner
              description
              url
              stargazerCount
              forkCount
              isPrivate
              primaryLanguage {
                name
              }
              repositoryTopics(first: 8) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await githubFetch<GitHubGraphqlResponse>(githubGraphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
      },
    }),
  });

  if (response.errors?.length || !response.data?.user) {
    return {
      pinnedRepositories: repositories.slice(0, 6),
      contributionDays: fallbackContributionDays(),
      totalContributions: 0,
      warning: response.errors?.[0]?.message ?? "GitHub GraphQL profile data was unavailable.",
    };
  }

  const pinnedRepositories = response.data.user.pinnedItems.nodes
    .filter((repo) => !repo.isPrivate)
    .map((repo) => ({
      name: repo.name,
      fullName: repo.nameWithOwner,
      description: repo.description ?? "Pinned GitHub repository.",
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      watchers: repo.stargazerCount,
      language: repo.primaryLanguage?.name ?? "Unknown",
      topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
      isFork: false,
      isArchived: false,
      pushedAt: "",
      rankScore: repo.stargazerCount * 3 + repo.forkCount * 2,
    }));

  const contributionDays =
    response.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap((week) => week.contributionDays)
      .slice(-168)
      .map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: mapContributionLevel(day.contributionCount),
      }));

  return {
    pinnedRepositories:
      pinnedRepositories.length > 0
        ? pinnedRepositories
        : repositories.slice(0, 6),
    contributionDays:
      contributionDays.length > 0 ? contributionDays : fallbackContributionDays(),
    totalContributions:
      response.data.user.contributionsCollection.contributionCalendar
        .totalContributions,
    warning: undefined,
  };
}

export async function getGitHubProfile(): Promise<GitHubProfile> {
  const username = getUsername();
  const user = await githubFetch<GitHubUserApi>(`${githubApiBase}/users/${username}`);

  return {
    username: user.login,
    name: user.name ?? user.login,
    bio: user.bio ?? "Full-stack AI & SaaS Developer.",
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    createdAt: user.created_at,
  };
}

export async function getGitHubRepositories(): Promise<GitHubRepository[]> {
  const username = getUsername();
  const repos = await githubFetch<GitHubRepoApi[]>(
    `${githubApiBase}/users/${username}/repos?per_page=100&sort=updated&type=owner`,
  );

  return repos.map(mapRepository).sort((a, b) => b.rankScore - a.rankScore);
}

export async function getGitHubLanguages(
  repositories?: GitHubRepository[],
): Promise<GitHubLanguage[]> {
  const repos = repositories ?? (await getGitHubRepositories());
  const totals = new Map<string, number>();

  await Promise.all(
    repos
      .filter((repo) => !repo.isFork && !repo.isArchived)
      .slice(0, 30)
      .map(async (repo) => {
        const languages = await githubFetch<Record<string, number>>(
          `${githubApiBase}/repos/${repo.fullName}/languages`,
        );

        Object.entries(languages).forEach(([language, bytes]) => {
          totals.set(language, (totals.get(language) ?? 0) + bytes);
        });
      }),
  );

  const totalBytes = Array.from(totals.values()).reduce((sum, bytes) => sum + bytes, 0);

  return Array.from(totals.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
      color: languageColors[name] ?? "#8b5cf6",
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

export async function getGitHubRecentActivity(): Promise<GitHubActivity[]> {
  const username = getUsername();
  const events = await githubFetch<GitHubEventApi[]>(
    `${githubApiBase}/users/${username}/events/public?per_page=12`,
  );

  return events.map(mapActivity);
}

export async function getGitHubDashboard(): Promise<GitHubDashboardData> {
  try {
    const [profile, repositories, recentActivity] = await Promise.all([
      getGitHubProfile(),
      getGitHubRepositories(),
      getGitHubRecentActivity(),
    ]);
    const [languages, graphData] = await Promise.all([
      getGitHubLanguages(repositories),
      getGitHubGraphqlData(profile.username, repositories),
    ]);

    return {
      profile,
      repositories,
      pinnedRepositories: graphData.pinnedRepositories,
      languages,
      contributionDays: graphData.contributionDays,
      recentActivity,
      generatedAt: new Date().toISOString(),
      warning: graphData.warning,
      stats: {
        repositories: profile.publicRepos,
        followers: profile.followers,
        stars: repositories.reduce((sum, repo) => sum + repo.stars, 0),
        forks: repositories.reduce((sum, repo) => sum + repo.forks, 0),
        languages: languages.length,
        contributions: graphData.totalContributions,
      },
    };
  } catch (error) {
    const username = getUsername();
    const apiError = error instanceof GitHubApiError ? error : null;

    return {
      profile: {
        username,
        name: username,
        bio: "GitHub statistics are temporarily unavailable. Add GITHUB_TOKEN and GITHUB_USERNAME to enable live data.",
        avatarUrl: "",
        profileUrl: `https://github.com/${username}`,
        followers: 0,
        following: 0,
        publicRepos: 0,
        createdAt: new Date().toISOString(),
      },
      repositories: [],
      pinnedRepositories: [],
      languages: [],
      contributionDays: fallbackContributionDays(),
      recentActivity: [],
      generatedAt: new Date().toISOString(),
      warning:
        apiError?.status === 403 && apiError.remaining === "0"
          ? "GitHub API rate limit reached. Add a token or wait until the rate limit resets."
          : "GitHub data could not be loaded right now.",
      rateLimit: apiError
        ? {
            remaining: apiError.remaining,
            reset: apiError.reset,
          }
        : undefined,
      stats: {
        repositories: 0,
        followers: 0,
        stars: 0,
        forks: 0,
        languages: 0,
        contributions: 0,
      },
    };
  }
}
