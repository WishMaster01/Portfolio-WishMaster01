import type { ExperienceItem } from "@/types/experience";

export const experienceMetrics = [
  { value: "2+", label: "Years of hands-on building" },
  { value: "10+", label: "Full-stack projects" },
  { value: "5", label: "Major portfolio products" },
  { value: "AI", label: "SaaS-focused direction" },
] as const;

export const experienceItems: ExperienceItem[] = [
  {
    title: "Full-Stack AI & SaaS Developer",
    company: "WishMaster01 Portfolio Ecosystem",
    period: "2026 - Present",
    location: "Remote",
    summary:
      "Designing and implementing an enterprise-style multi-page engineering portfolio with AI chatbot support, project case studies, API routes, Prisma schema, theme systems, and production build validation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma", "Zod", "Gemini/OpenRouter"],
    impact:
      "Built a portfolio foundation that presents projects, resume, blogs, DSA depth, contact workflows, and AI-assisted recruiter Q&A.",
    achievements: [
      "Created a scalable App Router structure with dedicated pages, dynamic project routes, blog pages, API routes, and reusable UI sections.",
      "Implemented a multi-theme design system, command palette, chatbot frontend/backend, and responsive animated layouts.",
      "Added Prisma PostgreSQL models, Zod validation, seed-ready data, SEO metadata, loading/error UI, and production build checks.",
    ],
  },
  {
    title: "Product Interface Engineer",
    company: "Independent Product Builds",
    period: "2025 - 2026",
    location: "Remote",
    summary:
      "Built product concepts across AI, travel discovery, grocery delivery, chat/social apps, commerce platforms, and hiring tools with a focus on clean UX and scalable implementation.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Socket.io", "Stripe", "Cloudinary"],
    impact:
      "Converted multiple project ideas into structured portfolio case studies with clear problem, solution, architecture, challenges, and future scope.",
    achievements: [
      "Modeled InfinityAI, ExploreX, DailyEssentials, Vyvo, and WishCart as detailed project records with dynamic detail pages.",
      "Built reusable card, grid, filter, search, timeline, and project navigation patterns for consistent product presentation.",
      "Focused on accessible, responsive, and theme-aware interfaces that work across desktop, tablet, and mobile screen sizes.",
    ],
  },
  {
    title: "Frontend Systems Builder",
    company: "Learning, R&D, and Open Practice",
    period: "2024 - 2025",
    location: "Remote",
    summary:
      "Developed strong foundations in TypeScript, React, Next.js, Tailwind CSS, DSA, data modeling, component architecture, and engineering quality workflows.",
    stack: ["JavaScript", "TypeScript", "React", "Java", "SQL", "Git", "ESLint"],
    impact:
      "Built the technical base needed to create production-minded applications instead of isolated UI experiments.",
    achievements: [
      "Practiced component decomposition, typed data modeling, page-level architecture, and reusable layout systems.",
      "Strengthened Java DSA fundamentals through arrays, linked lists, stacks, queues, trees, graphs, DP, greedy, and backtracking.",
      "Improved quality discipline with linting, TypeScript checks, build validation, and reviewable file boundaries.",
    ],
  },
];

export const experienceHighlights = [
  "Hands-on experience across frontend, backend, database, AI, and product UI.",
  "Built project pages with clear problem-solving, architecture, screenshots, timelines, and future scope.",
  "Comfortable with Next.js App Router, API routes, Zod validation, Prisma schema design, and PostgreSQL planning.",
  "Strong focus on responsive polish, accessibility, SEO, loading states, error states, and animation quality.",
  "Consistent build discipline through lint, TypeScript checking, and production build verification.",
] as const;

export const education = {
  degree: "B.Tech in Computer Science & Engineering",
  period: "2022 - 2026",
  institution: "Lovely Professional University, Punjab",
  coursework:
    "Data Structures & Algorithms, DBMS, OOPs, Operating Systems, Computer Networks, Software Engineering, Web Engineering",
} as const;

export const workingPrinciples = [
  {
    title: "Structure before visuals",
    description:
      "Define the page hierarchy, data shape, and reusable sections before adding motion or decoration.",
  },
  {
    title: "Typed boundaries",
    description:
      "Keep components, data files, schemas, and API handlers predictable with TypeScript and validation.",
  },
  {
    title: "Production feedback loop",
    description:
      "Use lint, type checking, and builds to catch issues before they become runtime problems.",
  },
] as const;
