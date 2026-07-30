import type { Project } from "@/types/project";
import { siteConfig } from "./site";

const commonScreenshots = (project: string): Project["screenshots"] => [
  {
    title: "Landing experience",
    description: `${project} hero, positioning, and primary conversion section.`,
    image: "/window.svg",
  },
  {
    title: "Feature surface",
    description: `${project} modular feature layout prepared for production content.`,
    image: "/globe.svg",
  },
  {
    title: "Detail workflow",
    description: `${project} case-study and interaction state preview.`,
    image: "/file.svg",
  },
];

const commonMilestones = (
  discovery: string,
  architecture: string,
  polish: string,
): Project["milestones"] => [
  {
    label: "Discovery",
    date: "Week 1",
    description: discovery,
  },
  {
    label: "Architecture",
    date: "Week 2",
    description: architecture,
  },
  {
    label: "Polish",
    date: "Week 3",
    description: polish,
  },
];

export const projects: Project[] = [
  {
    slug: "infinityai",
    title: "InfinityAI",
    category: "AI Product Platform",
    year: "2026",
    status: "Case study",
    role: "Full-stack product engineer",
    timeline: "Discovery to launch foundation",
    summary:
      "An AI-focused product experience designed around fast onboarding, clear model interaction, and scalable feature areas.",
    description:
      "InfinityAI is a portfolio-grade AI workspace concept that demonstrates prompt UX, generated output handling, history states, and provider-safe backend boundaries.",
    problem:
      "AI interfaces can become scattered quickly: prompts, outputs, settings, usage context, and account flows often compete for attention.",
    solution:
      "The architecture groups AI workflows into focused surfaces with reusable prompt, result, history, and account primitives.",
    impact:
      "Creates a portfolio-ready foundation for presenting AI workflows with credible UX, clear routing, and future API integration points.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "AI UX"],
    technologies: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Route Handlers",
      "OpenRouter/Gemini-ready APIs",
    ],
    features: [
      {
        title: "Prompt workspace",
        description:
          "A clear prompt-first interaction model with room for presets, history, and generated result states.",
      },
      {
        title: "Provider-safe API boundary",
        description:
          "Server routes are prepared to isolate model keys, validation, and future usage tracking.",
      },
      {
        title: "AI output states",
        description:
          "UI direction covers loading, empty, success, and failure states for generated responses.",
      },
    ],
    architecture: {
      summary:
        "InfinityAI uses server-rendered product pages with isolated client components for prompt interaction and backend route handlers for provider calls.",
      layers: [
        {
          title: "Presentation",
          description:
            "Landing, workspace, and case-study UI built from reusable components.",
        },
        {
          title: "Interaction",
          description:
            "Client-side prompt controls, loading states, and result rendering.",
        },
        {
          title: "API",
          description:
            "Validated route handlers for model providers and future account-scoped usage.",
        },
        {
          title: "Persistence",
          description:
            "Prepared for prompt history, saved outputs, and user-level analytics.",
        },
      ],
    },
    screenshots: commonScreenshots("InfinityAI"),
    challenges: [
      {
        title: "Avoiding generic AI UI",
        description:
          "AI products can look impressive while hiding unclear workflows.",
        resolution:
          "The experience is organized around what users need to do: prompt, review, refine, and save.",
      },
      {
        title: "Provider boundaries",
        description:
          "Client-side AI calls would expose API keys and create security risk.",
        resolution:
          "The architecture keeps model access behind server route handlers.",
      },
    ],
    futureScope: [
      "Authenticated prompt history",
      "Usage metering and model switching",
      "Saved AI workflows",
      "Team workspaces",
    ],
    githubUrl: "https://github.com/WishMaster01/infinityai",
    liveUrl: `${siteConfig.url}/projects/infinityai`,
    milestones: commonMilestones(
      "Defined the AI workspace narrative and key recruiter-facing story.",
      "Separated prompt UI, provider API boundary, and future persistence layer.",
      "Added accessible states, animation boundaries, and case-study content.",
    ),
    highlights: [
      "Prompt-first interaction model",
      "Reusable workflow sections",
      "Accessible loading and empty states",
      "Prepared for protected account routes",
    ],
    metrics: [
      { label: "Primary flows", value: "4" },
      { label: "UI modules", value: "12+" },
      { label: "API-ready", value: "Yes" },
    ],
    sections: [
      {
        title: "Product direction",
        body: "InfinityAI is positioned as a focused AI workspace, not a generic landing page. The case study emphasizes workflow clarity, trust, and low-friction user interaction.",
      },
      {
        title: "Technical approach",
        body: "The recommended build uses server-rendered marketing pages, isolated client components for interaction, and route handlers for future AI request orchestration.",
      },
      {
        title: "Next phase",
        body: "The next implementation step is adding authenticated user flows, persisted prompt history, and provider-safe API boundaries.",
      },
    ],
  },
  {
    slug: "explorex",
    title: "ExploreX",
    category: "Travel Discovery",
    year: "2026",
    status: "Case study",
    role: "Frontend architect",
    timeline: "Experience design foundation",
    summary:
      "A travel exploration interface for destinations, itineraries, recommendations, and high-confidence discovery paths.",
    description:
      "ExploreX is a travel discovery platform concept focused on destination storytelling, itinerary planning, and filterable exploration.",
    problem:
      "Travel discovery pages often overload users with imagery and filters before helping them make a clear decision.",
    solution:
      "ExploreX prioritizes destination storytelling, progressive filtering, and modular cards that can later connect to live content sources.",
    impact:
      "Provides a scalable route and component model for destination pages, itinerary previews, and curated recommendation systems.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Maps-ready UI", "SEO"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Static Generation",
      "SEO Metadata",
      "Maps-ready UI",
    ],
    features: [
      {
        title: "Destination discovery",
        description:
          "Curated cards and content hierarchy for fast destination comparison.",
      },
      {
        title: "Itinerary-ready model",
        description:
          "Data structure can evolve into saved routes, plans, and recommendations.",
      },
      {
        title: "SEO-first pages",
        description:
          "Static route strategy supports future destination detail pages.",
      },
    ],
    architecture: {
      summary:
        "ExploreX separates destinations, tags, itinerary modules, and media so content can move from static data to a CMS or database.",
      layers: [
        {
          title: "Routes",
          description:
            "Static marketing and discovery routes with future dynamic destination pages.",
        },
        {
          title: "Content",
          description:
            "Typed records for destinations, collections, and itinerary blocks.",
        },
        {
          title: "Filtering",
          description: "Client-side filtering first, database search later.",
        },
        {
          title: "Integrations",
          description: "Prepared for maps, location APIs, and saved trips.",
        },
      ],
    },
    screenshots: commonScreenshots("ExploreX"),
    challenges: [
      {
        title: "Travel content overload",
        description:
          "Destination platforms can become visually dense and hard to compare.",
        resolution:
          "The layout uses progressive detail and consistent cards before advanced filters.",
      },
      {
        title: "Future map integration",
        description: "Maps can dominate layout and performance.",
        resolution:
          "Map surfaces are treated as optional progressive enhancements.",
      },
    ],
    futureScope: [
      "Destination detail pages",
      "Saved itineraries",
      "Map integration",
      "Recommendation engine",
    ],
    githubUrl: "https://github.com/WishMaster01/explorex",
    liveUrl: `${siteConfig.url}/projects/explorex`,
    milestones: commonMilestones(
      "Defined destination discovery and itinerary planning goals.",
      "Created a content model that can scale into dynamic destination pages.",
      "Polished responsive discovery and SEO-ready presentation.",
    ),
    highlights: [
      "Destination-first content model",
      "Filter-ready project architecture",
      "SEO-friendly route structure",
      "Responsive visual hierarchy",
    ],
    metrics: [
      { label: "Content types", value: "5" },
      { label: "Discovery states", value: "6" },
      { label: "SEO routes", value: "Ready" },
    ],
    sections: [
      {
        title: "Product direction",
        body: "ExploreX is structured around decision support: what to see, why it matters, and how to compare options without burying users in controls.",
      },
      {
        title: "Technical approach",
        body: "The data model separates destinations, tags, itinerary blocks, and media so the UI can evolve from static content to a CMS or database-backed system.",
      },
      {
        title: "Next phase",
        body: "The next implementation step is adding destination detail pages, saved itineraries, and geospatial integrations.",
      },
    ],
  },
  {
    slug: "dailyessentials",
    title: "DailyEssentials",
    category: "Commerce Experience",
    year: "2026",
    status: "Case study",
    role: "Product UI engineer",
    timeline: "Commerce foundation",
    summary:
      "A practical essentials shopping experience focused on product clarity, category navigation, and conversion-oriented UI.",
    description:
      "DailyEssentials is a commerce storefront concept for recurring everyday purchases with clear categories, trust sections, and checkout-ready UI boundaries.",
    problem:
      "Everyday commerce products need fast browsing and simple decision-making, but many storefronts make basic replenishment feel heavy.",
    solution:
      "DailyEssentials uses clear categories, concise product cards, trust sections, and a layout that supports future cart and checkout flows.",
    impact:
      "Creates a credible storefront foundation that can grow into inventory, account, payment, and order-management features.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Commerce UI", "Prisma-ready"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma-ready Data Model",
      "PostgreSQL-ready",
      "Checkout-ready UI",
    ],
    features: [
      {
        title: "Category browsing",
        description:
          "Simple essentials-first navigation for quick product discovery.",
      },
      {
        title: "Conversion cards",
        description:
          "Product cards emphasize price, benefit, trust, and action.",
      },
      {
        title: "Checkout boundary",
        description:
          "Component structure is prepared for cart and checkout integration.",
      },
    ],
    architecture: {
      summary:
        "DailyEssentials is organized around product, category, cart, and order boundaries so commerce logic can be added without rewriting the UI.",
      layers: [
        {
          title: "Catalog",
          description:
            "Products, categories, variants, and promotional collections.",
        },
        {
          title: "Cart",
          description: "Future cart state and checkout handoff boundary.",
        },
        {
          title: "Orders",
          description:
            "Prepared for order persistence and transactional records.",
        },
        {
          title: "Admin",
          description:
            "Ready for catalog management via the existing admin-ready APIs.",
        },
      ],
    },
    screenshots: commonScreenshots("DailyEssentials"),
    challenges: [
      {
        title: "Routine shopping speed",
        description: "Users buying essentials want low-friction discovery.",
        resolution:
          "The UI reduces navigation depth and prioritizes repeat-purchase clarity.",
      },
      {
        title: "Commerce data complexity",
        description:
          "Products, variants, inventory, and orders can tangle quickly.",
        resolution:
          "The case study defines clean data boundaries before backend implementation.",
      },
    ],
    futureScope: [
      "Product filters",
      "Cart state",
      "Checkout integration",
      "Inventory admin",
    ],
    githubUrl: "https://github.com/WishMaster01/dailyessentials",
    liveUrl: `${siteConfig.url}/projects/dailyessentials`,
    milestones: commonMilestones(
      "Mapped recurring essentials shopping behavior and conversion goals.",
      "Separated catalog, cart, checkout, and order boundaries.",
      "Refined product card hierarchy and responsive commerce sections.",
    ),
    highlights: [
      "Category-driven browsing",
      "Conversion-focused cards",
      "Checkout-ready component boundaries",
      "Product metadata structure",
    ],
    metrics: [
      { label: "Commerce flows", value: "5" },
      { label: "Product states", value: "8" },
      { label: "DB-ready", value: "Yes" },
    ],
    sections: [
      {
        title: "Product direction",
        body: "DailyEssentials is designed for routine buying behavior where users value speed, clarity, and predictable product information.",
      },
      {
        title: "Technical approach",
        body: "The future data layer should separate products, variants, categories, inventory, carts, and orders while keeping the marketing pages static where possible.",
      },
      {
        title: "Next phase",
        body: "The next implementation step is product listing filters, cart state, checkout handoff, and database-backed catalog management.",
      },
    ],
  },
  {
    slug: "vyvo",
    title: "Vyvo",
    category: "Wellness Dashboard",
    year: "2026",
    status: "Case study",
    role: "Interface systems engineer",
    timeline: "Dashboard concept",
    summary:
      "A wellness and personal metrics dashboard concept with clean data presentation and calm interaction patterns.",
    description:
      "Vyvo is a wellness dashboard case study focused on calm metric presentation, trend summaries, and modular data surfaces.",
    problem:
      "Health and wellness dashboards can feel noisy when metrics, trends, recommendations, and device data are not clearly prioritized.",
    solution:
      "Vyvo focuses on modular metric cards, trend summaries, and visual rhythm that keeps personal data readable and actionable.",
    impact:
      "Demonstrates dashboard thinking, information hierarchy, and component design for data-rich personal technology products.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Dashboard UI",
      "Data Viz-ready",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Dashboard UI",
      "Chart-ready Components",
      "Accessibility",
    ],
    features: [
      {
        title: "Metric cards",
        description:
          "Reusable cards for status, trends, and personal wellness indicators.",
      },
      {
        title: "Trend summaries",
        description:
          "Readable summaries that avoid overwhelming raw data views.",
      },
      {
        title: "Personalization-ready UI",
        description:
          "Layouts are prepared for user-specific dashboard modules.",
      },
    ],
    architecture: {
      summary:
        "Vyvo isolates dashboard modules, metric cards, chart containers, and recommendation blocks for future telemetry data.",
      layers: [
        {
          title: "Dashboard shell",
          description: "Responsive grid and navigation for wellness modules.",
        },
        {
          title: "Metrics",
          description: "Typed metric cards with trend and status states.",
        },
        {
          title: "Visualization",
          description:
            "Chart-ready containers that can adopt a chart library later.",
        },
        {
          title: "Personalization",
          description: "Prepared for user goals, preferences, and device data.",
        },
      ],
    },
    screenshots: commonScreenshots("Vyvo"),
    challenges: [
      {
        title: "Data readability",
        description: "Wellness dashboards can become dense and clinical.",
        resolution:
          "The design uses calm hierarchy and summarized trends before detailed charts.",
      },
      {
        title: "Chart dependency timing",
        description: "Adding charts too early can lock the UI into a library.",
        resolution:
          "The case study uses chart-ready containers without coupling to a chart dependency yet.",
      },
    ],
    futureScope: [
      "Chart primitives",
      "Mock telemetry data",
      "User goals",
      "Dashboard personalization",
    ],
    githubUrl: "https://github.com/WishMaster01/vyvo",
    liveUrl: `${siteConfig.url}/projects/vyvo`,
    milestones: commonMilestones(
      "Defined wellness metrics and calm dashboard principles.",
      "Separated metric cards, charts, recommendations, and personalization zones.",
      "Refined responsive dashboard density and accessibility.",
    ),
    highlights: [
      "Metric-card system",
      "Trend summary patterns",
      "Calm visual design language",
      "Prepared for chart components",
    ],
    metrics: [
      { label: "Dashboard modules", value: "9" },
      { label: "Metric groups", value: "4" },
      { label: "Charts-ready", value: "Yes" },
    ],
    sections: [
      {
        title: "Product direction",
        body: "Vyvo is framed as a wellness dashboard where users should understand status and trends without studying dense reports.",
      },
      {
        title: "Technical approach",
        body: "The future implementation should isolate data cards, chart containers, time-range controls, and recommendation blocks for easier iteration.",
      },
      {
        title: "Next phase",
        body: "The next implementation step is adding chart primitives, mock telemetry data, and dashboard personalization states.",
      },
    ],
  },
  {
    slug: "wishcart",
    title: "WishCart",
    category: "Marketplace Platform",
    year: "2026",
    status: "Case study",
    role: "Full-stack architect",
    timeline: "Marketplace architecture",
    summary:
      "A marketplace concept for product discovery, seller-ready catalog structure, cart flows, and scalable commerce foundations.",
    description:
      "WishCart is a marketplace platform concept covering seller-ready catalog structure, curated collections, cart flows, and production commerce boundaries.",
    problem:
      "Marketplace products need more than a storefront: they need clear catalog structure, trust signals, seller extensibility, and reliable transaction boundaries.",
    solution:
      "WishCart is organized around reusable marketplace primitives for product cards, seller context, curated collections, and future checkout flows.",
    impact:
      "Shows a path from portfolio concept to production marketplace architecture with clean separation between presentation and commerce logic.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Marketplace UX",
      "PostgreSQL-ready",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Marketplace Architecture",
    ],
    features: [
      {
        title: "Marketplace catalog",
        description:
          "Seller-aware product and collection structures for scalable discovery.",
      },
      {
        title: "Trust surfaces",
        description:
          "UI sections for seller context, product confidence, and transaction clarity.",
      },
      {
        title: "Order-ready foundation",
        description:
          "Prepared boundaries for cart, checkout, orders, and audit trails.",
      },
    ],
    architecture: {
      summary:
        "WishCart separates marketplace domains into users, sellers, products, variants, carts, orders, payments, and audit logs.",
      layers: [
        {
          title: "Marketplace UI",
          description:
            "Product cards, seller panels, collections, and conversion sections.",
        },
        {
          title: "Catalog domain",
          description:
            "Products, variants, categories, sellers, and merchandising.",
        },
        {
          title: "Transaction domain",
          description:
            "Cart, checkout, payment handoff, order records, and fulfillment states.",
        },
        {
          title: "Admin domain",
          description:
            "Future seller/admin tools backed by PostgreSQL and Prisma.",
        },
      ],
    },
    screenshots: commonScreenshots("WishCart"),
    challenges: [
      {
        title: "Marketplace scope control",
        description: "Marketplaces can expand into too many domains at once.",
        resolution:
          "The case study names the domains but stages implementation around catalog and cart first.",
      },
      {
        title: "Transaction safety",
        description: "Payment and order flows require strong boundaries.",
        resolution:
          "The architecture keeps transaction logic separate from presentation components.",
      },
    ],
    futureScope: [
      "Seller metadata",
      "Cart state",
      "Checkout handoff",
      "Order management",
      "Audit logging",
    ],
    githubUrl: "https://github.com/WishMaster01/wishcart",
    liveUrl: `${siteConfig.url}/projects/wishcart`,
    milestones: commonMilestones(
      "Defined marketplace domain boundaries and seller/product story.",
      "Structured catalog, transaction, and admin layers for future backend work.",
      "Polished marketplace case-study narrative and scalable UI sections.",
    ),
    highlights: [
      "Marketplace-first content model",
      "Seller and product boundaries",
      "Cart and checkout-ready surfaces",
      "Scalable catalog direction",
    ],
    metrics: [
      { label: "Marketplace domains", value: "6" },
      { label: "Reusable surfaces", value: "14+" },
      { label: "Scale-ready", value: "Yes" },
    ],
    sections: [
      {
        title: "Product direction",
        body: "WishCart is positioned as the strongest commerce case study because it can grow into seller tooling, catalog management, cart flows, and order systems.",
      },
      {
        title: "Technical approach",
        body: "The future backend should use clear models for users, sellers, products, variants, carts, orders, payments, and audit trails.",
      },
      {
        title: "Next phase",
        body: "The next implementation step is building catalog detail pages, cart state, seller metadata, and payment-safe API routes.",
      },
    ],
  },
];

export const featuredProjects = projects.slice(0, 3);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
