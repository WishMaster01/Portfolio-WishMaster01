export type RecruiterProfileData = {
  name: string;
  headline: string;
  summary: string;
  availability: string;
  targetRoles: string[];
  preferredLocations: string[];
  workModes: string[];
  topSkills: string[];
  highlights: string[];
  education: Array<{
    title: string;
    institution: string;
    period: string;
    detail: string;
  }>;
  experienceSummary: Array<{
    title: string;
    period: string;
    summary: string;
  }>;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl?: string;
  email: string;
};

export type RecruiterProject = {
  title: string;
  slug: string;
  shortSummary: string;
  category: string;
  coverImage: string;
  liveUrl: string;
  githubUrl: string;
};

export type RecruiterProfileResult = {
  profile: RecruiterProfileData | null;
  projects: RecruiterProject[];
};

export type RecruiterAnalyticsEvent =
  | "recruiter_page_opened"
  | "recruiter_resume_downloaded"
  | "recruiter_github_clicked"
  | "recruiter_linkedin_clicked"
  | "recruiter_contact_clicked"
  | "recruiter_project_clicked";
