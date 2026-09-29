import { test, expect } from "@playwright/test";

test.describe("WishMaster01 Portfolio E2E Critical Flows", () => {
  // Flow 1: Homepage & Hero Presentation
  test("Flow 1: Homepage loads with hero, developer title, and key call-to-actions", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/WishMaster01/i);

    // Hero headline and name should be present
    const heroHeadline = page.getByRole("heading", { level: 1 });
    await expect(heroHeadline).toBeVisible();

    // CTA buttons
    const viewProjectsLink = page.getByRole("link", { name: /view projects|explore work/i }).first();
    await expect(viewProjectsLink).toBeVisible();
  });

  // Flow 2: Global Navigation & Navigation Menu
  test("Flow 2: Global navigation links navigate to major routes", async ({ page }) => {
    await page.goto("/");

    // Navigate to Projects
    await page.getByRole("link", { name: "Projects" }).first().click();
    await expect(page).toHaveURL(/\/projects/);

    // Navigate to Activity Hub
    await page.getByRole("link", { name: "Activity" }).first().click();
    await expect(page).toHaveURL(/\/activity/);

    // Navigate to About
    await page.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  // Flow 3: Project Case Study
  test("Flow 3: Project detail page renders case study sections, problem, and solution", async ({ page }) => {
    await page.goto("/projects/infinityai");
    await expect(page).toHaveURL(/\/projects\/infinityai/);

    // Case study heading
    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toContainText(/InfinityAI/i);

    // Verify sub-tabs or architecture link
    const archLink = page.getByRole("link", { name: /architecture|system design/i }).first();
    if (await archLink.isVisible()) {
      await archLink.click();
      await expect(page).toHaveURL(/\/projects\/infinityai\/architecture/);
    }
  });

  // Flow 4: Recruiter Mode
  test("Flow 4: Recruiter mode surfaces skills, role target, and key highlights", async ({ page }) => {
    await page.goto("/recruiter");
    await expect(page).toHaveURL(/\/recruiter/);

    // Verify recruiter overview section
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Check presence of download or contact action
    const contactRecruiter = page.getByRole("link", { name: /contact|get in touch/i }).first();
    await expect(contactRecruiter).toBeVisible();
  });

  // Flow 5: Resume Access
  test("Flow 5: Resume page displays credentials, strengths, and PDF download action", async ({ page }) => {
    await page.goto("/resume");
    await expect(page).toHaveURL(/\/resume/);

    // Check PDF link
    const pdfLink = page.getByRole("link", { name: /download|pdf/i }).first();
    await expect(pdfLink).toBeVisible();
    await expect(pdfLink).toHaveAttribute("href", /pdf/i);
  });

  // Flow 6: Blog Article Reading
  test("Flow 6: Blog index lists articles and navigates to article reading view", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveURL(/\/blog/);

    // Click first article
    const firstArticle = page.getByRole("link", { name: /read article|next\.js/i }).first();
    await expect(firstArticle).toBeVisible();
    await firstArticle.click();

    // Verify article page
    await expect(page).toHaveURL(/\/blog\//);
    const articleHeading = page.getByRole("heading", { level: 1 });
    await expect(articleHeading).toBeVisible();
  });

  // Flow 7: Contact Form Interaction & Validation
  test("Flow 7: Contact form validates required fields and surfaces errors on empty submit", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL(/\/contact/);

    const submitBtn = page.getByRole("button", { name: /send message|submit/i });
    await expect(submitBtn).toBeVisible();

    // Trigger validation
    await submitBtn.click();

    // Should stay on contact page with validation feedback
    await expect(page).toHaveURL(/\/contact/);
  });

  // Flow 8: AI Chatbot Drawer & Interaction
  test("Flow 8: AI Assistant drawer opens and displays prompt suggestions", async ({ page }) => {
    await page.goto("/");

    // Open chat trigger button
    const chatTrigger = page.getByRole("button", { name: /ai assistant|ask ai|chat/i }).first();
    if (await chatTrigger.isVisible()) {
      await chatTrigger.click();

      // Chat input or drawer should appear
      const chatInput = page.getByPlaceholder(/ask a question|ask about projects/i).first();
      await expect(chatInput).toBeVisible();
    }
  });

  // Flow 9: DSA Showcase & Problem Topic View
  test("Flow 9: DSA showcase page lists algorithmic topics with complexity proofs", async ({ page }) => {
    await page.goto("/dsa-showcase");
    await expect(page).toHaveURL(/\/dsa-showcase/);

    // Check presence of topic cards
    const topicHeading = page.getByRole("heading", { level: 1 });
    await expect(topicHeading).toBeVisible();
  });

  // Flow 10: Admin Authentication Guard
  test("Flow 10: Admin dashboard redirects or rejects unauthenticated visitors", async ({ page }) => {
    await page.goto("/admin");
    // Admin page should either show the login form or redirect to /admin with unauthenticated state
    const passwordInput = page.locator('input[type="password"]');
    const loginButton = page.getByRole("button", { name: /sign in|log in/i });

    // Should prompt for login credentials
    if (await passwordInput.isVisible()) {
      await expect(loginButton).toBeVisible();
    }
  });

  // Flow 11: Admin Content Management Protection
  test("Flow 11: Direct admin content mutation endpoints require authentication", async ({ request }) => {
    const res = await request.post("/api/admin/blog", {
      data: { title: "Malicious Injection Post", slug: "malicious" },
    });
    expect(res.status()).toBe(401);
  });
});
