import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/security/rate-limit";
import {
  acceptProposal,
  attachCheckoutSession,
  getProposalByToken,
} from "@/lib/db/proposals-repository";
import { createPaymentSession } from "@/lib/payments/stripe-provider";

/**
 * POST /api/proposals/[token]/accept
 *
 * Client signs a proposal and is handed a checkout session for the deposit.
 *
 * Acceptance and payment are deliberately separate steps: signing records the
 * commitment immediately, so a client who abandons checkout is still visible
 * in the pipeline as "accepted, deposit outstanding" rather than disappearing.
 *
 * This route NEVER marks a deposit as paid — only a verified provider webhook
 * can do that. A client controls this request; they must not be able to
 * assert their own payment.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientKey(request: NextRequest, token: string): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return `proposal_accept:${ip}:${token}`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const limit = checkRateLimit(clientKey(request, token), {
    maxRequests: 8,
    windowSeconds: 300,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.resetInSeconds) } }
    );
  }

  let body: { signerName?: string; signerEmail?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const signerName = (body.signerName || "").trim();
  const signerEmail = (body.signerEmail || "").trim().toLowerCase();

  if (!signerName || signerName.length > 120) {
    return NextResponse.json({ error: "A valid full name is required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(signerEmail) || signerEmail.length > 200) {
    return NextResponse.json({ error: "A valid business email is required" }, { status: 400 });
  }

  const existing = await getProposalByToken(token);
  if (!existing) {
    // Same shape as any other failure — do not confirm whether a token exists.
    return NextResponse.json({ error: "Proposal not available" }, { status: 404 });
  }

  const result = await acceptProposal(token, signerName, signerEmail);
  if (!result.ok || !result.proposal) {
    return NextResponse.json({ error: result.error || "Could not accept proposal" }, { status: 409 });
  }

  const proposal = result.proposal;

  // Already settled — nothing further to pay.
  if (proposal.payment_status === "paid") {
    return NextResponse.json({
      status: proposal.status,
      paid: true,
      message: "This deposit has already been received.",
    });
  }

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.nextUrl.origin;

  const session = await createPaymentSession({
    proposalId: proposal.id,
    amountMinor: proposal.deposit_minor,
    currency: proposal.currency,
    customerEmail: signerEmail,
    customerName: signerName,
    description: `${proposal.title} — deposit (${proposal.business_name})`,
    successUrl: `${origin}/proposal/${token}?deposit=success`,
    cancelUrl: `${origin}/proposal/${token}?deposit=cancelled`,
    metadata: { proposal_token: token },
  });

  if (session.status === "error") {
    // The signature stands; only checkout failed. Surface it honestly rather
    // than implying the project is authorised.
    return NextResponse.json(
      {
        status: proposal.status,
        paid: false,
        error: "Your acceptance was recorded, but the payment page could not be opened.",
        detail: session.error,
      },
      { status: 502 }
    );
  }

  await attachCheckoutSession(proposal.id, session.sessionId, session.provider);

  return NextResponse.json({
    status: proposal.status,
    paid: false,
    provider: session.provider,
    paymentUrl: session.paymentUrl,
    depositMinor: proposal.deposit_minor,
    currency: proposal.currency,
  });
}
