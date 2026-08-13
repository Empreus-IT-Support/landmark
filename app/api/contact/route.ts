import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT, SITE_NAME } from "@/lib/site";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/** Five submissions per IP per 10 minutes. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/** Reject oversized bodies before parsing rather than after. */
const MAX_BODY_BYTES = 16 * 1024;

/** Per-field caps, applied after trimming. */
const LIMITS: Record<string, number> = {
  firstName: 80,
  lastName: 80,
  organisation: 120,
  phone: 40,
  email: 254,
  emailConfirm: 254,
  street: 160,
  city: 80,
  state: 80,
  postcode: 20,
  comments: 4000,
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Strip CR/LF and other control characters. Anything interpolated into a mail
 * header (subject, reply-to) must go through this — a newline in a header
 * value is a header-injection vector.
 */
const singleLine = (value: string) =>
  value.replace(/[\r\n\u0000-\u001f\u007f]/g, " ").trim();

// Deliberately conservative: one @, no whitespace, a dot in the domain.
const EMAIL_RE = /^[^\s@,;:<>"'\\]+@[^\s@,;:<>"'\\]+\.[a-z]{2,}$/i;

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many enquiries. Please try again shortly, or call us." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  // Coerce every expected field to a trimmed, length-capped string. Anything
  // that isn't a string (arrays, objects, numbers) becomes "".
  const field = (name: string): string => {
    const value = payload[name];
    if (typeof value !== "string") return "";
    return value.trim().slice(0, LIMITS[name] ?? 200);
  };

  const firstName = field("firstName");
  const lastName = field("lastName");
  const organisation = field("organisation");
  const phone = field("phone");
  const email = field("email");
  const emailConfirm = field("emailConfirm");
  const street = field("street");
  const city = field("city");
  const state = field("state");
  const postcode = field("postcode");
  const comments = field("comments");

  if (!firstName || !lastName || !phone || !email || !comments) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (email !== emailConfirm) {
    return NextResponse.json(
      { error: "The two email addresses do not match." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — enquiry was not delivered.");
    return NextResponse.json(
      { error: "The enquiry form is not configured. Please call us instead." },
      { status: 500 },
    );
  }

  const address = [street, city, state, postcode].filter(Boolean).join(", ");

  const rows: [string, string][] = [
    ["Name", `${firstName} ${lastName}`],
    ["Organisation", organisation],
    ["Phone", phone],
    ["Email", email],
    ["Project address", address],
    ["Comments", comments],
  ];

  const html = `
    <h2>New website enquiry — ${SITE_NAME}</h2>
    <table cellpadding="8" style="border-collapse:collapse">
      ${rows
        .filter(([, value]) => value)
        .map(
          ([label, value]) =>
            `<tr><th align="left" style="border-bottom:1px solid #e5e5e7">${label}</th><td style="border-bottom:1px solid #e5e5e7">${escapeHtml(
              value,
            ).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="color:#666;font-size:12px">Submitted from ${escapeHtml(ip)}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "enquiries@landmarksurveys.com.au",
      to: process.env.CONTACT_TO_EMAIL || CONTACT.email,
      // Both header values are user-supplied, so both are flattened.
      replyTo: singleLine(email),
      subject: singleLine(
        `Website enquiry — ${firstName} ${lastName}`,
      ).slice(0, 180),
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "We could not send your enquiry. Please call us instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (sendError) {
    console.error("Contact form failure:", sendError);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please call us instead." },
      { status: 500 },
    );
  }
}

/** Anything other than POST on this endpoint is a probe. */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
