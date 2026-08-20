/**
 * AVORRIA — PAYMENT PROVIDER
 *
 * Stripe Checkout for deposit collection, with an explicit test mode for local
 * development.
 *
 * SAFETY CONTRACT
 * - A configured live key means a real Stripe API call. This module must never
 *   synthesise a "created" session when the call did not happen or failed —
 *   doing so reports an uncollected deposit as collected.
 * - Test mode is only entered when there is no secret key, or when a caller
 *   explicitly asks for it. It is always reported back via `provider: "test"`
 *   so callers and the audit trail can tell the difference.
 * - Webhook payloads are untrusted until the signature is verified.
 */

import crypto from "crypto";

const STRIPE_API = "https://api.stripe.com/v1";

export interface PaymentSessionParams {
  proposalId: string;
  /** Minor units (pence). Stripe expects integers — never a float of pounds. */
  amountMinor: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  testMode?: boolean;
  /** Copied onto the Stripe session so the webhook can resolve the proposal. */
  metadata?: Record<string, string>;
}

export interface PaymentSessionResult {
  sessionId: string;
  paymentUrl: string;
  status: "created" | "error";
  provider: "stripe" | "test";
  amountMinor: number;
  currency: string;
  error?: string;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Stripe's form encoding — nested keys use `a[b]` notation. */
function encodeForm(obj: Record<string, string | number | undefined>): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  }
  return parts.join("&");
}

export async function createPaymentSession(
  params: PaymentSessionParams
): Promise<PaymentSessionResult> {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!Number.isInteger(params.amountMinor) || params.amountMinor <= 0) {
    return {
      sessionId: "",
      paymentUrl: "",
      status: "error",
      provider: stripeKey ? "stripe" : "test",
      amountMinor: params.amountMinor,
      currency: params.currency,
      error: `amountMinor must be a positive integer in minor units, received ${params.amountMinor}`,
    };
  }

  // ── TEST MODE ──────────────────────────────────────────────────────────
  // Only when there is genuinely no key, or the caller opted in explicitly.
  if (!stripeKey || params.testMode) {
    const sessionId = `test_sess_${crypto.randomUUID()}`;
    const url = new URL(params.successUrl);
    url.searchParams.set("session_id", sessionId);
    url.searchParams.set("test", "true");
    return {
      sessionId,
      paymentUrl: url.toString(),
      status: "created",
      provider: "test",
      amountMinor: params.amountMinor,
      currency: params.currency,
    };
  }

  // ── LIVE STRIPE CHECKOUT SESSION ───────────────────────────────────────
  const form: Record<string, string | number> = {
    mode: "payment",
    "payment_method_types[0]": "card",
    customer_email: params.customerEmail,
    success_url: `${params.successUrl}${params.successUrl.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: params.cancelUrl,
    "line_items[0][quantity]": 1,
    "line_items[0][price_data][currency]": params.currency.toLowerCase(),
    "line_items[0][price_data][unit_amount]": params.amountMinor,
    "line_items[0][price_data][product_data][name]": params.description,
    "metadata[proposal_id]": params.proposalId,
    "metadata[customer_name]": params.customerName,
  };
  for (const [k, v] of Object.entries(params.metadata || {})) {
    form[`metadata[${k}]`] = v;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);

    const res = await fetch(`${STRIPE_API}/checkout/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        // Retrying a network failure must not create a second charge.
        "Idempotency-Key": `proposal_${params.proposalId}_${params.amountMinor}`,
      },
      body: encodeForm(form),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const body = (await res.json()) as {
      id?: string;
      url?: string;
      error?: { message?: string };
    };

    if (!res.ok || !body.id || !body.url) {
      return {
        sessionId: "",
        paymentUrl: "",
        status: "error",
        provider: "stripe",
        amountMinor: params.amountMinor,
        currency: params.currency,
        error: body.error?.message || `Stripe returned ${res.status}`,
      };
    }

    return {
      sessionId: body.id,
      paymentUrl: body.url,
      status: "created",
      provider: "stripe",
      amountMinor: params.amountMinor,
      currency: params.currency,
    };
  } catch (err) {
    return {
      sessionId: "",
      paymentUrl: "",
      status: "error",
      provider: "stripe",
      amountMinor: params.amountMinor,
      currency: params.currency,
      error: err instanceof Error ? err.message : "Stripe request failed",
    };
  }
}

// ============================================================================
// WEBHOOK SIGNATURE VERIFICATION
// ============================================================================

export interface WebhookVerification {
  valid: boolean;
  reason?: string;
  event?: {
    id: string;
    type: string;
    data: { object: Record<string, unknown> };
  };
}

/**
 * Verify a Stripe webhook signature.
 *
 * Stripe signs `${timestamp}.${rawBody}` with the endpoint secret. The raw
 * body must be the exact bytes received — re-serialising parsed JSON changes
 * the payload and the signature will never match.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  toleranceSeconds = 300
): WebhookVerification {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return { valid: false, reason: "STRIPE_WEBHOOK_SECRET is not configured" };
  if (!signatureHeader) return { valid: false, reason: "Missing stripe-signature header" };

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => {
      const idx = p.indexOf("=");
      return [p.slice(0, idx).trim(), p.slice(idx + 1).trim()];
    })
  ) as Record<string, string>;

  const timestamp = parts["t"];
  const provided = parts["v1"];
  if (!timestamp || !provided) return { valid: false, reason: "Malformed stripe-signature header" };

  // Reject replays of an old, previously-valid payload.
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (!Number.isFinite(age) || Math.abs(age) > toleranceSeconds) {
    return { valid: false, reason: `Signature timestamp outside tolerance (${age}s)` };
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { valid: false, reason: "Signature mismatch" };
  }

  try {
    return { valid: true, event: JSON.parse(rawBody) };
  } catch {
    return { valid: false, reason: "Body is not valid JSON" };
  }
}
