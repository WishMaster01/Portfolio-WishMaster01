export type InjectionCheckResult = {
  isSuspicious: boolean;
  reason?: string;
  category?: "instruction_override" | "prompt_exfiltration" | "delimiter_tampering" | "role_spoofing";
};

const INJECTION_PATTERNS = [
  {
    regex: /(ignore|disregard|forget|override|bypass|cancel)\s+(all\s+)?(previous|prior|above|system|the\s+above|your)?\s*(instructions?|prompts?|rules?|commands?)/i,
    category: "instruction_override" as const,
    reason: "Attempt to override system instructions.",
  },
  {
    regex: /(you\s+are\s+now|act\s+as)\s+(in\s+|an?\s+)?(unfiltered|jailbroken|dan|evil|developer\s+mode|unrestricted|god\s+mode)/i,
    category: "instruction_override" as const,
    reason: "Attempt to force unaligned persona / jailbreak.",
  },
  {
    regex: /\b(dan|jailbreak|developer\s+mode)\b/i,
    category: "instruction_override" as const,
    reason: "Known jailbreak archetype detected.",
  },
  {
    regex: /(repeat|print|show|output|reveal|display|echo|leak|dump)\s+(the\s+)?(exact\s+)?(system\s+prompt|initial\s+instructions|system\s+instructions|prompt\s+above|hidden\s+rules)/i,
    category: "prompt_exfiltration" as const,
    reason: "Attempt to extract system prompt.",
  },
  {
    regex: /what\s+(is|are|were)\s+your\s+(exact\s+)?(system\s+prompt|initial\s+prompt|secret\s+instructions|developer\s+prompt)/i,
    category: "prompt_exfiltration" as const,
    reason: "Attempt to probe system instructions.",
  },
  {
    regex: /<\/?portfolio_context>/i,
    category: "delimiter_tampering" as const,
    reason: "Attempt to tamper with XML context boundary delimiters.",
  },
  {
    regex: /^(system|developer|assistant)\s*:\s*/i,
    category: "role_spoofing" as const,
    reason: "Attempt to spoof conversation roles in user prompt.",
  },
  {
    regex: /\[(system|developer|assistant)\]/i,
    category: "role_spoofing" as const,
    reason: "Attempt to inject bracketed system directives.",
  },
];

export function sanitizeUserInput(input: string): string {
  return input
    .replace(/<\/?portfolio_context>/gi, "[tag-escaped]")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "") // Strip control characters
    .trim();
}

export function detectPromptInjection(query: string): InjectionCheckResult {
  // Check raw query for delimiter tampering before sanitization strips it
  if (/<\/?portfolio_context>/i.test(query)) {
    return {
      isSuspicious: true,
      category: "delimiter_tampering",
      reason: "Attempt to tamper with XML context boundary delimiters.",
    };
  }

  const sanitized = sanitizeUserInput(query);

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.regex.test(sanitized)) {
      return {
        isSuspicious: true,
        reason: pattern.reason,
        category: pattern.category,
      };
    }
  }

  return { isSuspicious: false };
}

export const SAFE_INJECTION_REFUSAL =
  "I am WishMaster01's portfolio assistant. I can only assist with questions regarding his projects, engineering architecture, technical skills, and professional experience.";
