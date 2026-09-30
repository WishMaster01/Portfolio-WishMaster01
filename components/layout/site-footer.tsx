"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export function SiteFooter() {
  const pathname = usePathname();
  const isProjectDetailPage = /^\/projects\/[^/]+$/.test(pathname);

  if (isProjectDetailPage) {
    return null;
  }

  return (
    <footer className="print-hide border-t border-border/80 bg-surface/70 backdrop-blur-xl text-foreground">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-12 sm:px-8 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Positioning */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-accent/40 text-lg font-black leading-none text-accent">
                SK
              </span>
              <div>
                <span className="text-base font-black tracking-tight text-foreground block">
                  Sumit Kumar
                </span>
                <span className="text-[11px] font-mono text-accent">
                  @WishMaster01
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm max-w-sm">
              Full Stack Developer, Software Developer Engineer, and AI Engineer building
              production web applications, resilient services, and retrieval-grounded systems.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/recruiter"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-xs font-black text-accent-foreground shadow-md shadow-accent/20 transition hover:opacity-95"
              >
                <span>Recruiter View</span>
                <span>⚡</span>
              </Link>
              <Link
                href="/resume/WishMaster01-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3.5 text-xs font-bold text-foreground transition hover:border-accent/40 hover:text-accent"
              >
                Resume PDF
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-accent">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-accent transition-colors">
                  Engineering Hub
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-accent transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/activity" className="hover:text-accent transition-colors">
                  Activity &amp; GitHub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering Hub */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-accent">
              Engineering
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
              <li>
                <Link href="/engineering/architecture" className="hover:text-accent transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/engineering/algorithms" className="hover:text-accent transition-colors">
                  Algorithms &amp; DSA
                </Link>
              </li>
              <li>
                <Link href="/engineering/ai" className="hover:text-accent transition-colors">
                  AI Engineering
                </Link>
              </li>
              <li>
                <Link href="/engineering/security" className="hover:text-accent transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/engineering/performance" className="hover:text-accent transition-colors">
                  Performance
                </Link>
              </li>
              <li>
                <Link href="/engineering/testing" className="hover:text-accent transition-colors">
                  Testing Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-accent">
              Projects &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
              {projects.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                    {p.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border/60">
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-accent transition-colors">
                  Sitemap (XML)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} ({siteConfig.handle}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/WishMaster01"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/wishmaster01"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/WishMaster01/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              LeetCode
            </a>
            <Link href="/contact" className="hover:text-accent transition-colors">
              hello@wishmaster01.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
