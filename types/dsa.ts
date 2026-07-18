export type AlgorithmExample = {
  problem: string;
  input: string;
  output: string;
  explanation: string;
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
};

export type PracticeProblem = {
  title: string;
  topicSlug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  pattern: string;
};
