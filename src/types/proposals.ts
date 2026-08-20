/**
 * AVORRIA — PROPOSAL & DEPOSIT TYPES
 *
 * The handover point of the AI Auto pipeline. Everything upstream (scout,
 * outreach, mockup) is autonomous; accepting a proposal and paying a deposit
 * is where a real commercial commitment is made and a human takes over.
 */

export type ProposalStatus =
  /** Drafted by the system, not yet visible to the client. */
  | "draft"
  /** Sent to the client; the token link is live. */
  | "sent"
  /** Client opened the proposal at least once. */
  | "viewed"
  /** Client signed and a checkout session was created — money not yet taken. */
  | "accepted"
  /** Deposit confirmed by the payment provider. */
  | "deposit_paid"
  /** A human has picked the project up. Pipeline handover complete. */
  | "handed_off"
  | "declined"
  | "expired";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "cancelled";

export interface ProposalLineItem {
  label: string;
  detail?: string;
}

export interface Proposal {
  id: string;
  /** Opaque, unguessable URL token for the client-facing view. */
  token: string;

  prospect_id?: string;
  business_name: string;
  contact_name: string;
  contact_email: string;

  title: string;
  summary: string;
  scope: ProposalLineItem[];

  /** Minor units (pence). Never store money as a float. */
  total_minor: number;
  deposit_minor: number;
  currency: string;

  status: ProposalStatus;

  /** Set when the client signs. */
  signed_by_name?: string;
  signed_by_email?: string;
  signed_at?: string;

  /** Populated once a checkout session exists. */
  payment_session_id?: string;
  payment_status: PaymentStatus;
  paid_at?: string;

  /** Set when a human takes ownership. */
  handed_off_at?: string;
  handed_off_to?: string;

  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export type ProposalEventType =
  | "created"
  | "sent"
  | "viewed"
  | "accepted"
  | "checkout_created"
  | "deposit_paid"
  | "payment_failed"
  | "handed_off"
  | "declined"
  | "expired";

export interface ProposalEvent {
  id: string;
  proposal_id: string;
  type: ProposalEventType;
  /** Free-form context. Never store card data or any payment credential. */
  detail?: string;
  actor?: string;
  created_at: string;
}
