import { buildSearchIndex, searchIndex, tokenize } from "@/lib/algorithms/text-search";
import { cosineSimilarityFromText } from "@/lib/algorithms/vector-similarity";
import { resume } from "@/data/resume";
import type { Project } from "@/types/project";

type ResumeDocument = {
  id: string;
  title: string;
  excerpt: string;
  source: "resume" | "project";
  keywords: string[];
};

function createResumeDocuments(projects: Project[]) {
  const documents: ResumeDocument[] = [
    {
      id: "summary",
      title: "Resume Summary",
      excerpt: resume.summary,
      source: "resume",
      keywords: [...resume.strengths],
    },
    ...resume.strengths.map((strength, index) => ({
      id: `strength-${index}`,
      title: `Strength ${index + 1}`,
      excerpt: strength,
      source: "resume" as const,
      keywords: [strength],
    })),
    ...resume.achievements.map((achievement, index) => ({
      id: `achievement-${index}`,
      title: `Achievement ${index + 1}`,
      excerpt: achievement,
      source: "resume" as const,
      keywords: [achievement],
    })),
    ...resume.certifications.map((certification, index) => ({
      id: `certification-${index}`,
      title: certification.title,
      excerpt: certification.detail,
      source: "resume" as const,
      keywords: [
        certification.title,
        certification.issuer,
        certification.detail,
      ],
    })),
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      title: project.title,
      excerpt: project.summary,
      source: "project" as const,
      keywords: [
        ...project.stack,
        ...project.technologies,
        ...project.highlights,
      ],
    })),
  ];

  const corpus = documents.map((document) => ({
    ...document,
    searchableText: [
      document.title,
      document.excerpt,
      document.keywords.join(" "),
    ].join(" "),
  }));

  return {
    documents: corpus,
    index: buildSearchIndex(
      corpus.map((document) => ({
        id: document.id,
        title: document.title,
        body: document.searchableText,
        keywords: document.keywords,
        payload: document,
      })),
    ),
  };
}

export function analyzeResume(query: string, projects: Project[]) {
  const normalizedQuery = query.trim();
  const { documents, index } = createResumeDocuments(projects);
  const corpusTokens = new Set(
    documents.flatMap((document) => tokenize(document.searchableText)),
  );
  const queryTokens = tokenize(normalizedQuery);
  const ranked = searchIndex(index, normalizedQuery, 4).map((result) => ({
    ...result.item,
    score: result.score,
  }));
  const matchedKeywords = queryTokens.filter(
    (token) =>
      corpusTokens.has(token) ||
      Array.from(corpusTokens).some((candidate) => candidate.startsWith(token)),
  );
  const missingKeywords = queryTokens.filter(
    (token) =>
      !matchedKeywords.includes(token) &&
      !Array.from(corpusTokens).some((candidate) => candidate.includes(token)),
  );
  const score = Math.round(
    ((matchedKeywords.length / Math.max(queryTokens.length, 1)) * 0.45 +
      cosineSimilarityFromText(
        normalizedQuery,
        documents.map((document) => document.searchableText).join(" "),
      ) *
        0.55) *
      100,
  );

  return {
    score,
    matchedKeywords,
    missingKeywords,
    rankedEvidence: ranked,
  };
}
