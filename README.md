WishMaster01 Portfolio

A production-ready, multi-page developer portfolio built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

The portfolio is designed as a complete personal-brand platform rather than a basic static website. It presents projects, technical skills, engineering decisions, system architecture, DSA knowledge, GitHub activity, articles, resume information, recruiter-focused content, and interactive AI-powered features.

Overview

WishMaster01 Portfolio showcases full-stack, AI, SaaS, mobile, and backend engineering work through detailed project case studies and interactive technical sections.

The platform includes:

A polished multi-page portfolio

Dynamic project detail and case-study pages

An AI portfolio chatbot

GitHub statistics and repository insights

Interactive DSA learning and execution features

Resume preview and PDF download

Technical articles and blog content

Contact and newsletter systems

Recruiter-focused presentation mode

Architecture and system-design documentation

Testing, performance, reliability, and security sections

Theme customization

Admin-ready content management APIs

Featured Projects

The portfolio highlights the following projects:

InfinityAI

A multi-tool AI SaaS platform for:

Content generation

Resume review

Image and design utilities

Study and productivity tools

Developer assistance

Advanced AI workflows

ExploreX

An AI-powered travel planning platform featuring:

Smart itinerary generation

City recommendations

Trip planning

AI-assisted travel workflows

Maps-ready architecture

DailyEssentials

A full-stack grocery and essentials platform with:

Product discovery

Cart and checkout

Seller dashboard

Order tracking

AI shopping assistance

Recommendations

Vyvo

A modern real-time communication platform with:

Messaging

Stories

AI-assisted features

Media handling

Real-time events

End-to-end-encryption-ready architecture

WishCart

A responsive e-commerce platform with:

Product catalogue

Authentication

Cart

Checkout

Seller and admin workflows

Order management

Core Features

Multi-page Portfolio

Dedicated routes for:

Home

About

Projects

Project details

Skills

Experience

Blog

DSA showcase

Resume

Contact

Recruiter mode

Admin-ready interfaces

Dynamic Project Detail Pages

Every project can include:

Overview

Problem statement

Target users

Key features

Technology stack

Architecture

Screenshots

Live demo

GitHub repository

Challenges

Solutions

Future scope

Development timeline

Engineering decisions

Project Case Studies

Case-study sections explain:

Business and user problem

Product objective

Technical constraints

Development process

Architecture decisions

Trade-offs

Challenges solved

Outcomes

Lessons learned

Planned improvements

Recruiter Mode

A condensed recruiter-focused route that surfaces:

Professional summary

Current availability

Target roles

Top skills

Best projects

Education

Experience

Achievements

Resume

GitHub

Contact information

Architecture and System Design

Project architecture sections can present:

System overview

Component responsibilities

API flow

Database flow

Authentication flow

AI provider flow

Payment flow

Deployment topology

Scaling strategy

Security boundaries

Technical decision records

Testing, Performance, and Reliability

Engineering-quality sections can show:

Unit testing

Integration testing

End-to-end testing

Type safety

CI workflows

Core Web Vitals

API performance

Caching strategy

Rate limiting

Retry and timeout behaviour

Error handling

Security controls

Monitoring

Known limitations

Only verified metrics should be published.

AI Portfolio Chatbot

The chatbot can answer questions such as:

What projects has WishMaster01 built?

What technology stack does he use?

Explain InfinityAI.

Is he experienced with Next.js?

Which projects use PostgreSQL?

What are his strongest backend skills?

Supported AI providers:

OpenRouter

Google Gemini

When both providers are configured, OpenRouter is used first.

The chatbot should:

Validate user input

Limit prompt size

Limit conversation history

Retrieve relevant portfolio context

Protect provider secrets

Handle provider failures

Apply rate limiting

Return safe, normalized responses

Interactive DSA Showcase

The DSA section may include:

Arrays

Linked lists

Stacks

Queues

Hashing

Heaps

Trees

Binary search trees

Graphs

Sorting

Searching

Recursion

Backtracking

Greedy algorithms

Dynamic programming

