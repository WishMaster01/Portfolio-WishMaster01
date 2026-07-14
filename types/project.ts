export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  status: string;
  role: string;
  timeline: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  technologies: string[];
  features: Array<{
    title: string;
    description: string;
  }>;
  architecture: {
    summary: string;
    layers: Array<{
      title: string;
      description: string;
    }>;
  };
  screenshots: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  challenges: Array<{
    title: string;
    description: string;
    resolution: string;
  }>;
  futureScope: string[];
  githubUrl: string;
  liveUrl: string;
  milestones: Array<{
    label: string;
    date: string;
    description: string;
  }>;
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
