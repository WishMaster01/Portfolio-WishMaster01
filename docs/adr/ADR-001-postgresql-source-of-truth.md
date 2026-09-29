# ADR-001: PostgreSQL via Prisma as Primary Persistence Source of Truth

## Status
Accepted & Implemented

## Context
Initial portfolio data was scattered between hardcoded static TypeScript files, disjoint JSON structures, and duplicate database models (`ContactMessage` vs `ContactSubmission`, `NewsletterSubscriber` vs `NewsletterSubscription`). This created inconsistent state across admin updates and visitor-facing pages.

## Decision
1. Standardize on PostgreSQL with Prisma ORM as the single authoritative database source of truth for:
   - User identities and active authentication sessions.
   - Contact submissions, status workflows, and audit timestamps.
   - Newsletter subscribers and opt-in consent verification.
   - Projects, architecture metadata, and technical case study sections.
   - Blog posts, published states, view counters, and revisions.
2. Maintain high-performance typed fallback records in static files (`data/*.ts`) ensuring that during local preview or unconfigured database environments, the portfolio renders all 113 routes with zero downtime.

## Consequences
- **Positive**: Strict relational constraints, unified audit columns (`createdAt`, `updatedAt`), eliminate duplicate database models, and provide seedable reproducible migrations (`npm run db:seed`).
- **Considerations**: Requires `DATABASE_URL` for dynamic mutations in production; handled gracefully by fallback repository layers when database connection is unavailable.
