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
    <Card>
      <CardContent className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">Continue exploring</p>
          <h2 className="mt-1 text-xl font-semibold">More project details</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/projects/${previousProject.slug}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            Previous: {previousProject.title}
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className={buttonVariants()}>
            Next: {nextProject.title}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
