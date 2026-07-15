export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  author: string;
  tags: string[];
  coverAlt: string;
  summary: string;
  content: {
    heading: string;
    body: string[];
    bullets?: string[];
    code?: string;
  }[];
};
