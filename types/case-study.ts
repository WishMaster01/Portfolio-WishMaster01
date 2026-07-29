export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyPhase = {
  phase: string;
  description: string;
};

export type ProjectCaseStudyData = {
  background: string;
  problem: string;
  targetUsers: string;
  role: string;
  constraints: string[];
  goals: string[];
  process: CaseStudyPhase[];
  outcomes: CaseStudyMetric[];
  lessons: string[];
  futureScope?: string[];
};

export type ProjectCaseStudy = {
  title: string;
  slug: string;
  coverImage: string;
  liveUrl: string;
  githubUrl: string;
  caseStudy: ProjectCaseStudyData;
};
