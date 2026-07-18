type UseCaseSectionProps = {
  useCases: string[];
};

export function UseCaseSection({ useCases }: UseCaseSectionProps) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5">
      <h2 className="text-xl font-black">Real-world use cases</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {useCases.map((useCase) => (
          <div
            key={useCase}
            className="rounded-2xl border border-border bg-background/70 p-4 text-sm font-bold leading-6 text-muted-foreground"
          >
            {useCase}
          </div>
        ))}
      </div>
    </section>
  );
}
