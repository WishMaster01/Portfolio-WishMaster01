import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";

const socials = [
  { label: "GitHub", value: "GH", href: "https://github.com/WishMaster01" },
  {
    label: "LinkedIn",
    value: "in",
    href: "https://www.linkedin.com/in/wishmaster01",
  },
  { label: "Twitter", value: "X", href: "https://x.com/wishmaster01" },
  {
    label: "Instagram",
    value: "IG",
    href: "https://instagram.com/wishmaster01",
  },
  { label: "Email", value: "@", href: "mailto:hello@wishmaster01.com" },
] as const;

const stats = [
  {
    icon: "▣",
    value: "15+",
    label: "Projects Completed",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  {
    icon: "</>",
    value: "2+",
    label: "Years of Experience",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: "◈",
    value: "10+",
    label: "Certifications",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: "♚",
    value: "20+",
    label: "Technologies",
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
  {
    icon: "☆",
    value: "500+",
    label: "DSA Problems Solved",
    color: "text-pink-500",
    bg: "bg-pink-100",
  },
  {
    icon: "∞",
    value: "∞",
    label: "Lines of Code",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
] as const;

const categoryLabels: Record<string, string> = {
  infinityai: "AI SaaS Platform",
  explorex: "AI Trip Planner",
  dailyessentials: "Grocery Platform",
  vyvo: "Chat & Social App",
  wishcart: "E-commerce Platform",
};

const projectVisuals: Record<string, string> = {
  infinityai:
    "from-[#12002f] via-[#34127a] to-[#050014] before:bg-[radial-gradient(circle_at_70%_35%,rgba(168,85,247,0.95),transparent_22%)] after:bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent)]",
  explorex:
    "from-[#c5efff] via-[#3db9ff] to-[#08728f] before:bg-[radial-gradient(circle_at_42%_35%,rgba(255,255,255,0.95),transparent_20%)] after:bg-[linear-gradient(150deg,rgba(34,197,94,0.55),transparent_42%)]",
  dailyessentials:
    "from-[#fff7ed] via-[#fbbf77] to-[#9a3412] before:bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,255,0.9),transparent_18%)] after:bg-[linear-gradient(145deg,rgba(120,53,15,0.28),transparent_45%)]",
  vyvo: "from-[#290052] via-[#a21caf] to-[#2e1065] before:bg-[radial-gradient(circle_at_55%_35%,rgba(244,114,182,0.9),transparent_18%)] after:bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent)]",
  wishcart:
    "from-[#061b44] via-[#2563eb] to-[#050816] before:bg-[radial-gradient(circle_at_55%_34%,rgba(147,197,253,0.88),transparent_20%)] after:bg-[linear-gradient(145deg,rgba(255,255,255,0.16),transparent)]",
};

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3.75v8.1m0 0 3.15-3.15M10 11.85 6.85 8.7M4.5 14.2v1.15c0 .5.4.9.9.9h9.2c.5 0 .9-.4.9-.9V14.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7.25 5.25h7.5v7.5M14.5 5.5l-9 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const featured = projects.slice(0, 5);

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_74%_22%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_24rem),linear-gradient(180deg,var(--background)_0%,color-mix(in_oklab,var(--background-alt)_65%,var(--background))_45%,var(--background)_100%)] text-foreground">
      <section className="mx-auto w-full max-w-[1680px] px-4 pb-8 pt-10 sm:px-8 sm:pt-14 lg:px-24 lg:pb-14 lg:pt-20">
        <div className="grid min-h-[360px] grid-cols-[minmax(0,1fr)_minmax(96px,32vw)] items-center gap-4 sm:min-h-[450px] sm:grid-cols-[minmax(0,1fr)_minmax(220px,42vw)] sm:gap-8 lg:min-h-[510px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <Reveal className="relative z-10 min-w-0 max-w-[660px]">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-xl bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent shadow-sm shadow-accent/10 sm:mb-8 sm:gap-2 sm:px-4 sm:py-2 sm:text-base">
              <span aria-hidden="true">Hi,</span>
              <span>I&apos;m</span>
            </div>

            <h1 className="text-[clamp(2rem,8.8vw,4.5rem)] font-black leading-[0.98] tracking-[-0.055em] text-foreground lg:text-[84px] lg:leading-[0.96]">
              WishMaster01
            </h1>

            <p className="mt-3 text-[clamp(1rem,4.2vw,2.25rem)] font-extrabold leading-tight tracking-[-0.035em] text-accent sm:mt-5 lg:text-[42px]">
              Full-Stack AI &amp; SaaS Developer
            </p>

            <p className="mt-4 max-w-[650px] text-sm leading-6 text-muted-foreground sm:mt-8 sm:text-lg sm:leading-9">
              I build intelligent, scalable and user-centric web applications
              and AI-powered solutions that solve real-world problems and create
              impact.
            </p>

            <div className="mt-5 flex flex-col gap-3 min-[430px]:flex-row sm:mt-8 sm:gap-4">
              <Link
                href="/projects"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold text-accent-foreground shadow-xl shadow-accent/25 transition hover:-translate-y-0.5 hover:opacity-90 sm:h-14 sm:px-7 sm:text-base"
              >
                View My Work
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent sm:h-14 sm:gap-3 sm:px-7 sm:text-base"
              >
                <DownloadIcon />
                <span className="hidden min-[430px]:inline">Download Resume</span>
                <span className="min-[430px]:hidden">Resume</span>
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-4">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface text-xs font-extrabold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent sm:h-12 sm:w-12 sm:text-sm"
                >
                  {social.value}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative min-w-0">
            <div className="hero-art-shell relative ml-auto aspect-[804/507] w-full max-w-[150px] overflow-hidden rounded-2xl border border-border/70 bg-surface/70 shadow-2xl backdrop-blur-sm after:mix-blend-overlay sm:max-w-[430px] sm:rounded-[2rem] lg:mx-auto lg:max-w-[804px]">
              <Image
                src="/home-page-character.png"
                alt="WishMaster01 portfolio hero character with floating technology cards"
                fill
                priority
                sizes="(min-width: 1280px) 804px, (min-width: 640px) 42vw, 32vw"
                className="hero-art-image object-contain"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 rounded-2xl border border-border bg-surface/85 shadow-xl shadow-foreground/6 backdrop-blur sm:mt-10">
          <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-2 lg:grid-cols-6 lg:divide-y-0">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-5 px-6 py-6"
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl font-black ${item.bg} ${item.color}`}
                >
                  {item.icon}
                </span>
                <span>
                  <span className="block text-2xl font-black tracking-tight text-foreground">
                    {item.value}
                  </span>
                  <span className="block text-sm font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <section className="mt-11">
          <Reveal className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.035em] text-foreground">
                Featured Projects
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                A few things I&apos;ve built with passion and precision.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:opacity-80"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.04}>
              <Link
                href={`/projects/${project.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm shadow-foreground/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/12"
              >
                <div
                  className={`relative h-36 overflow-hidden bg-gradient-to-br ${projectVisuals[project.slug] ?? projectVisuals.infinityai} before:absolute before:inset-0 after:absolute after:inset-0`}
                >
                  <div className="absolute inset-x-5 top-5 z-10 h-20 rounded-xl border border-white/15 bg-black/20 shadow-2xl backdrop-blur-sm">
                    <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                      <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 p-3">
                      <span className="h-3 rounded bg-white/45" />
                      <span className="h-3 rounded bg-white/25" />
                      <span className="h-3 rounded bg-white/35" />
                      <span className="h-3 rounded bg-white/20" />
                      <span className="h-3 rounded bg-white/35" />
                      <span className="h-3 rounded bg-white/25" />
                    </div>
                  </div>
                  <span className="absolute bottom-[-1px] left-4 z-20 rounded-t-lg bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                    {categoryLabels[project.slug] ?? project.category}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-black tracking-[-0.025em] text-foreground">
                      {project.title}
                    </h3>
                    <ExternalIcon />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
