# WishMaster01 Portfolio

Enterprise-grade developer portfolio for AI products, SaaS interfaces, full-stack engineering, data structures and algorithms, technical writing, and recruiter-facing presentation.

Live Portfolio: [https://wishmaster01.vercel.app](https://wishmaster01.vercel.app)

This repository uses `NEXT_PUBLIC_SITE_URL` for metadata, canonical URLs, sitemap generation, robots rules, resume links, and route references. Set it to your deployed domain before shipping.

## Overview

The portfolio is built with Next.js App Router and presents WishMaster01 as a production-minded full-stack developer with strong frontend systems, API design, portfolio engineering, and algorithmic implementation skills.

## What This Portfolio Includes

- Multi-page public portfolio built with the Next.js App Router
- Project showcase with detailed product, architecture, and engineering pages
- Skills and experience dashboards
- Resume page with download and print support
- About page with capability, principles, and journey sections
- Technical blog with category, tag, and related-article exploration
- Interactive DSA showcase with topic pages, explanations, examples, and practice problems
- GitHub analytics dashboard
- Recruiter mode page
- Contact page with validated form and newsletter signup
- AI portfolio chatbot grounded in portfolio context
- Admin dashboard for content and analytics workflows
- Theme system with multiple visual presets

## Algorithm-Driven Features

The repository now demonstrates production-style algorithm usage across the app instead of isolating algorithms into toy demos.

- Command palette: trie prefix search, fuzzy matching, binary search-assisted ranking, and Levenshtein distance
- Project search: inverted index, TF-IDF-style scoring, trie prefix matching, and ranking
- Related projects: cosine similarity, Jaccard similarity, and graph-based relevance scoring
- Blog search: trie search, inverted index retrieval, BM25-style ranking, and prefix matching
- AI chatbot: vector similarity, embeddings-style retrieval, LRU caching, hash-map backed state, and rate limiting
- GitHub dashboard: priority queue ranking, heap-based top-k selection, sorting, and cache-aware fetch flows
- Project filters: hash maps, sets, and sort-ready filtering logic
- Timeline and experience sections: graph modeling and topological ordering
- Skills section: weighted graph, dependency graph, DFS, and BFS
- Contact form: sliding-window rate limiting and token bucket protection
- Newsletter: Bloom filter, duplicate detection, and rate limiting
- Cache layer: LRU and LFU cache implementations
- Analytics dashboard: prefix sums, Fenwick tree, segment tree, and moving average
- Routing: shortest path on a navigation graph
- Recruiter mode: priority-queue ranking of featured projects by impact and relevance
- Project comparison: weighted graph scoring, cosine similarity, and dynamic programming
- Resume analyzer: trie-backed keyword matching, TF-IDF/BM25-style ranking, and cosine similarity
- Code execution: Judge0-backed job scheduling with a priority queue

## DSA Showcase

The `/dsa-showcase` route covers recruiter-relevant algorithm topics with production context, explanations, complexity notes, visualizations, and code examples.

Included topics:

- Arrays
- Linked Lists
- Stacks
- Queues
- Hash Tables
- Trees
- Binary Search Trees
- AVL Trees
- Heaps
- Priority Queues
- Tries
- Graphs
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- Divide and Conquer
- Sliding Window
- Two Pointers
- Binary Search
- Recursion
- Segment Trees
- Fenwick Trees
- Union Find
- Topological Sort
- Shortest Path
- Network Flow
- String Algorithms
- Sorting Algorithms
- Searching Algorithms
- Caching Algorithms
- Scheduling Algorithms
- Compression Algorithms

Each topic includes:

- Definition
- Real-world use case
- Interactive visualization
- Time complexity
- Space complexity
- Advantages
- Disadvantages
- Interview questions
- Practice problems
- FAANG company references
- Python, JavaScript, and TypeScript implementations

## Core Product Modules

### Projects

The portfolio currently contains five primary case studies:

- `InfinityAI` - AI product platform with prompt UX, output states, provider-safe API boundaries, and future usage and account flows
- `ExploreX` - travel discovery system with itinerary-ready content structure, SEO-first routing, and maps-ready UI
- `DailyEssentials` - commerce storefront focused on category navigation, conversion-oriented cards, and checkout-ready boundaries
- `Vyvo` - wellness dashboard concept with calm information hierarchy, metric cards, and visualization-ready modules
- `WishCart` - marketplace platform with seller-aware catalog modeling, transaction boundaries, and full-stack commerce direction

Each project includes summary, problem, solution, impact, stack, technologies, features, metrics, architecture layers, milestones, challenges, future scope, and dedicated detail routes.

### Blog

The blog section includes technical writing across:

- Next.js architecture
- AI portfolio chatbots
- PostgreSQL and Prisma schema design
- DSA learning patterns
- AI trip planners
- Authentication
- Payment integrations
- Real-time chat
- Deployment workflows
- Product and AI case studies

Blog capabilities include search, category filters, tag filters, reading time labels, table of contents, syntax-highlighted code blocks, related articles, adjacent article navigation, and Open Graph metadata.

### GitHub and Recruiter Flows

- GitHub profile overview
- Repository statistics
- Language chart
- Contribution graph
- Recent activity
- Pinned repositories
- Recruiter mode with summary, skills, projects, links, and contact path

### Contact and Communication

- Contact form with schema validation
- Newsletter subscription flow
- Server-side rate limiting
- PostgreSQL-backed storage
- Resend email integration
- Spam-resistant request handling

### AI Chatbot

The chatbot is built around structured portfolio context and provider fallback.

Current behavior includes:

- Context-grounded replies about projects, skills, resume, and experience
- Input validation with Zod
- OpenRouter as the primary provider
- Gemini as the fallback provider
- Server-side provider key protection
- Response caching

### Admin Dashboard

The admin route supports portfolio operations and includes:

- Project inventory table
- Project form
- Case-study editor
- Blog inventory table
- Blog editor
- Recent message viewer
- Content distribution analytics
- Skills, DSA, resume, newsletter, and settings summary modules

## Design and UX System

- Tailwind CSS v4 styling
- Framer Motion transitions and reveal effects
- Responsive layouts across mobile, tablet, and desktop
- Reduced-motion support
- Skip links and focus visibility
- Light, dark, cyber, gradient, solarized, ocean, forest, sunset, monochrome, and futuristic themes
- Command palette for route and content navigation

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- `cmdk`

### Backend and Data

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- Zod validation

### Integrations

- OpenRouter
- Google Gemini
- GitHub API
- Judge0
- Resend

## Local Setup

```bash
git clone https://github.com/WishMaster01/wishmaster01-portfolio.git
cd wishmaster01-portfolio
npm install
cp .env.example .env
```

Then configure your environment variables and run:

```bash
npm run dev
```

Local app URL: [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio
```

## Environment Variables

```env
DATABASE_URL=""
ADMIN_API_KEY=""

NEXT_PUBLIC_SITE_URL="https://wishmaster01.vercel.app"

OPENROUTER_API_KEY=""
OPENROUTER_MODEL="openai/gpt-4o-mini"
GEMINI_API_KEY=""
GEMINI_MODEL="gemini-3.5-flash"

GITHUB_TOKEN=""
GITHUB_USERNAME="WishMaster01"

JUDGE0_API_URL=""
JUDGE0_API_HOST=""
JUDGE0_API_KEY=""

RESEND_API_KEY=""
CONTACT_NOTIFICATION_TO=""
CONTACT_NOTIFICATION_FROM="WishMaster01 <hello@wishmaster01.com>"
CONTACT_REPLY_TO="hello@wishmaster01.com"
NEWSLETTER_FROM="WishMaster01 <hello@wishmaster01.com>"
NEWSLETTER_REPLY_TO="hello@wishmaster01.com"
```

Important notes:

- Keep `NEXT_PUBLIC_SITE_URL` aligned with the deployed domain
- Never commit `.env`
- Keep all provider secrets server-side

## API Surface

The app includes route handlers for:

- Blog data
- Project data
- Project architecture, case study, and engineering data
- Resume data and PDF output
- Contact submissions
- Newsletter subscriptions
- GitHub profile, repositories, and language data
- DSA topic data and submissions
- Recruiter profile data
- User preferences
- Health checks
- Admin project and blog operations
- AI chat requests

## Quality Notes

- Typed content models across projects, blog posts, skills, recruiter data, resume data, and DSA topics
- Reusable UI primitives for cards, buttons, badges, sections, and containers
- SEO metadata, sitemap, robots, and manifest support
- Open Graph image support
- Build-safe server/client separation
- Production-minded content architecture
- Mobile layout adjusted to avoid horizontal overflow
- Algorithmic implementations exposed in real product flows

## Roadmap

Future improvements can include:

- CMS integration
- Full-text search
- pgvector-based AI search
- Analytics dashboard expansion
- Error monitoring
- Internationalization
- Advanced DSA progress tracking
- AI resume generator

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a pull request

## Author

### Sumit Kumar (WishMaster01)

Full-Stack AI and SaaS Developer

Portfolio: [https://wishmaster01.vercel.app](https://wishmaster01.vercel.app)

GitHub: [https://github.com/WishMaster01](https://github.com/WishMaster01)

LinkedIn: [https://www.linkedin.com/in/wishmaster01](https://www.linkedin.com/in/wishmaster01)

Email: `hello@wishmaster01.com`

## License

This project is licensed under the MIT License.
