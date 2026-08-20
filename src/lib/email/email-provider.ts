/**
 * AVORRIA — OUTBOUND EMAIL PROVIDER
 *
 * The only place application code sends email. Two lanes, deliberately kept
 * distinct so a bug in the outreach pipeline can never send from the
 * transactional identity (or vice versa):
 *
 *   "outreach"      — cold prospect sequences. Reputation-isolated subdomain.
 *   "transactional" — proposals, receipts, previews to people we already have
 *                     a relationship with.
 *
 * SAFETY CONTRACT
 * - No API key configured means DRY RUN. The message is recorded and returned
 *   with `provider: "dry_run"` and is never transmitted. It must never be
 *   reported as sent.
 * - A send that fails returns status "failed" with the provider's reason. It
 *   must never be reported as sent.
 * - `AVORRIA_EMAIL_LIVE` must be explicitly "true" before anything leaves the
 *   building. A key alone is not consent to start emailing real people — this
 *   is the guard that stops a misconfigured preview deployment from mailing a
 *   live prospect list.
 */

export type EmailLane = "outreach" | "transactional";

export interface SendEmailParams {
  lane: EmailLane;
  to: string;
  subject: string;
  /** Plain text is required; HTML is optional but strongly preferred. */
  text: string;
  html?: string;
  replyTo?: string;
  /** Correlates the send with a prospect, proposal or sequence step. */
  tags?: Record<string, string>;
  /** Force a dry run regardless of configuration. */
  dryRun?: boolean;
}

export interface SendEmailResult {
  status: "sent" | "failed" | "suppressed";
  provider: "resend" | "dry_run";
  messageId?: string;
  to: string;
  lane: EmailLane;
  error?: string;
}

interface LaneIdentity {
  fromAddress: string;
  fromName: string;
  replyTo: string;
  apiKey?: string;
}

function laneIdentity(lane: EmailLane): LaneIdentity {
  if (lane === "outreach") {
    return {
      fromAddress: process.env.OUTBOUND_EMAIL_FROM_ADDRESS || "",
      fromName: process.env.OUTBOUND_EMAIL_FROM_NAME || "Avorria",
      replyTo: process.env.OUTBOUND_EMAIL_REPLY_TO || "",
      apiKey: process.env.OUTBOUND_EMAIL_API_KEY || process.env.RESEND_API_KEY,
    };
  }
  return {
    fromAddress: process.env.TRANSACTIONAL_EMAIL_FROM_ADDRESS || "",
    fromName: process.env.TRANSACTIONAL_EMAIL_FROM_NAME || "Avorria",
    replyTo: process.env.TRANSACTIONAL_EMAIL_REPLY_TO || "",
    apiKey: process.env.TRANSACTIONAL_EMAIL_API_KEY || process.env.RESEND_API_KEY,
  };
}

/** Live sending requires both a key and an explicit opt-in. */
export function isEmailLive(lane: EmailLane): boolean {
  return Boolean(laneIdentity(lane).apiKey) && process.env.AVORRIA_EMAIL_LIVE === "true";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const { lane, to, subject, text, html, tags } = params;
  const identity = laneIdentity(lane);

  if (!EMAIL_RE.test(to)) {
    return { status: "failed", provider: "dry_run", to, lane, error: `Invalid recipient: ${to}` };
  }

  const live = isEmailLive(lane) && !params.dryRun;

  // ── DRY RUN ────────────────────────────────────────────────────────────
  if (!live) {
    const reason = params.dryRun
      ? "explicit dryRun"
      : !identity.apiKey
        ? `no API key for the ${lane} lane`
        : "AVORRIA_EMAIL_LIVE is not 'true'";
    console.info(
      `[email:dry_run] lane=${lane} to=${to} subject=${JSON.stringify(subject)} — not sent (${reason})`
    );
    return { status: "suppressed", provider: "dry_run", to, lane, error: reason };
  }

  if (!identity.fromAddress) {
    return {
      status: "failed",
      provider: "resend",
      to,
      lane,
      error: `No from-address configured for the ${lane} lane`,
    };
  }

  // ── LIVE SEND (Resend) ─────────────────────────────────────────────────
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${identity.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${identity.fromName} <${identity.fromAddress}>`,
        to: [to],
        subject,
        text,
        ...(html ? { html } : {}),
        ...(params.replyTo || identity.replyTo
          ? { reply_to: params.replyTo || identity.replyTo }
          : {}),
        ...(tags
          ? { tags: Object.entries(tags).map(([name, value]) => ({ name, value })) }
          : {}),
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const body = (await res.json()) as { id?: string; message?: string; name?: string };

    if (!res.ok || !body.id) {
      return {
        status: "failed",
        provider: "resend",
        to,
        lane,
        error: body.message || `Resend returned ${res.status}`,
      };
    }

    return { status: "sent", provider: "resend", messageId: body.id, to, lane };
  } catch (err) {
    return {
      status: "failed",
      provider: "resend",
      to,
      lane,
      error: err instanceof Error ? err.message : "Resend request failed",
    };
  }
}
