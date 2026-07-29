import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type CaseStudyHeroProps = {
  title: string;
  slug: string;
  coverImage: string;
  liveUrl: string;
  githubUrl: string;
};

export function CaseStudyHero({
  title,
  slug,
  coverImage,
  liveUrl,
  githubUrl,
}: CaseStudyHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-surface/85 p-6 shadow-2xl shadow-accent/10 backdrop-blur sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_18%,transparent)] blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <Link
            href={`/projects/${slug}`}
            className="inline-flex text-sm font-black text-accent transition hover:opacity-75"
          >
            ← Back to project details
          </Link>
          <p className="mt-6 inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
            Project case study
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            {title}: decisions, process, and product outcomes.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            A detailed breakdown of the problem, target users, constraints,
            goals, execution process, measurable outcomes, and engineering
            lessons behind this project.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={liveUrl}>Live Demo</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={githubUrl}>GitHub Repository</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/projects/${slug}/architecture`}>Architecture</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/projects/${slug}/engineering`}>Engineering</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background/60 p-3 shadow-2xl shadow-foreground/10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-surface-elevated">
              <Image
                src={coverImage}
                alt={`${title} case study preview`}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-contain p-8"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/35 via-transparent to-accent/10" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
