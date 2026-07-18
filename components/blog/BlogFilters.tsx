"use client";

type BlogFiltersProps = {
  categories: string[];
  tags: string[];
  activeCategory: string;
  activeTag: string;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
};

export function BlogFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
  onCategoryChange,
  onTagChange,
}: BlogFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-muted-foreground">
          Categories
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={
                activeCategory === category
                  ? "shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-black text-accent-foreground shadow-lg shadow-accent/20"
                  : "shrink-0 rounded-full border border-border bg-surface px-4 py-2 text-xs font-black text-muted-foreground transition hover:border-accent/60 hover:text-accent"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-muted-foreground">
          Tags
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {["All", ...tags].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagChange(tag)}
              className={
                activeTag === tag
                  ? "shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-black text-background"
                  : "shrink-0 rounded-full border border-border bg-surface px-4 py-2 text-xs font-black text-muted-foreground transition hover:border-accent/60 hover:text-accent"
              }
            >
              {tag === "All" ? "All tags" : `#${tag}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
