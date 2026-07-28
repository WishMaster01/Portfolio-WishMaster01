import type { ProjectEngineeringData } from "@/types/engineering";

/** Measured from `npm run build` on the portfolio codebase — not invented Web Vitals. */
const portfolioBuildMetrics: ProjectEngineeringData["performance"] = [
  {
    metric: "Production compile",
    value: "11.1 s",
    environment: "Local Next.js 16 production build",
    measuredAt: "2026-07-28",
  },
  {
    metric: "TypeScript check",
    value: "18.3 s",
    environment: "Local Next.js 16 production build",
    measuredAt: "2026-07-28",
  },
  {
    metric: "Static pages generated",
    value: "82",
    environment: "Local Next.js 16 production build",
    measuredAt: "2026-07-28",
  },
];

const sharedValidationPipeline = [
  "ESLint via eslint-config-next",
  "TypeScript strict mode (`tsc --noEmit`)",
  "Next.js production build",
  "Manual pre-deploy validation documented in README",
];

const sharedMonitoring = [
  "Structured server logs on API routes",
  "Health endpoint at `/api/health`",
  "Graceful Prisma fallback to static project data",
  "Clear empty and error UI states across routes",
];

export const projectEngineerings: Record<string, ProjectEngineeringData> = {
  infinityai: {
    testingSummary:
      "InfinityAI is designed for layered validation across prompt schemas, credit logic, provider adapters, and billing-sensitive workflows. Automated suites are planned; current evidence comes from manual build validation and typed server boundaries.",
    testSuites: [
      {
        type: "Manual validation",
        tools: ["ESLint", "TypeScript", "Next.js build"],
        coverage:
          "Route handlers, Zod schemas, component types, and static project routes",
        status: "Implemented",
      },
      {
        type: "Unit",
        tools: ["Vitest (planned)"],
        coverage:
          "Validation schemas, credit calculations, and provider error normalization",
        status: "Planned",
      },
      {
        type: "Integration",
        tools: ["Vitest", "Prisma test database (planned)"],
        coverage:
          "Tool execution, history creation, and transactional credit deduction",
        status: "Planned",
      },
      {
        type: "End-to-end",
        tools: ["Playwright (planned)"],
        coverage:
          "Authentication, AI tool flow, and subscription checkout boundaries",
        status: "Planned",
      },
    ],
    performance: portfolioBuildMetrics,
    reliability: [
      "Provider timeout protection in the AI router design",
      "Retry strategy scoped to safe, idempotent operations",
      "Normalized provider errors returned to the client",
      "Database transactions for credit deduction after successful responses",
      "Graceful loading, empty, and failure states in tool UI",
      "Static fallback when database access is unavailable",
    ],
    security: [
      "Zod validation on all AI and billing route inputs",
      "Server-side authorization before tool execution",
      "Rate limiting around expensive AI endpoints",
      "Provider and payment secrets stored in environment variables",
      "Admin role verification on protected admin routes",
    ],
    monitoring: [
      ...sharedMonitoring,
      "Provider error tracking in server logs",
      "Usage and credit events designed for audit trails",
    ],
    ciCd: sharedValidationPipeline,
  },

  explorex: {
    testingSummary:
      "ExploreX prioritizes map-ready UI states, filter logic, and static generation reliability. Validation today is manual through lint, type checks, and production builds on the portfolio codebase.",
    testSuites: [
      {
        type: "Manual validation",
        tools: ["ESLint", "TypeScript", "Next.js build"],
        coverage:
          "Discovery pages, filter components, static params, and API route typing",
        status: "Implemented",
      },
      {
        type: "Unit",
        tools: ["Vitest (planned)"],
        coverage: "Search filters, destination card mappers, and date helpers",
        status: "Planned",
      },
      {
        type: "Integration",
        tools: ["Vitest (planned)"],
        coverage: "Optional map API loading and cached external reads",
        status: "Planned",
      },
      {
        type: "End-to-end",
        tools: ["Playwright (planned)"],
        coverage: "Browse flow, filter interactions, and detail page navigation",
        status: "Planned",
      },
    ],
    performance: portfolioBuildMetrics,
    reliability: [
      "Optional third-party map loading with non-blocking UI",
      "Static generation for known destination routes",
      "Cached external API reads with revalidation windows",
      "Skeleton and empty states for slow network conditions",
      "Fallback content when database seed data is unavailable",
    ],
    security: [
      "Map and travel API keys kept server-side",
      "Input validation on search and filter query params",
      "No sensitive tokens exposed in client bundles",
    ],
    monitoring: sharedMonitoring,
    ciCd: sharedValidationPipeline,
  },

  dailyessentials: {
    testingSummary:
      "DailyEssentials focuses on commerce flows — cart state, catalog filtering, and checkout boundaries. Engineering evidence today is typed validation and build gates; automated checkout tests are planned.",
    testSuites: [
      {
        type: "Manual validation",
        tools: ["ESLint", "TypeScript", "Next.js build"],
        coverage:
          "Product listing, cart UI, checkout form validation, and route structure",
        status: "Implemented",
      },
      {
        type: "Unit",
        tools: ["Vitest (planned)"],
        coverage: "Cart totals, discount rules, and inventory helpers",
        status: "Planned",
      },
      {
        type: "Integration",
        tools: ["Vitest", "Prisma test database (planned)"],
        coverage: "Order creation, stock checks, and payment webhook handlers",
        status: "Planned",
      },
      {
        type: "End-to-end",
        tools: ["Playwright (planned)"],
        coverage: "Add to cart, checkout, and order confirmation flows",
        status: "Planned",
      },
    ],
    performance: portfolioBuildMetrics,
    reliability: [
      "Optimistic cart updates with rollback on failure",
      "Transactional order creation in the data layer design",
      "Payment webhook signature verification before state changes",
      "Clear out-of-stock and payment error messaging",
      "Graceful catalog fallback when database is unreachable",
    ],
    security: [
      "Server-side price validation before order submission",
      "Payment provider secrets in environment variables",
      "Zod validation on checkout and address payloads",
      "User-scoped order access on API routes",
    ],
    monitoring: sharedMonitoring,
    ciCd: sharedValidationPipeline,
  },

  vyvo: {
    testingSummary:
      "Vyvo emphasizes dashboard performance patterns — lazy chart loading, filter state, and data table boundaries. Current evidence is manual lint, type checking, and production build validation.",
    testSuites: [
      {
        type: "Manual validation",
        tools: ["ESLint", "TypeScript", "Next.js build"],
        coverage:
          "Dashboard layouts, chart placeholders, filter controls, and API typing",
        status: "Implemented",
      },
      {
        type: "Unit",
        tools: ["Vitest (planned)"],
        coverage: "Metric formatters, date range helpers, and table sort logic",
        status: "Planned",
      },
      {
        type: "Integration",
        tools: ["Vitest (planned)"],
        coverage: "Aggregated metrics queries and filter persistence",
        status: "Planned",
      },
      {
        type: "End-to-end",
        tools: ["Playwright (planned)"],
        coverage: "Dashboard navigation, filter changes, and export actions",
        status: "Planned",
      },
    ],
    performance: portfolioBuildMetrics,
    reliability: [
      "Lazy-loaded chart modules to reduce initial bundle weight",
      "Skeleton states while metrics load",
      "Debounced filter updates to limit unnecessary requests",
      "Empty and error panels when metric data is unavailable",
      "Static project fallback for demo dashboards",
    ],
    security: [
      "Role-scoped dashboard data access in API design",
      "Validated query params for date ranges and filters",
      "Server-side aggregation before sending metrics to the client",
    ],
    monitoring: sharedMonitoring,
    ciCd: sharedValidationPipeline,
  },

  wishcart: {
    testingSummary:
      "WishCart covers wishlist persistence, product discovery, and cart merge flows. Validation is currently manual through lint, TypeScript, and build checks; automated commerce tests are on the roadmap.",
    testSuites: [
      {
        type: "Manual validation",
        tools: ["ESLint", "TypeScript", "Next.js build"],
        coverage:
          "Wishlist UI, product cards, cart merge logic types, and route handlers",
        status: "Implemented",
      },
      {
        type: "Unit",
        tools: ["Vitest (planned)"],
        coverage: "Wishlist merge rules, cart totals, and product slug helpers",
        status: "Planned",
      },
      {
        type: "Integration",
        tools: ["Vitest", "Prisma test database (planned)"],
        coverage: "Wishlist sync, cart persistence, and catalog queries",
        status: "Planned",
      },
      {
        type: "End-to-end",
        tools: ["Playwright (planned)"],
        coverage: "Save to wishlist, move to cart, and guest checkout paths",
        status: "Planned",
      },
    ],
    performance: portfolioBuildMetrics,
    reliability: [
      "Wishlist and cart state reconciliation on login",
      "Idempotent add-to-cart operations in the service design",
      "Inventory checks before checkout confirmation",
      "Graceful handling of unavailable products in the wishlist",
      "Database fallback to static catalog data",
    ],
    security: [
      "User-scoped wishlist and cart records",
      "Zod validation on cart mutation payloads",
      "Payment and catalog API keys isolated server-side",
    ],
    monitoring: sharedMonitoring,
    ciCd: sharedValidationPipeline,
  },
};
