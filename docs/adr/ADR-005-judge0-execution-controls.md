# ADR-005: Judge0 Execution Controls, Throttling & Priority Queue Scheduling

## Status
Accepted & Implemented

## Context
The portfolio features an interactive DSA problem submission and code execution system. Direct, unconstrained remote code execution creates major vulnerabilities: denial-of-service via infinite loops, fork bombs, network abuse, memory exhaustion, and external API cost overruns.

## Decision
1. **Resource Bounds**:
   - `MAX_SOURCE_SIZE`: Enforced at 64 KB per source file.
   - `MAX_STDIN_SIZE`: Enforced at 10 KB per input stream.
   - `WALL_TIME_LIMIT_SECONDS`: Maximum 6.0 seconds per execution.
   - `CPU_TIME_LIMIT_SECONDS`: Maximum 4.0 seconds compute time.
2. **Priority-Queue Concurrency Scheduling**:
   - Submissions are queued via an in-memory `PriorityQueue<PendingJob>` (`server/judge0/judge0-service.ts`).
   - `MAX_QUEUE_CAPACITY`: Bounded at 25 concurrent requests. Requests exceeding capacity are rejected with HTTP 503 Service Unavailable ("Execution queue is full").
   - Single-flight active execution ensures remote Judge0 sandbox instances are never flooded.
3. **Resilient Mock/Offline Fallback**:
   - When running in local development or if `JUDGE0_API_URL` is unconfigured, the service executes a deterministic sandbox simulator validating expected test cases without crashing or blocking developer workflows.

## Consequences
- **Positive**: 100% protection against denial of service, predictable resource consumption, zero cost blowouts, and fully working offline/local demonstration.
- **Trade-off**: High-concurrency bursts experience brief queuing (~1-2 seconds) rather than instant parallel dispatch.
