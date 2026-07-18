import Link from "next/link";
import { projects } from "@/data/projects";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProjectNavigationProps = {
  currentSlug: string;
};

export function ProjectNavigation({ currentSlug }: ProjectNavigationProps) {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  const previousProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <Card className="rounded-[2rem] bg-surface/95">
      <CardContent className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Continue exploring
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            More project case studies
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/projects/${previousProject.slug}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            ← {previousProject.title}
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className={buttonVariants()}>
            {nextProject.title} →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
