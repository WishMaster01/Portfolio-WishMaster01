import type { ProjectCaseStudyData } from "@/types/case-study";

export const projectCaseStudies: Record<string, ProjectCaseStudyData> = {
  infinityai: {
    background:
      "Users often need separate services for article writing, image generation, resume feedback, coding help, summarization, and developer utilities.",
    problem:
      "AI tools are fragmented across many websites, subscriptions, usage limits, and interfaces. This increases cost, slows workflows, and makes it hard to keep outputs organized.",
    targetUsers:
      "Students, content creators, developers, job seekers, founders, and small teams who want reliable AI utilities in one workspace.",
    role:
      "Full-stack developer, product designer, AI integration engineer, and system architect.",
    constraints: [
      "Limited access to paid AI providers during early prototyping",
      "Need for OpenRouter and Gemini-style provider fallback",
      "Secure credit, usage, and billing boundaries",
      "Fast response times for multiple AI utilities",
      "Responsive dashboard experience across desktop and mobile",
      "Clear history states so users can recover previous generations",
    ],
    goals: [
      "Provide multiple AI utilities through one dashboard",
      "Create a reusable provider abstraction for future models",
      "Track credits and usage safely",
      "Support subscription-ready billing and plan limits",
      "Keep generated content organized by tool and history",
    ],
    process: [
      {
        phase: "Research",
        description:
          "Mapped repetitive AI workflows used by students, developers, creators, and job seekers, then grouped them into high-value tool categories.",
      },
      {
        phase: "Architecture",
        description:
          "Separated tools, providers, credits, history, validation, and billing into modular services so each area can evolve independently.",
      },
      {
        phase: "Development",
        description:
          "Built the dashboard shell, AI request APIs, data models, prompt structures, loading states, and provider-safe server boundaries.",
      },
      {
        phase: "Optimization",
        description:
          "Added rate limiting, normalized provider errors, image optimization, route-level loading states, and reusable UI primitives.",
      },
    ],
    outcomes: [
      { label: "AI tools", value: "20+" },
      { label: "AI providers", value: "2" },
      { label: "Supported categories", value: "6" },
      { label: "Reusable modules", value: "10+" },
    ],
    lessons: [
      "AI providers should be isolated behind a common interface.",
      "Credit deduction must happen atomically and only after a valid generation path.",
      "Provider failure requires fallback, normalized errors, and clear user feedback.",
      "Prompt UX matters as much as the model because users need predictable outputs.",
    ],
  },
  explorex: {
    background:
      "Trip planning requires destination research, schedule building, map thinking, hotel context, budget awareness, and itinerary refinement.",
    problem:
      "Users often jump between maps, blogs, booking tools, and note apps. This creates fragmented plans and makes it hard to compare travel options quickly.",
    targetUsers:
      "Solo travelers, students, families, remote workers, and small groups planning budget-aware trips.",
    role:
      "Full-stack developer, UX planner, API integration designer, and data-flow architect.",
    constraints: [
      "Travel data can be incomplete or inconsistent",
      "Maps and location APIs require careful key protection",
      "Itinerary recommendations must be readable and editable",
      "Mobile layouts need to prioritize quick scanning",
      "Search and filters must stay fast with growing destination data",
    ],
    goals: [
      "Generate practical trip plans with day-by-day structure",
      "Organize destinations, activities, and recommendations clearly",
      "Prepare the system for maps and recommendation APIs",
      "Make itinerary cards responsive and easy to compare",
    ],
    process: [
      {
        phase: "Discovery",
        description:
          "Studied how users choose destinations, compare activities, and sequence travel days around time and budget constraints.",
      },
      {
        phase: "Information design",
        description:
          "Modeled trips around destinations, days, activities, notes, costs, and location context.",
      },
      {
        phase: "Interface build",
        description:
          "Created card-based itinerary flows, recommendation panels, filters, and responsive layouts for quick planning.",
      },
      {
        phase: "Future integration",
        description:
          "Prepared API boundaries for maps, geocoding, AI itinerary generation, and saved trip history.",
      },
    ],
    outcomes: [
      { label: "Trip stages", value: "4" },
      { label: "Planning modules", value: "8+" },
      { label: "Responsive views", value: "3" },
    ],
    lessons: [
      "Travel UX must separate inspiration from final itinerary decisions.",
      "Recommendation systems need explainable reasons, not only generated lists.",
      "Mobile trip planning works best with compact cards and clear day grouping.",
    ],
  },
  dailyessentials: {
    background:
      "Grocery delivery products depend on fast discovery, inventory clarity, cart reliability, and delivery tracking.",
    problem:
      "Users abandon grocery flows when products are difficult to find, stock state is unclear, or checkout feels slow and unreliable.",
    targetUsers:
      "Households, students, working professionals, and local shoppers who need fast grocery ordering.",
    role:
      "Frontend engineer, backend API designer, database modeler, and product flow designer.",
    constraints: [
      "Product catalog must remain searchable and categorized",
      "Cart totals need consistent calculation",
      "Inventory state must be prepared for real-time updates",
      "Checkout should stay simple on mobile",
      "Admin product management must be possible later",
    ],
    goals: [
      "Build a clean grocery catalog experience",
      "Support category filters and product discovery",
      "Create reliable cart and checkout-ready structures",
      "Prepare product data for admin management",
    ],
    process: [
      {
        phase: "Catalog modeling",
        description:
          "Defined product, category, pricing, stock, and recommendation structures for a scalable grocery flow.",
      },
      {
        phase: "Shopping UX",
        description:
          "Designed product cards, category filters, quick add interactions, and cart summaries for low-friction ordering.",
      },
      {
        phase: "Backend preparation",
        description:
          "Mapped API and database boundaries for products, orders, users, cart state, and admin edits.",
      },
      {
        phase: "Responsive polish",
        description:
          "Optimized layouts for mobile shopping, quick scanning, and checkout clarity.",
      },
    ],
    outcomes: [
      { label: "Commerce modules", value: "7+" },
      { label: "Product flows", value: "5" },
      { label: "Admin-ready areas", value: "4" },
    ],
    lessons: [
      "Commerce UX depends heavily on predictable pricing and cart state.",
      "Product search should support categories and intent-based browsing.",
      "Admin readiness affects the data model from the beginning.",
    ],
  },
  vyvo: {
    background:
      "Real-time social applications combine messaging, identity, presence, media, notifications, and moderation.",
    problem:
      "Chat and social experiences can become unreliable if real-time events, message persistence, and UI states are not carefully separated.",
    targetUsers:
      "Friends, communities, students, creators, and teams who need real-time conversation and social sharing.",
    role:
      "Realtime application developer, mobile UI planner, API designer, and social product architect.",
    constraints: [
      "Messages need reliable ordering and persistence",
      "Presence should not overload the interface",
      "Media sharing needs validation and storage boundaries",
      "Mobile-first layouts require careful navigation design",
      "Realtime errors need graceful reconnect states",
    ],
    goals: [
      "Build a chat and social app concept with clear realtime boundaries",
      "Design story, message, and profile surfaces",
      "Prepare Socket.IO style event flows",
      "Support AI assistant integration for chat workflows",
    ],
    process: [
      {
        phase: "Realtime model",
        description:
          "Separated persistent messages, transient presence, typing indicators, notifications, and media events.",
      },
      {
        phase: "Social UX",
        description:
          "Designed chat lists, message threads, stories, profiles, and social discovery states.",
      },
      {
        phase: "Event architecture",
        description:
          "Outlined socket rooms, message acknowledgements, reconnect handling, and optimistic UI states.",
      },
      {
        phase: "AI readiness",
        description:
          "Prepared a clean surface for chat assistance, summaries, moderation, and suggested replies.",
      },
    ],
    outcomes: [
      { label: "Realtime flows", value: "6+" },
      { label: "Social surfaces", value: "5" },
      { label: "AI-ready hooks", value: "3" },
    ],
    lessons: [
      "Realtime systems need clear separation between stored and ephemeral events.",
      "Optimistic UI improves speed but must handle rollback paths.",
      "Chat UX needs empty, loading, failed, reconnecting, and synced states.",
    ],
  },
  wishcart: {
    background:
      "E-commerce platforms require trusted product discovery, cart handling, secure payments, order history, and admin operations.",
    problem:
      "Many commerce builds look good visually but fail at state reliability, payment boundaries, admin workflows, and post-checkout tracking.",
    targetUsers:
      "Small businesses, sellers, shoppers, and founders needing a modern store foundation.",
    role:
      "Full-stack commerce developer, payment integration planner, admin dashboard designer, and database architect.",
    constraints: [
      "Payment keys must never reach the client",
      "Cart and checkout totals need server validation",
      "Admin product and order management must be reliable",
      "Product listing should scale with filters and search",
      "The UI must remain fast across product-heavy pages",
    ],
    goals: [
      "Create a modern e-commerce storefront",
      "Prepare Stripe/Razorpay-style payment boundaries",
      "Design admin-ready product and order management",
      "Build responsive product detail and checkout flows",
    ],
    process: [
      {
        phase: "Commerce mapping",
        description:
          "Modeled products, variants, cart items, orders, payment state, admin edits, and customer account flows.",
      },
      {
        phase: "Storefront build",
        description:
          "Created product listing, product detail, cart summary, checkout-ready states, and conversion-focused CTAs.",
      },
      {
        phase: "Admin workflow",
        description:
          "Prepared admin CRUD patterns for products, orders, inventory, analytics, and content updates.",
      },
      {
        phase: "Security pass",
        description:
          "Separated payment initiation, webhook handling, order validation, and client-visible state.",
      },
    ],
    outcomes: [
      { label: "Commerce flows", value: "8+" },
      { label: "Admin modules", value: "5" },
      { label: "Payment paths", value: "2" },
    ],
    lessons: [
      "Payments require server-side verification, not only client success states.",
      "Checkout UX should reduce decisions and highlight trust signals.",
      "Admin workflows should be designed before the database is finalized.",
    ],
  },
};
