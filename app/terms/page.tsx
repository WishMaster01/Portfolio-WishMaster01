import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { siteConfig } from "@/data/site";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata = {
  title: "Terms of Use | Sumit Kumar Portfolio",
  description: "Terms of use for Sumit Kumar's developer portfolio.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
            Legal &amp; Transparency
          </span>
          <h1 className="mt-2 text-3xl font-black text-foreground sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: March 2026
          </p>
        </div>

        <GlassCard className="space-y-6 p-8 text-sm leading-7 text-muted-foreground sm:p-10">
          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">1. Purpose</h2>
            <p>
              This website serves as a professional portfolio showcasing the engineering
              work, software architecture, case studies, and skills of Sumit Kumar.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">2. Intellectual Property</h2>
            <p>
              The code architecture, design systems, and original case studies presented on this
              site are authored by Sumit Kumar. Open-source repositories linked from this portfolio
              are licensed under their respective repository licenses (typically MIT).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">3. Fair Use &amp; Code Execution</h2>
            <p>
              Interactive algorithm demonstrations and sandboxed code execution endpoints are
              rate-limited and monitored to prevent resource exhaustion and abuse. Automated scraping
              or denial-of-service attempts are strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">4. Inquiries</h2>
            <p>
              For professional inquiries, hiring discussions, or questions, please email{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent underline">
                {siteConfig.email}
              </a>.
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
