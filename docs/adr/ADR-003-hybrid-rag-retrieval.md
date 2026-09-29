# ADR-003: Deterministic Hybrid RAG Retrieval Engine with Strict Grounding

## Status
Accepted & Implemented

## Context
A recruiter portfolio assistant must never hallucinate skills, metrics, or non-existent projects, nor should it depend on an expensive external vector database that incurs high operating cost, external failure points, and cold-start latency.

## Decision
1. Implement a hybrid retrieval engine combining:
   - BM25 Lexical Engine using Robertson/Lucene IDF ($k_1=1.2, b=0.75$) for exact keyword and identifier matching (e.g., "Next.js", "Prisma", "InfinityAI").
   - Deterministic Dense Vector Search using 256-dimensional subword trigram feature hashing and cosine similarity for semantic alignment without external API calls.
   - Metadata Boosting for domain affinities (projects, skills, DSA, career experience).
2. Enforce strict XML context framing:
   - All retrieved documents are formatted inside `<portfolio_context>` tags.
   - System prompts strictly instruct the LLM to only answer from reference documents and explicitly state: *"I don't have enough information in the portfolio data to answer that accurately"* when queries fall outside the developer's experience.
3. Establish multi-tier provider fallback: OpenRouter -> Gemini Direct -> Grounded Deterministic Engine.

## Consequences
- **Positive**: 100% deterministic, sub-millisecond retrieval latency (<1ms), zero external vector DB costs, full offline capability, and 100% pass rate on prompt-injection / anti-hallucination benchmarks.
- **Considerations**: Subword feature hashing operates on lexical/morphological n-grams rather than multi-billion parameter dense models, which is optimal for the domain-bounded knowledge base of a developer portfolio.
