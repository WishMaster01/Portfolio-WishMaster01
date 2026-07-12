import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "portfolio-platform",
    title: "Portfolio Platform",
    category: "Web Platform",
    year: "2026",
    summary:
      "A multi-page portfolio foundation with route architecture, reusable UI, theme support, and motion boundaries.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    slug: "case-study-system",
    title: "Case Study System",
    category: "Content Architecture",
    year: "2026",
    summary:
      "A structured project presentation model designed to evolve from static data into database-backed editorial workflows.",
    stack: ["App Router", "Prisma-ready", "SEO", "Metadata"],
  },
  {
    slug: "contact-intelligence",
    title: "Contact Intelligence",
    category: "Lead Flow",
    year: "2026",
    summary:
      "A future validated contact pipeline with persistence, spam protection, rate limits, and email notifications.",
    stack: ["Route Handlers", "Zod", "PostgreSQL", "Email"],
  },
];
