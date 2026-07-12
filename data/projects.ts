import type { Project } from "@/types/project";

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
    problem:
      "AI interfaces can become scattered quickly: prompts, outputs, settings, usage context, and account flows often compete for attention.",
    solution:
      "The architecture groups AI workflows into focused surfaces with reusable prompt, result, history, and account primitives.",
    impact:
      "Creates a portfolio-ready foundation for presenting AI workflows with credible UX, clear routing, and future API integration points.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "AI UX"],
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
    problem:
      "Travel discovery pages often overload users with imagery and filters before helping them make a clear decision.",
    solution:
      "ExploreX prioritizes destination storytelling, progressive filtering, and modular cards that can later connect to live content sources.",
    impact:
      "Provides a scalable route and component model for destination pages, itinerary previews, and curated recommendation systems.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Maps-ready UI", "SEO"],
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
    problem:
      "Everyday commerce products need fast browsing and simple decision-making, but many storefronts make basic replenishment feel heavy.",
    solution:
      "DailyEssentials uses clear categories, concise product cards, trust sections, and a layout that supports future cart and checkout flows.",
    impact:
      "Creates a credible storefront foundation that can grow into inventory, account, payment, and order-management features.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Commerce UI", "Prisma-ready"],
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
    problem:
      "Health and wellness dashboards can feel noisy when metrics, trends, recommendations, and device data are not clearly prioritized.",
    solution:
      "Vyvo focuses on modular metric cards, trend summaries, and visual rhythm that keeps personal data readable and actionable.",
    impact:
      "Demonstrates dashboard thinking, information hierarchy, and component design for data-rich personal technology products.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Dashboard UI", "Data Viz-ready"],
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
    problem:
      "Marketplace products need more than a storefront: they need clear catalog structure, trust signals, seller extensibility, and reliable transaction boundaries.",
    solution:
      "WishCart is organized around reusable marketplace primitives for product cards, seller context, curated collections, and future checkout flows.",
    impact:
      "Shows a path from portfolio concept to production marketplace architecture with clean separation between presentation and commerce logic.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Marketplace UX", "PostgreSQL-ready"],
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
