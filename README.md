# WishMaster01 Portfolio

Next.js, TypeScript, Tailwind, Prisma, PostgreSQL, AI chatbot, GitHub dashboard,
blog system, project case studies, and interactive DSA showcase.

## Run locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Environment variables

Copy `.env.example` to `.env` and fill the values you need.

Required for Prisma/PostgreSQL:

```env
DATABASE_URL=""
```

Optional admin API:

```env
ADMIN_API_KEY=""
```

Optional Judge0 interactive DSA execution:

```env
JUDGE0_API_URL=""
JUDGE0_API_HOST=""
JUDGE0_API_KEY=""
```

### Judge0 setup

The portfolio does not run Java code on your server. DSA topic pages send code
to Judge0 through the server route:

```txt
POST /api/dsa/submit
```

Frontend flow:

```txt
DSA topic page -> /api/dsa/submit -> Judge0 /submissions -> result shown in UI
```

RapidAPI configuration example:

```env
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
JUDGE0_API_HOST="judge0-ce.p.rapidapi.com"
JUDGE0_API_KEY="your-rapidapi-key"
```

Self-hosted/direct Judge0 configuration example:

```env
JUDGE0_API_URL="https://your-judge0-instance.example.com"
JUDGE0_API_KEY="your-auth-token-if-required"
```

Java uses Judge0 language ID `62`.

## Prisma

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed database:

```bash
npm run db:seed
```

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```
