import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
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
  },
];

const sections = [
  {
    title: "Product direction",
    body: "The case study explains the product goal, target workflow, and why the interface is structured the way it is.",
  },
  {
    title: "Technical approach",
    body: "The implementation direction separates route structure, typed data, UI primitives, and future backend integration points.",
  },
  {
    title: "Next phase",
    body: "The next step is connecting the static experience to persisted data, authentication, analytics, and production monitoring.",
  },
];

const blogPosts = [
  {
    slug: "portfolio-architecture-that-scales",
    title: "Portfolio architecture that can scale past a single page",
    excerpt:
      "How route boundaries, typed content, and reusable UI keep a portfolio maintainable as it grows into a product surface.",
    date: new Date("2026-07-12"),
    readingTime: "5 min read",
    category: "Architecture",
  },
  {
    slug: "case-studies-with-technical-depth",
    title: "Writing case studies with enough technical depth",
    excerpt:
      "A practical structure for explaining product context, engineering tradeoffs, implementation decisions, and measurable outcomes.",
    date: new Date("2026-07-10"),
    readingTime: "4 min read",
    category: "Portfolio",
  },
  {
    slug: "motion-without-interface-noise",
    title: "Motion without interface noise",
    excerpt:
      "Using animation to clarify hierarchy and progression while respecting performance and reduced-motion preferences.",
    date: new Date("2026-07-08"),
    readingTime: "3 min read",
    category: "Interface",
  },
];

async function main() {
  for (const [index, project] of projects.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        ...project,
        featured: index < 3,
        sortOrder: index,
        metrics: {
          deleteMany: {},
          create: project.metrics.map((metric, metricIndex) => ({
            ...metric,
            sortOrder: metricIndex,
          })),
        },
        sections: {
          deleteMany: {},
          create: sections.map((section, sectionIndex) => ({
            ...section,
            sortOrder: sectionIndex,
          })),
        },
      },
      create: {
        ...project,
        featured: index < 3,
        sortOrder: index,
        metrics: {
          create: project.metrics.map((metric, metricIndex) => ({
            ...metric,
            sortOrder: metricIndex,
          })),
        },
        sections: {
          create: sections.map((section, sectionIndex) => ({
            ...section,
            sortOrder: sectionIndex,
          })),
        },
      },
    });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  await prisma.resumeProfile.upsert({
    where: { id: "primary" },
    update: {
      name: "WishMaster01",
      title: "Full-stack Software Engineer",
      location: "Remote",
      email: "hello@wishmaster01.com",
      summary:
        "Product-minded engineer focused on Next.js, TypeScript, responsive UI systems, and scalable portfolio/product architecture.",
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
      resumeFile: "/resume.pdf",
    },
    create: {
      id: "primary",
      name: "WishMaster01",
      title: "Full-stack Software Engineer",
      location: "Remote",
      email: "hello@wishmaster01.com",
      summary:
        "Product-minded engineer focused on Next.js, TypeScript, responsive UI systems, and scalable portfolio/product architecture.",
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
      resumeFile: "/resume.pdf",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
