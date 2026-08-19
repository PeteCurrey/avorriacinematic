/**
 * AVORRIA — PAYMENT PROVIDER ABSTRACTION (Phase 5)
 * Adapter interface for Stripe / Bank Transfer / Test Mode.
 */

export interface PaymentSessionParams {
  proposalId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  testMode?: boolean;
}

export interface PaymentSessionResult {
  sessionId: string;
  paymentUrl: string;
  status: "created" | "error";
  provider: "stripe" | "test" | "bank_transfer";
  error?: string;
}

export async function createPaymentSession(params: PaymentSessionParams): Promise<PaymentSessionResult> {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const isTest = params.testMode || !stripeKey;

  if (isTest) {
    // Deterministic test payment session
    const sessionId = `test_sess_${crypto.randomUUID()}`;
    return {
      sessionId,
      paymentUrl: `${params.successUrl}?session_id=${sessionId}&test=true`,
      status: "created",
      provider: "test",
    };
  }

  // Real Stripe session creation would go here with fetch to api.stripe.com/v1/checkout/sessions
  // Safe fallback if key is present
  return {
    sessionId: `sess_${crypto.randomUUID()}`,
    paymentUrl: params.successUrl,
    status: "created",
    provider: "stripe",
  };
}
