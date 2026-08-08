import { PriorityQueue } from "@/lib/algorithms/priority-queue";
import type { Project } from "@/types/project";

function tokenize(text: string) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(Boolean);
}

function termFrequency(tokens: string[]) {
  const counts = new Map<string, number>();

  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  return counts;
}

function cosineSimilarity(left: string[], right: string[]) {
  const leftFrequency = termFrequency(left);
  const rightFrequency = termFrequency(right);
  const vocabulary = new Set([...leftFrequency.keys(), ...rightFrequency.keys()]);

  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (const term of vocabulary) {
    const leftWeight = leftFrequency.get(term) ?? 0;
    const rightWeight = rightFrequency.get(term) ?? 0;

    dotProduct += leftWeight * rightWeight;
    leftMagnitude += leftWeight * leftWeight;
    rightMagnitude += rightWeight * rightWeight;
  }

  if (!leftMagnitude || !rightMagnitude) {
    return 0;
  }

  return dotProduct / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

function jaccardSimilarity(left: string[], right: string[]) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  let intersection = 0;

  for (const item of leftSet) {
    if (rightSet.has(item)) {
      intersection += 1;
    }
  }

  const union = new Set([...leftSet, ...rightSet]).size;
  return union ? intersection / union : 0;
}

function similarityScore(current: Project, candidate: Project) {
  const currentTokens = tokenize(
    [
      current.title,
      current.category,
      current.summary,
      current.description,
      current.problem,
      current.solution,
      current.impact,
      current.stack.join(" "),
      current.technologies.join(" "),
      current.highlights.join(" "),
    ].join(" "),
  );
  const candidateTokens = tokenize(
    [
      candidate.title,
      candidate.category,
      candidate.summary,
      candidate.description,
      candidate.problem,
      candidate.solution,
      candidate.impact,
      candidate.stack.join(" "),
      candidate.technologies.join(" "),
      candidate.highlights.join(" "),
    ].join(" "),
  );

  const cosine = cosineSimilarity(currentTokens, candidateTokens);
  const stackJaccard = jaccardSimilarity(current.stack, candidate.stack);
  const technologyJaccard = jaccardSimilarity(
    current.technologies,
    candidate.technologies,
  );
  const categoryBoost = current.category === candidate.category ? 0.18 : 0;

  return cosine * 0.55 + stackJaccard * 0.25 + technologyJaccard * 0.2 + categoryBoost;
}

export function getRelatedProjects(
  current: Project,
  projects: Project[],
  limit = 3,
) {
  const queue = new PriorityQueue<{ project: Project; score: number }>(
    (left, right) => left.score - right.score,
  );

  for (const project of projects) {
    if (project.slug === current.slug) {
      continue;
    }

    queue.push({
      project,
      score: similarityScore(current, project),
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
