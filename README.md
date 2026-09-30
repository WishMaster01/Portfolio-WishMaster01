# WishMaster01 — Production Developer Portfolio & Engineering System

An enterprise-grade, recruiter-focused developer portfolio and product showcase built with Next.js 16 (App Router), TypeScript in strict mode, PostgreSQL via Prisma ORM, and grounded AI retrieval.

- **Live URL**: [https://wishmaster01.vercel.app](https://wishmaster01.vercel.app)
- **GitHub**: [https://github.com/WishMaster01](https://github.com/WishMaster01)
- **Architecture Documentation**: [docs/architecture.md](docs/architecture.md)
- **Architecture Decision Records (ADRs)**: [docs/adr/](docs/adr/)

---

## Table of Contents

1. [What This Portfolio Is](#1-what-this-portfolio-is)
2. [Why It Exists](#2-why-it-exists)
3. [Technology Stack](#3-technology-stack)
4. [System Architecture](#4-system-architecture)
5. [Database Architecture & Persistence](#5-database-architecture--persistence)
6. [Authentication, Sessions & RBAC](#6-authentication-sessions--rbac)
7. [AI, Grounded RAG & Search Intelligence](#7-ai-grounded-rag--search-intelligence)
8. [Production Algorithms & Data Structures](#8-production-algorithms--data-structures)
9. [Automated Testing & Quality Gates](#9-automated-testing--quality-gates)
10. [Performance & Core Web Vitals](#10-performance--core-web-vitals)
11. [Observability, Structured Logging & Health Probes](#11-observability-structured-logging--health-probes)
12. [Deployment & CI/CD Pipeline](#12-deployment--cicd-pipeline)
13. [Flagship Project Case Studies](#13-flagship-project-case-studies)
14. [Engineering Decisions (ADRs)](#14-engineering-decisions-adrs)
15. [Local Development](#15-local-development)
16. [Environment Variables](#16-environment-variables)

---

## 1. What This Portfolio Is

This repository is a production multi-page engineering product that showcases WishMaster01 as a senior full-stack and AI software engineer. Rather than serving as a static landing page or toy demo, it functions as a fully typed, observable, and secure web application with 113 statically pre-rendered and dynamic routes, server-side validation, role-based access controls, and diagnostic telemetry.

---

## 2. Why It Exists

Most developer portfolios contain hardcoded templates, non-functional forms, exaggerated metrics, and mock features. This portfolio was engineered to meet high standards of software craft:
- **Demonstrable Engineering Depth**: Real architectural trade-offs, system component diagrams, and scaling strategies documented for every flagship project.
- **Recruiter Utility**: Dedicated Recruiter Mode (`/recruiter`), automated resume parsing, interactive DSA showcase, and direct developer contact channels.
- **Zero Hallucination AI**: A grounded hybrid RAG assistant that answers questions accurately from verified portfolio documents while repelling adversarial prompt-injection attacks.

---

## 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16 (App Router), React 19, TypeScript 5 (Strict Mode) |
| **Styling & Motion** | Tailwind CSS v4, Framer Motion, next-themes (Light / Dark / System) |
| **Database & ORM** | PostgreSQL, Prisma ORM 7.8 with `@prisma/adapter-pg` |
| **Caching & Redis** | Unified `CacheClient` (Upstash REST Redis with automatic in-memory TTL/LRU fallback) |
| **Search & AI RAG** | BM25 Lexical Engine, 256-dim Dense Vector Feature Hashing, OpenRouter, Google Gemini |
| **Testing** | Node 24 Native Test Runner (`node:test`, `node:assert`), Playwright E2E |
| **Observability** | Structured JSON Logger with automatic PII / Secret Sanitization, Health Probes |
| **CI/CD & DevOps** | GitHub Actions Pipeline (Lint -> Typecheck -> Unit -> Integration -> Build -> E2E) |

---

## 4. System Architecture

Detailed blueprint available in [docs/architecture.md](docs/architecture.md).

```mermaid
flowchart TD
    Client["Browser / Visitor"] --> Edge["Next.js Edge & CSP Middleware"]
    Edge --> AppRouter["App Router (113 SSG / ISR / Dynamic Routes)"]
    
    subgraph "Server Boundaries & Services"
        AppRouter --> AuthGuard["Session & RBAC Guards (USER | RECRUITER | ADMIN)"]
        AppRouter --> ApiHandlers["Route Handlers (Zod Validation)"]
        ApiHandlers --> Logger["Structured Observability (PII Scrubbing)"]
        ApiHandlers --> CacheLayer["Cache Client (Redis / In-Memory LRU)"]
        ApiHandlers --> RepoLayer["Prisma Repositories (PostgreSQL)"]
        ApiHandlers --> RAGEngine["Hybrid RAG (BM25 + Dense Vectors)"]
    end
    
    subgraph "External Providers"
        RAGEngine --> LLMs["AI Providers (OpenRouter -> Gemini -> Grounded Engine)"]
        CacheLayer --> PlatformAPIs["GitHub & LeetCode APIs (1-hr ISR Cache)"]
    end
```

---

## 5. Database Architecture & Persistence

Authoritative persistence managed via PostgreSQL and Prisma schema (`prisma/schema.prisma`):
- `model User`: Cryptographic scrypt password hash, unique email, role-based identity (`USER`, `RECRUITER`, `ADMIN`).
- `model Session`: Database-backed sessions with 64-character random tokens and indexed expiration dates.
- `model Project`: Flagship projects with structured JSON architecture, components, decisions, milestones, and metrics.
- `model BlogPost`: Technical writing with categories, tags, view counters, and published dates.
- `model ContactSubmission`: Inbound inquiries with spam detection and status tracking (`NEW`, `READ`, `ARCHIVED`).
- `model NewsletterSubscription`: Opt-in email subscription with explicit consent verification.

See [ADR-001: PostgreSQL as Primary Persistence Source of Truth](docs/adr/ADR-001-postgresql-source-of-truth.md).

---

## 6. Authentication, Sessions & RBAC

- **Password Hashing**: Node `crypto.scryptSync` with unique 16-byte cryptographic salts and `timingSafeEqual` comparison.
- **HTTP-Only Cookies**: Session tokens stored in `auth_session` cookies with `HttpOnly`, `SameSite=Lax`, and `Secure` attributes.
- **Server-Side RBAC**: Mutation endpoints (`/api/admin/blog`, `/api/admin/projects`) verify user credentials strictly on the server; unauthenticated requests receive HTTP 401 Unauthorized.

See [ADR-002: Server-Side Cryptographic Sessions and RBAC](docs/adr/ADR-002-rbac-and-session-auth.md).

---

## 7. AI, Grounded RAG & Search Intelligence

Detailed documentation in [server/chat/README.md](server/chat/README.md).
- **Hybrid Fusion**: Combines normalized BM25 lexical scores ($0.45$), dense semantic cosine similarity ($0.40$), and tag/domain metadata boosts ($0.15$).
- **Perimeter Defense**: Intercepts instruction overrides (`"ignore instructions"`), DAN jailbreaks, system prompt exfiltration, and delimiter tampering before invoking remote LLMs.
- **Strict Grounding**: System prompts isolate retrieved reference knowledge inside `<portfolio_context>` tags and enforce anti-hallucination refusals.
- **Evaluation Benchmark**: Evaluated via `npm run eval:ai` (16/16 test cases passing, 100% recall@3, <1ms retrieval latency).

See [ADR-003: Deterministic Hybrid RAG Retrieval Engine](docs/adr/ADR-003-hybrid-rag-retrieval.md).

---

## 8. Production Algorithms & Data Structures

Algorithms are integrated directly into functional application workflows:
- **LRU & LFU Caches**: In-memory caching for query results, rate-limiting states, and theme preferences (`lib/algorithms/lru-cache.ts`, `lib/algorithms/lfu-cache.ts`).
- **Priority Queue**: Min and max binary heaps used for candidate ranking and event sorting (`lib/algorithms/priority-queue.ts`).
- **Prefix Trie**: $O(L)$ prefix lookup powering the global Command Palette (`lib/algorithms/text-search.ts`).
- **Levenshtein Distance**: Dynamic programming edit-distance calculation for fuzzy search (`lib/algorithms/text-search.ts`).
- **Jaccard & Cosine Similarity**: Vector similarity and set-intersection metrics for related content recommendation (`lib/algorithms/jaccard-similarity.ts`, `lib/algorithms/vector-similarity.ts`).
- **Binary Search & Bounds**: Logarithmic $O(\log n)$ search, lower-bound, and upper-bound implementations (`lib/algorithms/binary-search.ts`).

---

## 9. Automated Testing & Quality Gates

The repository features comprehensive automated test coverage without third-party test bloat:

```bash
# Run unit & API integration test suite (75 tests)
npm test

# Run unit tests only
npm run test:unit

# Run API integration tests only
npm run test:integration

# Run AI RAG benchmark harness (16 benchmark tests)
npm run eval:ai

# Run Playwright E2E suite
npm run test:e2e
```

---

## 10. Performance & Core Web Vitals

- **Static Generation (SSG)**: 113 routes pre-rendered at build time with zero server delay.
- **Dynamic Module Splitting**: Heavy interactive components (Mermaid renderer, code editors, chat drawer) loaded dynamically via `next/dynamic`.
- **Accessibility & Reduced Motion**: WCAG 2.2 AA compliant focus rings (`:focus-visible`) and `@media (prefers-reduced-motion: reduce)` animation bypasses configured in `app/globals.css`.

---

## 11. Observability, Structured Logging & Health Probes

- **Structured JSON Logging**: Standard JSON records emitted with `timestamp`, `level`, `route`, `method`, `status`, `latencyMs`, and error traces (`lib/server/logger.ts`).
- **Automatic PII Redaction**: Sensitive attributes (`password`, `token`, `secret`, `authorization`, `cookie`, `apiKey`) are automatically scrubbed and masked.
- **Health Probes**:
  - `GET /api/health/live`: Liveness check reporting uptime and process health.
  - `GET /api/health/ready`: Readiness check verifying PostgreSQL database connectivity and memory limits.

See [ADR-005: Structured JSON Observability and Health Probes](docs/adr/ADR-005-observability-and-health.md).

---

## 12. Deployment & CI/CD Pipeline

A production GitHub Actions workflow (`.github/workflows/ci.yml`) runs on all pushes and PRs to `main`:
1. Dependency installation (`npm ci`)
2. Prisma Client generation (`npx prisma generate`)
3. Linting (`npm run lint` — 0 errors, 0 warnings)
4. TypeScript validation (`npm run typecheck` — 0 errors)
5. Automated test suite (`npm test` — 75/75 passing)
6. AI benchmark harness (`npm run eval:ai` — 16/16 passing)
7. Next.js production build (`npm run build` — 113/113 routes)
8. Playwright E2E suite on Chromium

---

## 13. Flagship Project Case Studies

Each project detail page contains problem analysis, solution architecture, component breakdowns, trade-offs, and metrics:
- **InfinityAI** (`/projects/infinityai`): Modular multimodal AI workspace with credit controls, provider fallback, and streaming completions.
- **ExploreX** (`/projects/explorex`): High-throughput travel discovery platform with geo-spatial filtering and interactive itinerary planning.
- **DailyEssentials** (`/projects/dailyessentials`): E-commerce grocery platform with optimized cart state, inventory locking, and payment workflows.

---

## 14. Engineering Decisions (ADRs)

Key architectural decisions are documented under `docs/adr/`:
- [ADR-001: PostgreSQL via Prisma as Primary Persistence Source of Truth](docs/adr/ADR-001-postgresql-source-of-truth.md)
- [ADR-002: Server-Side Cryptographic Sessions and Role-Based Access Control (RBAC)](docs/adr/ADR-002-rbac-and-session-auth.md)
- [ADR-003: Deterministic Hybrid RAG Retrieval Engine with Strict Grounding](docs/adr/ADR-003-hybrid-rag-retrieval.md)
- [ADR-004: Redis & Distributed Caching Layer with In-Memory Fallback](docs/adr/ADR-004-caching-and-redis-layer.md)
- [ADR-005: Judge0 Execution Controls, Throttling & Priority Queue Scheduling](docs/adr/ADR-005-judge0-execution-controls.md)
- [ADR-006: Structured JSON Observability, PII Scrubbing, and Health Probes](docs/adr/ADR-006-observability-and-health.md)

---

## 15. Local Development

```bash
# 1. Clone repository
git clone https://github.com/WishMaster01/Portfolio-WishMaster01.git
cd Portfolio-WishMaster01

# 2. Setup environment variables
cp .env.example .env.local

# 3. Generate Prisma client & seed database
npm run db:generate
npm run db:seed

# 4. Run development server
npm run dev

# 5. Run tests & typecheck
npm test
npm run typecheck
npm run lint
```

---

## 16. Environment Variables

Create a `.env.local` file referencing the templates in `.env.example`:

```env
# Application Canonical URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# PostgreSQL Database (Neon, Supabase, or local PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"

# Admin Authentication
ADMIN_EMAIL="admin@wishmaster01.com"
ADMIN_PASSWORD="ChooseAStrongAdminPassword123!"

# Distributed Redis Caching (Optional - falls back to high-efficiency in-memory cache)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# AI Providers (Optional - falls back to grounded deterministic RAG engine)
OPENROUTER_API_KEY=""
GEMINI_API_KEY=""

# External Platform Analytics (Optional)
GITHUB_TOKEN=""
GITHUB_USERNAME="WishMaster01"
```

---

## License

This project is open-source under the [MIT License](LICENSE).
