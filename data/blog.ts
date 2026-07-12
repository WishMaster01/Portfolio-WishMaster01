import type { Article } from "@/types/article";

export const articles: Article[] = [
  {
    slug: "portfolio-architecture-that-scales",
    title: "Portfolio architecture that can scale past a single page",
    excerpt:
      "How route boundaries, typed content, and reusable UI keep a portfolio maintainable as it grows into a product surface.",
    date: "2026-07-12",
    readingTime: "5 min read",
    category: "Architecture",
  },
  {
    slug: "case-studies-with-technical-depth",
    title: "Writing case studies with enough technical depth",
    excerpt:
      "A practical structure for explaining product context, engineering tradeoffs, implementation decisions, and measurable outcomes.",
    date: "2026-07-10",
    readingTime: "4 min read",
    category: "Portfolio",
  },
  {
    slug: "motion-without-interface-noise",
    title: "Motion without interface noise",
    excerpt:
      "Using animation to clarify hierarchy and progression while respecting performance and reduced-motion preferences.",
    date: "2026-07-08",
    readingTime: "3 min read",
    category: "Interface",
  },
];