Bit manipulation

Each topic can contain:

Explanation

Java or Python implementation

Code examples

Time complexity

Space complexity

Practical use cases

Related problems

Interactive visualizations

Judge0-powered code execution

Judge0 credentials must remain server-side.

GitHub Statistics Dashboard

The GitHub dashboard can display:

Public repositories

Followers

Following

Total visible stars

Top repositories

Pinned projects

Primary languages

Contribution activity

Recent repository activity

GitHub profile link

GitHub data should be fetched on the server and cached to reduce rate-limit usage.

Article and Blog System

Suggested article categories:

AI engineering

Full-stack development

Next.js

Prisma and PostgreSQL

Authentication

Payments

Deployment

System design

DSA

Project case studies

Example articles:

How I Built InfinityAI

How AI Trip Planners Work

Authentication in Full-Stack Applications

Connecting Prisma with PostgreSQL

Razorpay vs Stripe

Building Real-Time Chat with Socket.IO

Deploying Next.js Applications

Blog features may include:

Search

Categories

Tags

Reading time

Table of contents

Syntax highlighting

Related articles

Previous and next navigation

Share actions

Resume

The resume route can present:

Professional summary

Education

Technical skills

Projects

Experience

Achievements

Certifications

Contact details

It also supports a downloadable PDF resume.

Suggested route:

/resume

Contact System

The contact form includes:

Name

Email

Subject

Message

Backend responsibilities:

Validate data with Zod

Apply rate limiting

Verify honeypot fields

Normalize email addresses

Store messages in PostgreSQL

Send confirmation emails through Resend

Send optional admin notification copies

Return safe success and error responses

The contact form remains functional without Resend, provided database storage is configured.

Newsletter

The newsletter system supports:

Email validation

Duplicate prevention

PostgreSQL persistence

Rate limiting

Confirmation email support

Resubscription handling

Admin-ready subscriber management

Command Palette

Use:

Ctrl + K

or:

Cmd + K

to open quick navigation.

Example commands:

Projects

Resume

Contact

InfinityAI

ExploreX

DSA

Blog

Recruiter mode

The command palette can use:

Static navigation commands

Project search

Blog search

Fuzzy matching

Keyboard navigation

Theme System

Supported themes may include:

Light

Dark

Cyber

Gradient

Ocean

Forest

Solarized

Sunset

Monochrome

System theme

Theme preferences can be stored locally and optionally persisted for authenticated users.

Accessibility options may include:

Reduced motion

High contrast

Keyboard navigation

Visible focus states

Screen-reader-friendly labels

Analytics, Caching, and Performance

The portfolio is designed to support:

Analytics

Track meaningful events such as:

Project opened

Live demo clicked

GitHub link clicked

Resume downloaded

Contact form submitted

Newsletter subscribed

Chatbot question sent

Command palette used

Blog opened

DSA topic opened

Theme changed

Do not send private form content, secrets, or sensitive personal information to analytics services.

Caching

Recommended cache policies:

Projects: 1 hour

Project details: 1 hour

Blog posts: 15 minutes

Skills and experience: 6 hours

Resume data: 6 hours

GitHub data: 1 hour

Public DSA content: 6 hours

Mutations, contact submissions, chatbot conversations, authentication responses, and user-specific admin data should not be globally cached.

Rate Limiting

Recommended policies:

Contact form: 3 requests per 10 minutes

Newsletter: 5 requests per hour

AI chatbot: 10 requests per minute

Search: 30 requests per minute

Admin login: 5 attempts per 15 minutes

View counter: 60 requests per minute

Performance

Performance techniques include:

Server Components by default

Minimal Client Component boundaries

next/image

next/font

Dynamic imports

Lazy loading

Responsive image sizes

Reduced-motion support

Optimized Framer Motion animations

Pagination

Prisma indexes

Parallel data fetching

Cached GitHub requests

Skeleton loading states

Route-level error handling

Security

Security practices include:

Server-side secret handling

Zod validation

Rate limiting

Honeypot protection

Request size limits

Admin API-key protection

