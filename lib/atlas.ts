// Transactional email goes through Atlas (Empreus's platform), not Resend.
//
// The per-client key is minted under Clients > <client> > Documentation > API >
// Atlas and is scoped to one sending domain plus a fixed recipient allowlist,
// so a leaked key can't be used to mail anywhere else. Anything outside that
// scope comes back as a 403.
//
//   ATLAS_API_KEY   the per-client key (ATLAS_EMAIL_KEY is also accepted,
//                   which is the name Atlas's own docs use)
//   ATLAS_ENDPOINT  override only if Atlas moves
//
// Without a key configured, callers log the submission instead of sending.

const ENDPOINT =
  process.env.ATLAS_ENDPOINT || "https://atlascontrol.io/api/email/send";

const apiKey = () => process.env.ATLAS_API_KEY || process.env.ATLAS_EMAIL_KEY;

/** True once a key is configured; callers fall back to logging when it isn't. */
export function atlasConfigured(): boolean {
  return Boolean(apiKey());
}

/**
 * Atlas matches `from` against its allowlist exactly, so a "Name <addr>" form
 * is rejected with a 403. Strip the display name if one is configured.
 */
export function bareAddress(value: string): string {
  const angle = value.match(/<([^>]+)>/);
  return (angle ? angle[1] : value).trim();
}

export type AtlasMessage = {
  /** Must be an address Atlas authorises for the key, never the visitor's. */
  from: string;
  /** Must be on the key's allowlist, or Atlas returns a 403. */
  to: string | string[];
  /** The visitor's address — sending *as* them would fail DMARC. */
  replyTo?: string;
  subject: string;
  /** Atlas takes a plain-text body; there is no html field. */
  text: string;
};

export type AtlasResult = { ok: true } | { ok: false; status: number; detail: string };

/**
 * Atlas's documented failures are 400 (missing field), 401 (bad or revoked
 * key), 403 (sender or recipient out of scope), 429 (rate limit) and 502/503
 * (setup problem — retrying won't help). status 0 means it was unreachable.
 */
export async function sendAtlasEmail(msg: AtlasMessage): Promise<AtlasResult> {
  const key = apiKey();
  if (!key) return { ok: false, status: 0, detail: "no Atlas key configured" };

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: bareAddress(msg.from),
        to: Array.isArray(msg.to) ? msg.to : [msg.to],
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
        subject: msg.subject,
        text: msg.text,
      }),
      // Don't let a stalled request hold a serverless function open.
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    const detail =
      err instanceof Error && err.name === "TimeoutError"
        ? "the request timed out"
        : String(err);
    return { ok: false, status: 0, detail };
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      detail: await res.text().catch(() => ""),
    };
  }
  return { ok: true };
}
