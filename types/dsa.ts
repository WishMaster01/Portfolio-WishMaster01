export type AlgorithmExample = {
  problem: string;
  input: string;
  output: string;
  explanation: string;
};

export type AlgorithmCodeExample = {
  language: "Java" | "Python" | "JavaScript" | "TypeScript";
  code: string;
};

export type AlgorithmTopic = {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  explanation: string;
  visualExplanation: string;
  javaCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  useCases: string[];
  relatedProblems: string[];
  patterns: string[];
  recognition: string[];
  approach: string[];
  example: AlgorithmExample;
  pitfalls: string[];
  advantages: string[];
  disadvantages: string[];
  interviewQuestions: string[];
  faangCompanies: string[];
  productionUsage: string[];
  codeExamples: AlgorithmCodeExample[];
};

export type PracticeProblem = {
  title: string;
  topicSlug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  pattern: string;
};
