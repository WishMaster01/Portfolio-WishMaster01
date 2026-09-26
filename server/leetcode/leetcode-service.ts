import type {
  LeetCodeDashboardData,
  LeetCodeDifficultyStats,
  LeetCodeLanguageStat,
  LeetCodeProfile,
  LeetCodeRecentSubmission,
  LeetCodeTopicMastery,
} from "@/types/leetcode";
import { developerPlatformConfig } from "@/lib/config/developer-platforms";
import { dsaTopics } from "@/data/dsa";

const leetcodeGraphqlUrl = "https://leetcode.com/graphql";
const revalidateSeconds = 3600;

function getUsername(): string {
  return developerPlatformConfig.leetcode.username || "WishMaster01";
}

type LeetCodeGraphqlRaw = {
  data?: {
    matchedUser?: {
      username: string;
      githubUrl?: string | null;
      profile?: {
        ranking: number;
        userAvatar: string;
        realName: string;
        aboutMe: string;
        countryName: string;
        reputation: number;
      };
      submitStatsGlobal?: {
        acSubmissionNum: Array<{
          difficulty: "All" | "Easy" | "Medium" | "Hard";
          count: number;
          submissions: number;
        }>;
      };
      submissionCalendar?: string;
      languageProblemCount?: Array<{
        languageName: string;
        problemsSolved: number;
      }>;
    } | null;
    recentAcSubmissionList?: Array<{
      id: string;
      title: string;
      titleSlug: string;
      timestamp: string;
    }>;
  };
  errors?: Array<{ message: string }>;
};

function getDifficultyForTitle(title: string): "Easy" | "Medium" | "Hard" {
  const lower = title.toLowerCase();
  if (lower.includes("hard") || lower.includes("longest valid parentheses") || lower.includes("trapping rain water") || lower.includes("n-queens")) {
    return "Hard";
  }
  if (lower.includes("score of parentheses") || lower.includes("minimum add") || lower.includes("subarray") || lower.includes("medium")) {
    return "Medium";
  }
  return "Easy";
}

function getFallbackData(username: string): LeetCodeDashboardData {
  const topicMastery: LeetCodeTopicMastery[] = dsaTopics.map((topic) => {
    let count = 12;
    if (topic.title === "Arrays") count = 38;
    else if (topic.title === "Stacks") count = 22;
    else if (topic.title === "Dynamic Programming") count = 18;
    else if (topic.title === "Trees") count = 20;
    else if (topic.title === "Graphs") count = 14;
    else if (topic.title === "Searching") count = 16;
    else if (topic.title === "Sorting") count = 15;
    else if (topic.title === "Linked Lists") count = 12;

    return {
      title: topic.title,
      category: topic.category,
      difficulty: topic.difficulty as "Foundation" | "Intermediate" | "Advanced",
      solvedEstimate: count,
      patterns: topic.patterns,
      complexity: topic.complexity,
      practiceProblems: topic.practice,
    };
  });

  return {
    profile: {
      username,
      realName: "WishMaster01",
      aboutMe:
        "Passionate problem solver specializing in Java and C++ Data Structures & Algorithms. Focused on time-optimal patterns, recursion, dynamic programming, and system scalability.",
      avatarUrl: "https://assets.leetcode.com/users/SUMIT2589/avatar_1733252440.png",
      country: "India",
      ranking: 1174095,
      reputation: 0,
      profileUrl: `https://leetcode.com/u/${username}/`,
      githubUrl: "https://github.com/WishMaster01",
    },
    stats: {
      totalSolved: 149,
      totalQuestions: 3450,
      easySolved: 36,
      easyTotal: 860,
      mediumSolved: 94,
      mediumTotal: 1780,
      hardSolved: 19,
      hardTotal: 810,
      acceptanceRate: 82.8,
      ranking: 1174095,
      reputation: 0,
    },
    difficultyBreakdown: [
      { difficulty: "All", count: 149, submissions: 180 },
      { difficulty: "Easy", count: 36, submissions: 43 },
      { difficulty: "Medium", count: 94, submissions: 116 },
      { difficulty: "Hard", count: 19, submissions: 21 },
    ],
    languageStats: [
      { languageName: "Java", problemsSolved: 132, percentage: 83.5 },
      { languageName: "C++", problemsSolved: 26, percentage: 16.5 },
    ],
    recentSubmissions: [
      {
        id: "2152838946",
        title: "Longest Valid Parentheses",
        titleSlug: "longest-valid-parentheses",
        timestamp: "1790328672",
        difficulty: "Hard",
      },
      {
        id: "2152728500",
        title: "Score of Parentheses",
        titleSlug: "score-of-parentheses",
        timestamp: "1790319238",
        difficulty: "Medium",
      },
      {
        id: "2152692253",
        title: "Minimum Add to Make Parentheses Valid",
        titleSlug: "minimum-add-to-make-parentheses-valid",
        timestamp: "1790316868",
        difficulty: "Medium",
      },
      {
        id: "2152653879",
        title: "Valid Parentheses",
        titleSlug: "valid-parentheses",
        timestamp: "1790314305",
        difficulty: "Easy",
      },
      {
        id: "2152332105",
        title: "Minimum String Length After Removing Substrings",
        titleSlug: "minimum-string-length-after-removing-substrings",
        timestamp: "1790274000",
        difficulty: "Easy",
      },
    ],
    topicMastery,
    submissionCalendar: {},
    generatedAt: new Date().toISOString(),
    dataSource: "cached",
  };
}

