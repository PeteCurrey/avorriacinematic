/**
 * AVORRIA — OUTREACH SEQUENCE ENGINE
 *
 * Executes due outreach steps. This is the component that actually contacts
 * real businesses who did not ask to hear from us, so it is written as a
 * series of gates: a send happens only if EVERY gate passes, and each gate
 * fails closed.
 *
 * GATE ORDER (cheapest and most consequential first)
 *   1. Global kill switch
 *   2. Daily send cap
 *   3. Enrolment still active
 *   4. Recipient not suppressed        <- re-checked at send time, not just at discovery
 *   5. Step slot claimed               <- unique (enrolment, step) prevents a double send
 *   6. Copy generated and validated
 *   7. Transmit
 *
 * Suppression is deliberately re-checked here rather than trusted from
 * enrolment: someone can unsubscribe between being enrolled and step 3 going
 * out, and the enrolment was created days earlier.
 */

import { runAITask } from "@/lib/ai/router";
import { validateOutreachCopy } from "@/lib/ai/types";
import { sendEmail, isEmailLive } from "@/lib/email/email-provider";
import { checkSuppression } from "@/lib/scout/deduplication";
import { getSuppressions } from "@/lib/db/scout-store";
import {
  getDueEnrolments,
  claimMessageSlot,
  recordSendOutcome,
  advanceEnrolment,
  stopEnrolment,
  getPreviousSubjects,
  countSentToday,
  type Enrolment,
  type SequenceStep,
} from "@/lib/db/outreach-store";

export interface SequenceContext {
  sequenceId: string;
  steps: SequenceStep[];
  maxSendsPerDay: number;
}

export interface ProspectContext {
  company_name: string;
  sector?: string;
  city?: string;
  website_url?: string;
  website_quality_score: number;
  major_issues: string[];
  summary?: string;
}

/** Resolves the business detail an enrolment refers to. */
export type ProspectResolver = (enrolment: Enrolment) => Promise<ProspectContext | null>;

export interface SendOutcome {
  enrolmentId: string;
  step: number;
  result:
    | "sent"
    | "dry_run"
    | "skipped_duplicate"
    | "skipped_suppressed"
    | "skipped_cap"
    | "skipped_inactive"
    | "failed";
  detail?: string;
}

export interface RunSummary {
  considered: number;
  sent: number;
  dryRun: number;
  skipped: number;
  failed: number;
  capRemaining: number;
  live: boolean;
  outcomes: SendOutcome[];
  errors: string[];
}

/**
 * Global kill switch. Distinct from AVORRIA_EMAIL_LIVE: that governs whether
 * mail leaves the building at all, this stops the sequencer specifically —
 * so outreach can be halted without disabling transactional mail like
 * proposals and deposit receipts.
 */
export function isOutreachPaused(): boolean {
  return process.env.AVORRIA_OUTREACH_PAUSED === "true";
}

export async function runDueOutreach(
  context: SequenceContext,
  resolveProspect: ProspectResolver,
  options: { limit?: number; dryRun?: boolean } = {}
): Promise<RunSummary> {
  const summary: RunSummary = {
    considered: 0,
    sent: 0,
    dryRun: 0,
    skipped: 0,
    failed: 0,
    capRemaining: 0,
    live: isEmailLive("outreach") && !options.dryRun,
    outcomes: [],
    errors: [],
  };

  // ── GATE 1: kill switch ────────────────────────────────────────────────
  if (isOutreachPaused()) {
    summary.errors.push("Outreach is paused (AVORRIA_OUTREACH_PAUSED=true). No sends attempted.");
    return summary;
  }

  // ── GATE 2: daily cap ──────────────────────────────────────────────────
  // countSentToday throws if it cannot be read; an unreadable cap must not be
  // treated as an empty one.
  let sentToday: number;
  try {
    sentToday = await countSentToday();
  } catch (err) {
    summary.errors.push(err instanceof Error ? err.message : "Could not read daily send count");
    return summary;
  }

  const capRemaining = Math.max(0, context.maxSendsPerDay - sentToday);
  summary.capRemaining = capRemaining;
  if (capRemaining === 0) {
    summary.errors.push(
      `Daily cap reached for this sequence (${sentToday}/${context.maxSendsPerDay}).`
    );
    return summary;
  }

  // Suppression list is loaded once per run. getSuppressions throws on backend
  // failure rather than yielding an empty list.
  let suppressions;
  try {
    suppressions = await getSuppressions();
  } catch (err) {
    summary.errors.push(err instanceof Error ? err.message : "Could not load suppression list");
    return summary;
  }

  const batchLimit = Math.min(options.limit ?? capRemaining, capRemaining);
  const due = await getDueEnrolments(batchLimit);
  summary.considered = due.length;

  for (const enrolment of due) {
    // Re-check the cap inside the loop — earlier iterations consume it.
    if (summary.sent >= capRemaining) {
      summary.outcomes.push({
        enrolmentId: enrolment.id,
        step: enrolment.current_step + 1,
        result: "skipped_cap",
      });
      summary.skipped++;
      continue;
    }

    const outcome = await sendNextStep(enrolment, context, resolveProspect, suppressions, options);
    summary.outcomes.push(outcome);

    switch (outcome.result) {
      case "sent":
        summary.sent++;
        break;
      case "dry_run":
        summary.dryRun++;
        break;
      case "failed":
        summary.failed++;
        if (outcome.detail) summary.errors.push(outcome.detail);
        break;
      default:
        summary.skipped++;
    }
  }

  return summary;
}

