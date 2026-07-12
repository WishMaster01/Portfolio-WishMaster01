import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articles } from "@/data/blog";
import { experienceItems } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { skillHighlights } from "@/data/skills";

export default function Home() {
  return (
    <>
      <Section className="overflow-hidden pb-10 pt-16 sm:pt-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal className="space-y-8">
            <Badge>{profile.eyebrow}</Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                {profile.headline}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {profile.shortBio}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants()} href="/projects">
                View projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href="/resume"
              >
                View resume
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="relative overflow-hidden">
              <CardContent className="space-y-8 p-6 sm:p-8">
                <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.24),transparent_65%)]" />
                <div className="relative space-y-3">
                  <p className="font-mono text-sm text-accent">
                    portfolio.focus
                  </p>
                  <h2 className="text-2xl font-semibold">
                    Product ideas shaped into clear case studies.
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    InfinityAI, ExploreX, DailyEssentials, Vyvo, and WishCart
                    are modeled as reusable project records with dedicated
                    dynamic pages.
                  </p>
                </div>
                <div className="relative flex flex-wrap gap-2">
                  {skillHighlights.slice(0, 8).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="space-y-8">
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <Badge variant="secondary">Selected projects</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Five portfolio products with detail routes
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-accent"
              href="/projects"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
          <Reveal className="space-y-4">
            <Badge variant="secondary">Experience</Badge>
            <h2 className="text-3xl font-semibold tracking-tight">
              Built around visible engineering judgment.
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              The portfolio shows architecture, tradeoffs, and product thinking
              alongside visual execution.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {experienceItems.slice(0, 2).map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Card>
                  <CardContent className="space-y-2 p-5">
                    <p className="text-sm font-medium text-accent">
                      {item.period}
                    </p>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.summary}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container className="space-y-8">
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <Badge variant="secondary">Blog</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Engineering notes and portfolio thinking
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-accent"
              href="/blog"
            >
              Read posts <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.06}>
                <Card className="h-full">
                  <CardContent className="space-y-2 p-5">
                    <p className="text-xs text-muted-foreground">
                      {article.category} / {article.readingTime}
                    </p>
                    <h3 className="font-semibold">{article.title}</h3>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
