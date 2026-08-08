"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { PriorityQueue } from "@/lib/algorithms/priority-queue";
import type { Project } from "@/types/project";

type ScreenshotGalleryProps = {
  screenshots: Project["screenshots"];
};

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(
    () => new Set([0]),
  );

  const scheduledScreenshots = useMemo(() => {
    const queue = new PriorityQueue<{
      index: number;
      priority: number;
      screenshot: Project["screenshots"][number];
    }>((left, right) => left.priority - right.priority || left.index - right.index);

    screenshots.forEach((screenshot, index) => {
      queue.push({
        index,
        screenshot,
        priority: index === 0 ? 0 : index * 10 + screenshot.title.length,
      });
    });

    const ordered: Array<{
      index: number;
      priority: number;
      screenshot: Project["screenshots"][number];
    }> = [];

    while (queue.size > 0) {
      const item = queue.pop();

      if (item) {
        ordered.push(item);
      }
    }

    return ordered;
  }, [screenshots]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute("data-card-index"));

              if (!Number.isNaN(index)) {
                next.add(index);
              }
            }
          });

          return next;
        });
      },
      {
        rootMargin: "120px 0px",
        threshold: 0.2,
      },
    );

    cardRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [scheduledScreenshots]);

  return (
    <Reveal>
      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="space-y-6 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
              Screenshots
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Interface surfaces
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Image cards are scheduled by a priority queue, then revealed with
              Intersection Observer so above-the-fold project assets load first.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {scheduledScreenshots.map(({ index, screenshot }, orderedIndex) => {
              const isVisible = visibleCards.has(index);

              return (
                <div
                  key={screenshot.title}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  data-card-index={index}
                  className="group overflow-hidden rounded-2xl border border-border bg-background/70 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
                >
                  <div className="grid aspect-video place-items-center bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_42%),linear-gradient(135deg,var(--surface-elevated),var(--background))] p-8">
                    <div className="rounded-2xl border border-border bg-surface/80 p-5 shadow-lg transition group-hover:scale-105">
                      {isVisible ? (
                        <Image
                          src={screenshot.image}
                          alt={`${screenshot.title} screenshot`}
                          width={80}
                          height={80}
                          loading={orderedIndex === 0 ? "eager" : "lazy"}
                          priority={orderedIndex === 0}
                          className="h-14 w-14 opacity-70"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-2xl bg-accent/10" />
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                      Surface {index + 1}
                    </p>
                    <h3 className="mt-2 font-black text-foreground">
                      {screenshot.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {screenshot.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
