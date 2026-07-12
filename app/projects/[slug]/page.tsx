import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Section className="pb-10">
        <Container className="space-y-10">
          <div className="max-w-4xl space-y-6">
            <Badge>{project.category}</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              {project.title}
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className={buttonVariants({ variant: "secondary" })}
              >
                Back to projects
              </Link>
              <Link href="/contact" className={buttonVariants()}>
                Discuss similar work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="p-5">
                  <p className="text-3xl font-semibold">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-10">
        <Container className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
          <Reveal>
            <aside className="space-y-6 lg:sticky lg:top-24">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <dl className="grid gap-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Role</dt>
                      <dd className="mt-1 font-medium">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Timeline</dt>
                      <dd className="mt-1 font-medium">{project.timeline}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="mt-1 font-medium">{project.status}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Year</dt>
                      <dd className="mt-1 font-medium">{project.year}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-3 p-6">
                  <h2 className="font-semibold">Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <Card>
                <CardContent className="grid gap-6 p-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <h2 className="font-semibold">Problem</h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {project.problem}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-semibold">Solution</h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {project.solution}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-semibold">Impact</h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {project.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-xl font-semibold">Highlights</h2>
                  <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>

            {project.sections.map((section, index) => (
              <Reveal key={section.title} delay={(index + 2) * 0.06}>
                <Card>
                  <CardContent className="space-y-3 p-6">
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <p className="leading-7 text-muted-foreground">
                      {section.body}
                    </p>
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
