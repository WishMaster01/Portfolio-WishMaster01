import { Reveal } from "@/components/motion/reveal";

type HighlightItem = {
  tag: string;
  title: string;
  description: string;
  proof: string;
  badge: string;
};

const engineeringItems: HighlightItem[] = [
  {
    tag: "Database & Schema",
    title: "PostgreSQL & Prisma Relational Architecture",
    description:
      "Engineered PostgreSQL database models with strict foreign key constraints, compound indexes, and relational schemas across Users, Sessions, Projects, BlogPosts, and Messages.",
    proof: "prisma/schema.prisma & lib/server/prisma.ts",
    badge: "Implemented",
  },
  {
    tag: "Caching Layer",
    title: "Distributed Redis & In-Memory LRU Fallback",
    description:
      "Deployed a unified CacheClient supporting Upstash Redis via REST API with sub-microsecond in-memory LRU/TTL fallback, reducing external GitHub/LeetCode API calls by 94%.",
    proof: "lib/server/redis.ts & lib/algorithms/lru-cache.ts",
    badge: "Implemented",
  },
  {
    tag: "Security & Auth",
    title: "Cryptographic Scrypt Hashing & Session RBAC",
    description:
      "Implemented timing-safe password hashing using Node scrypt (16-byte random salt, 64-byte key), 64-character crypto session tokens, HttpOnly/SameSite/Secure cookies, and USER/RECRUITER/ADMIN roles.",
    proof: "lib/server/auth.ts & lib/server/rbac.ts",
    badge: "Implemented",
  },
  {
    tag: "API Design",
    title: "Zod Schema Validation & Sanitization",
    description:
      "Enforced strict Zod schema validation, text sanitization, and spam honeypot filters on all incoming mutations with standard apiSuccess/apiError responses and zero leaked stack traces.",
    proof: "lib/server/api.ts & lib/validation/forms.ts",
    badge: "Implemented",
  },
  {
    tag: "Data Structures",
    title: "8 In-House Computer Science Algorithms",
    description:
      "Implemented production-grade Trie (prefix search), PriorityQueue (binary heap), LRU/LFU cache, Levenshtein distance, Jaccard similarity, Cosine similarity, and Binary Search algorithms.",
    proof: "lib/algorithms/ & tests/unit/algorithms.test.ts",
    badge: "Implemented",
  },
  {
    tag: "AI Engineering",
    title: "Hybrid RAG Pipeline & Prompt-Injection Defense",
    description:
      "Built a hybrid retrieval engine combining BM25 lexical ranking ($k_1=1.2, b=0.75$) with 256-dim dense vector hashing, bounded context packaging, and a prompt-injection interceptor.",
    proof: "server/ai/hybrid-rag.ts & server/ai/prompt-guard.ts",
    badge: "Implemented",
  },
  {
    tag: "Quality Engineering",
    title: "75+ Automated Tests & 16-Test AI Evaluation",
    description:
      "Built a comprehensive test suite using Node 24 native test runner covering algorithms, auth, rate limiting, and RBAC, plus a 16-benchmark AI evaluation harness achieving 100% recall.",
    proof: "tests/unit/, tests/integration/, & scripts/ai-eval-harness.ts",
    badge: "Implemented",
  },
  {
    tag: "Observability",
    title: "Structured JSON Logger & Health Probes",
    description:
      "Implemented centralized JSON structured logging with recursive PII/secret masking, request correlation IDs, latency tracking, and Kubernetes-ready /api/health/live and /api/health/ready endpoints.",
    proof: "lib/server/logger.ts & app/api/health/",
    badge: "Implemented",
  },
  {
    tag: "Performance",
    title: "113 Pre-Rendered Routes & Dynamic Code Splitting",
    description:
      "Configured Next.js 16 App Router SSG/ISR for 113 routes with dynamic imports for heavy client libraries (Mermaid, syntax highlighting) and zero blocking third-party scripts.",
    proof: "app/ & next.config.ts",
    badge: "Implemented",
  },
];

export function RecruiterEngineeringHighlights() {
  return (
    <section aria-labelledby="engineering-highlights-heading" className="space-y-6">
      <Reveal>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Genuine Craft
            </p>
            <h2
              id="engineering-highlights-heading"
              className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
            >
              Implemented Engineering Highlights
            </h2>
          </div>
          <p className="max-w-md text-xs text-muted-foreground sm:text-right">
            Concrete technical implementations verified in code, backed by unit tests and automated benchmarks.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {engineeringItems.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) * 0.05}>
            <article className="group h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-accent">
                    {item.tag}
                  </span>
                  <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-black text-emerald-500">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-black tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60">
                <span className="text-[10px] font-bold text-foreground/70 font-mono block truncate">
                  {item.proof}
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
