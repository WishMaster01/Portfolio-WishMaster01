import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DsaTopicPage } from "@/components/dsa/DsaTopicPage";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  algorithmTopics,
  dsaPracticeProblems,
  getAlgorithmTopicBySlug,
} from "@/data/dsa";

type DsaTopicRouteProps = {
  params: Promise<{
    topic: string;
  }>;
};

export function generateStaticParams() {
  return algorithmTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: DsaTopicRouteProps): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getAlgorithmTopicBySlug(slug);

  if (!topic) {
    return {
      title: "DSA topic not found",
    };
  }

  return {
    title: `${topic.title} DSA Guide`,
    description: `${topic.title} explained with definition, visual explanation, Java code, complexities, use cases, and related problems.`,
    openGraph: {
      title: `${topic.title} DSA Guide`,
      description: topic.explanation,
      type: "article",
    },
  };
}

export default async function DsaTopicRoute({ params }: DsaTopicRouteProps) {
  const { topic: slug } = await params;
  const topic = getAlgorithmTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const problems = dsaPracticeProblems.filter(
    (problem) => problem.topicSlug === topic.slug,
  );

  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1380px]">
          <DsaTopicPage
            topic={topic}
            topics={algorithmTopics}
            problems={problems}
          />
        </Container>
      </Section>
    </div>
  );
}
