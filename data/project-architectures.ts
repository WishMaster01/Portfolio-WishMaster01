import type { ProjectArchitectureData } from "@/types/architecture";

const sharedDeployment = [
  {
    title: "Next.js production deployment",
    description:
      "The app is designed for a managed Next.js host with static pages, dynamic route handlers, environment variables, and cached external API reads.",
    checks: [
      "Environment variables remain server-side only",
      "Route handlers validate input before service calls",
      "Static pages use generated params where content is known",
      "Build, lint, and TypeScript checks run before deployment",
    ],
  },
  {
    title: "Operational readiness",
    description:
      "The architecture keeps monitoring, rate limits, provider failures, and content fallbacks visible instead of treating them as afterthoughts.",
    checks: [
      "Rate limiting around expensive endpoints",
      "Graceful fallback content when database access is unavailable",
      "Clear error states in the UI",
      "Provider keys isolated from client bundles",
    ],
  },
];

export const projectArchitectures: Record<string, ProjectArchitectureData> = {
  infinityai: {
    summary:
      "InfinityAI uses a modular service-oriented architecture inside a Next.js application. The core idea is to keep AI providers, credits, persistence, media storage, and billing behind clean server-side boundaries so the UI can stay fast and provider-agnostic.",
    diagramDefinition: `flowchart LR
    A[Browser Client] --> B[Next.js Application]
    B --> C[Authentication Middleware]
    C --> D[API & Server Action Layer]
    D --> E[AI Provider Abstraction]
    E --> F[Gemini 2.0 Flash]
    E --> G[OpenRouter Fallback]
    D --> H[Credit & Usage Service]
    H --> I[(PostgreSQL via Prisma)]
    D --> J[Cloud Storage / Cloudinary (Planned)]
    D --> K[Payment Provider / Stripe (Planned)]
    D --> L[Audit & Analytics Events]`,
    components: [
      {
        name: "Web client",
        responsibility:
          "Renders tools, dashboard, prompt forms, output history, account states, and billing interfaces with responsive interaction states.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        name: "API layer",
        responsibility:
          "Validates requests, authorizes users, normalizes errors, applies rate limits, and coordinates the domain services.",
        technologies: ["Route Handlers", "Server Actions", "Zod"],
      },
      {
        name: "AI provider layer",
        responsibility:
          "Normalizes prompts, model settings, token usage, errors, retries, and provider-specific response formats.",
        technologies: ["Gemini", "OpenRouter", "Provider router"],
      },
      {
        name: "Credit and usage service",
        responsibility:
          "Checks user credits before execution, records usage metadata, and deducts credits transactionally after a successful provider response.",
        technologies: ["Prisma transactions", "PostgreSQL"],
      },
      {
        name: "Content persistence",
        responsibility:
          "Stores users, generated content, saved prompts, usage history, subscriptions, and audit events.",
        technologies: ["PostgreSQL", "Prisma"],
      },
      {
        name: "Media and billing integrations",
        responsibility:
          "Handles generated assets, uploads, invoices, payments, and subscription webhooks through provider-specific adapters.",
        technologies: ["Cloudinary", "Stripe/Razorpay-ready", "Webhooks"],
      },
    ],
    requestFlow: [
      "User submits a tool request from the browser",
      "Frontend sends validated input to a server route",
      "Server authenticates the user and checks request ownership",
      "Credit service confirms available credits or active subscription limits",
      "AI provider router selects Gemini or OpenRouter based on availability and task type",
      "Provider response is normalized into a single internal result format",
      "Result, prompt metadata, model name, cost estimate, and latency are stored",
      "Credits are deducted transactionally and the response is returned to the client",
    ],
    dataFlow: [
      {
        title: "Prompt execution",
        steps: [
          "Client captures prompt, tool type, and options",
          "Zod validates size, required fields, and allowed tool options",
          "Server creates a usage intent record",
          "Provider router executes the request",
          "Generated output is saved with ownership metadata",
          "Dashboard refreshes history and remaining credits",
        ],
      },
      {
        title: "Billing and credits",
        steps: [
          "Payment webhook confirms checkout or subscription update",
          "Webhook signature is verified server-side",
          "Subscription and credit records are updated in PostgreSQL",
          "Usage service reads fresh limits before each AI call",
        ],
      },
    ],
    apiFlow: [
      {
        title: "Server boundary",
        steps: [
          "POST /api/ai/tools receives the request",
          "Middleware verifies identity",
          "Route handler validates body with Zod",
          "Domain service performs usage and provider orchestration",
          "Response returns normalized output and usage metadata",
        ],
      },
      {
        title: "Provider fallback",
        steps: [
          "Try preferred provider for the selected tool",
          "Classify provider errors as retryable or terminal",
          "Fallback to secondary provider when configured",
          "Return a stable error contract if all providers fail",
        ],
      },
    ],
    securityFlow: [
      {
        title: "API key protection",
        steps: [
          "Provider keys live only in environment variables",
          "Frontend never receives provider credentials",
          "Requests are proxied through server route handlers",
          "Errors redact provider secrets before reaching the UI",
        ],
      },
      {
        title: "Abuse prevention",
        steps: [
          "Rate limits apply per IP and user",
          "Prompt length and file size limits are enforced",
          "Credit checks block expensive anonymous usage",
          "Audit events record sensitive account actions",
        ],
      },
    ],
    scalingStrategy: [
      {
        title: "Provider abstraction",
        description:
          "AI calls are hidden behind a provider router so new models can be added without rewriting tools or UI flows.",
        checks: [
          "Common request interface",
          "Common response shape",
          "Retry and fallback policy",
          "Provider-specific errors mapped to application errors",
        ],
      },
      {
        title: "Relational usage consistency",
        description:
          "Credits, plans, and generated output history are relational enough to justify PostgreSQL over document-only storage.",
        checks: [
          "Transactional credit deduction",
          "Indexes on user and createdAt",
          "Webhook idempotency",
          "Usage aggregation for analytics",
        ],
      },
    ],
    deployment: sharedDeployment,
    decisions: [
      {
        title: "Provider abstraction with multi-tier fallback",
        context:
          "AI applications relying on a single provider face rate limits, outages, model deprecation, and unexpected token price spikes.",
        optionsConsidered: ["Direct client SDK", "Single hardcoded provider", "Pluggable provider abstraction"],
        chosenApproach: "Server-side Provider Router with 8-second timeout & automatic fallback chain",
        reason:
          "The app should survive provider downtime, pricing changes, model deprecations, and quality differences.",
        tradeoff:
          "It adds a service layer, but prevents every feature from becoming tightly coupled to one API.",
      },
      {
        title: "PostgreSQL instead of document-only storage",
        context:
          "Prompt history, user credit balances, transaction logs, and account data require strong relational consistency.",
        optionsConsidered: ["MongoDB / Document Store", "In-memory store only", "PostgreSQL via Prisma"],
        chosenApproach: "Normalized relational PostgreSQL schema with Prisma ORM",
        reason:
          "Credits, subscriptions, usage history, generated content ownership, and admin reporting need consistency and queryability.",
        tradeoff:
          "Schema design is stricter, but billing and usage logic become safer.",
      },
      {
        title: "Server route handlers over client-side provider calls",
        context:
          "Client-side LLM calls risk leaking high-privilege provider secrets and bypassing rate limits.",
        optionsConsidered: ["Client-side direct fetch", "Server route handlers with Zod validation"],
        chosenApproach: "Next.js server-side route handlers with Zod input validation and Token Bucket rate limiting",
        reason:
          "AI keys, credit checks, rate limits, and prompt logging must run on the server.",
        tradeoff:
          "Adds backend routing work, but avoids exposing secrets and keeps policy centralized.",
      },
    ],
    risks: [
      {
        title: "Provider latency",
        description:
          "AI requests can be slow or unstable depending on model, prompt size, and provider load.",
        checks: ["Streaming-ready UI", "Timeout handling", "Fallback provider", "Clear retry state"],
      },
      {
        title: "Credit mismatch",
        description:
          "If usage writes and credit deductions are not transactional, users can be overcharged or undercharged.",
        checks: ["Database transaction", "Webhook idempotency", "Usage audit log", "Admin correction path"],
      },
    ],
  },

  explorex: {
    summary:
      "ExploreX uses a content-first travel architecture where destinations, itinerary modules, recommendation blocks, and map-ready metadata are separated from presentation components.",
    diagramDefinition: `flowchart LR
    A[Traveler Browser] --> B[Next.js Discovery UI]
    B --> C[Destination Routes]
    C --> D[Multi-Criteria Filter Pipeline]
    D --> E[(Destination Content Store)]
    C --> F[Itinerary Builder (Client State)]
    F --> G[Recommendation Service (Planned)]
    G --> H[Maps / Geocoding API (Planned)]
    C --> I[SEO & Structured Metadata]`,
    components: [
      {
        name: "Discovery UI",
        responsibility:
          "Shows destinations, categories, itinerary cards, recommendations, and responsive comparison layouts.",
        technologies: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        name: "Destination content model",
        responsibility:
          "Keeps destinations, tags, seasonal notes, media, and itinerary blocks reusable across listing and detail pages.",
        technologies: ["TypeScript data", "CMS-ready schema"],
      },
      {
        name: "Search and filters",
        responsibility:
          "Filters destinations by interest, budget, duration, season, and trip style before database search is introduced.",
        technologies: ["Client state", "URL search params"],
      },
      {
        name: "Maps integration boundary",
        responsibility:
          "Keeps location APIs optional so route performance does not depend on heavy map libraries.",
        technologies: ["Mapbox-ready", "Geocoding-ready"],
      },
    ],
    requestFlow: [
      "User opens a destination discovery page",
      "Static destination data renders immediately",
      "Filters narrow destinations and suggested itineraries",
      "Destination detail route loads SEO metadata and itinerary sections",
      "Map components hydrate only where location context is needed",
      "Saved-trip actions can later persist plans to PostgreSQL",
    ],
    dataFlow: [
      {
        title: "Destination discovery",
        steps: [
          "Load destination cards",
          "Apply category and preference filters",
          "Rank recommended destinations",
          "Render itinerary suggestions and practical travel notes",
        ],
      },
    ],
    apiFlow: [
      {
        title: "Future recommendation endpoint",
        steps: [
          "GET /api/destinations reads filter params",
          "Server validates query parameters",
          "Database query ranks destinations",
          "Response returns cards and recommendation metadata",
        ],
      },
    ],
    securityFlow: [
      {
        title: "API safety",
        steps: [
          "Validate filter parameters",
          "Keep maps API keys restricted",
          "Rate-limit expensive recommendation calls",
          "Avoid storing personal trip data without authentication",
        ],
      },
    ],
    scalingStrategy: [
      {
        title: "Static first, dynamic later",
        description:
          "Destination pages can start static for performance and move to database-backed content when editing needs grow.",
        checks: ["Generated static params", "CMS-ready content fields", "SEO metadata", "Image optimization"],
      },
    ],
    deployment: sharedDeployment,
    decisions: [
      {
        title: "Decouple map rendering from core destination content",
        context:
          "Heavy interactive maps (Leaflet/Mapbox) can slow initial page load and fail in low-bandwidth network environments.",
        optionsConsidered: ["Eager map rendering on every card", "Progressive client-side map hydration"],
        chosenApproach: "Progressive client hydration with fallback static location previews",
        reason:
          "Travel discovery pages stay fast and accessible even if external mapping tiles or geocoding services experience latency.",
        tradeoff:
          "Requires separate presentation states for map view vs list view, but ensures sub-200ms initial page paint.",
      },
      {
        title: "Multi-parameter filter pipeline with URL synchronization",
        context:
          "Users expect shareable links and instant search results when filtering by season, budget, duration, and activity.",
        optionsConsidered: ["Client-only ephemeral state", "URL query param synchronization with debounced history"],
        chosenApproach: "URLSearchParams synchronization combined with in-memory memoized filtering",
        reason:
          "Enables bookmarking, browser back/forward navigation, and shareable travel search queries without server roundtrips.",
        tradeoff:
          "Requires careful serialization of multi-value array filters in the query string.",
      },
    ],
    risks: [
      {
        title: "Large media payloads",
        description:
          "Travel pages can become image-heavy and slow on mobile devices.",
        checks: ["Responsive image sizes", "Lazy loading", "Priority only for hero media", "Compressed assets"],
      },
    ],
  },

  dailyessentials: {
    summary:
      "DailyEssentials uses a commerce-ready architecture organized around catalog browsing, cart boundaries, order persistence, and future inventory/admin management.",
    diagramDefinition: `flowchart LR
    A[Shopper Browser] --> B[Storefront UI]
    B --> C[Catalog Service]
    C --> D[(Products & Categories Relational Store)]
    B --> E[Cart Service (Client Boundary)]
    E --> F[Checkout Adapter (Planned)]
    F --> G[Payment Provider / Gateway (Planned)]
    E --> H[(Orders Persistence (Planned))]
    I[Admin Management (Planned Workflow)] --> C`,
    components: [
      {
        name: "Storefront",
        responsibility:
          "Renders categories, product cards, offers, trust sections, and checkout entry points.",
        technologies: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        name: "Catalog service",
        responsibility:
          "Owns products, categories, variants, pricing metadata, availability, and merchandising sections.",
        technologies: ["Prisma-ready", "PostgreSQL-ready"],
      },
      {
        name: "Cart boundary",
        responsibility:
          "Keeps cart state separate from listing UI so checkout logic can be added without rewriting product cards.",
        technologies: ["React state", "Server validation"],
      },
      {
        name: "Admin catalog workflow",
        responsibility:
          "Allows future management of products, categories, featured collections, and inventory states.",
        technologies: ["Admin routes", "Protected APIs"],
      },
    ],
    requestFlow: [
      "User browses categories",
      "Product cards render price, trust, and availability metadata",
      "Cart action validates selected product and quantity",
      "Checkout adapter receives a server-validated cart",
      "Order is created after payment confirmation",
      "Admin dashboard updates catalog and inventory records",
    ],
    dataFlow: [
      {
        title: "Commerce flow",
        steps: [
          "Product listing reads catalog data",
          "Cart stores selected SKUs and quantities",
          "Server recalculates prices before checkout",
          "Payment provider confirms order",
          "Order record and inventory changes are persisted",
        ],
      },
    ],
    apiFlow: [
      {
        title: "Checkout-ready API",
        steps: [
          "POST /api/cart validates product selections",
          "POST /api/checkout creates a payment session",
          "Webhook verifies payment provider signature",
          "Order status updates transactionally",
        ],
      },
    ],
    securityFlow: [
      {
        title: "Transaction safety",
        steps: [
          "Never trust client-submitted prices",
          "Validate product availability on the server",
          "Verify payment webhooks",
          "Protect admin catalog routes with server authorization",
        ],
      },
    ],
    scalingStrategy: [
      {
        title: "Commerce domains",
        description:
          "Catalog, cart, checkout, order, inventory, and admin workflows are modeled as separate domains.",
        checks: ["Product indexes", "Order audit trail", "Webhook idempotency", "Admin authorization"],
      },
    ],
    deployment: sharedDeployment,
    decisions: [
      {
        title: "Server-side price recalculation & tax validation",
        context:
          "Client-side cart payloads can be intercepted or manipulated, risking malicious discounted purchases.",
        optionsConsidered: ["Trust client total with signature", "Strict server-side price & tax re-computation"],
        chosenApproach: "Authoritative server-side price re-computation from database before payment session creation",
        reason:
          "Client prices can be tampered with, so final pricing must be recomputed before payment.",
        tradeoff:
          "Requires extra server logic, but protects revenue and order integrity.",
      },
      {
        title: "Modular catalog boundary preceding payment gateway binding",
        context:
          "Coupling product presentation directly to a specific checkout vendor risks vendor lock-in and unstable catalog refactors.",
        optionsConsidered: ["Direct embedded Stripe elements on product cards", "Catalog domain isolation with adapter pattern"],
        chosenApproach: "Isolated catalog domain with pluggable payment adapter pattern",
        reason:
          "Strong product discovery is valuable before payment and inventory complexity is added.",
        tradeoff:
          "Checkout remains a planned integration until catalog structure stabilizes.",
      },
    ],
    risks: [
      {
        title: "Inventory drift",
        description:
          "If inventory updates are not transactional, the storefront can sell unavailable products.",
        checks: ["Transactional order creation", "Inventory locks", "Admin correction flow", "Webhook retry handling"],
      },
    ],
  },

  vyvo: {
    summary:
      "Vyvo uses a dashboard architecture focused on metric modules, chart-ready containers, recommendation panels, and user preference boundaries.",
    diagramDefinition: `flowchart LR
    A[User Client] --> B[Dashboard Shell]
    B --> C[Metric Modules Engine]
    C --> D[(Wellness Metric Series Store)]
    B --> E[Dynamic Chart Containers]
    B --> F[Recommendation Engine (Planned)]
    F --> G[Automated Insights (Planned)]
    B --> H[Preference Cache & Store]
    H --> I[(User Settings Relational Model)]`,
    components: [
      {
        name: "Dashboard shell",
        responsibility:
          "Controls layout, navigation, density, empty states, and responsive module arrangement.",
        technologies: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        name: "Metric module system",
        responsibility:
          "Displays wellness indicators, trends, summaries, and status flags in reusable cards.",
        technologies: ["Typed data", "Chart-ready props"],
      },
      {
        name: "Insight layer",
        responsibility:
          "Transforms raw metric changes into user-readable summaries and recommendations.",
        technologies: ["Rule engine-ready", "AI-ready"],
      },
      {
        name: "Preference store",
        responsibility:
          "Stores goals, dashboard modules, theme preferences, and notification settings.",
        technologies: ["PostgreSQL-ready", "Prisma-ready"],
      },
    ],
    requestFlow: [
      "User opens dashboard",
      "Server loads user preferences and latest metric summaries",
      "Dashboard modules render calm high-level cards first",
      "Detailed charts hydrate below the summary layer",
      "Insights are generated from metric deltas and user goals",
      "Preference changes update the dashboard configuration",
    ],
    dataFlow: [
      {
        title: "Metric ingestion",
        steps: [
          "Collect metric values from manual input or future device sync",
          "Normalize units and timestamp data",
          "Store metric snapshots",
          "Compute trends and recommendation hints",
        ],
      },
    ],
    apiFlow: [
      {
        title: "Dashboard data API",
        steps: [
          "GET /api/dashboard/summary loads compact metrics",
          "GET /api/dashboard/charts loads detailed ranges",
          "PATCH /api/dashboard/preferences updates layout",
          "Server validates user ownership",
        ],
      },
    ],
    securityFlow: [
      {
        title: "Sensitive data handling",
        steps: [
          "Require authentication for personal metrics",
          "Scope all reads by userId",
          "Avoid exposing raw health-like data publicly",
          "Keep export/delete flows explicit",
        ],
      },
    ],
    scalingStrategy: [
      {
        title: "Modular dashboard modules",
        description:
          "Each wellness module can be added, removed, or reordered without changing the dashboard shell.",
        checks: ["Module registry", "Typed metric contracts", "Preference-driven layout", "Chart lazy loading"],
      },
    ],
    deployment: sharedDeployment,
    decisions: [
      {
        title: "Executive summary metrics preceding deep graphical visualizations",
        context:
          "Dashboards overloaded with simultaneous heavy charts suffer high memory usage and cognitive fatigue.",
        optionsConsidered: ["Render all complex canvas charts upfront", "Progressive metric summaries with lazy chart hydration"],
        chosenApproach: "Key metric KPI badges with intersection-observer lazy loaded chart containers",
        reason:
          "Users need quick meaning before detailed graphs.",
        tradeoff:
          "Requires an insight layer, but prevents metric overload.",
      },
      {
        title: "Chart library encapsulation behind unified render contract",
        context:
          "Coupling dashboard components directly to a single charting library makes migrations or bundle optimizations painful.",
        optionsConsidered: ["Direct charting imports across all widgets", "Isolated chart adapter boundary"],
        chosenApproach: "Abstracted ChartContainer primitive with typed data-series contract",
        reason:
          "Chart dependencies should not leak across every metric component.",
        tradeoff:
          "Needs wrapper components, but makes replacement easier.",
      },
    ],
    risks: [
      {
        title: "Dashboard noise",
        description:
          "Too many modules can make personal data harder to understand.",
        checks: ["Module prioritization", "Responsive density rules", "User preferences", "Empty-state guidance"],
      },
    ],
  },

  wishcart: {
    summary:
      "WishCart uses marketplace architecture with seller-aware catalog data, transaction boundaries, payment-safe order creation, and admin-ready moderation surfaces.",
    diagramDefinition: `flowchart LR
    A[Buyer Client] --> B[Marketplace Storefront]
    C[Seller Client] --> D[Seller Dashboard (Planned)]
    B --> E[Catalog Domain Engine]
    D --> E
    E --> F[(Products, Sellers, Variants DB)]
    B --> G[Cart & Checkout Boundary]
    G --> H[Payment Provider Gateway (Planned)]
    H --> I[(Orders & Audit Logs)]
    J[Platform Admin] --> K[Moderation & Analytics (Planned)]
    K --> I`,
    components: [
      {
        name: "Marketplace UI",
        responsibility:
          "Renders product discovery, seller context, collections, trust indicators, and conversion flows.",
        technologies: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        name: "Catalog domain",
        responsibility:
          "Models sellers, products, variants, categories, pricing, inventory, and merchandising relationships.",
        technologies: ["PostgreSQL", "Prisma"],
      },
      {
        name: "Transaction domain",
        responsibility:
          "Handles cart validation, checkout session creation, payment webhooks, order records, and audit logs.",
        technologies: ["Route Handlers", "Payment adapter", "Prisma transactions"],
      },
      {
        name: "Admin and seller tools",
        responsibility:
          "Supports catalog management, seller moderation, message review, analytics, and marketplace settings.",
        technologies: ["Admin dashboard", "Protected APIs"],
      },
    ],
    requestFlow: [
      "Buyer searches or browses marketplace products",
      "Catalog domain returns seller-aware product cards",
      "Buyer adds item to cart",
      "Server validates product, seller, variant, quantity, and price",
      "Payment provider creates checkout session",
      "Webhook confirms payment and creates order events",
      "Seller/admin panels read fulfillment and audit state",
    ],
    dataFlow: [
      {
        title: "Marketplace transaction",
        steps: [
          "Catalog data powers listing and product pages",
          "Cart stores variant-level selections",
          "Checkout validates seller and inventory state",
          "Payment webhook confirms transaction",
          "Order, seller notification, and audit events are persisted",
        ],
      },
    ],
    apiFlow: [
      {
        title: "Seller and buyer APIs",
        steps: [
          "GET /api/products lists marketplace items",
          "POST /api/cart validates variant selections",
          "POST /api/checkout creates a provider session",
          "PATCH /api/admin/products updates catalog records",
        ],
      },
    ],
    securityFlow: [
      {
        title: "Marketplace authorization",
        steps: [
          "Buyers can only manage their carts and orders",
          "Sellers can only manage owned listings",
          "Admins moderate platform-wide entities",
          "Payment webhooks verify signatures and idempotency",
        ],
      },
    ],
    scalingStrategy: [
      {
        title: "Domain separation",
        description:
          "Buyer UI, seller tools, catalog, checkout, orders, and admin moderation evolve independently.",
        checks: ["Role-based access", "Seller ownership checks", "Catalog indexes", "Order audit trail"],
      },
    ],
    deployment: sharedDeployment,
    decisions: [
      {
        title: "Multi-tenant seller-aware catalog data modeling",
        context:
          "Marketplaces require strict isolation between distinct sellers while presenting unified search and checkout experiences.",
        optionsConsidered: ["Flat single-vendor schema", "Multi-tenant relational schema with seller ownership foreign keys"],
        chosenApproach: "Prisma relational model with seller ownership foreign keys and compound unique SKU indexes",
        reason:
          "Marketplace products need seller identity, trust badges, inventory ownership, and moderation flags.",
        tradeoff:
          "Catalog modeling is more complex than a single-store commerce app.",
      },
      {
        title: "Immutable audit log event streaming for orders",
        context:
          "Order disputes, refunds, and shipping state transitions require an unalterable history of events for accountability.",
        optionsConsidered: ["In-place status mutation without history", "Append-only order audit events table"],
        chosenApproach: "Append-only OrderAuditEvent table written transactionally alongside order mutations",
        reason:
          "Marketplace disputes and fulfillment flows need a reliable history of state changes.",
        tradeoff:
          "More writes per transaction, but much better operational visibility.",
      },
    ],
    risks: [
      {
        title: "Marketplace scope creep",
        description:
          "Seller tools, buyer features, payments, moderation, and analytics can expand rapidly.",
        checks: ["Phased roadmap", "Domain boundaries", "Admin moderation first", "Catalog indexes"],
      },
    ],
  },
};
