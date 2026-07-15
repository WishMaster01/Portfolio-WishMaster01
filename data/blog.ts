import type { Article } from "@/types/article";

export const articles: Article[] = [
  {
    slug: "nextjs-architecture-for-scalable-portfolios",
    title: "Next.js architecture for scalable portfolio products",
    excerpt:
      "How to structure App Router pages, typed data, reusable sections, and APIs so a portfolio can grow like a real product.",
    summary:
      "A practical architecture guide for turning a portfolio from a static homepage into a maintainable multi-page product surface.",
    date: "2026-07-15",
    readingTime: "8 min read",
    category: "Web Development",
    image: "/blog/nextjs-architecture.png",
    coverAlt: "Generated 3D illustration of scalable web architecture",
    author: "WishMaster01",
    tags: ["Next.js", "Architecture", "TypeScript", "Portfolio"],
    content: [
      {
        heading: "Why portfolio architecture matters",
        body: [
          "A portfolio that starts as one page often becomes a product: project listings, case studies, blogs, APIs, contact flows, analytics, and admin tooling. If the structure is weak, every new section becomes harder to add.",
          "The better approach is to separate route ownership, data records, reusable UI, validation, and server-side concerns from the beginning.",
        ],
        bullets: [
          "Keep page routes thin and readable.",
          "Move reusable content into typed data files.",
          "Keep API routes validated and isolated from UI components.",
          "Use shared card, button, layout, and motion primitives.",
        ],
      },
      {
        heading: "A practical folder model",
        body: [
          "The App Router works best when each route has clear responsibility. Static marketing pages should consume typed data. Server routes should validate input and return predictable JSON. UI primitives should stay small and composable.",
        ],
        code: `app/
  page.tsx
  about/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  blog/[slug]/page.tsx
components/
  ui/
  layout/
  motion/
data/
  projects.ts
  blog.ts
types/
  project.ts
  article.ts`,
      },
      {
        heading: "What makes it production-ready",
        body: [
          "Production readiness is not only deployment. It includes predictable types, validation, responsive behavior, SEO metadata, accessible navigation, and build checks that run before changes ship.",
        ],
      },
    ],
  },
  {
    slug: "building-ai-portfolio-chatbots-with-rag",
    title: "Building AI portfolio chatbots with RAG-style context",
    excerpt:
      "A simple but strong way to make a recruiter chatbot answer questions about projects, skills, resume, and experience.",
    summary:
      "A practical guide to powering a portfolio chatbot with structured context, retrieval, validation, and provider fallback.",
    date: "2026-07-14",
    readingTime: "9 min read",
    category: "AI",
    image: "/blog/ai-rag-chatbots.png",
    coverAlt: "Generated AI retrieval and chatbot pipeline illustration",
    author: "WishMaster01",
    tags: ["AI", "RAG", "Chatbot", "Gemini", "OpenRouter"],
    content: [
      {
        heading: "Do not train a model for portfolio facts",
        body: [
          "For most portfolios, fine-tuning is unnecessary. The safer implementation is structured context: collect project, skills, resume, and contact data, then pass relevant slices into the model prompt.",
          "This keeps the answers current and avoids teaching a model stale personal data.",
        ],
      },
      {
        heading: "Recommended backend flow",
        body: [
          "A reliable chatbot backend validates input, retrieves relevant records, builds a compact context, calls the primary AI provider, and falls back to a secondary provider if needed.",
        ],
        bullets: [
          "Validate the user message with Zod.",
          "Retrieve relevant portfolio data from typed records or PostgreSQL.",
          "Build a grounded system prompt.",
          "Try OpenRouter first, then Gemini fallback.",
          "Return a short recruiter-friendly answer.",
        ],
      },
      {
        heading: "Prompt grounding pattern",
        body: [
          "The prompt should tell the model what it can answer and what it should avoid. If the answer is not in the portfolio context, the bot should say so and guide the recruiter to contact you.",
        ],
        code: `You are the portfolio assistant for WishMaster01.
Answer using only the provided portfolio context.
If something is unknown, say it is not listed.
Keep answers concise, specific, and recruiter-friendly.`,
      },
    ],
  },
  {
    slug: "postgres-prisma-schema-design-for-saas",
    title: "PostgreSQL and Prisma schema design for SaaS apps",
    excerpt:
      "How to model users, projects, blog posts, contact submissions, and admin-ready CRUD without overengineering too early.",
    summary:
      "A backend-focused breakdown of schema boundaries, validation, migrations, seed data, and safe admin operations.",
    date: "2026-07-13",
    readingTime: "7 min read",
    category: "Backend",
    image: "/blog/postgres-prisma.png",
    coverAlt: "Generated PostgreSQL and Prisma schema illustration",
    author: "WishMaster01",
    tags: ["PostgreSQL", "Prisma", "Schema Design", "SaaS"],
    content: [
      {
        heading: "Start with domain boundaries",
        body: [
          "Good schema design starts by naming the product domains. In a portfolio-SaaS hybrid, those might be projects, blog posts, contact submissions, newsletter subscribers, and admin-managed records.",
        ],
      },
      {
        heading: "Use Prisma as a contract",
        body: [
          "Prisma gives the app a clear contract between database and TypeScript. The schema should be explicit about required fields, unique slugs, timestamps, and JSON fields where content needs flexibility.",
        ],
        code: `model BlogPost {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String
  content     Json
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`,
      },
      {
        heading: "Admin-ready does not mean public-write",
        body: [
          "Admin CRUD should be protected behind server-side checks. Public create flows, like contact forms, need validation, spam prevention, and controlled persistence.",
        ],
        bullets: [
          "Keep admin keys server-side.",
          "Validate every create/update payload.",
          "Seed realistic records for local development.",
          "Avoid exposing raw database errors to users.",
        ],
      },
    ],
  },
  {
    slug: "dsa-patterns-that-improve-problem-solving",
    title: "DSA patterns that improve problem solving",
    excerpt:
      "A practical map of arrays, stacks, queues, trees, graphs, dynamic programming, greedy methods, and bit manipulation.",
    summary:
      "A pattern-first guide to studying data structures and algorithms without memorizing random solutions.",
    date: "2026-07-12",
    readingTime: "6 min read",
    category: "DSA",
    image: "/blog/dsa-patterns.png",
    coverAlt: "Generated data structures and algorithms illustration",
    author: "WishMaster01",
    tags: ["DSA", "Algorithms", "Problem Solving", "Java"],
    content: [
      {
        heading: "Think in patterns, not problems",
        body: [
          "DSA becomes easier when you recognize patterns: sliding window, two pointers, prefix sums, recursion, BFS, DFS, memoization, and greedy choices.",
          "The goal is not to memorize every solution. The goal is to identify the shape of the problem quickly.",
        ],
      },
      {
        heading: "A good study loop",
        body: [
          "Pick one topic, learn the core operations, solve easy patterns, then medium variations. Track mistakes and revisit them after a few days.",
        ],
        bullets: [
          "Arrays: traversal, prefix sums, two pointers.",
          "Stacks: monotonic stack and expression parsing.",
          "Trees: recursion, BFS, DFS, height, path problems.",
          "Graphs: adjacency lists, BFS, DFS, shortest path basics.",
          "DP: state definition, transition, base cases.",
        ],
      },
      {
        heading: "Java example: two pointers",
        body: [
          "Two pointers are useful when a sorted array or pair relationship is involved. The left and right pointers move based on whether the current value is too small or too large.",
        ],
        code: `boolean hasPair(int[] arr, int target) {
  int left = 0, right = arr.length - 1;
  while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return true;
    if (sum < target) left++;
    else right--;
  }
  return false;
}`,
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