Server-side authorization

Secure error responses

Environment-variable validation

No secret exposure to Client Components

Safe external API timeouts

Prisma parameterized queries

Minimal response payloads

ADMIN_API_KEY must be changed before enabling admin routes in any deployed environment.

Tech Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

Framer Motion

Lucide Icons

Responsive UI

Server and Client Components

Backend

Next.js Route Handlers

Server Actions

Prisma ORM

PostgreSQL

Zod

Resend

OpenRouter

Google Gemini

GitHub API

Judge0

Engineering

ESLint

TypeScript strict mode

Production builds

Analytics

Caching

Rate limiting

Performance monitoring

Accessibility

SEO metadata

Suggested Project Structure

src/
├── app/
│   ├── about/
│   ├── projects/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       ├── case-study/
│   │       ├── architecture/
│   │       └── engineering/
│   ├── skills/
│   ├── experience/
│   ├── blog/
│   │   └── [slug]/
│   ├── dsa-showcase/
│   │   └── [topic]/
│   ├── resume/
│   ├── recruiter/
│   ├── contact/
│   ├── admin/
│   └── api/
│       ├── chat/
│       ├── contact/
│       ├── newsletter/
│       ├── github/
│       ├── projects/
│       ├── blog/
│       ├── search/
│       └── admin/
├── components/
│   ├── layout/
│   ├── home/
│   ├── projects/
│   ├── case-study/
│   ├── architecture/
│   ├── engineering/
│   ├── recruiter/
│   ├── chatbot/
│   ├── github/
│   ├── blog/
│   ├── dsa/
│   ├── resume/
│   ├── contact/
│   ├── admin/
│   └── ui/
├── data/
├── hooks/
├── lib/
├── server/
│   ├── cache/
│   ├── queries/
│   ├── repositories/
│   └── services/
├── types/
└── validations/

prisma/
├── schema.prisma
└── seed.ts

public/
├── projects/
├── resume/
└── images/

Environment Variables

Create a .env file in the project root.

Use the following template:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wishmaster01_portfolio?schema=public"
ADMIN_API_KEY="change-me-before-enabling-admin-routes"

# AI portfolio chatbot. Set one provider key. OpenRouter is used first when both are present.
OPENROUTER_API_KEY=""
OPENROUTER_MODEL="openai/gpt-4o-mini"
GEMINI_API_KEY=""
GEMINI_MODEL="gemini-3.5-flash"

# GitHub statistics dashboard. Token is used only on the server.
GITHUB_TOKEN=""
GITHUB_USERNAME="WishMaster01"

# Judge0 interactive DSA submissions. Keep API key server-side only.
# RapidAPI example:
# JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
# JUDGE0_API_HOST="judge0-ce.p.rapidapi.com"
# JUDGE0_API_KEY=""
#
# Self-hosted / direct Judge0 example:
# JUDGE0_API_URL="https://your-judge0-instance.example.com"
# JUDGE0_API_KEY=""
JUDGE0_API_URL=""
JUDGE0_API_HOST=""
JUDGE0_API_KEY=""

# Contact confirmation emails through Resend. Form still works without these.
# Emails are sent to the user's submitted email address.
# CONTACT_NOTIFICATION_TO is optional and receives BCC/admin copies.
RESEND_API_KEY=""
CONTACT_NOTIFICATION_TO=""
CONTACT_NOTIFICATION_FROM="WishMaster01 <hello@wishmaster01.com>"
CONTACT_REPLY_TO="hello@wishmaster01.com"
NEWSLETTER_FROM="WishMaster01 <hello@wishmaster01.com>"
NEWSLETTER_REPLY_TO="hello@wishmaster01.com"

Never commit a populated .env file. Commit only .env.example.

Local Development

Prerequisites

Install:

Node.js

npm

PostgreSQL

Git

Clone the repository

git clone https://github.com/WishMaster01/wishmaster01-portfolio.git
cd wishmaster01-portfolio

Install dependencies

npm install

Configure environment variables

copy .env.example .env

On macOS or Linux:

