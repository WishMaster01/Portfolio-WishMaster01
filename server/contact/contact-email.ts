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
  const to = process.env.CONTACT_NOTIFICATION_TO?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const from =
    process.env.CONTACT_NOTIFICATION_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to?.length) {
    return {
      skipped: true,
      reason: "RESEND_API_KEY or CONTACT_NOTIFICATION_TO is not configured.",
    };
  }

  const plainText = [
    "New portfolio contact message",
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
        to,
        reply_to: input.email,
        subject: `Portfolio contact: ${input.subject}`,
        text: plainText,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
            <div style="max-width:640px;margin:0 auto;padding:24px;border-radius:24px;background:#ffffff;border:1px solid #e5e7eb">
              <p style="margin:0 0 8px;color:#6d4aff;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:12px">WishMaster01 Portfolio</p>
              <h2 style="margin:0 0 16px;font-size:24px">New portfolio contact message</h2>
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
