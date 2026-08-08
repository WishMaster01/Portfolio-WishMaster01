import { longestCommonSubsequence } from "@/lib/algorithms/dynamic-programming";
import type { GraphEdge } from "@/lib/algorithms/graph-utils";
import { cosineSimilarityFromText } from "@/lib/algorithms/vector-similarity";
import type { Project } from "@/types/project";

function projectTerms(project: Project) {
  return Array.from(
    new Set(
      [...project.stack, ...project.technologies, ...project.highlights].map(
        (item) => item.toLowerCase(),
      ),
    ),
  );
}

function buildProjectText(project: Project) {
  return [
    project.title,
    project.category,
    project.role,
    project.summary,
    project.description,
    project.problem,
    project.solution,
    project.impact,
    project.stack.join(" "),
    project.technologies.join(" "),
    project.highlights.join(" "),
  ].join(" ");
}

function jaccardSimilarity(left: string[], right: string[]) {
  const rightSet = new Set(right);
  const intersection = left.filter((item) => rightSet.has(item)).length;
  const union = new Set([...left, ...right]).size;

  return union === 0 ? 0 : intersection / union;
}

export function compareProjects(primary: Project, secondary: Project) {
  const primaryTerms = projectTerms(primary);
  const secondaryTerms = projectTerms(secondary);
  const commonTechnologies = primaryTerms.filter((term) =>
    secondaryTerms.includes(term),
  );
  const sharedSequence = longestCommonSubsequence(
    primary.stack.map((item) => item.toLowerCase()),
    secondary.stack.map((item) => item.toLowerCase()),
  );
  const cosineSimilarity = cosineSimilarityFromText(
    buildProjectText(primary),
    buildProjectText(secondary),
  );
  const tagSimilarity = jaccardSimilarity(primaryTerms, secondaryTerms);
  const graphWeight = cosineSimilarity * 0.55 + tagSimilarity * 0.45;
  const compatibilityScore =
    cosineSimilarity * 0.45 +
    tagSimilarity * 0.25 +
    Math.min(sharedSequence.length / Math.max(primary.stack.length, 1), 1) *
      0.3;

  return {
    cosineSimilarity,
    tagSimilarity,
    graphWeight,
    compatibilityScore,
    commonTechnologies,
    sharedSequence: sharedSequence.sequence,
  };
}

export function buildProjectSimilarityGraph(projects: Project[]) {
  const edges: GraphEdge[] = [];

  for (let index = 0; index < projects.length; index += 1) {
    for (
      let nextIndex = index + 1;
      nextIndex < projects.length;
      nextIndex += 1
    ) {
      const comparison = compareProjects(projects[index], projects[nextIndex]);

      edges.push({
        from: projects[index].slug,
        to: projects[nextIndex].slug,
        weight: Number((1 - comparison.graphWeight).toFixed(3)),
      });
      edges.push({
        from: projects[nextIndex].slug,
        to: projects[index].slug,
        weight: Number((1 - comparison.graphWeight).toFixed(3)),
      });
    }
  }

  return edges;
}
