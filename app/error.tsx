"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container className="max-w-3xl">
        <Card>
          <CardContent className="space-y-6 p-8">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
              Runtime error
            </p>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight">
                Something failed while rendering this page.
              </h1>
              <p className="leading-7 text-muted-foreground">
                Try again. If this repeats, the error is likely in a route,
                data loader, or API boundary added during the latest phase.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className={buttonVariants()} onClick={reset}>
                Try again
              </button>
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
