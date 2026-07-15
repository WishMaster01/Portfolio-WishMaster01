import type { Metadata } from "next";
import Link from "next/link";
import { CreateBlogForm } from "@/components/blog/create-blog-form";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Create Blog",
  description: "Create a local blog draft for WishMaster01 portfolio.",
};

export default function CreateBlogPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1180px]">
          <Reveal className="mb-8">
            <Link href="/blog" className="text-sm font-black text-accent">
              ← Back to Blog
            </Link>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Create Blog
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Draft technical posts from the portfolio UI. This is intentionally
              local-first until you add authenticated admin publishing.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="rounded-2xl">
              <CardContent className="p-5 sm:p-6">
                <CreateBlogForm />
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
