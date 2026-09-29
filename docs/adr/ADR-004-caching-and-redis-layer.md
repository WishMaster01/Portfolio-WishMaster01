# ADR-004: Redis & Distributed Caching Layer with In-Memory Fallback

## Status
Accepted & Implemented

## Context
External API rate limits (GitHub, LeetCode, OpenRouter) and serverless cold starts require a caching layer. However, requiring a running Redis instance for local development or basic deployment introduces unnecessary barrier to entry and setup friction.

## Decision
1. Design a unified `CacheClient` interface (`lib/server/redis.ts`) implementing `get`, `set`, `del`, `has`, and `incr`.
2. Connect to Upstash Redis via lightweight REST API when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are present, enabling distributed cache sharing across serverless instances without TCP connection pool limits.
3. Automatically fall back to a high-efficiency in-memory LRU/TTL cache client when Redis credentials are not provided or if external network connectivity fails.
4. Apply caching selectively to high-utility operations:
   - External developer platform feeds (GitHub & LeetCode: 1 hour TTL).
   - Distributed rate limiting across login, contact, and AI endpoints.
   - Idempotent AI chat response caching (5 minute TTL).

## Consequences
- **Positive**: Zero local development friction, full distributed caching in production when configured, and automatic degradation without crashing when offline.
- **Considerations**: In multi-instance serverless deployments without Redis, in-memory cache is per-instance; configuring Upstash Redis provides immediate distributed synchronization.
