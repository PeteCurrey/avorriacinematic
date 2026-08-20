/**
 * AVORRIA — OUTREACH PERSISTENCE
 *
 * Mirrors `20260819_017_phase13_outreach_schema.sql`. Supabase when
 * configured, in-process otherwise, chosen per call.
 *
 * The uniqueness guarantees here are the safety mechanism, not bookkeeping:
 *
 *   - one enrolment per (sequence, prospect)  — never enrol the same prospect twice
 *   - one message per (enrolment, step)       — never send the same step twice
 *   - one delivery event per provider event id — retries don't double-count
 *
 * In the in-process backend these are enforced in code so behaviour matches
 * the database constraints, and the tests exercise the same guarantees against
 * whichever backend is active.
 */

import { getSupabase, activeBackend, type StorageBackend } from "./supabase-client";

// ============================================================================
// SHAPES
// ============================================================================

export type EnrolmentStatus =
  | "active"
  | "completed"
  | "replied"
  | "bounced"
  | "unsubscribed"
  | "stopped";

export type MessageStatus =
  | "queued"
  | "sent"
  | "failed"
  | "suppressed"
  | "bounced"
  | "complained";

export interface SequenceStep {
  step_number: number;
  delay_hours: number;
  purpose: string;
  copy_brief: string;
}

