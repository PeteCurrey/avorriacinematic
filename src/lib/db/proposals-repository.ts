/**
 * AVORRIA — PROPOSAL & DEPOSIT REPOSITORY
 *
 * Mirrors `20260819_015_phase12_proposals_payments_schema.sql`. Backed by the
 * same in-process store the rest of the admin uses today; every function is
 * async so swapping in Supabase is a body change, not a signature change.
 *
 * State transitions are enforced here rather than at the call site so an API
 * route cannot, for example, mark a proposal paid twice or accept one that has
 * already expired.
 */

import crypto from "crypto";
import type {
  Proposal,
  ProposalEvent,
  ProposalEventType,
  ProposalStatus,
} from "@/types/proposals";

interface ProposalState {
  proposals: Proposal[];
  events: ProposalEvent[];
}

const state: ProposalState = { proposals: [], events: [] };

/** URL-safe, unguessable. 32 bytes of entropy. */
export function generateProposalToken(): string {
  return crypto.randomBytes(24).toString("base64url");
}

function now(): string {
  return new Date().toISOString();
}

async function recordEvent(
  proposalId: string,
  type: ProposalEventType,
  detail?: string,
  actor?: string
): Promise<ProposalEvent> {
  const event: ProposalEvent = {
    id: `pev_${crypto.randomUUID()}`,
    proposal_id: proposalId,
    type,
    detail,
    actor,
    created_at: now(),
  };
  state.events.push(event);
  return event;
}

export async function createProposal(
  input: Omit<
    Proposal,
    "id" | "token" | "status" | "payment_status" | "created_at" | "updated_at"
  > & { status?: ProposalStatus }
): Promise<Proposal> {
  const proposal: Proposal = {
    ...input,
    id: `prop_${crypto.randomUUID()}`,
    token: generateProposalToken(),
    status: input.status || "draft",
    payment_status: "pending",
    created_at: now(),
    updated_at: now(),
  };
  state.proposals.push(proposal);
  await recordEvent(proposal.id, "created", `${proposal.business_name} — ${proposal.title}`);
  return proposal;
}

export async function getProposalByToken(token: string): Promise<Proposal | null> {
  if (!token) return null;
  return state.proposals.find((p) => p.token === token) || null;
}

export async function getProposalById(id: string): Promise<Proposal | null> {
  return state.proposals.find((p) => p.id === id) || null;
}

export async function listProposals(): Promise<Proposal[]> {
  return [...state.proposals].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getProposalEvents(proposalId: string): Promise<ProposalEvent[]> {
  return state.events
    .filter((e) => e.proposal_id === proposalId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export function isExpired(proposal: Proposal): boolean {
  return Boolean(proposal.expires_at && proposal.expires_at < now());
}

/** First open by the client. Idempotent — only the first view advances state. */
export async function markProposalViewed(token: string): Promise<Proposal | null> {
  const proposal = await getProposalByToken(token);
  if (!proposal) return null;
  if (proposal.status === "sent") {
    proposal.status = "viewed";
    proposal.updated_at = now();
    await recordEvent(proposal.id, "viewed");
  }
  return proposal;
}

export interface AcceptResult {
  ok: boolean;
  proposal?: Proposal;
  error?: string;
}

/**
 * Client signs the proposal. Does NOT take payment — it records the
 * commitment and opens the door for a checkout session.
 */
export async function acceptProposal(
  token: string,
  signerName: string,
  signerEmail: string
): Promise<AcceptResult> {
  const proposal = await getProposalByToken(token);
  if (!proposal) return { ok: false, error: "Proposal not found" };

  if (isExpired(proposal)) {
    if (proposal.status !== "expired") {
      proposal.status = "expired";
      proposal.updated_at = now();
      await recordEvent(proposal.id, "expired");
    }
    return { ok: false, error: "This proposal has expired" };
  }

  if (proposal.status === "declined") {
    return { ok: false, error: "This proposal was declined" };
  }

  // Already past acceptance — return the current state rather than regressing it.
  if (
    proposal.status === "accepted" ||
    proposal.status === "deposit_paid" ||
    proposal.status === "handed_off"
  ) {
    return { ok: true, proposal };
  }

  if (proposal.status !== "sent" && proposal.status !== "viewed") {
    return { ok: false, error: `Proposal is not open for acceptance (${proposal.status})` };
  }

  proposal.status = "accepted";
  proposal.signed_by_name = signerName;
  proposal.signed_by_email = signerEmail;
  proposal.signed_at = now();
  proposal.updated_at = now();
  await recordEvent(proposal.id, "accepted", `Signed by ${signerName} <${signerEmail}>`);
  return { ok: true, proposal };
}

export async function attachCheckoutSession(
  proposalId: string,
  sessionId: string,
  provider: string
): Promise<void> {
  const proposal = await getProposalById(proposalId);
  if (!proposal) return;
  proposal.payment_session_id = sessionId;
  proposal.updated_at = now();
  await recordEvent(proposalId, "checkout_created", `${provider} session ${sessionId}`);
}

/**
 * Confirm a deposit. Idempotent by session id: payment providers retry
 * webhooks, and a duplicate delivery must not double-record a payment or
 * re-trigger the handover notification.
 *
 * Returns `alreadyRecorded: true` when the event was a duplicate.
 */
export async function markDepositPaid(
  sessionId: string,
  amountMinor: number
): Promise<{ proposal: Proposal | null; alreadyRecorded: boolean }> {
  const proposal = state.proposals.find((p) => p.payment_session_id === sessionId) || null;
  if (!proposal) return { proposal: null, alreadyRecorded: false };

  if (proposal.payment_status === "paid") {
    return { proposal, alreadyRecorded: true };
  }

  proposal.payment_status = "paid";
  proposal.status = "deposit_paid";
  proposal.paid_at = now();
  proposal.updated_at = now();
  await recordEvent(
    proposal.id,
    "deposit_paid",
    `${(amountMinor / 100).toFixed(2)} ${proposal.currency.toUpperCase()} via session ${sessionId}`
  );
  return { proposal, alreadyRecorded: false };
}

export async function markPaymentFailed(sessionId: string, reason: string): Promise<Proposal | null> {
  const proposal = state.proposals.find((p) => p.payment_session_id === sessionId) || null;
  if (!proposal) return null;
  if (proposal.payment_status === "paid") return proposal; // never regress a paid deposit
  proposal.payment_status = "failed";
  proposal.updated_at = now();
  await recordEvent(proposal.id, "payment_failed", reason);
  return proposal;
}

/** A human takes ownership. This is the end of the autonomous pipeline. */
export async function markHandedOff(proposalId: string, owner: string): Promise<Proposal | null> {
  const proposal = await getProposalById(proposalId);
  if (!proposal) return null;
  if (proposal.status !== "deposit_paid") return proposal;
  proposal.status = "handed_off";
  proposal.handed_off_at = now();
  proposal.handed_off_to = owner;
  proposal.updated_at = now();
  await recordEvent(proposal.id, "handed_off", `Owner: ${owner}`, owner);
  return proposal;
}

/** Test/dev seeding helper. Not used by production paths. */
export async function __seedProposal(proposal: Proposal): Promise<void> {
  state.proposals.push(proposal);
}
