import Link from "next/link";

type ProjectBreadcrumbProps = {
  title: string;
  slug?: string;
  section?: string;
};

export function ProjectBreadcrumb({
  title,
  slug,
  section,
}: ProjectBreadcrumbProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted-foreground">
      <Link href="/" className="transition hover:text-accent">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <Link href="/projects" className="transition hover:text-accent">
        Projects
      </Link>
      <span aria-hidden="true">/</span>
      {slug ? (
        <Link
          href={`/projects/${slug}`}
          className="transition hover:text-accent"
        >
          {title}
        </Link>
      ) : (
        <span className="text-foreground">{title}</span>
      )}
      {section ? (
        <>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{section}</span>
        </>
      ) : null}
    </div>
  );
}