export interface Enrolment {
  id: string;
  sequence_id: string;
  prospect_id: string;
  business_id: string;
  contact_email: string;
  status: EnrolmentStatus;
  current_step: number;
  next_send_at: string | null;
  stopped_reason?: string;
  stopped_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OutreachMessage {
  id: string;
  enrolment_id: string;
  step_number: number;
  to_email: string;
  subject: string;
  body_text: string;
  status: MessageStatus;
  provider: string;
  provider_message_id?: string;
  error?: string;
  sent_at?: string;
  created_at: string;
}

export interface OutreachResult<T = void> {
  ok: boolean;
  backend: StorageBackend;
  data?: T;
  error?: string;
  /** True when the operation was a no-op because it had already happened. */
  alreadyExists?: boolean;
}

// ============================================================================
// IN-PROCESS FALLBACK
// ============================================================================

interface MemoryState {
  enrolments: Enrolment[];
  messages: OutreachMessage[];
  deliveryEvents: Set<string>;
  replies: Array<{ id: string; enrolment_id: string | null; from_email: string; intent: string; received_at: string }>;
}

const memory: MemoryState = {
  enrolments: [],
  messages: [],
  deliveryEvents: new Set(),
  replies: [],
};

/** Test/dev helper. Not used by production paths. */
export function __resetOutreachMemory(): void {
  memory.enrolments = [];
  memory.messages = [];
  memory.deliveryEvents = new Set();
  memory.replies = [];
}

const now = () => new Date().toISOString();

// ============================================================================
// ENROLMENT
// ============================================================================

/**
 * Enrol a prospect. Idempotent by (sequence, prospect): a second call returns
 * the existing enrolment with `alreadyExists`, rather than creating a parallel
 * journey that would double every send.
 */
export async function enrolProspect(input: {
  sequence_id: string;
  prospect_id: string;
  business_id: string;
  contact_email: string;
  /** When the first step should go out. Defaults to immediately. */
  first_send_at?: string;
}): Promise<OutreachResult<Enrolment>> {
  const backend = activeBackend();
  const supabase = getSupabase();

  if (!supabase) {
    const existing = memory.enrolments.find(
      (e) => e.sequence_id === input.sequence_id && e.prospect_id === input.prospect_id
    );
    if (existing) return { ok: true, backend, data: existing, alreadyExists: true };

    const enrolment: Enrolment = {
      id: `enr_mem_${crypto.randomUUID()}`,
      sequence_id: input.sequence_id,
      prospect_id: input.prospect_id,
      business_id: input.business_id,
      contact_email: input.contact_email.toLowerCase(),
      status: "active",
      current_step: 0,
      next_send_at: input.first_send_at || now(),
      created_at: now(),
      updated_at: now(),
    };
    memory.enrolments.push(enrolment);
    return { ok: true, backend, data: enrolment };
  }

  const { data, error } = await supabase
    .from("outreach_enrolments")
    .insert({
      sequence_id: input.sequence_id,
      prospect_id: input.prospect_id,
      business_id: input.business_id,
      contact_email: input.contact_email.toLowerCase(),
      next_send_at: input.first_send_at || now(),
    })
    .select("*")
    .single();

  if (error) {
    // 23505 = unique_violation on (sequence_id, prospect_id). Already enrolled
    // is a success, not a failure.
    if (error.code === "23505") {
      const { data: existing } = await supabase
        .from("outreach_enrolments")
        .select("*")
        .eq("sequence_id", input.sequence_id)
        .eq("prospect_id", input.prospect_id)
        .single();
      return { ok: true, backend, data: (existing as Enrolment) ?? undefined, alreadyExists: true };
    }
    return { ok: false, backend, error: error.message };
  }

  return { ok: true, backend, data: data as Enrolment };
}

/** Active enrolments whose next step is due. */
export async function getDueEnrolments(limit = 50): Promise<Enrolment[]> {
  const supabase = getSupabase();
  const cutoff = now();

  if (!supabase) {
    return memory.enrolments
      .filter((e) => e.status === "active" && e.next_send_at !== null && e.next_send_at <= cutoff)
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from("outreach_enrolments")
    .select("*")
    .eq("status", "active")
    .lte("next_send_at", cutoff)
    .order("next_send_at", { ascending: true })
    .limit(limit);

  if (error) {
    // Sends are driven off this read. Failing loudly stops a partial batch;
    // returning an empty list would look like "nothing due" and stall silently.
    throw new Error(`Could not load due enrolments: ${error.message}`);
  }
  return (data || []) as Enrolment[];
}

/**
 * Stop an enrolment. Terminal states are never overwritten — once someone has
 * unsubscribed or replied, a later bounce or completion must not reopen them.
 */
export async function stopEnrolment(
  enrolmentId: string,
  status: Exclude<EnrolmentStatus, "active">,
  reason: string
): Promise<OutreachResult<Enrolment>> {
  const backend = activeBackend();
  const supabase = getSupabase();
  const terminal: EnrolmentStatus[] = ["unsubscribed", "replied", "bounced", "stopped"];

  if (!supabase) {
    const e = memory.enrolments.find((x) => x.id === enrolmentId);
    if (!e) return { ok: false, backend, error: "enrolment not found" };
    if (terminal.includes(e.status)) {
      return { ok: true, backend, data: e, alreadyExists: true };
    }
    e.status = status;
    e.stopped_reason = reason;
    e.stopped_at = now();
    e.next_send_at = null;
    e.updated_at = now();
    return { ok: true, backend, data: e };
  }

  const { data: current } = await supabase
    .from("outreach_enrolments")
    .select("*")
    .eq("id", enrolmentId)
    .single();

  if (current && terminal.includes((current as Enrolment).status)) {
    return { ok: true, backend, data: current as Enrolment, alreadyExists: true };
  }

  const { data, error } = await supabase
    .from("outreach_enrolments")
    .update({ status, stopped_reason: reason, stopped_at: now(), next_send_at: null })
    .eq("id", enrolmentId)
    .select("*")
    .single();

  return error
    ? { ok: false, backend, error: error.message }
    : { ok: true, backend, data: data as Enrolment };
}

/** Advance to the next step after a successful send. */
export async function advanceEnrolment(
  enrolmentId: string,
  sentStep: number,
  nextDelayHours: number | null
): Promise<OutreachResult<Enrolment>> {
  const backend = activeBackend();
  const supabase = getSupabase();

  // A null delay means there is no next step — the sequence is complete.
  const nextSendAt =
    nextDelayHours === null
      ? null
      : new Date(Date.now() + nextDelayHours * 3600_000).toISOString();
  const status: EnrolmentStatus = nextDelayHours === null ? "completed" : "active";

  if (!supabase) {
    const e = memory.enrolments.find((x) => x.id === enrolmentId);
    if (!e) return { ok: false, backend, error: "enrolment not found" };
    e.current_step = sentStep;
    e.next_send_at = nextSendAt;
    e.status = status;
    e.updated_at = now();
    return { ok: true, backend, data: e };
  }

  const { data, error } = await supabase
    .from("outreach_enrolments")
    .update({ current_step: sentStep, next_send_at: nextSendAt, status })
    .eq("id", enrolmentId)
    .select("*")
    .single();

  return error
    ? { ok: false, backend, error: error.message }
    : { ok: true, backend, data: data as Enrolment };
}

// ============================================================================
// MESSAGES
// ============================================================================

/**
 * Claim the right to send one step.
 *
 * Inserting the message row BEFORE transmitting is deliberate: the unique
 * constraint on (enrolment, step) is what makes a concurrent or retried run
 * unable to send the same step twice. A claim that loses the race returns
 * `alreadyExists` and the caller must not send.
 */
export async function claimMessageSlot(input: {
  enrolment_id: string;
  step_number: number;
  to_email: string;
  subject: string;
  body_text: string;
}): Promise<OutreachResult<OutreachMessage>> {
  const backend = activeBackend();
  const supabase = getSupabase();

  if (!supabase) {
    const existing = memory.messages.find(
      (m) => m.enrolment_id === input.enrolment_id && m.step_number === input.step_number
    );
    if (existing) return { ok: true, backend, data: existing, alreadyExists: true };

    const msg: OutreachMessage = {
      id: `msg_mem_${crypto.randomUUID()}`,
      enrolment_id: input.enrolment_id,
      step_number: input.step_number,
      to_email: input.to_email.toLowerCase(),
      subject: input.subject,
      body_text: input.body_text,
      status: "queued",
      provider: "dry_run",
      created_at: now(),
    };
    memory.messages.push(msg);
    return { ok: true, backend, data: msg };
  }

  const { data, error } = await supabase
    .from("outreach_messages")
    .insert({
      enrolment_id: input.enrolment_id,
      step_number: input.step_number,
      to_email: input.to_email.toLowerCase(),
      subject: input.subject,
      body_text: input.body_text,
      status: "queued",
    })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      const { data: existing } = await supabase
        .from("outreach_messages")
        .select("*")
        .eq("enrolment_id", input.enrolment_id)
        .eq("step_number", input.step_number)
        .single();
      return {
        ok: true,
        backend,
        data: (existing as OutreachMessage) ?? undefined,
        alreadyExists: true,
      };
    }
    return { ok: false, backend, error: error.message };
  }

