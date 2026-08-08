import type { SkillGroup } from "@/types/skill";

export const skillMetrics = [
  { value: "20+", label: "Technologies", detail: "Frontend, backend, AI, database, and tooling" },
  { value: "10+", label: "Full-stack builds", detail: "Portfolio, SaaS, commerce, travel, chat, and dashboards" },
  { value: "500+", label: "DSA problems", detail: "Pattern recognition, Java implementations, and optimization" },
  { value: "AI", label: "Product focus", detail: "Chatbots, RAG-ready flows, automations, and SaaS UX" },
] as const;

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    description:
      "Building fast, responsive, accessible interfaces with strong component boundaries and polished interaction states.",
    focus: "Product UI, routing, responsive systems, accessibility",
    level: 90,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    title: "Backend & API Design",
    description:
      "Designing typed API boundaries, validation layers, database-ready services, and clean server-side workflows.",
    focus: "Route Handlers, validation, data access, service structure",
    level: 84,
    skills: ["Node.js", "Express.js", "Next.js APIs", "Zod", "REST APIs", "Socket.io"],
  },
  {
    title: "Database & Data Modeling",
    description:
      "Structuring relational data, Prisma models, seed data, and persistence-ready app architecture.",
    focus: "Schemas, relations, migrations, seed workflows",
    level: 82,
    skills: ["PostgreSQL", "Prisma", "Neon", "MongoDB", "SQL", "Data Modeling"],
  },
  {
    title: "AI Product Engineering",
    description:
      "Creating AI-powered user experiences with structured context, provider fallback, prompt design, and chatbot flows.",
    focus: "Portfolio AI assistant, Gemini/OpenRouter fallback, JSON context",
    level: 80,
    skills: ["AI APIs", "Gemini", "OpenRouter", "Prompting", "RAG-ready Context", "Chat UX"],
  },
  {
    title: "Product & UX Execution",
    description:
      "Turning ideas into clear user journeys with information architecture, visual hierarchy, and practical implementation phases.",
    focus: "Case studies, design systems, conversion-focused layouts",
    level: 86,
    skills: ["UX Structure", "Design Systems", "Case Studies", "SEO", "Accessibility", "Responsive Layouts"],
  },
  {
    title: "Engineering Quality",
    description:
      "Keeping implementation reliable through type checks, linting, build validation, reusable patterns, and maintainable code boundaries.",
    focus: "Type safety, lint discipline, production build readiness",
    level: 88,
    skills: ["ESLint", "TypeScript Strict Mode", "Build Validation", "Git", "Docker", "CI-ready Workflow"],
  },
];

export const skillOverview = [
  { label: "JavaScript", value: 90 },
  { label: "TypeScript", value: 88 },
  { label: "React.js", value: 90 },
  { label: "Next.js", value: 88 },
  { label: "Node.js", value: 84 },
  { label: "PostgreSQL / Prisma", value: 84 },
  { label: "AI Integration", value: 80 },
] as const;

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

export const skillStrengths = [
  {
    title: "Full-stack execution",
    description:
      "Can move from UI to APIs to database schema while keeping the product experience coherent.",
  },
  {
    title: "AI-ready architecture",
    description:
      "Understands structured context, fallback providers, validation, and safe chatbot response flows.",
  },
  {
    title: "Production polish",
    description:
      "Focuses on responsiveness, SEO metadata, loading/error states, accessibility, and build validation.",
  },
  {
    title: "Problem-solving depth",
    description:
      "Uses DSA patterns to reason about complexity, correctness, and edge cases before implementation.",
  },
] as const;

export const learningRoadmap = [
  "Advanced PostgreSQL performance and indexing",
  "Vector search with pgvector for semantic retrieval",
  "Cloud deployment pipelines and observability",
  "System design for SaaS dashboards and AI products",
] as const;

export const skillDependencyNodes = [
  { id: "frontend", label: "Frontend Engineering", weight: 90 },
  { id: "backend", label: "Backend & API Design", weight: 84 },
  { id: "database", label: "Database & Data Modeling", weight: 82 },
  { id: "ai", label: "AI Product Engineering", weight: 80 },
  { id: "product", label: "Product & UX Execution", weight: 86 },
  { id: "quality", label: "Engineering Quality", weight: 88 },
] as const;

export const skillDependencyEdges = [
  { from: "frontend", to: "product", weight: 3 },
  { from: "frontend", to: "quality", weight: 2 },
  { from: "backend", to: "database", weight: 3 },
  { from: "database", to: "ai", weight: 2 },
  { from: "backend", to: "ai", weight: 3 },
  { from: "product", to: "ai", weight: 2 },
  { from: "quality", to: "ai", weight: 1 },
] as const;
