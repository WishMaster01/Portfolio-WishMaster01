import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecruiterActions } from "@/components/recruiter/recruiter-actions";
import { RecruiterAnalyticsTracker } from "@/components/recruiter/recruiter-analytics";
import { RecruiterEngineeringHighlights } from "@/components/recruiter/recruiter-engineering-highlights";
import { RecruiterHero } from "@/components/recruiter/recruiter-hero";
import { RecruiterProfileSummary } from "@/components/recruiter/recruiter-profile-summary";
import { RecruiterProjectGrid } from "@/components/recruiter/recruiter-project-grid";
import { RecruiterSkills } from "@/components/recruiter/recruiter-skills";
import { RecruiterSnapshot } from "@/components/recruiter/recruiter-snapshot";
import { ProjectComparisonMatrix } from "@/components/recruiter/project-comparison-matrix";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/data/site";
import { getRecruiterProfile } from "@/server/queries/get-recruiter-profile";

export const metadata: Metadata = {
  title: "Recruiter Mode",
  description:
    "One-page recruiter summary for WishMaster01: headline, availability, skills, projects, education, experience, resume, GitHub, LinkedIn, and contact.",
  alternates: {
    canonical: "/recruiter",
  },
  openGraph: {
    title: `Recruiter Mode | ${siteConfig.name}`,
    description:
      "Condensed recruiter profile for WishMaster01 with top skills, projects, resume, GitHub, LinkedIn, and contact.",
    url: `${siteConfig.url}/recruiter`,
    siteName: siteConfig.name,
    type: "profile",
  },
};

export default async function RecruiterPage() {
  const { profile, projects } = await getRecruiterProfile();

  if (!profile) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <RecruiterAnalyticsTracker />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--theme-texture)] bg-[length:var(--theme-texture-size)] opacity-60" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.headline,
            description: profile.summary,
            email: profile.email,
            url: `${siteConfig.url}/recruiter`,
            sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
            knowsAbout: profile.topSkills,
          }),
        }}
      />
      <Section className="py-8 sm:py-12">
        <Container className="max-w-[1180px]">
          <div className="space-y-12 sm:space-y-16">
            {/* 15–30s Fast Recruiter Snapshot */}
            <RecruiterSnapshot profile={profile} projects={projects} />

            {/* Profile Hero & Availability */}
            <RecruiterHero
              name={profile.name}
              headline={profile.headline}
              summary={profile.summary}
              availability={profile.availability}
              targetRoles={profile.targetRoles}
              preferredLocations={profile.preferredLocations}
              workModes={profile.workModes}
            />

            {/* Core Skills */}
            <RecruiterSkills skills={profile.topSkills} />

            {/* Selected Projects */}
            <RecruiterProjectGrid projects={projects} />

            {/* Project Comparison & Evaluation UX */}
            <ProjectComparisonMatrix />

            {/* Implemented Engineering Highlights */}
            <RecruiterEngineeringHighlights />

            {/* Academic Foundation & Experience */}
            <RecruiterProfileSummary
              education={profile.education}
              experienceSummary={profile.experienceSummary}
              highlights={profile.highlights}
            />

            {/* Direct Recruiter Actions */}
            <RecruiterActions
              resumeUrl={profile.resumeUrl}
              githubUrl={profile.githubUrl}
              linkedinUrl={profile.linkedinUrl}
              email={profile.email}
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
