type NewsletterConfirmationInput = {
  email: string;
  name?: string;
};

type ResendErrorPayload = {
  message?: string;
  error?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendNewsletterConfirmation({
  email,
  name,
}: NewsletterConfirmationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.NEWSLETTER_FROM ??
    process.env.CONTACT_NOTIFICATION_FROM ??
    "WishMaster01 <hello@wishmaster01.com>";
  const replyTo =
    process.env.NEWSLETTER_REPLY_TO ??
    process.env.CONTACT_REPLY_TO ??
    "hello@wishmaster01.com";

  if (!apiKey) {
    return {
      skipped: true,
      reason: "RESEND_API_KEY is not configured.",
    };
  }

  const displayName = name?.trim() ? name.trim() : "there";
  const text = [
    `Hi ${displayName},`,
    "",
    "You are subscribed to the WishMaster01 newsletter.",
    "Expect technical notes about Next.js, AI products, DSA, Prisma, PostgreSQL, and portfolio engineering.",
    "",
    "If you did not request this, reply to this email.",
  ].join("\n");

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `newsletter-${Date.now()}-${email}`,
      },
      body: JSON.stringify({
        from,
        to: email,
        reply_to: replyTo,
        subject: "You are subscribed to WishMaster01 updates",
        text,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
            <div style="max-width:640px;margin:0 auto;padding:24px;border-radius:24px;background:#ffffff;border:1px solid #e5e7eb">
              <p style="margin:0 0 8px;color:#6d4aff;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:12px">WishMaster01 Newsletter</p>
              <h1 style="margin:0 0 12px;font-size:26px">You are subscribed, ${escapeHtml(displayName)}.</h1>
              <p style="margin:0;color:#4b5563">Expect practical technical notes about Next.js, AI products, DSA, Prisma, PostgreSQL, and portfolio engineering.</p>
              <div style="margin-top:18px;padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e5e7eb">
                <p style="margin:0"><strong>Subscription email:</strong> ${escapeHtml(email)}</p>
              </div>
            </div>
          </div>
        `,
      }),
      cache: "no-store",
    });
  } catch (error) {
    return {
      skipped: false,
      error: true,
      status: 0,
      message:
        error instanceof Error
          ? error.message
          : "Resend request could not be completed.",
    };
  }

  const payload = (await response.json().catch(() => null)) as
    | ResendErrorPayload
    | { id?: string }
    | null;

  if (!response.ok) {
    return {
      skipped: false,
      error: true,
      status: response.status,
      message:
        payload && "message" in payload
          ? payload.message
          : payload && "error" in payload
            ? payload.error
            : "Resend request failed.",
    };
  }

  return {
    skipped: false,
    error: false,
    id: payload && "id" in payload ? payload.id : undefined,
  };
}
