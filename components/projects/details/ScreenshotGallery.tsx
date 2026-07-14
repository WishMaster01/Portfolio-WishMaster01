import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ScreenshotGalleryProps = {
  screenshots: Project["screenshots"];
  compact?: boolean;
};

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  return (
    <Reveal>
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700">
              ▤
            </span>
            <h2 className="text-xl font-bold text-slate-950">Screenshots</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.title}
              className="min-w-[240px] overflow-hidden rounded-xl border border-slate-200 bg-violet-50"
            >
              <div className="grid aspect-video place-items-center p-6">
                <Image
                  src={screenshot.image}
                  alt={`${screenshot.title} screenshot`}
                  width={96}
                  height={96}
                  className="h-16 w-16 opacity-70"
                />
              </div>
              <div className="space-y-1 bg-white p-3">
                <h3 className="font-semibold">{screenshot.title}</h3>
                <p className="text-xs leading-5 text-slate-500">
                  {screenshot.description}
                </p>
              </div>
            </div>
          ))}
          </div>
          <div className="flex items-center justify-between">
            <button className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500" type="button">
              ←
            </button>
            <div className="flex gap-2">
              {screenshots.map((screenshot, index) => (
                <span
                  key={screenshot.title}
                  className={[
                    "h-1.5 rounded-full",
                    index === 0 ? "w-5 bg-violet-600" : "w-2 bg-slate-300",
                  ].join(" ")}
                />
              ))}
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-full bg-violet-600 text-white" type="button">
              →
            </button>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
