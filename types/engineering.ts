export type TestSuiteStatus = "Implemented" | "Partial" | "Planned";

export type TestSuite = {
  type: string;
  tools: string[];
  coverage: string;
  status: TestSuiteStatus;
};

export type PerformanceMetric = {
  metric: string;
  value: string;
  environment: string;
  measuredAt: string;
};

export type ProjectEngineeringData = {
  testingSummary: string;
  testSuites: TestSuite[];
  performance: PerformanceMetric[];
  reliability: string[];
  security: string[];
  monitoring: string[];
  ciCd: string[];
};

export type ProjectEngineering = {
  title: string;
  slug: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  engineering: ProjectEngineeringData;
};
