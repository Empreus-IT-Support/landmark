"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border border-line-mid bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-navy";

const labelClass = "block text-sm font-medium text-ink-soft";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (data.email !== data.emailConfirm) {
      setStatus("error");
      setError("The two email addresses do not match.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("sent");
      form.reset();
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="border border-navy/20 bg-paper p-8 text-center"
      >
        {/* No response-time promise — that's a commitment only the client
            can make. */}
        <h3 className="text-navy">Thank you — your enquiry has been sent.</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="eyebrow text-navy">
          Name <span aria-hidden="true">*</span>
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First
            </label>
            <input
              id="firstName"
              name="firstName"
              required
              autoComplete="given-name"
              className={`mt-2 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last
            </label>
            <input
              id="lastName"
              name="lastName"
              required
              autoComplete="family-name"
              className={`mt-2 ${inputClass}`}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="organisation" className={labelClass}>
          Your organisation
        </label>
        <input
          id="organisation"
          name="organisation"
          autoComplete="organization"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span aria-hidden="true">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <fieldset className="space-y-4">
        <legend className="eyebrow text-navy">
          Email <span aria-hidden="true">*</span>
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Enter email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={`mt-2 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="emailConfirm" className={labelClass}>
              Confirm email
            </label>
            <input
              id="emailConfirm"
              name="emailConfirm"
              type="email"
              required
              className={`mt-2 ${inputClass}`}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="eyebrow text-navy">
          Project address (if applicable)
        </legend>
        <div>
          <label htmlFor="street" className={labelClass}>
            Street address
          </label>
          <input
            id="street"
            name="street"
            autoComplete="street-address"
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              name="city"
              autoComplete="address-level2"
              className={`mt-2 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="state" className={labelClass}>
              State / Territory
            </label>
            <input
              id="state"
              name="state"
              autoComplete="address-level1"
              className={`mt-2 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="postcode" className={labelClass}>
              Postcode
            </label>
            <input
              id="postcode"
              name="postcode"
              inputMode="numeric"
              autoComplete="postal-code"
              className={`mt-2 ${inputClass}`}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="comments" className={labelClass}>
          Comments <span aria-hidden="true">*</span>
        </label>
        <p id="comments-hint" className="mt-1 text-sm text-ink-soft">
          Please let us know what&apos;s on your mind. Have a question for us?
          Ask away.
        </p>
        <textarea
          id="comments"
          name="comments"
          rows={6}
          required
          aria-describedby="comments-hint"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      {/* Honeypot — hidden from users, filled only by bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-3 border border-navy bg-navy px-10 py-4 font-display text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
