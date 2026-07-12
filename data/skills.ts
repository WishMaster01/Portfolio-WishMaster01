import type { SkillGroup } from "@/types/skill";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description:
      "Building responsive, accessible, component-driven interfaces with strong route and state boundaries.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend-ready architecture",
    description:
      "Structuring applications so APIs, authentication, persistence, and validation can be added without rewrites.",
    skills: ["Route Handlers", "Node.js", "Prisma", "PostgreSQL", "Zod"],
  },
  {
    title: "Product execution",
    description:
      "Turning product ideas into clear experiences with strong information architecture and practical implementation phases.",
    skills: ["UX Structure", "Case Studies", "SEO", "Accessibility", "Performance"],
  },
  {
    title: "Quality",
    description:
      "Keeping implementation safe through type checks, linting, deterministic builds, and reviewable code boundaries.",
    skills: ["ESLint", "TypeScript Strict Mode", "Build Validation", "Git", "CI-ready Workflow"],
  },
];

export const skillHighlights = [
  "App Router",
  "Server Components",
  "Design Systems",
  "Data Modeling",
  "Commerce UX",
  "Dashboard UX",
  "AI Interfaces",
  "Responsive Layouts",
] as const;
