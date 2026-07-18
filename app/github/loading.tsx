import { GitHubStatsSkeleton } from "@/components/github/GitHubStatsSkeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function GitHubLoading() {
  return (
    <Section className="py-12 sm:py-16">
      <Container className="max-w-[1380px]">
        <GitHubStatsSkeleton />
      </Container>
    </Section>
  );
}
