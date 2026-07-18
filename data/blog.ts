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
  {
    slug: "how-i-built-infinityai",
    title: "How I Built InfinityAI",
    excerpt:
      "A technical case study on designing an AI SaaS platform with modular tools, provider fallback, structured context, and a polished product experience.",
    summary:
      "InfinityAI combines AI chat, content generation, image workflows, document tools, and developer utilities into one SaaS-style interface.",
    date: "2026-07-18",
    readingTime: "10 min read",
    category: "AI",
    image: "/blog/how-i-built-infinityai.png",
    coverImage: "/blog/how-i-built-infinityai.png",
    coverAlt: "Generated futuristic AI SaaS dashboard illustration for InfinityAI",
    author: "WishMaster01",
    tags: ["InfinityAI", "AI SaaS", "Next.js", "OpenRouter", "Gemini"],
    published: true,
    views: 1280,
    content: [
      {
        heading: "Product goal",
        body: [
          "InfinityAI was planned as an all-in-one AI SaaS platform where users can switch between content generation, coding help, image workflows, document utilities, and productivity tools without opening several disconnected apps.",
          "The main engineering goal was to keep the product modular. Every tool should feel native to the same dashboard while still having its own prompt strategy, inputs, output renderer, and usage constraints.",
        ],
        bullets: [
          "Single dashboard for multiple AI workflows.",
          "Reusable tool configuration instead of one-off pages.",
          "Provider fallback so the app remains useful when one AI API fails.",
          "A product UI that feels clear enough for non-technical users.",
        ],
      },
      {
        heading: "System architecture",
        body: [
          "The frontend uses typed tool definitions to render forms, tabs, suggested prompts, and output sections. The backend receives normalized requests, validates them, builds a provider-specific payload, and calls the selected AI model.",
          "For portfolio usage, the same idea powers the AI chatbot: portfolio data is structured as JSON context, relevant records are selected, and the model is instructed to answer only from that context.",
        ],
        code: `type AiTool = {
  id: string;
  title: string;
  category: "chat" | "content" | "image" | "developer";
  promptTemplate: string;
  inputs: Array<{ name: string; label: string; required: boolean }>;
};

async function runAiTool(tool: AiTool, input: Record<string, string>) {
  const prompt = fillTemplate(tool.promptTemplate, input);
  return callPrimaryProvider(prompt).catch(() => callFallbackProvider(prompt));
}`,
        language: "ts",
      },
      {
        heading: "Lessons learned",
        body: [
          "AI apps should not depend on prompt strings alone. They need validation, predictable output formatting, safe fallbacks, and UI states for loading, retries, and partial failures.",
          "The strongest product decision was treating each AI feature as a configurable module. That makes the platform easier to expand without duplicating backend logic.",
        ],
      },
    ],
  },
  {
    slug: "how-ai-trip-planners-work",
    title: "How AI Trip Planners Work",
    excerpt:
      "A practical breakdown of how AI trip planners transform preferences, dates, budget, maps, and recommendations into useful itineraries.",
    summary:
      "AI trip planners combine user preferences, location data, ranking logic, route planning, and generative summaries to produce day-wise travel plans.",
    date: "2026-07-17",
    readingTime: "8 min read",
    category: "AI",
    image: "/blog/ai-trip-planners.png",
    coverImage: "/blog/ai-trip-planners.png",
    coverAlt: "Generated AI trip planner workflow illustration with maps and itinerary cards",
    author: "WishMaster01",
    tags: ["AI", "Travel Tech", "Maps", "Recommendation Systems"],
    published: true,
    views: 940,
    content: [
      {
        heading: "The input layer",
        body: [
          "A trip planner starts with constraints: destination, trip length, budget, interests, travel pace, food preferences, hotel area, and must-visit places. The quality of the itinerary depends heavily on how clearly those inputs are captured.",
          "A good interface should collect enough information to be useful while still allowing quick-start planning with sensible defaults.",
        ],
      },
      {
        heading: "Recommendation and routing",
        body: [
          "After the app understands the traveler, it ranks attractions, restaurants, hotels, and activities. The ranking should consider distance, opening hours, estimated visit duration, price, reviews, and user preferences.",
          "The itinerary is not just a list. It should be route-aware so users do not waste time crossing the city repeatedly.",
        ],
        bullets: [
          "Cluster nearby places into the same day.",
          "Respect opening hours and travel time.",
          "Balance popular places with personalized interests.",
          "Keep buffer time for meals, transport, and unexpected delays.",
        ],
      },
      {
        heading: "Example itinerary generator",
        body: [
          "The simplest implementation can score candidate places, group them by location, and ask the AI model to turn the structured result into a human-readable plan.",
        ],
        code: `const rankedPlaces = places
  .map((place) => ({
    ...place,
    score: interestScore(place, user) - distancePenalty(place, hotel),
  }))
  .sort((a, b) => b.score - a.score);

const dayPlan = clusterByArea(rankedPlaces).slice(0, trip.days);`,
        language: "ts",
      },
    ],
  },
  {
    slug: "authentication-in-full-stack-applications",
    title: "Authentication in Full-Stack Applications",
    excerpt:
      "How modern apps handle login, sessions, protected routes, database users, middleware, and role-based access without leaking security details.",
    summary:
      "Authentication is a system boundary: it touches UI, API routes, cookies, sessions, database records, authorization, and deployment configuration.",
    date: "2026-07-16",
    readingTime: "9 min read",
    category: "Backend",
    image: "/blog/full-stack-authentication.png",
    coverImage: "/blog/full-stack-authentication.png",
    coverAlt: "Generated full-stack authentication architecture illustration",
    author: "WishMaster01",
    tags: ["Authentication", "Security", "Next.js", "Full-Stack"],
    published: true,
    views: 1110,
    content: [
      {
        heading: "Authentication vs authorization",
        body: [
          "Authentication answers who the user is. Authorization answers what that user is allowed to do. Mixing both concerns leads to fragile code and accidental access bugs.",
          "A clean app checks authentication near session loading and checks authorization near protected operations, especially mutations.",
        ],
      },
      {
        heading: "Core flow",
        body: [
          "A common full-stack flow starts with credentials or OAuth, creates a session, stores a secure cookie, checks that cookie in middleware or server components, and protects API routes on the server.",
        ],
        bullets: [
          "Use secure, HTTP-only cookies for session tokens.",
          "Never expose server secrets in client components.",
          "Validate every request body even for authenticated users.",
          "Protect admin APIs with server-side authorization checks.",
        ],
      },
      {
        heading: "Protected route pattern",
        body: [
          "In Next.js, route handlers should reject unauthorized requests before reading or mutating sensitive data.",
        ],
        code: `export async function POST(request: Request) {
  const session = await getSession(request);
  if (!session?.userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  return createProtectedRecord(session.userId, parsed.data);
}`,
        language: "ts",
      },
    ],
  },
  {
    slug: "how-prisma-connects-to-postgresql",
    title: "How Prisma Connects to PostgreSQL",
    excerpt:
      "A clear explanation of Prisma schema files, generated clients, migrations, environment variables, and query execution against PostgreSQL.",
    summary:
      "Prisma gives TypeScript apps a typed database client while PostgreSQL provides durable relational storage, indexing, constraints, and production-grade querying.",
    date: "2026-07-15",
    readingTime: "7 min read",
    category: "Backend",
    image: "/blog/postgres-prisma.png",
    coverImage: "/blog/postgres-prisma.png",
    coverAlt: "Generated PostgreSQL and Prisma schema illustration",
    author: "WishMaster01",
    tags: ["Prisma", "PostgreSQL", "Database", "TypeScript"],
    published: true,
    views: 860,
    content: [
      {
        heading: "The connection chain",
        body: [
          "The connection starts in the Prisma schema. The datasource defines PostgreSQL as the provider and reads the database URL from the environment. Prisma then generates a TypeScript client from the models in the schema.",
          "At runtime, the app imports the Prisma client and sends queries through it. Prisma translates those queries into SQL and returns typed JavaScript objects.",
        ],
      },
      {
        heading: "Schema to client",
        body: [
          "After changing a model, you generate the client and run a migration. This keeps the database structure and TypeScript types aligned.",
        ],
        code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model BlogPost {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  published Boolean  @default(false)
  createdAt DateTime @default(now())
}`,
        language: "prisma",
      },
      {
        heading: "Production notes",
        body: [
          "Production apps should avoid creating many Prisma clients during hot reload or serverless execution. They should also use indexes for common filters and avoid returning unnecessary fields from large tables.",
        ],
      },
    ],
  },
  {
    slug: "razorpay-vs-stripe-integration",
    title: "Razorpay vs Stripe Integration",
    excerpt:
      "A developer-focused comparison of checkout flows, webhooks, verification, subscriptions, refunds, and implementation tradeoffs.",
    summary:
      "Payment integrations are less about rendering a checkout button and more about reliable server-side verification, webhook handling, and clean order state management.",
    date: "2026-07-14",
    readingTime: "8 min read",
    category: "Payments",
    image: "/blog/razorpay-vs-stripe.png",
    coverImage: "/blog/razorpay-vs-stripe.png",
    coverAlt: "Generated payment gateway integration architecture illustration",
    author: "WishMaster01",
    tags: ["Payments", "Razorpay", "Stripe", "Webhooks", "SaaS"],
    published: true,
    views: 730,
    content: [
      {
        heading: "What both integrations need",
        body: [
          "Both payment providers require the same core discipline: create payment intent/order on the server, verify the payment on the server, update order state in the database, and listen to webhooks for asynchronous confirmation.",
          "The frontend should never be the source of truth for a completed payment.",
        ],
      },
      {
        heading: "Implementation tradeoffs",
        body: [
          "Razorpay is commonly chosen for Indian payment methods and local checkout expectations. Stripe is often selected for global SaaS billing, subscriptions, invoices, and a broader international ecosystem.",
        ],
        bullets: [
          "Use server-created payment records before opening checkout.",
          "Verify signatures for payment callbacks and webhooks.",
          "Store order state transitions: pending, paid, failed, refunded.",
          "Make webhook handlers idempotent to avoid duplicate fulfillment.",
        ],
      },
      {
        heading: "Webhook safety",
        body: [
          "Webhook handlers should verify signatures, check whether the event has already been processed, and only then update database state.",
        ],
        code: `async function handlePaymentWebhook(event: PaymentEvent) {
  verifyWebhookSignature(event);

  const existing = await db.webhookEvent.findUnique({ where: { id: event.id } });
  if (existing) return { ok: true };

  await markOrderPaid(event.orderId);
  await storeWebhookEvent(event);
}`,
        language: "ts",
      },
    ],
  },
  {
    slug: "building-real-time-chat-with-socketio",
    title: "Building Real-Time Chat with Socket.IO",
    excerpt:
      "How to structure rooms, messages, online presence, typing indicators, database persistence, and scaling concerns for real-time chat.",
    summary:
      "Real-time chat needs more than sockets: it needs message persistence, delivery states, room authorization, reconnection behavior, and UI feedback.",
    date: "2026-07-13",
    readingTime: "9 min read",
    category: "Real-Time",
    image: "/blog/socketio-realtime-chat.png",
    coverImage: "/blog/socketio-realtime-chat.png",
    coverAlt: "Generated real-time chat architecture illustration",
    author: "WishMaster01",
    tags: ["Socket.IO", "Real-Time", "Chat", "Node.js", "PostgreSQL"],
    published: true,
    views: 990,
    content: [
      {
        heading: "Core events",
        body: [
          "A chat app usually starts with events like join room, send message, receive message, typing started, typing stopped, read receipt, and user presence changed.",
          "Those events should be small and predictable. Complex business logic belongs on the server, not in the client event handler.",
        ],
      },
      {
        heading: "Persistence and delivery",
        body: [
          "Messages should be saved before broadcasting or saved as part of the same server operation. This prevents users from seeing messages that disappear after refresh.",
        ],
        code: `io.on("connection", (socket) => {
  socket.on("message:create", async (payload) => {
    const message = await db.message.create({
      data: {
        roomId: payload.roomId,
        senderId: socket.data.userId,
        body: payload.body,
      },
    });

    io.to(payload.roomId).emit("message:created", message);
  });
});`,
        language: "ts",
      },
      {
        heading: "Scaling notes",
        body: [
          "For multiple server instances, room state and broadcasts need coordination through an adapter such as Redis. Without that, users connected to different instances may not receive the same events.",
        ],
      },
    ],
  },
  {
    slug: "deploying-nextjs-applications",
    title: "Deploying Next.js Applications",
    excerpt:
      "A production checklist for environment variables, builds, linting, image optimization, metadata, API routes, caching, and deployment monitoring.",
    summary:
      "Deployment is a repeatable engineering process: validate locally, configure environments, build cleanly, ship safely, and monitor the result.",
    date: "2026-07-12",
    readingTime: "7 min read",
    category: "DevOps",
    image: "/blog/deploying-nextjs-apps.png",
    coverImage: "/blog/deploying-nextjs-apps.png",
    coverAlt: "Generated Next.js deployment pipeline illustration",
    author: "WishMaster01",
    tags: ["Next.js", "Deployment", "DevOps", "Production"],
    published: true,
    views: 820,
    content: [
      {
        heading: "Before deployment",
        body: [
          "A production deployment should start with a clean local validation pass. That means linting, TypeScript checking, and a production build before pushing the final source.",
          "Environment variables should be configured separately for local, preview, and production environments.",
        ],
        bullets: [
          "Run lint and TypeScript checks.",
          "Run a production build locally.",
          "Verify required environment variables.",
          "Check metadata, Open Graph images, sitemap, and robots configuration.",
        ],
      },
      {
        heading: "Build checklist",
        body: [
          "Most deployment failures come from missing environment variables, server-only code imported into client components, unsupported dynamic behavior during static rendering, or image/domain configuration issues.",
        ],
        code: `npm run lint
npx tsc --noEmit
npm run build`,
        language: "bash",
      },
      {
        heading: "After deployment",
        body: [
          "After shipping, inspect the deployment logs, test the important routes, submit the contact form, open dynamic project and blog pages, and verify the website on mobile sizes.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const blogCategories = [
  "All",
  ...Array.from(new Set(articles.map((article) => article.category))),
];

export const blogTags = Array.from(
  new Set(articles.flatMap((article) => article.tags)),
).sort((a, b) => a.localeCompare(b));

export function getRelatedArticles(article: Article, limit = 3) {
  return articles
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      item,
      score:
        (item.category === article.category ? 3 : 0) +
        item.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getAdjacentArticles(slug: string) {
  const index = articles.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? articles[index - 1] : null,
    next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : null,
  };
}