cp .env.example .env

Update the values inside .env.

Prepare PostgreSQL

Create the database:

CREATE DATABASE wishmaster01_portfolio;

Generate Prisma Client

npx prisma generate

Apply migrations

For local development:

npx prisma migrate dev

For deployment:

npx prisma migrate deploy

Seed the database

When a Prisma seed script is configured:

npx prisma db seed

Start the development server

npm run dev

Open:

http://localhost:3000

Available Scripts

Use the scripts defined in package.json.

Typical commands include:

npm run dev
npm run lint
npm run build
npm run start
npx tsc --noEmit
npx prisma generate
npx prisma migrate dev
npx prisma studio

Database Management

Open Prisma Studio:

npx prisma studio

Recommended production workflow:

npx prisma generate
npx prisma migrate deploy
npm run build
npm run start

Never use destructive migration or reset commands against a production database.

Admin API

Admin endpoints can be protected using:

ADMIN_API_KEY="use-a-long-random-secret"

Before enabling admin functionality:

Replace the default value

Use a cryptographically strong secret

Keep it server-side

Never expose it in browser code

Verify it on every protected Route Handler

Add authentication and role-based authorization for production use

The API key is suitable as an initial protection layer, but full production administration should use authenticated sessions and explicit admin roles.

Optional Integrations

The application can still run when these optional integrations are unavailable:

OpenRouter

Gemini

GitHub token

Judge0

Resend

Features that depend on missing credentials should show graceful fallback states instead of crashing the application.

SEO

Recommended SEO support includes:

Page-level metadata

Open Graph images

Twitter cards

Canonical URLs

Dynamic project metadata

Dynamic blog metadata

Sitemap

Robots configuration

Structured data

Semantic headings

Accessible landmarks

Accessibility

The portfolio should support:

Keyboard navigation

Skip-to-content link

Visible focus indicators

Reduced-motion preference

Semantic HTML

Accessible forms

ARIA labels where needed

Sufficient colour contrast

Responsive typography

Screen-reader-friendly error messages

Deployment

Vercel

Push the repository to GitHub.

Import the repository into Vercel.

Add all required environment variables.

Connect a production PostgreSQL database.

Use the production database URL for DATABASE_URL.

Run Prisma migrations.

Deploy the application.

Recommended build command:

npm run build

Recommended Prisma deployment step:

npx prisma generate && npx prisma migrate deploy && npm run build

Use the deployment configuration already defined in the repository when it differs from this example.

Production Checklist

Before deployment, verify:

.env is not committed

ADMIN_API_KEY has been changed

Database migrations are applied

Prisma Client is generated

Contact form works

Email fallback works

AI chatbot handles missing providers

GitHub API handles rate limits

Judge0 secrets remain server-side

Admin routes are protected

Rate limiting is enabled

Public GET requests use appropriate caching

Mutations are not cached

Images are optimized

Animations respect reduced motion

Mobile layout has no horizontal overflow

SEO metadata is present

Loading, error, and not-found states work

npm run lint passes

npx tsc --noEmit passes

npm run build passes

Roadmap

Potential future improvements:

Authenticated role-based admin dashboard

Rich-text blog editor

Automated project-content management

PostgreSQL full-text search

Semantic chatbot retrieval with pgvector

Real-time analytics dashboard

Automated Lighthouse reporting

Error monitoring

Project comparison mode

Advanced DSA progress tracking

Judge0 submission history

Automated resume generation

Internationalization

Additional accessibility controls

Author

WishMaster01

Full-Stack AI & SaaS Developer

GitHub: WishMaster01

Portfolio: Add deployed portfolio URL

LinkedIn: Add LinkedIn URL

Email: hello@wishmaster01.com

License

Add the licence that matches how you want others to use the source code.

For a public portfolio repository, common options include:

MIT License

All Rights Reserved

Source Available with restrictions

Until a licence is added, the repository should not be assumed to grant reuse rights.

Acknowledgements

Built with Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, OpenRouter, Gemini, GitHub API, Judge0, and Resend.
