import type { Metadata } from "next";
import { AboutDashboard } from "@/components/about/about-dashboard";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about WishMaster01, a full-stack AI and SaaS developer focused on product architecture, clean UI, DSA, and production-ready web applications.",
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1380px]">
          <AboutDashboard />
        </Container>
      </Section>
    </div>
  );
}
