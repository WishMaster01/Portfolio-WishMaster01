"use client";

type BlogSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <label className="block">
      <span className="sr-only">Search articles</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search articles, tags, categories..."
        className="h-12 w-full rounded-2xl border border-border bg-surface px-5 text-sm font-semibold outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
      />
    </label>
  );
}
