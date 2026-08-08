"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Article } from "@/types/article";
import { buildSearchIndex, searchIndex } from "@/lib/algorithms/text-search";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogSearch } from "@/components/blog/BlogSearch";

type BlogExplorerProps = {
  articles: Article[];
  categories: string[];
  tags: string[];
};

export function BlogExplorer({
  articles,
  categories,
  tags,
}: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");

  const articleSearchIndex = useMemo(
    () =>
      buildSearchIndex(
        articles.map((article) => ({
          id: article.slug,
          title: article.title,
          body: [
            article.excerpt,
            article.summary,
            article.category,
            article.tags.join(" "),
            article.content
              .flatMap((section) => [
                section.heading,
                section.body.join(" "),
                section.bullets?.join(" ") ?? "",
              ])
              .join(" "),
          ].join(" "),
          keywords: [...article.tags, article.category],
          payload: article,
        })),
      ),
    [articles],
  );

  const filteredArticles = useMemo(() => {
    const baseArticles = articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesTag = activeTag === "All" || article.tags.includes(activeTag);

      return matchesCategory && matchesTag;
    });

    if (!deferredQuery.trim()) {
      return baseArticles;
    }

    const rankedArticles = searchIndex(
      articleSearchIndex,
      deferredQuery,
      articles.length,
    ).map((result) => result.item);
    const allowedSlugs = new Set(baseArticles.map((article) => article.slug));
    const visibleArticles = rankedArticles.filter((article) =>
      allowedSlugs.has(article.slug),
    );
    const visibleSlugs = new Set(visibleArticles.map((article) => article.slug));

    return [
      ...visibleArticles,
      ...baseArticles.filter((article) => !visibleSlugs.has(article.slug)),
    ];
  }, [
    activeCategory,
    activeTag,
    articleSearchIndex,
    articles,
    deferredQuery,
  ]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-surface/80 p-4 shadow-xl shadow-accent/5 backdrop-blur sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <BlogSearch value={query} onChange={setQuery} />
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <p className="text-2xl font-black">{filteredArticles.length}</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              matching articles
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              BM25-style ranking, prefix search, and fuzzy title recovery.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <BlogFilters
            categories={categories}
            tags={tags}
            activeCategory={activeCategory}
            activeTag={activeTag}
            onCategoryChange={setActiveCategory}
            onTagChange={setActiveTag}
          />
        </div>
      </div>

      {filteredArticles.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.04 }}
            >
              <BlogCard article={article} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <h2 className="text-2xl font-black">No articles found</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Try a different search term, category, or tag.
          </p>
        </div>
      )}
    </div>
  );
}
