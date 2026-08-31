/**
 * Best-effort in-memory fixed-window rate limiter.
 *
 * LIMITATION, stated plainly: this lives in the memory of one server
 * instance. On a serverless platform each instance keeps its own counter and
 * cold starts reset it, so a determined attacker spraying across instances
 * gets more than `limit` requests through. It stops casual abuse and
 * scripted form spam; it is not a substitute for a shared store (Vercel KV,
 * Upstash) or an edge WAF rule if this endpoint ever gets targeted.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Bound the map so a spray of unique IPs can't grow it without limit.
const MAX_KEYS = 5_000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    if (buckets.size >= MAX_KEYS) {
      for (const [k, bucket] of buckets) {
        if (now >= bucket.resetAt) buckets.delete(k);
      }
      // Still full of live entries — drop the oldest insertion.
      if (buckets.size >= MAX_KEYS) {
        const oldest = buckets.keys().next().value;
        if (oldest !== undefined) buckets.delete(oldest);
      }
    }

    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return {
    ok: true,
    remaining: limit - existing.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Client IP from the proxy headers Vercel and most reverse proxies set.
 * Falls back to a constant, which means an unknown-IP flood shares one
 * bucket — deliberately conservative rather than unlimited.
 *
 * SECOND LIMITATION: `x-forwarded-for` is only trustworthy when a proxy you
 * control sets it and strips any client-supplied value. Vercel does. If this
 * is ever self-hosted with the app exposed directly, an attacker can forge the
 * header and get a fresh bucket per request, defeating the limit entirely.
 * Behind a bare reverse proxy, make sure it overwrites rather than appends.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