  return { ok: true, backend, data: data as OutreachMessage };
}

export async function recordSendOutcome(
  messageId: string,
  outcome: {
    status: MessageStatus;
    provider: string;
    provider_message_id?: string;
    error?: string;
  }
): Promise<OutreachResult> {
  const backend = activeBackend();
  const supabase = getSupabase();
  const sentAt = outcome.status === "sent" ? now() : undefined;

  if (!supabase) {
    const m = memory.messages.find((x) => x.id === messageId);
    if (!m) return { ok: false, backend, error: "message not found" };
    m.status = outcome.status;
    m.provider = outcome.provider;
    m.provider_message_id = outcome.provider_message_id;
    m.error = outcome.error;
    m.sent_at = sentAt;
    return { ok: true, backend };
  }

  const { error } = await supabase
    .from("outreach_messages")
    .update({
      status: outcome.status,
      provider: outcome.provider,
      provider_message_id: outcome.provider_message_id ?? null,
      error: outcome.error ?? null,
      sent_at: sentAt ?? null,
    })
    .eq("id", messageId);

  return error ? { ok: false, backend, error: error.message } : { ok: true, backend };
}

/** Subjects already used on this enrolment, so later steps don't repeat an angle. */
export async function getPreviousSubjects(enrolmentId: string): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return memory.messages
      .filter((m) => m.enrolment_id === enrolmentId)
      .sort((a, b) => a.step_number - b.step_number)
      .map((m) => m.subject);
  }
  const { data } = await supabase
    .from("outreach_messages")
    .select("subject")
    .eq("enrolment_id", enrolmentId)
    .order("step_number", { ascending: true });
  return (data || []).map((r) => r.subject as string);
}

