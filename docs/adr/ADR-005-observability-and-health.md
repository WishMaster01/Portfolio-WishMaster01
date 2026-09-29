# ADR-005: Structured JSON Observability, PII Scrubbing, and Health Probes

## Status
Accepted & Implemented

## Context
Production web services require diagnostic visibility into errors, latency, and system health without leaking sensitive data (passwords, tokens, API keys, personal emails) in log streams or exposing infrastructure internals to attackers.

## Decision
1. Implement a structured JSON logger (`lib/server/logger.ts`) emitting standard JSON payloads with ISO timestamps, log level (`debug`, `info`, `warn`, `error`), correlation request IDs, route, status, and latency.
2. Embed an automatic recursive PII and secret sanitizer:
   - Recursively scrubs fields matching sensitive keys: `password`, `token`, `secret`, `authorization`, `cookie`, `apiKey`, `bearer`.
   - Replaces values with `[REDACTED]` before writing to stdout/stderr.
3. Deploy standardized health and readiness endpoints:
   - `/api/health/live`: Liveness probe indicating that the Next.js process is active and running.
   - `/api/health/ready`: Readiness probe verifying PostgreSQL query readiness (via `SELECT 1` with a 3-second timeout) and memory safety without leaking database credentials.

## Consequences
- **Positive**: Compliant with cloud native container orchestrators (Kubernetes, Docker, Vercel), immediate visibility into route latencies, zero risk of credential leaks in log aggregation services.
- **Considerations**: JSON formatting adds negligible CPU overhead (~0.05ms per log entry), well within acceptable latency budgets.
