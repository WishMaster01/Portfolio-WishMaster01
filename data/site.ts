export const siteConfig = {
  name: "WishMaster01",
  creator: "WishMaster01",
  description:
    "Enterprise-level software portfolio for product engineering, polished interfaces, and production-ready web systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wishmaster01.com",
  email: "hello@wishmaster01.com",
  social: {
    twitter: "@wishmaster01",
    github: "https://github.com/WishMaster01",
    linkedin: "https://www.linkedin.com/in/wishmaster01",
  },
} as const;

export const featuredStats = [
  { value: "5", label: "Core routes" },
  { value: "10+", label: "Reusable primitives" },
  { value: "100%", label: "Typed baseline" },
] as const;

export const services = [
  {
    title: "Product engineering",
    description:
      "Translate goals into scoped, shippable product surfaces with strong technical foundations.",
    deliverables: ["Feature planning", "Implementation", "Release support"],
  },
  {
    title: "Frontend architecture",
    description:
      "Build maintainable interface systems with reusable components, route boundaries, and clean data flow.",
    deliverables: [
      "Design system",
      "App Router structure",
      "Performance review",
    ],
  },
  {
    title: "Portfolio systems",
    description:
      "Create high-signal personal or business portfolios with case studies, SEO, and conversion flows.",
    deliverables: ["Content model", "Case study pages", "Contact pipeline"],
  },
] as const;

export const principles = [
  {
    title: "Keep boundaries explicit",
    description:
      "Separate routes, UI primitives, data access, and feature components so the project can scale without rewrites.",
  },
  {
    title: "Optimize for maintainability",
    description:
      "Use typed data, predictable naming, and small components that are easy to test and replace.",
  },
  {
    title: "Ship accessible interfaces",
    description:
      "Respect semantic HTML, keyboard navigation, color contrast, and reduced-motion preferences from the start.",
  },
  {
    title: "Prefer measurable polish",
    description:
      "Use animation and visual detail where it improves comprehension instead of adding unnecessary weight.",
  },
] as const;

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "API Design",
  "Accessibility",
] as const;

export const experience = [
  {
    period: "Foundation",
    title: "Interface systems",
    description:
      "Reusable components, layout primitives, responsive navigation, and theme behavior.",
  },
  {
    period: "Expansion",
    title: "Data-backed content",
    description:
      "Prisma-backed projects, posts, services, and validated contact submissions.",
  },
  {
    period: "Production",
    title: "Quality gates",
    description:
      "Build checks, linting, accessibility review, analytics, monitoring, and deployment hardening.",
  },
] as const;
