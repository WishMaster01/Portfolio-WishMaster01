export const developerPlatformConfig = {
  github: {
    username: process.env.GITHUB_USERNAME || "WishMaster01",
    profileUrl: "https://github.com/WishMaster01",
    hasToken: Boolean(process.env.GITHUB_TOKEN),
  },
  leetcode: {
    username: process.env.LEETCODE_USERNAME || "WishMaster01",
    profileUrl: "https://leetcode.com/u/WishMaster01/",
  },
} as const;
