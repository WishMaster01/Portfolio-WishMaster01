import { siteConfig } from "./site";

export const resume = {
  name: "WishMaster01",
  title: "Full-Stack AI & SaaS Developer",
  location: "India / Remote",
  email: "hello@wishmaster01.com",
  phone: "+91 12345 67890",
  github: "https://github.com/WishMaster01",
  linkedin: "https://www.linkedin.com/in/wishmaster01",
  portfolio: siteConfig.url,
  summary:
    "Product-minded full-stack developer focused on Next.js, TypeScript, AI-powered SaaS interfaces, Prisma/PostgreSQL data models, responsive UI systems, and production-ready portfolio/product architecture.",
  strengths: [
    "Next.js App Router implementation",
    "Typed content and data modeling",
    "Reusable UI component systems",
    "Responsive and accessible interfaces",
    "Production build and lint discipline",
  ],
  education: [
    {
      label: "Engineering and product systems",
      detail:
        "Ongoing focused development in TypeScript, React, Next.js, Tailwind CSS, API design, and database-backed application architecture.",
    },
  ],
  achievements: [
    "Built an enterprise-style multi-page portfolio with dynamic project pages, blog articles, DSA guides, command palette, GitHub dashboard, and AI chatbot.",
    "Implemented server-side API routes for projects, blogs, contact, resume, newsletter, DSA topics, Judge0 submissions, and admin-ready CRUD workflows.",
    "Designed Prisma PostgreSQL models, seed workflows, Zod validation, and production-safe server boundaries.",
    "Created responsive theme-aware UI systems with Tailwind CSS and Framer Motion across portfolio, projects, skills, experience, DSA, blog, contact, and resume pages.",
  ],
  certifications: [
    {
      title: "Full-Stack Web Development",
      issuer: "Project-based specialization",
      year: "2026",
      detail:
        "Next.js, React, TypeScript, Node.js APIs, PostgreSQL, Prisma, validation, and deployment workflows.",
    },
    {
      title: "Data Structures & Algorithms in Java",
      issuer: "Self-paced competitive programming practice",
      year: "2025",
      detail:
        "Arrays, linked lists, stacks, queues, trees, graphs, searching, sorting, DP, greedy, backtracking, and bit manipulation.",
    },
    {
      title: "AI Product Engineering",
      issuer: "Portfolio implementation track",
      year: "2026",
      detail:
        "AI chatbot context building, OpenRouter/Gemini fallback, prompt design, and safe server-side provider integration.",
    },
  ],
  resumeFile: "/resume/WishMaster01-Resume.pdf",
} as const;
