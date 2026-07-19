type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ResendErrorPayload = {
  message?: string;
  name?: string;
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

export async function sendContactNotification(input: ContactNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminCopyRecipients = process.env.CONTACT_NOTIFICATION_TO?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const from =
    process.env.CONTACT_NOTIFICATION_FROM ??
    "WishMaster01 <hello@wishmaster01.com>";
  const replyTo = process.env.CONTACT_REPLY_TO ?? "hello@wishmaster01.com";

  if (!apiKey) {
    return {
      skipped: true,
      reason: "RESEND_API_KEY is not configured.",
    };
  }

  const plainText = [
    `Hi ${input.name},`,
    "",
    "Thanks for contacting WishMaster01. I received your message and will get back to you as soon as possible.",
    "",
    "Your submitted details:",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact-${Date.now()}-${input.email}`,
      },
      body: JSON.stringify({
        from,
        to: input.email,
        ...(adminCopyRecipients?.length
          ? { bcc: adminCopyRecipients }
          : {}),
        reply_to: replyTo,
        subject: `Thanks for contacting WishMaster01: ${input.subject}`,
        text: plainText,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
            <div style="max-width:640px;margin:0 auto;padding:24px;border-radius:24px;background:#ffffff;border:1px solid #e5e7eb">
              <p style="margin:0 0 8px;color:#6d4aff;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:12px">WishMaster01 Portfolio</p>
              <h2 style="margin:0 0 12px;font-size:24px">Thanks for reaching out, ${escapeHtml(input.name)}.</h2>
              <p style="margin:0 0 18px;color:#4b5563">I received your message and will get back to you as soon as possible.</p>
              <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
              <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
              <div style="margin-top:16px;padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e5e7eb">
                <p style="margin:0 0 8px"><strong>Message</strong></p>
                <p style="margin:0">${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
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
