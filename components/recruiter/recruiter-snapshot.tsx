"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { RecruiterProfileData, RecruiterProject } from "@/types/recruiter";
import { trackRecruiterEvent } from "./recruiter-analytics";

type RecruiterSnapshotProps = {
  profile: RecruiterProfileData;
  projects: RecruiterProject[];
};

export function RecruiterSnapshot({ profile, projects }: RecruiterSnapshotProps) {
  return (
    <section aria-labelledby="recruiter-snapshot-heading">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-accent/30 bg-surface/95 p-6 shadow-2xl shadow-accent/15 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_20%,transparent)] blur-3xl" />

          {/* Top Header Bar */}
          <div className="relative flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-black uppercase tracking-[0.2em] text-accent">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                15–30s Recruiter Snapshot
              </div>
              <h2
                id="recruiter-snapshot-heading"
                className="mt-3 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
              >
                Fast Evaluation Dossier
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything required to make a screening decision in 30 seconds or less.
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Button asChild size="sm" className="bg-accent font-black text-accent-foreground hover:bg-accent/90">
                <a
                  href={profile.resumeUrl}
                  download
                  onClick={() => trackRecruiterEvent("recruiter_resume_downloaded", profile.resumeUrl)}
                >
                  <svg
                    className="mr-1.5 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Resume PDF
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="font-black">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackRecruiterEvent("recruiter_github_clicked", profile.githubUrl)}
                >
                  GitHub
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="font-black">
                <Link
                  href={`mailto:${profile.email}`}
                  onClick={() => trackRecruiterEvent("recruiter_contact_clicked", profile.email)}
                >
                  Email
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div className="relative mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Identity & Target Roles */}
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                Candidate & Roles
              </p>
              <p className="mt-2 text-lg font-black text-foreground">{profile.name}</p>
              <p className="text-xs font-bold text-muted-foreground">{profile.headline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.targetRoles.slice(0, 3).map((role) => (
                  <span
                    key={role}
                    className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-bold text-foreground"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Stack */}
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                Strongest Technologies
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {profile.topSkills.slice(0, 7).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-black text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Projects */}
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                Strongest Projects
              </p>
              <ul className="mt-2.5 space-y-1.5 text-xs font-bold">
                {projects.slice(0, 3).map((project) => (
                  <li key={project.slug} className="flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}/case-study`}
                      className="text-foreground transition hover:text-accent hover:underline"
                    >
                      {project.title}
                    </Link>
                    <span className="rounded bg-surface-elevated px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {project.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability & Location */}
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                Availability & Terms
              </p>
              <p className="mt-2 text-sm font-bold text-emerald-500">
                ✓ Immediate / Open to Offers
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Locations: {profile.preferredLocations.join(", ")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Modes: {profile.workModes.join(", ")}
              </p>
              <p className="mt-2 text-xs font-bold text-foreground">
                Education: B.Tech Computer Science
              </p>
            </div>
          </div>

          {/* Quick Verified Engineering Metrics */}
          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/20 bg-accent/5 px-4 py-3 text-xs">
            <span className="font-bold text-muted-foreground">
              Truthful Architecture Proof:
            </span>
            <div className="flex flex-wrap items-center gap-4 font-black">
              <span className="text-foreground">113 Pre-rendered Routes</span>
              <span className="text-foreground">75+ Automated Unit/Integration Tests</span>
              <span className="text-foreground">16 AI RAG Benchmark Evals</span>
              <span className="text-foreground">100% Strict TypeScript</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
