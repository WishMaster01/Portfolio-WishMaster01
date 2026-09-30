import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { siteConfig } from "@/data/site";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata = {
  title: "Privacy Policy | Sumit Kumar Portfolio",
  description: "Privacy practices for Sumit Kumar's engineering portfolio.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: March 2026 • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <GlassCard className="space-y-6 p-8 text-sm leading-7 text-muted-foreground sm:p-10">
          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">1. Overview</h2>
            <p>
              This developer portfolio is operated by Sumit Kumar (WishMaster01). We respect
              your privacy and are committed to transparent, minimal data practices. This website
              does not run third-party behavioral trackers or sell personal data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">2. Information Collected</h2>
            <p>
              When you submit a message through the contact form or subscribe to the technical
              newsletter, we receive only the information you voluntarily provide (name, email
              address, and message content). We use this information solely to reply to inquiries
              or send requested technical updates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">3. Analytics &amp; Cookies</h2>
            <p>
              We store minimal local preferences (such as your chosen Aurora theme: Light, Dark,
              or Eclipse) via browser local storage to maintain UI consistency across visits.
              Session identifiers for authenticated admin areas are stored in secure HTTP-only cookies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-foreground">4. Contact</h2>
            <p>
              If you have any questions about this privacy statement, you can reach out directly
              at <a href={`mailto:${siteConfig.email}`} className="text-accent underline">{siteConfig.email}</a>.
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
