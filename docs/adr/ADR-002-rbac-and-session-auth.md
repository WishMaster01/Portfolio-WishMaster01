# ADR-002: Server-Side Cryptographic Sessions and Role-Based Access Control (RBAC)

## Status
Accepted & Implemented

## Context
Early versions of the portfolio relied on mock tokens (`token === "authenticated"`) and client-controlled identity headers (`x-user-id`) for preferences and admin functions, presenting serious security vulnerabilities.

## Decision
1. Implement cryptographically secure scrypt password hashing with 16-byte random salts and timing-safe comparison (`crypto.timingSafeEqual`) to prevent timing side-channel attacks.
2. Establish database-backed server sessions (`model Session`) storing 64-character random hex tokens and explicit expiration dates.
3. Transmit session tokens exclusively over `HTTP-only`, `SameSite=Lax`, and `Secure` cookies (`auth_session`), mitigating XSS token theft.
4. Implement Role-Based Access Control (`UserRole`: `USER`, `RECRUITER`, `ADMIN`) where admin route handlers enforce identity verification strictly on the server via `requireAdmin(request)`.

## Consequences
- **Positive**: Eliminates client-controlled identity spoofing, provides auditability of active sessions, and guarantees unauthorized users cannot access admin mutation routes (`401/403`).
- **Considerations**: Requires session validation on dynamic admin routes; mitigated by indexed lookups on `sessionToken` with $O(1)$ database execution time.