export async function getLeetCodeDashboard(): Promise<LeetCodeDashboardData> {
  const username = getUsername();

  const query = `
    query getLeetCodeTelemetry($username: String!) {
      matchedUser(username: $username) {
        username
        githubUrl
        profile {
          ranking
          userAvatar
          realName
          aboutMe
          countryName
          reputation
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        submissionCalendar
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
      recentAcSubmissionList(username: $username, limit: 8) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const response = await fetch(leetcodeGraphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      signal: controller.signal,
      next: {
        revalidate: revalidateSeconds,
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return getFallbackData(username);
    }

    const json = (await response.json()) as LeetCodeGraphqlRaw;
    const user = json.data?.matchedUser;

    if (!user) {
      return getFallbackData(username);
    }

    const rawSubmissions = user.submitStatsGlobal?.acSubmissionNum ?? [];
    const allStat = rawSubmissions.find((s) => s.difficulty === "All") ?? { count: 149, submissions: 180 };
    const easyStat = rawSubmissions.find((s) => s.difficulty === "Easy") ?? { count: 36, submissions: 43 };
    const medStat = rawSubmissions.find((s) => s.difficulty === "Medium") ?? { count: 94, submissions: 116 };
    const hardStat = rawSubmissions.find((s) => s.difficulty === "Hard") ?? { count: 19, submissions: 21 };

    const difficultyBreakdown: LeetCodeDifficultyStats[] = [
      { difficulty: "All", count: allStat.count, submissions: allStat.submissions },
      { difficulty: "Easy", count: easyStat.count, submissions: easyStat.submissions },
      { difficulty: "Medium", count: medStat.count, submissions: medStat.submissions },
      { difficulty: "Hard", count: hardStat.count, submissions: hardStat.submissions },
    ];

    const totalSolved = allStat.count;
    const totalSubmissions = allStat.submissions;
    const acceptanceRate =
      totalSubmissions > 0
        ? Math.round((totalSolved / totalSubmissions) * 1000) / 10
        : 82.8;

    // Language stats
    const rawLanguages = user.languageProblemCount ?? [];
    const totalLangSolved = rawLanguages.reduce((sum, l) => sum + l.problemsSolved, 0);
    const languageStats: LeetCodeLanguageStat[] = rawLanguages.map((l) => ({
      languageName: l.languageName,
      problemsSolved: l.problemsSolved,
      percentage: totalLangSolved > 0 ? Math.round((l.problemsSolved / totalLangSolved) * 1000) / 10 : 0,
    }));

    // Recent submissions
    const recentSubmissions: LeetCodeRecentSubmission[] = (json.data?.recentAcSubmissionList ?? []).map((sub) => ({
      id: sub.id,
      title: sub.title,
      titleSlug: sub.titleSlug,
      timestamp: sub.timestamp,
      difficulty: getDifficultyForTitle(sub.title),
    }));

    // Calendar
    let submissionCalendar: Record<string, number> = {};
    if (user.submissionCalendar) {
      try {
        submissionCalendar = JSON.parse(user.submissionCalendar);
      } catch {
        submissionCalendar = {};
      }
    }

    // Profile
    const profile: LeetCodeProfile = {
      username: user.username,
      realName: user.profile?.realName || "WishMaster01",
      aboutMe:
        user.profile?.aboutMe ||
        "Passionate problem solver specializing in Java and C++ Data Structures & Algorithms. Focused on time-optimal patterns, recursion, dynamic programming, and system scalability.",
      avatarUrl:
        user.profile?.userAvatar ||
        "https://assets.leetcode.com/users/SUMIT2589/avatar_1733252440.png",
      country: user.profile?.countryName || "India",
      ranking: user.profile?.ranking || 1174095,
      reputation: user.profile?.reputation || 0,
      profileUrl: `https://leetcode.com/u/${user.username}/`,
      githubUrl: user.githubUrl || "https://github.com/WishMaster01",
    };

    // Topic mastery mapped with DSA topics from codebase
    const topicMastery: LeetCodeTopicMastery[] = dsaTopics.map((topic) => {
      let count = 12;
      if (topic.title === "Arrays") count = Math.min(38, Math.round(totalSolved * 0.25));
      else if (topic.title === "Stacks") count = Math.min(22, Math.round(totalSolved * 0.15));
      else if (topic.title === "Dynamic Programming") count = Math.min(18, Math.round(totalSolved * 0.12));
      else if (topic.title === "Trees") count = Math.min(20, Math.round(totalSolved * 0.13));
      else if (topic.title === "Graphs") count = Math.min(14, Math.round(totalSolved * 0.1));
      else if (topic.title === "Searching") count = Math.min(16, Math.round(totalSolved * 0.11));
      else if (topic.title === "Sorting") count = Math.min(15, Math.round(totalSolved * 0.1));
      else if (topic.title === "Linked Lists") count = Math.min(12, Math.round(totalSolved * 0.08));

      return {
        title: topic.title,
        category: topic.category,
        difficulty: topic.difficulty as "Foundation" | "Intermediate" | "Advanced",
        solvedEstimate: count,
        patterns: topic.patterns,
        complexity: topic.complexity,
        practiceProblems: topic.practice,
      };
    });

    return {
      profile,
      stats: {
        totalSolved,
        totalQuestions: 3450,
        easySolved: easyStat.count,
        easyTotal: 860,
        mediumSolved: medStat.count,
        mediumTotal: 1780,
        hardSolved: hardStat.count,
        hardTotal: 810,
        acceptanceRate,
        ranking: profile.ranking,
        reputation: profile.reputation,
      },
      difficultyBreakdown,
      languageStats: languageStats.length > 0 ? languageStats : [
        { languageName: "Java", problemsSolved: 132, percentage: 83.5 },
        { languageName: "C++", problemsSolved: 26, percentage: 16.5 },
      ],
      recentSubmissions: recentSubmissions.length > 0 ? recentSubmissions : getFallbackData(username).recentSubmissions,
      topicMastery,
      submissionCalendar,
      generatedAt: new Date().toISOString(),
      dataSource: "live",
    };
  } catch {
    return getFallbackData(username);
  }
}
