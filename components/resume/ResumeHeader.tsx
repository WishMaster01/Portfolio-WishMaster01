import Link from "next/link";
import { DownloadResumeButton } from "@/components/resume/DownloadResumeButton";
import { PrintResumeButton } from "@/components/resume/PrintResumeButton";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { resume } from "@/data/resume";

export function ResumeHeader() {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-accent/20 bg-surface/95 shadow-2xl shadow-accent/10">
      <CardContent className="relative p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_12%_0%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_34%),radial-linear(circle_at_90%_12%,color-mix(in_oklab,var(--ambient-two)_14%,transparent),transparent_30%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              Resume
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              {resume.name}
            </h1>
            <p className="mt-3 text-xl font-black text-accent sm:text-2xl">
              {resume.title}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {resume.summary}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background/75 p-5">
            <div className="grid gap-2 text-sm">
              <ContactLine label="Location" value={resume.location} />
              <ContactLine
                label="Email"
                value={resume.email}
                href={`mailto:${resume.email}`}
              />
              <ContactLine
                label="GitHub"
                value="github.com/WishMaster01"
                href={resume.github}
              />
              <ContactLine
                label="Portfolio"
                value="wishmaster01.com"
                href={resume.portfolio}
              />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <DownloadResumeButton />
              <PrintResumeButton />
              <a
                href={resume.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full sm:w-auto",
                })}
              >
                View GitHub
              </a>
              <Link
                href="/contact"
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full sm:w-auto",
                })}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-surface/80 px-4 py-3">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="text-right text-sm font-black text-accent"
        >
          {value}
        </a>
      ) : (
        <span className="text-right text-sm font-black">{value}</span>
      )}
    </div>
  );
}
