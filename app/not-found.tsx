import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Card>
          <CardContent className="space-y-6 p-8">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
              404
            </p>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight">
                This page does not exist.
              </h1>
              <p className="leading-7 text-muted-foreground">
                The route may have moved, or the project slug is not part of
                the generated portfolio paths.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants()} href="/projects">
                View projects
              </Link>
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href="/"
              >
                Go home
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