/** How many messages were actually transmitted today, for the daily cap. */
export async function countSentToday(): Promise<number> {
  const supabase = getSupabase();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const since = startOfDay.toISOString();

  if (!supabase) {
    return memory.messages.filter((m) => m.status === "sent" && (m.sent_at || "") >= since).length;
  }

  const { count, error } = await supabase
    .from("outreach_messages")
    .select("id", { count: "exact", head: true })
    .eq("status", "sent")
    .gte("sent_at", since);

  if (error) {
    // The cap is a safety limit. If it cannot be read, treat the day as full
    // rather than assuming zero and sending an unbounded batch.
    throw new Error(`Could not read today's send count: ${error.message}`);
  }
  return count ?? 0;
}

// ============================================================================
// DELIVERY EVENTS & REPLIES
// ============================================================================

/** Returns false when this provider event has already been applied. */
export async function recordDeliveryEvent(input: {
  provider: string;
  provider_event_id: string;
  event_type: string;
  provider_message_id?: string;
  payload?: unknown;
}): Promise<OutreachResult<{ messageId?: string }>> {
  const backend = activeBackend();
  const supabase = getSupabase();
  const key = `${input.provider}:${input.provider_event_id}`;

  if (!supabase) {
    if (memory.deliveryEvents.has(key)) {
      return { ok: true, backend, alreadyExists: true };
    }
    memory.deliveryEvents.add(key);
    const msg = input.provider_message_id
      ? memory.messages.find((m) => m.provider_message_id === input.provider_message_id)
      : undefined;
    return { ok: true, backend, data: { messageId: msg?.id } };
  }

  let messageId: string | undefined;
  if (input.provider_message_id) {
    const { data: msg } = await supabase
      .from("outreach_messages")
      .select("id")
      .eq("provider_message_id", input.provider_message_id)
      .maybeSingle();
    messageId = (msg?.id as string) || undefined;
  }

  const { error } = await supabase.from("outreach_delivery_events").insert({
    message_id: messageId ?? null,
    provider: input.provider,
    provider_event_id: input.provider_event_id,
    event_type: input.event_type,
    payload: input.payload ?? null,
  });

  if (error) {
    if (error.code === "23505") return { ok: true, backend, alreadyExists: true };
    return { ok: false, backend, error: error.message };
  }
  return { ok: true, backend, data: { messageId } };
}

/** Find the enrolment an inbound reply belongs to, by sender address. */
export async function findEnrolmentByEmail(email: string): Promise<Enrolment | null> {
  const supabase = getSupabase();
  const addr = email.toLowerCase();

  if (!supabase) {
    const matches = memory.enrolments.filter((e) => e.contact_email === addr);
    return matches.length ? matches[matches.length - 1] : null;
  }

  const { data } = await supabase
    .from("outreach_enrolments")
    .select("*")
    .eq("contact_email", addr)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (data as Enrolment) || null;
}

export async function recordReply(input: {
  enrolment_id: string | null;
  from_email: string;
  subject?: string;
  body_text: string;
  intent?: string;
  confidence?: number;
  requires_human?: boolean;
}): Promise<OutreachResult<{ id: string }>> {
  const backend = activeBackend();
  const supabase = getSupabase();

  if (!supabase) {
    const id = `rep_mem_${crypto.randomUUID()}`;
    memory.replies.push({
      id,
      enrolment_id: input.enrolment_id,
      from_email: input.from_email.toLowerCase(),
      intent: input.intent || "unclassified",
      received_at: now(),
    });
    return { ok: true, backend, data: { id } };
  }

  const { data, error } = await supabase
    .from("outreach_replies")
    .insert({
      enrolment_id: input.enrolment_id,
      from_email: input.from_email.toLowerCase(),
      subject: input.subject ?? null,
      body_text: input.body_text,
      intent: input.intent || "unclassified",
      confidence: input.confidence ?? null,
      requires_human: input.requires_human ?? true,
    })
    .select("id")
    .single();

  return error
    ? { ok: false, backend, error: error.message }
    : { ok: true, backend, data: { id: data.id as string } };
}
