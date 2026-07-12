export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  status: string;
  role: string;
  timeline: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  highlights: string[];
  metrics: Array<{
    label: string;
    value: string;
  }>;
  sections: Array<{
    title: string;
    body: string;
  }>;
};
