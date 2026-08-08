"use client";

import { useMemo, useState } from "react";
import { analyzeResume } from "@/lib/resume/resume-analyzer";
import type { Project } from "@/types/project";

type ResumeAnalyzerProps = {
  projects: Project[];
};

const starterQueries = [
  "Next.js AI product engineer Prisma PostgreSQL",
  "Frontend system design performance accessibility",
  "Full-stack SaaS developer recruiter portfolio",
];

export function ResumeAnalyzer({ projects }: ResumeAnalyzerProps) {
  const [query, setQuery] = useState(starterQueries[0]);

  const analysis = useMemo(
    () => analyzeResume(query, projects),
    [projects, query],
  );

  return (
    <section className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            AI Resume Analyzer
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Keyword and relevance analysis
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            This analyzer runs trie-backed search, TF-IDF and BM25-style
            ranking, keyword matching, and cosine similarity against the actual
            resume and project corpus.
          </p>
        </div>

        <label>
          <span className="sr-only">Recruiter prompt</span>
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-28 w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground"
            placeholder="Paste a recruiter search or job requirement"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {starterQueries.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuery(item)}
              className="rounded-full border border-border bg-background px-4 py-2 text-xs font-black text-muted-foreground transition hover:border-accent/50 hover:text-accent"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[2rem] border border-accent/20 bg-accent p-5 text-accent-foreground">
          <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
            Resume match score
          </p>
          <p className="mt-3 text-4xl font-black">{analysis.score}%</p>
          <p className="mt-3 text-sm leading-6 opacity-90">
            Hybrid score based on keyword coverage and corpus similarity across
            resume evidence and portfolio projects.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
              Matched keywords
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.matchedKeywords.length > 0 ? (
                analysis.matchedKeywords.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-black text-accent"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Add a longer recruiter query to evaluate matching skills.
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
              Missing keywords
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.missingKeywords.length > 0 ? (
                analysis.missingKeywords.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  The current portfolio corpus already covers the entered terms.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {analysis.rankedEvidence.map((item, index) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border bg-background/70 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                  Evidence {index + 1}
                </p>
                <h3 className="mt-2 font-black text-foreground">
                  {item.title}
                </h3>
              </div>
              <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-black text-muted-foreground">
                {item.source}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
