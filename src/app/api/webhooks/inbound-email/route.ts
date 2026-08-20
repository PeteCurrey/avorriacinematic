import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { runAITask } from "@/lib/ai/router";
import { validateReplyClassification } from "@/lib/ai/types";
import { findEnrolmentByEmail, recordReply, stopEnrolment } from "@/lib/db/outreach-store";
import { addSuppressionEntry } from "@/lib/db/scout-store";
import { sendEmail } from "@/lib/email/email-provider";

/**
 * POST /api/webhooks/inbound-email
 *
 * A human replied to cold outreach. Two things must happen before anything
 * else, and neither depends on the classifier working:
 *
 *   1. The sequence stops. Someone who replied must not receive step 3.
 *   2. The reply is recorded, so it is visible even if classification fails.
 *
 * Only then is the reply classified, and the classification is used to decide
 * whether to suppress permanently and whether a human is needed. If the
 * classifier errors, the reply stays `unclassified` and requires_human — the
 * safe default is a person reading it, never silent dismissal.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function verifyInboundSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.INBOUND_EMAIL_WEBHOOK_SECRET;
  // Fail closed: an unauthenticated endpoint here lets anyone forge a reply,
  // stop a sequence, or add a suppression for a competitor's domain.
  if (!secret || !signature) return false;

  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const provided = signature.replace(/^sha256=/, "");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

interface InboundPayload {
  from?: string;
  subject?: string;
  text?: string;
  plain?: string;
}

/** Strips the quoted original so the classifier reads only the new message. */
function stripQuotedReply(body: string): string {
  const markers = [
    /^\s*On .+ wrote:\s*$/m,
    /^\s*-{2,}\s*Original Message\s*-{2,}\s*$/im,
    /^\s*_{5,}\s*$/m,
    /^\s*From:\s.+$/m,
  ];
  let cut = body.length;
  for (const re of markers) {
    const m = body.match(re);
    if (m?.index !== undefined && m.index < cut) cut = m.index;
  }
  return body.slice(0, cut).trim() || body.trim();
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  if (!verifyInboundSignature(rawBody, request.headers.get("x-avorria-signature"))) {
    console.warn("[inbound-email] rejected: invalid or missing signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: InboundPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Body is not valid JSON" }, { status: 400 });
  }

  // Addresses arrive as either "Name <a@b.com>" or bare.
  const fromRaw = (payload.from || "").trim();
  const fromEmail = (fromRaw.match(/<([^>]+)>/)?.[1] || fromRaw).toLowerCase();
  const bodyText = stripQuotedReply(payload.text || payload.plain || "");

  if (!fromEmail || !bodyText) {
    return NextResponse.json({ error: "Reply is missing a sender or body" }, { status: 400 });
  }

  const enrolment = await findEnrolmentByEmail(fromEmail);

  // ── 1. STOP THE SEQUENCE FIRST ─────────────────────────────────────────
  // Before classification, before anything that could throw. A person who
  // replied must not receive the next step, whatever the reply says.
  if (enrolment) {
    await stopEnrolment(enrolment.id, "replied", "inbound reply received");
  }

  // ── 2. RECORD THE REPLY ────────────────────────────────────────────────
  const stored = await recordReply({
    enrolment_id: enrolment?.id ?? null,
    from_email: fromEmail,
    subject: payload.subject,
    body_text: bodyText,
  });

  if (!stored.ok) {
    console.error(`[inbound-email] could not record reply from ${fromEmail}: ${stored.error}`);
  }

  // ── 3. CLASSIFY (best effort) ──────────────────────────────────────────
  let intent = "unclassified";
  let requiresHuman = true;

  try {
    const output = await runAITask({
      task: "reply_classification",
      payload: { from_email: fromEmail, subject: payload.subject, body_text: bodyText },
      entityType: "business",
    });

    if (output.success && output.result) {
      const classified = validateReplyClassification(output.result);
      intent = classified.intent;
      requiresHuman = classified.requires_human;

      await recordReply({
        enrolment_id: enrolment?.id ?? null,
        from_email: fromEmail,
        subject: payload.subject,
        body_text: bodyText,
        intent: classified.intent,
        confidence: classified.confidence,
        requires_human: classified.requires_human,
      });

      // An explicit opt-out is permanent and domain-wide.
      if (classified.intent === "unsubscribe" || classified.intent === "hostile") {
        await addSuppressionEntry({
          domain: fromEmail.split("@")[1],
          reason: `${classified.intent} reply from ${fromEmail}`,
        });
      }

      // An automated bounce-back is not a human reply — the sequence should
      // resume rather than terminate on an out-of-office.
      if (
        enrolment &&
        (classified.intent === "out_of_office" || classified.intent === "auto_reply")
      ) {
        await stopEnrolment(enrolment.id, "stopped", `${classified.intent} — needs manual resume`);
      }
    }
  } catch (err) {
    // Classification is advisory. A failure leaves the reply unclassified and
    // requiring a human, which is the safe outcome.
    console.error(
      "[inbound-email] classification failed:",
      err instanceof Error ? err.message : err
    );
  }

  // ── 4. NOTIFY A HUMAN WHEN ONE IS NEEDED ───────────────────────────────
  if (requiresHuman) {
    await sendEmail({
      lane: "transactional",
      to: process.env.ENQUIRY_NOTIFICATION_EMAIL || "enquiries@avorria.com",
      subject: `Outreach reply (${intent}) — ${fromEmail}`,
      text: [
        `A reply came in and needs a person.`,
        ``,
        `From:   ${fromEmail}`,
        `Intent: ${intent}`,
        `Subject: ${payload.subject || "(none)"}`,
        ``,
        `--- message ---`,
        bodyText.slice(0, 2000),
      ].join("\n"),
      tags: { stage: "outreach_reply", intent },
    });
  }

  return NextResponse.json({ received: true, intent, requiresHuman });
}
