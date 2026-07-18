import { Card, CardContent } from "@/components/ui/card";

export function GitHubStatsSkeleton() {
  return (
    <div className="space-y-8" aria-label="Loading GitHub statistics">
      <Card className="rounded-[2.25rem] bg-surface/95">
        <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
          <div className="space-y-4">
            <SkeletonLine className="h-4 w-48" />
            <SkeletonLine className="h-14 w-3/4" />
            <SkeletonLine className="h-5 w-56" />
            <SkeletonLine className="h-24 w-full" />
          </div>
          <SkeletonLine className="h-60 rounded-[2rem]" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="rounded-3xl bg-surface/95">
            <CardContent className="space-y-3 p-5">
              <SkeletonLine className="h-8 w-16" />
              <SkeletonLine className="h-4 w-24" />
              <SkeletonLine className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <SkeletonPanel />
        <SkeletonPanel />
      </div>
    </div>
  );
}

function SkeletonPanel() {
  return (
    <Card className="rounded-[2rem] bg-surface/95">
      <CardContent className="space-y-4 p-6">
        <SkeletonLine className="h-5 w-40" />
        <SkeletonLine className="h-8 w-64" />
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonLine key={index} className="h-16 w-full rounded-2xl" />
        ))}
      </CardContent>
    </Card>
  );
}

function SkeletonLine({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-accent/10 ${className}`}
    />
  );
}
