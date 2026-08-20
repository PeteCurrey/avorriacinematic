import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  recordDeliveryEvent,
  stopEnrolment,
  findEnrolmentByEmail,
} from "@/lib/db/outreach-store";
import { addSuppressionEntry } from "@/lib/db/scout-store";

/**
 * POST /api/webhooks/resend
 *
 * Delivery events for outreach mail: bounces, complaints, opens, clicks.
 *
 * Two of these are not statistics, they are obligations:
 *   - a hard bounce means the address is dead; keep sending and the sending
 *     domain's reputation degrades
 *   - a spam complaint means the recipient reported us; that address must
 *     never be contacted again
 * Both stop the enrolment and, for complaints, add a permanent suppression.
 *
 * The raw body is signature-verified before it is trusted, and handling is
 * idempotent by provider event id because providers retry.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface SvixHeaders {
  id: string | null;
  timestamp: string | null;
  signature: string | null;
}

/**
 * Resend signs webhooks with Svix: base64 HMAC-SHA256 over
 * `${id}.${timestamp}.${body}`, using the secret after its `whsec_` prefix.
 * The signature header may carry several space-separated `v1,<sig>` values.
 */
function verifySignature(rawBody: string, h: SvixHeaders): { valid: boolean; reason?: string } {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return { valid: false, reason: "RESEND_WEBHOOK_SECRET is not configured" };
  if (!h.id || !h.timestamp || !h.signature) {
    return { valid: false, reason: "Missing svix signature headers" };
  }

  // Reject replays of an old, previously-valid payload.
  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - Number(h.timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) {
    return { valid: false, reason: `Timestamp outside tolerance (${ageSeconds}s)` };
  }

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = crypto
    .createHmac("sha256", key)
    .update(`${h.id}.${h.timestamp}.${rawBody}`, "utf8")
    .digest("base64");

  const provided = h.signature
    .split(" ")
    .map((part) => part.split(",")[1])
    .filter(Boolean);

  const expBuf = Buffer.from(expected, "utf8");
  const match = provided.some((sig) => {
    const sigBuf = Buffer.from(sig, "utf8");
    return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
  });

  return match ? { valid: true } : { valid: false, reason: "Signature mismatch" };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const verification = verifySignature(rawBody, {
    id: request.headers.get("svix-id"),
    timestamp: request.headers.get("svix-timestamp"),
    signature: request.headers.get("svix-signature"),
  });

  if (!verification.valid) {
    console.warn(`[resend-webhook] rejected: ${verification.reason}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { type?: string; data?: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Body is not valid JSON" }, { status: 400 });
  }

  const eventType = event.type || "unknown";
  const data = event.data || {};
  const providerMessageId = (data.email_id as string) || undefined;
  const eventId = request.headers.get("svix-id")!;

  const recorded = await recordDeliveryEvent({
    provider: "resend",
    provider_event_id: eventId,
    event_type: eventType,
    provider_message_id: providerMessageId,
    payload: data,
  });

  if (recorded.alreadyExists) {
    return NextResponse.json({ received: true, duplicate: true });
  }
  if (!recorded.ok) {
    console.error(`[resend-webhook] could not record ${eventType}: ${recorded.error}`);
    // Acknowledge anyway — a retry would hit the same failure.
    return NextResponse.json({ received: true, recordError: true });
  }

  try {
    const recipient = Array.isArray(data.to)
      ? (data.to[0] as string)
      : ((data.to as string) || "");

    switch (eventType) {
      case "email.bounced": {
        // Soft bounces are transient; only a hard bounce retires the address.
        const bounceType = ((data.bounce as Record<string, unknown>)?.type as string) || "";
        if (bounceType.toLowerCase() === "soft") break;

        const enrolment = recipient ? await findEnrolmentByEmail(recipient) : null;
        if (enrolment) {
          await stopEnrolment(enrolment.id, "bounced", `hard bounce: ${bounceType || "unknown"}`);
        }
        break;
      }

      case "email.complained": {
        // A spam complaint is a permanent, non-negotiable stop.
        const enrolment = recipient ? await findEnrolmentByEmail(recipient) : null;
        if (enrolment) {
          await stopEnrolment(enrolment.id, "unsubscribed", "spam complaint");
        }
        if (recipient) {
          await addSuppressionEntry({
            domain: recipient.split("@")[1],
            reason: `spam complaint from ${recipient}`,
          });
        }
        break;
      }

      default:
        // Opens, clicks and deliveries are recorded above; no state change.
        break;
    }
  } catch (err) {
    console.error(
      `[resend-webhook] handler failed for ${eventType}:`,
      err instanceof Error ? err.message : err
    );
    return NextResponse.json({ received: true, handlerError: true });
  }

  return NextResponse.json({ received: true });
}
