import test, { describe } from "node:test";
import assert from "node:assert";

import { contactSubmissionSchema, contactSchema, newsletterSubscriptionSchema } from "@/lib/validation/forms";
import { chatRequestSchema } from "@/validations/chat.schema";
import { userPreferencesSchema } from "@/lib/validation/user-preferences";

describe("Validation Schemas Unit Tests", () => {
  describe("Contact Form Validation", () => {
    test("should pass valid contact submission", () => {
      const valid = {
        name: "Jane Recruiter",
        email: "jane@techcorp.com",
        company: "Tech Corp",
        subject: "Senior Full Stack Engineering Role",
        message: "Hi WishMaster01, we would love to discuss an engineering role with you.",
      };

      const result = contactSubmissionSchema.safeParse(valid);
      assert.strictEqual(result.success, true);
      if (result.success) {
        assert.strictEqual(result.data.email, "jane@techcorp.com");
        assert.strictEqual(result.data.source, "portfolio");
      }
    });

    test("should reject invalid email address", () => {
      const invalid = {
        name: "Test User",
        email: "not-an-email",
        subject: "Hello",
        message: "This is a valid length message for testing.",
      };

      const result = contactSubmissionSchema.safeParse(invalid);
      assert.strictEqual(result.success, false);
      assert.ok(result.error.issues.some((issue) => issue.path.includes("email")));
    });

    test("should reject short message under 10 characters", () => {
      const invalid = {
        name: "Test User",
        email: "user@example.com",
        subject: "Hello",
        message: "Too short",
      };

      const result = contactSubmissionSchema.safeParse(invalid);
      assert.strictEqual(result.success, false);
      assert.ok(result.error.issues.some((issue) => issue.path.includes("message")));
    });

    test("should validate partial contactSchema without optional metadata", () => {
      const payload = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Project Inquiry",
        message: "I am interested in hiring you for a Next.js architecture review.",
      };
      const result = contactSchema.safeParse(payload);
      assert.strictEqual(result.success, true);
    });
  });

  describe("Newsletter Subscription Validation", () => {
    test("should pass valid newsletter subscription", () => {
      const valid = {
        email: "subscriber@company.org",
        consent: true,
      };
      const result = newsletterSubscriptionSchema.safeParse(valid);
      assert.strictEqual(result.success, true);
    });

    test("should reject missing consent or false consent", () => {
      const invalid = {
        email: "subscriber@company.org",
        consent: false,
      };
      const result = newsletterSubscriptionSchema.safeParse(invalid);
      assert.strictEqual(result.success, false);
    });

    test("should reject malformed email in newsletter", () => {
      const invalid = {
        email: "invalid-email@",
        consent: true,
      };
      const result = newsletterSubscriptionSchema.safeParse(invalid);
      assert.strictEqual(result.success, false);
    });
  });

  describe("Chat Request Validation", () => {
    test("should pass valid message payload", () => {
      const valid = {
        message: "What technologies did you use for InfinityAI?",
      };
      const result = chatRequestSchema.safeParse(valid);
      assert.strictEqual(result.success, true);
      if (result.success) {
        assert.strictEqual(result.data.message, "What technologies did you use for InfinityAI?");
      }
    });

    test("should pass messages array and extract latest user message", () => {
      const valid = {
        messages: [
          { role: "user", content: "Tell me about your experience" },
          { role: "assistant", content: "I have 2+ years of full-stack experience." },
          { role: "user", content: "What is your best project?" },
        ],
      };
      const result = chatRequestSchema.safeParse(valid);
      assert.strictEqual(result.success, true);
      if (result.success) {
        assert.strictEqual(result.data.message, "What is your best project?");
      }
    });

    test("should reject empty or missing message", () => {
      const invalid = {};
      const result = chatRequestSchema.safeParse(invalid);
      assert.strictEqual(result.success, false);
    });

    test("should reject message exceeding 2000 characters", () => {
      const invalid = {
        message: "a".repeat(2001),
      };
      const result = chatRequestSchema.safeParse(invalid);
      assert.strictEqual(result.success, false);
    });
  });

  describe("User Preferences Validation", () => {
    test("should pass valid theme settings", () => {
      assert.strictEqual(userPreferencesSchema.safeParse({ preferredTheme: "dark" }).success, true);
      assert.strictEqual(userPreferencesSchema.safeParse({ preferredTheme: "light" }).success, true);
      assert.strictEqual(userPreferencesSchema.safeParse({ preferredTheme: "system" }).success, true);
    });

    test("should reject invalid theme name", () => {
      const invalid = { preferredTheme: "neon-cyberpunk-ultra" };
      const result = userPreferencesSchema.safeParse(invalid);
      assert.strictEqual(result.success, false);
    });

    test("should enforce fontScale boundaries [0.85, 1.30]", () => {
      assert.strictEqual(userPreferencesSchema.safeParse({ fontScale: 1.0 }).success, true);
      assert.strictEqual(userPreferencesSchema.safeParse({ fontScale: 0.85 }).success, true);
      assert.strictEqual(userPreferencesSchema.safeParse({ fontScale: 1.30 }).success, true);

      assert.strictEqual(userPreferencesSchema.safeParse({ fontScale: 0.5 }).success, false);
      assert.strictEqual(userPreferencesSchema.safeParse({ fontScale: 2.0 }).success, false);
    });
  });
});
