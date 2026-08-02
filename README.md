# WishMaster01 Portfolio

Production-ready developer portfolio for AI products, SaaS interfaces, full-stack engineering, DSA learning, technical writing, and recruiter-facing presentation.

Live Portfolio: [https://wishmaster01.vercel.app](https://wishmaster01.vercel.app)

The project uses `NEXT_PUBLIC_SITE_URL` for metadata, canonical URLs, sitemap generation, robots rules, API provider headers, resume links, and portfolio route references.

## What this portfolio includes

- Multi-page public portfolio built with the Next.js App Router
- Project showcase with deep product pages
- Architecture, engineering, and case-study route variants for projects
- Skills dashboard and experience dashboard
- Resume page with download and print support
- About page with capability, principles, and journey sections
- Technical blog with category, tag, and related-article exploration
- Interactive DSA showcase with topic pages, recognition patterns, examples, Java code, and practice problems
- GitHub analytics dashboard
- Recruiter mode page
- Contact page with validated form and newsletter signup
- AI portfolio chatbot grounded on portfolio context
- Admin dashboard for content and analytics workflows
- Theme system with multiple visual presets

## Main routes

- `/`
- `/about`
- `/projects`
- `/skills`
- `/experience`
- `/dsa-showcase`
- `/github`
- `/blog`
- `/contact`
- `/resume`
- `/recruiter`
- `/admin`

## Project modules

The portfolio currently contains five primary project case studies:

- `InfinityAI` - AI product platform with prompt UX, output states, provider-safe API boundaries, and future usage/account flows
- `ExploreX` - travel discovery system with itinerary-ready content structure, SEO-first route strategy, and maps-ready UI
- `DailyEssentials` - commerce storefront focused on category navigation, conversion-oriented cards, and checkout-ready boundaries
- `Vyvo` - wellness dashboard concept with calm information hierarchy, metric cards, and visualization-ready modules
- `WishCart` - marketplace platform with seller-aware catalog modeling, transaction boundaries, and full-stack commerce direction

Each project includes:

- Summary, description, problem, solution, and impact
- Stack, technologies, features, and metrics
- Architecture layers
- Challenges and resolutions
- Milestones and highlights
- Future scope
- Dedicated detail routes for:
  - `/projects/[slug]`
  - `/projects/[slug]/case-study`
  - `/projects/[slug]/architecture`
  - `/projects/[slug]/engineering`

## Blog coverage

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
- Product/AI case studies such as InfinityAI

Blog capabilities include:

- Search
- Category filters
- Tag filters
- Reading time labels
- Table of contents
- Syntax-highlighted code blocks
- Related articles
- Adjacent article navigation
- Open Graph metadata

## DSA showcase

The DSA section includes structured topic coverage for:

- Arrays
- Linked Lists
- Stacks
- Queues
- Trees
- Graphs
- Searching
- Sorting
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- Bit Manipulation

Each topic includes:

- Recognition cues
- Problem-solving approach
- Complexity notes
- Use cases
- Java example code
- Practice problem suggestions
- Interactive submission support through Judge0-backed APIs

## GitHub and recruiter features

- GitHub profile overview
- Repository statistics
- Language chart
- Contribution graph
- Recent activity
- Pinned repositories
- Recruiter mode with quick summary, skills, projects, links, and contact path

## Contact and communication features

- Contact form with schema validation
- Newsletter subscription flow
- Rate limiting
- PostgreSQL-backed storage
- Resend email integration
- Spam-resistant server-side processing

## AI chatbot

The portfolio chatbot is built around structured portfolio context and provider fallback.

Current behavior includes:

- Context-grounded replies about projects, skills, resume, and experience
- Input validation with Zod
- OpenRouter as primary provider
- Gemini as fallback provider
- Server-side provider key protection

## Admin dashboard

The admin route is designed for portfolio operations and includes:

- Project inventory table
- Project form
- Case-study editor
- Blog inventory table
- Blog editor
- Recent message viewer
- Content distribution analytics
- Skills, DSA, resume, newsletter, and settings summary modules

## Design and UX system

- Tailwind CSS v4 styling
- Framer Motion transitions and reveal effects
- Responsive layouts across mobile, tablet, and desktop
- Reduced-motion support
- Skip links and focus visibility
- Light, dark, cyber, gradient, solarized, ocean, forest, sunset, monochrome, and futuristic themes
- Command palette for route and content navigation

## Tech stack

### Frontend

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- `cmdk`

### Backend and data

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

## Project structure

```text
app/
components/
data/
lib/
prisma/
public/
server/
types/
validations/
```

## Local setup

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

## Environment variables

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

- Keep `NEXT_PUBLIC_SITE_URL` aligned with your deployed domain
- Never commit `.env`
- Keep all provider secrets server-side

## API surface

The app includes route handlers for:

- Blog data
- Project data
- Project architecture, case-study, and engineering data
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

## Quality and production notes

- Typed content models across projects, blog posts, skills, recruiter data, resume data, and DSA topics
- Reusable UI primitives for cards, buttons, badges, sections, and containers
- SEO metadata, sitemap, robots, and manifest support
- Open Graph image support
- Build-safe server/client separation
- Production-minded content architecture
- Mobile layout adjusted to avoid phantom horizontal overflow

## License

MIT