async function sendNextStep(
  enrolment: Enrolment,
  context: SequenceContext,
  resolveProspect: ProspectResolver,
  suppressions: Awaited<ReturnType<typeof getSuppressions>>,
  options: { dryRun?: boolean }
): Promise<SendOutcome> {
  const stepNumber = enrolment.current_step + 1;
  const base = { enrolmentId: enrolment.id, step: stepNumber };

  // ── GATE 3: enrolment still active ───────────────────────────────────
  if (enrolment.status !== "active") {
    return { ...base, result: "skipped_inactive", detail: `status=${enrolment.status}` };
  }

  const step = context.steps.find((s) => s.step_number === stepNumber);
  if (!step) {
    // No further steps — the sequence is finished for this prospect.
    await advanceEnrolment(enrolment.id, enrolment.current_step, null);
    return { ...base, result: "skipped_inactive", detail: "sequence complete" };
  }

  const prospect = await resolveProspect(enrolment);
  if (!prospect) {
    return { ...base, result: "failed", detail: `Could not resolve prospect for ${enrolment.id}` };
  }

  // ── GATE 4: suppression, re-checked at send time ─────────────────────
  // The enrolment may be days old; the recipient may have opted out since.
  if (
    checkSuppression(
      prospect.website_url || enrolment.contact_email,
      prospect.company_name,
      suppressions
    )
  ) {
    await stopEnrolment(enrolment.id, "unsubscribed", "matched suppression list at send time");
    return { ...base, result: "skipped_suppressed" };
  }

  // ── GATE 5: claim the step slot BEFORE generating or sending ─────────
  // The unique (enrolment, step) constraint is what makes a concurrent or
  // retried run unable to send the same step twice.
  const claim = await claimMessageSlot({
    enrolment_id: enrolment.id,
    step_number: stepNumber,
    to_email: enrolment.contact_email,
    subject: "(pending)",
    body_text: "(pending)",
  });

  if (!claim.ok || !claim.data) {
    return { ...base, result: "failed", detail: claim.error || "could not claim message slot" };
  }
  if (claim.alreadyExists && claim.data.status !== "queued") {
    // Already sent (or already failed) by another run.
    return { ...base, result: "skipped_duplicate", detail: `existing status=${claim.data.status}` };
  }

  const messageId = claim.data.id;

  // ── GATE 6: generate and validate copy ───────────────────────────────
  let subject: string;
  let bodyText: string;
  try {
    const previousSubjects = await getPreviousSubjects(enrolment.id);
    const copyOutput = await runAITask({
      task: "outreach_copy",
      payload: {
        business: {
          company_name: prospect.company_name,
          sector: prospect.sector,
          city: prospect.city,
          website_url: prospect.website_url,
        },
        observations: {
          website_quality_score: prospect.website_quality_score,
          major_issues: prospect.major_issues,
          summary: prospect.summary,
        },
        step: {
          step_number: step.step_number,
          purpose: step.purpose,
          copy_brief: step.copy_brief,
        },
        previousSubjects: previousSubjects.filter((s) => s && s !== "(pending)"),
      },
      entityType: "business",
    });

    if (!copyOutput.success || !copyOutput.result) {
      throw new Error(copyOutput.error || "copy generation returned no result");
    }

    // Throws when the model declined for lack of anything true to say.
    const copy = validateOutreachCopy(copyOutput.result);
    subject = copy.subject;
    bodyText = copy.body_text;
  } catch (err) {
    const detail = err instanceof Error ? err.message : "copy generation failed";
    await recordSendOutcome(messageId, { status: "failed", provider: "dry_run", error: detail });
    return { ...base, result: "failed", detail };
  }

  // ── GATE 7: transmit ─────────────────────────────────────────────────
  const send = await sendEmail({
    lane: "outreach",
    to: enrolment.contact_email,
    subject,
    text: bodyText,
    dryRun: options.dryRun,
    tags: {
      enrolment_id: enrolment.id,
      sequence_id: context.sequenceId,
      step: String(stepNumber),
    },
  });

  await recordSendOutcome(messageId, {
    status:
      send.status === "sent" ? "sent" : send.status === "suppressed" ? "suppressed" : "failed",
    provider: send.provider,
    provider_message_id: send.messageId,
    error: send.error,
  });

  if (send.status === "failed") {
    return { ...base, result: "failed", detail: send.error };
  }

  // Schedule the following step, if there is one.
  const nextStep = context.steps.find((s) => s.step_number === stepNumber + 1);
  await advanceEnrolment(enrolment.id, stepNumber, nextStep ? nextStep.delay_hours : null);

  return {
    ...base,
    result: send.status === "sent" ? "sent" : "dry_run",
    detail: send.status === "suppressed" ? send.error : undefined,
  };
}
