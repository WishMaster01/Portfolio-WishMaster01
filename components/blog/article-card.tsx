import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@/types/article";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{article.category}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={article.date}>
            {new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(article.date))}
          </time>
          <span aria-hidden="true">/</span>
          <span>{article.readingTime}</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {article.title}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {article.excerpt}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
