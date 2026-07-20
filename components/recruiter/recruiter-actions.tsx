"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackRecruiterEvent } from "./recruiter-analytics";

type RecruiterActionsProps = {
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl?: string;
  email: string;
};

export function RecruiterActions({
  resumeUrl,
  githubUrl,
  linkedinUrl,
  email,
}: RecruiterActionsProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-accent p-6 text-accent-foreground shadow-2xl shadow-accent/20 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] opacity-75">
            Recruiter actions
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.045em] sm:text-4xl">
            Need a fast decision? Start here.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 opacity-85">
            Download the resume, inspect GitHub work, open LinkedIn, or send a
            direct email without navigating the full portfolio.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="secondary"
            className="border-white/80 bg-white text-slate-950 shadow-lg shadow-black/10 hover:bg-white/90 hover:text-slate-950"
          >
            <a
              href={resumeUrl}
              download
              onClick={() =>
                trackRecruiterEvent("recruiter_resume_downloaded", resumeUrl)
              }
            >
              Download Resume
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="border border-white/30 bg-white/5 text-accent-foreground hover:bg-white/15 hover:text-accent-foreground"
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackRecruiterEvent("recruiter_github_clicked", githubUrl)
              }
            >
              GitHub
            </a>
          </Button>
          {linkedinUrl ? (
            <Button
              asChild
              variant="ghost"
              className="border border-white/30 bg-white/5 text-accent-foreground hover:bg-white/15 hover:text-accent-foreground"
            >
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackRecruiterEvent(
                    "recruiter_linkedin_clicked",
                    linkedinUrl,
                  )
                }
              >
                LinkedIn
              </a>
            </Button>
          ) : null}
          <Button
            asChild
            variant="ghost"
            className="border border-white/30 bg-white/5 text-accent-foreground hover:bg-white/15 hover:text-accent-foreground"
          >
            <Link
              href={`mailto:${email}`}
              onClick={() =>
                trackRecruiterEvent("recruiter_contact_clicked", email)
              }
            >
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
