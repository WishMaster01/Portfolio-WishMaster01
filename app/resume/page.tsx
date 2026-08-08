import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { AchievementsSection } from "@/components/resume/AchievementsSection";
import { CertificationSection } from "@/components/resume/CertificationSection";
import { ContactDetailsSection } from "@/components/resume/ContactDetailsSection";
import { EducationSection } from "@/components/resume/EducationSection";
import { ExperienceSection } from "@/components/resume/ExperienceSection";
import { PrintResumeDocument } from "@/components/resume/PrintResumeDocument";
import { ProjectSection } from "@/components/resume/ProjectSection";
import { ResumeAnalyzer } from "@/components/resume/resume-analyzer";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { SkillsSection } from "@/components/resume/SkillsSection";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for WishMaster01 covering profile, education, skills, projects, experience, achievements, certifications, and contact details.",
};

export default function ResumePage() {
  return (
    <div className="bg-background text-foreground">
      <PrintResumeDocument />
      <Section className="screen-resume py-12 sm:py-16">
        <Container className="max-w-[1240px]">
          <Reveal>
            <ResumeHeader />
          </Reveal>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <main className="space-y-6">
              <Reveal delay={0.04}>
                <section className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
                  <h2 className="text-xl font-black">Profile</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {resume.summary}
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.06}>
                <ResumeAnalyzer projects={projects} />
              </Reveal>

              <Reveal delay={0.08}>
                <ExperienceSection />
              </Reveal>

              <Reveal delay={0.12}>
                <SkillsSection />
              </Reveal>

              <Reveal delay={0.16}>
                <AchievementsSection />
              </Reveal>
            </main>

            <aside className="space-y-6 xl:self-start">
              <Reveal delay={0.1}>
                <ProjectSection />
              </Reveal>

              <Reveal delay={0.14}>
                <EducationSection />
              </Reveal>

              <Reveal delay={0.18}>
                <CertificationSection />
              </Reveal>

              <Reveal delay={0.22}>
                <ContactDetailsSection />
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
