import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/payments/stripe-provider";
import { markDepositPaid, markPaymentFailed } from "@/lib/db/proposals-repository";
import { sendEmail } from "@/lib/email/email-provider";

/**
 * POST /api/webhooks/stripe
 *
 * The ONLY path that may mark a deposit as paid.
 *
 * - The raw request body is read as text and signature-verified before it is
 *   parsed or trusted. Re-serialising parsed JSON would change the bytes and
 *   invalidate the signature, so `request.text()` is load-bearing.
 * - Handling is idempotent: Stripe retries deliveries, and a duplicate must
 *   not double-record a deposit or re-send the handover notification.
 * - Verification failures return 400. Downstream failures after a *valid*
 *   event return 200 so Stripe does not retry an event we have already
 *   applied; the error is logged for operator follow-up instead.
 */

// Ensure the raw body is available and never cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Provider event ids already applied, so retries are no-ops. */
const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  const verification = verifyWebhookSignature(rawBody, signature);
  if (!verification.valid || !verification.event) {
    console.warn(`[stripe-webhook] rejected: ${verification.reason}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = verification.event;

  if (processedEvents.has(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }
  processedEvents.add(event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as {
          id?: string;
          amount_total?: number;
          payment_status?: string;
        };
        if (!session.id) break;

        // `complete` can still be unpaid for async payment methods.
        if (session.payment_status && session.payment_status !== "paid") {
          console.info(
            `[stripe-webhook] session ${session.id} completed but payment_status=${session.payment_status}; awaiting async confirmation`
          );
          break;
        }

        const { proposal, alreadyRecorded } = await markDepositPaid(
          session.id,
          session.amount_total ?? 0
        );

        if (!proposal) {
          console.warn(`[stripe-webhook] no proposal for session ${session.id}`);
          break;
        }
        if (alreadyRecorded) break;

        // Deposit received — this is the handover point. Notify a human.
        const amount = ((session.amount_total ?? 0) / 100).toFixed(2);
        await sendEmail({
          lane: "transactional",
          to: process.env.ENQUIRY_NOTIFICATION_EMAIL || "enquiries@avorria.com",
          subject: `Deposit received — ${proposal.business_name} (${proposal.currency} ${amount})`,
          text: [
            `${proposal.business_name} has paid the deposit on "${proposal.title}".`,
            ``,
            `Amount:   ${proposal.currency} ${amount}`,
            `Signed by: ${proposal.signed_by_name} <${proposal.signed_by_email}>`,
            `Proposal:  ${proposal.id}`,
            ``,
            `The autonomous pipeline stops here. This project now needs a human owner.`,
          ].join("\n"),
          tags: { proposal_id: proposal.id, stage: "deposit_paid" },
        });
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as { id?: string; amount_total?: number };
        if (session.id) await markDepositPaid(session.id, session.amount_total ?? 0);
        break;
      }

      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object as { id?: string };
        if (session.id) await markPaymentFailed(session.id, event.type);
        break;
      }

      default:
        // Unhandled types are acknowledged so Stripe stops retrying them.
        break;
    }
  } catch (err) {
    // The event was genuine and has been marked processed. Returning 200
    // prevents a retry storm; the operator follows up from the log.
    console.error(
      `[stripe-webhook] handler failed for ${event.type} (${event.id}):`,
      err instanceof Error ? err.message : err
    );
    return NextResponse.json({ received: true, handlerError: true });
  }

  return NextResponse.json({ received: true });
}
