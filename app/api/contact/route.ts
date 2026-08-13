import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT, SITE_NAME } from "@/lib/site";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let payload: Record<string, string>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const {
    firstName = "",
    lastName = "",
    organisation = "",
    phone = "",
    email = "",
    emailConfirm = "",
    street = "",
    city = "",
    state = "",
    postcode = "",
    comments = "",
  } = payload;

  if (!firstName || !lastName || !phone || !email || !comments) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
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
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "enquiries@landmarksurveys.com.au",
      to: process.env.CONTACT_TO_EMAIL || CONTACT.email,
      replyTo: email,
      subject: `Website enquiry — ${firstName} ${lastName}`,
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
