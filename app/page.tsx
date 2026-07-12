import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";
import { featuredStats, services } from "@/data/site";

export default function Home() {
  return (
    <>
      <Section className="overflow-hidden pb-10 pt-16 sm:pt-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal className="space-y-8">
            <Badge>WishMaster01 Portfolio</Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Enterprise-grade portfolio for a product-minded engineer.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                A modern Next.js foundation for case studies, services,
                technical writing, and high-signal contact flows.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants()} href="/projects">
                View projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href="/contact"
              >
                Start a conversation
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="relative overflow-hidden">
              <CardContent className="space-y-8 p-6 sm:p-8">
                <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.24),transparent_65%)]" />
                <div className="relative space-y-3">
                  <p className="font-mono text-sm text-accent">
                    system.status
                  </p>
                  <h2 className="text-2xl font-semibold">
                    Built for scale from the first commit.
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Route architecture, reusable primitives, typed data, theme
                    support, and motion boundaries are in place for the next
                    implementation phases.
                  </p>
                </div>
                <div className="relative grid gap-3 sm:grid-cols-3">
                  {featuredStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-border bg-surface/80 p-4"
                    >
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
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
              <Badge variant="secondary">Capabilities</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Focused implementation lanes
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-accent"
              href="/services"
            >
              See services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06}>
                <Card className="h-full">
                  <CardContent className="space-y-3 p-6">
                    <h3 className="text-lg font-medium">{service.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {service.description}
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
              <Badge variant="secondary">Selected work</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Project system preview
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-accent"
              href="/projects"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.slice(0, 2).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
