export type Article = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt?: string;
  readingTime: string;
  category: string;
  image: string;
  coverImage?: string;
  author: string;
  tags: string[];
  coverAlt: string;
  summary: string;
  published?: boolean;
  views?: number;
  content: {
    heading: string;
    body: string[];
    bullets?: string[];
    code?: string;
    language?: string;
  }[];
};
