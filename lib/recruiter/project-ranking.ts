import { PriorityQueue } from "@/lib/algorithms/priority-queue";

type RankingMetric = {
  label: string;
  value: string;
};

type RecruiterRankingProject = {
  title: string;
  slug: string;
  category: string;
  summary?: string;
  shortSummary?: string;
  impact?: string;
  stack?: string[];
  technologies?: string[];
  highlights?: string[];
  metrics?: RankingMetric[];
};

function extractNumericSignal(value: string) {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function keywordScore(text: string, rules: Array<[RegExp, number]>) {
  return rules.reduce(
    (score, [pattern, value]) => score + (pattern.test(text) ? value : 0),
    0,
  );
}

function scoreProject(project: RecruiterRankingProject) {
  const searchableText = [
    project.title,
    project.category,
    project.shortSummary,
    project.summary,
    project.impact,
    project.stack?.join(" "),
    project.technologies?.join(" "),
    project.highlights?.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const scoreFromKeywords = keywordScore(searchableText, [
    [/\bai\b|\bprompt\b|\bmodel\b|\bchatbot\b/, 5],
    [/\bplatform\b|\barchitecture\b|\bmarketplace\b|\bworkflow\b/, 4],
    [/\bfull-stack\b|\bapi\b|\bpostgresql\b|\bprisma\b|\bsaas\b/, 3],
    [/\bdashboard\b|\banalytics\b|\bcommerce\b|\bcheckout\b/, 2],
    [/\bproduction\b|\bscalable\b|\bsystem\b|\breliable\b/, 2],
  ]);

  const metricScore =
    project.metrics?.reduce(
      (score, metric) => score + Math.min(extractNumericSignal(metric.value), 20) * 0.08,
      0,
    ) ?? 0;

  const stackScore = (project.stack?.length ?? 0) * 0.35;
  const technologyScore = (project.technologies?.length ?? 0) * 0.18;
  const highlightScore = (project.highlights?.length ?? 0) * 0.45;

  return (
    scoreFromKeywords +
    metricScore +
    stackScore +
    technologyScore +
    highlightScore
  );
}

export function rankRecruiterProjects<T extends RecruiterRankingProject>(
  projects: T[],
  limit = 3,
) {
  const queue = new PriorityQueue<{ project: T; score: number }>(
    (left, right) => left.score - right.score,
  );

  for (const project of projects) {
    queue.push({
      project,
      score: scoreProject(project),
    });

    if (queue.size > limit) {
      queue.pop();
    }
  }

  return queue
    .toArray()
    .sort((left, right) => right.score - left.score)
    .map(({ project }) => project);
}
