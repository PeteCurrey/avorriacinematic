/**
 * Outreach sequencing — the gates that stop the system contacting someone
 * twice, contacting someone who opted out, or continuing after a reply.
 * Runs against the in-process backend (no credentials needed).
 */
import assert from "assert";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const store = await import(`${ROOT}/lib/db/outreach-store.ts`);
const scoutStore = await import(`${ROOT}/lib/db/scout-store.ts`);
const engine = await import(`${ROOT}/lib/outreach/sequence-engine.ts`);
const aiTypes = await import(`${ROOT}/lib/ai/types.ts`);

let pass = 0, fail = 0;
const t = async (name, fn) => {
  try { await fn(); console.log(`  PASS  ${name}`); pass++; }
  catch (e) { console.log(`  FAIL  ${name}\n        ${e.message}`); fail++; }
};

console.log("\n=== OUTREACH SEQUENCING & REPLY SAFETY ===\n");

const SEQ = "seq_test";
const enrol = (email, prospect = "pros_1") =>
  store.enrolProspect({
    sequence_id: SEQ, prospect_id: prospect, business_id: "biz_1", contact_email: email,
  });

// ---------------------------------------------------------------- enrolment
await t("a prospect is never enrolled in the same sequence twice", async () => {
  store.__resetOutreachMemory();
  const a = await enrol("owner@apex.test");
  const b = await enrol("owner@apex.test");
  assert.strictEqual(a.ok, true);
  assert.strictEqual(b.alreadyExists, true, "second enrolment must be detected as existing");
  assert.strictEqual(a.data.id, b.data.id, "must return the same enrolment, not a parallel one");
});

// ------------------------------------------------------------ send claiming
await t("a step can only be claimed once, so it cannot be sent twice", async () => {
  store.__resetOutreachMemory();
  const e = (await enrol("owner@apex.test")).data;
  const first = await store.claimMessageSlot({
    enrolment_id: e.id, step_number: 1, to_email: e.contact_email, subject: "s", body_text: "b",
  });
  const second = await store.claimMessageSlot({
    enrolment_id: e.id, step_number: 1, to_email: e.contact_email, subject: "s", body_text: "b",
  });
  assert.strictEqual(first.alreadyExists, undefined);
  assert.strictEqual(second.alreadyExists, true, "a concurrent claim must lose the race");
  assert.strictEqual(first.data.id, second.data.id);
});

// --------------------------------------------------------- terminal states
await t("a terminal enrolment is never reopened by a later event", async () => {
  store.__resetOutreachMemory();
  const e = (await enrol("owner@apex.test")).data;
  await store.stopEnrolment(e.id, "unsubscribed", "opted out");
  const late = await store.stopEnrolment(e.id, "bounced", "late bounce event");
  assert.strictEqual(late.alreadyExists, true);
  assert.strictEqual(late.data.status, "unsubscribed", "unsubscribe must not be overwritten by a bounce");
});

await t("stopping an enrolment clears its next send", async () => {
  store.__resetOutreachMemory();
  const e = (await enrol("owner@apex.test")).data;
  assert.ok(e.next_send_at, "should start scheduled");
  const stopped = await store.stopEnrolment(e.id, "replied", "they replied");
  assert.strictEqual(stopped.data.next_send_at, null, "a stopped enrolment must never be due again");
});

await t("a stopped enrolment is not returned as due", async () => {
  store.__resetOutreachMemory();
  const e = (await enrol("owner@apex.test")).data;
  await store.stopEnrolment(e.id, "replied", "they replied");
  const due = await store.getDueEnrolments();
  assert.strictEqual(due.length, 0);
});

// ----------------------------------------------------------- delivery events
await t("a retried delivery event is not counted twice", async () => {
  store.__resetOutreachMemory();
  const first = await store.recordDeliveryEvent({
    provider: "resend", provider_event_id: "evt_abc", event_type: "email.bounced",
  });
  const retry = await store.recordDeliveryEvent({
    provider: "resend", provider_event_id: "evt_abc", event_type: "email.bounced",
  });
  assert.strictEqual(first.alreadyExists, undefined);
  assert.strictEqual(retry.alreadyExists, true);
});

// ------------------------------------------------------------- engine gates
const STEPS = [
  { step_number: 1, delay_hours: 0, purpose: "open", copy_brief: "brief" },
  { step_number: 2, delay_hours: 72, purpose: "follow up", copy_brief: "brief" },
];
const ctx = { sequenceId: SEQ, steps: STEPS, maxSendsPerDay: 10 };
const resolver = async () => ({
  company_name: "Apex Autocare", sector: "Automotive", city: "Manchester",
  website_url: "https://apexautocare.co.uk", website_quality_score: 28,
  major_issues: ["no mobile layout", "no SSL"],
});

await t("the kill switch stops every send", async () => {
  store.__resetOutreachMemory(); scoutStore.__resetMemory();
  await enrol("owner@apex.test");
  process.env.AVORRIA_OUTREACH_PAUSED = "true";
  const r = await engine.runDueOutreach(ctx, resolver);
  delete process.env.AVORRIA_OUTREACH_PAUSED;
  assert.strictEqual(r.sent, 0);
  assert.strictEqual(r.considered, 0, "nothing should even be considered while paused");
  assert.match(r.errors[0], /paused/i);
});

await t("a zero daily cap blocks the run", async () => {
  store.__resetOutreachMemory(); scoutStore.__resetMemory();
  await enrol("owner@apex.test");
  const r = await engine.runDueOutreach({ ...ctx, maxSendsPerDay: 0 }, resolver);
  assert.strictEqual(r.sent, 0);
  assert.match(r.errors[0], /cap/i);
});

await t("a suppressed recipient is skipped and the enrolment stopped", async () => {
  store.__resetOutreachMemory(); scoutStore.__resetMemory();
  await scoutStore.addSuppressionEntry({ domain: "apexautocare.co.uk", reason: "opted out" });
  const e = (await enrol("owner@apex.test")).data;
  const r = await engine.runDueOutreach(ctx, resolver);
  const outcome = r.outcomes.find((o) => o.enrolmentId === e.id);
  assert.strictEqual(outcome.result, "skipped_suppressed", `got ${outcome.result}`);
  const due = await store.getDueEnrolments();
  assert.strictEqual(due.length, 0, "a suppressed enrolment must be stopped, not left due");
});

await t("nothing transmits while AVORRIA_EMAIL_LIVE is unset", async () => {
  store.__resetOutreachMemory(); scoutStore.__resetMemory();
  delete process.env.AVORRIA_EMAIL_LIVE;
  await enrol("owner@apex.test");
  const r = await engine.runDueOutreach(ctx, resolver, { dryRun: true });
  assert.strictEqual(r.live, false, "run must not report itself as live");
  assert.strictEqual(r.sent, 0, "no message may be recorded as sent");
});

// ------------------------------------------------------------- classifiers
await t("an unrecognised reply intent is rejected, not guessed", async () => {
  assert.throws(
    () => aiTypes.validateReplyClassification({ intent: "maybe_later", confidence: 0.9 }),
    /Unrecognised reply intent/
  );
});

await t("a low-confidence classification is always routed to a human", async () => {
  const r = aiTypes.validateReplyClassification({
    intent: "not_interested", confidence: 0.4, requires_human: false, summary: "x",
  });
  assert.strictEqual(r.requires_human, true, "confidence below 0.7 must require a human");
});

await t("interest always requires a human even if the model says otherwise", async () => {
  const r = aiTypes.validateReplyClassification({
    intent: "interested", confidence: 0.99, requires_human: false, summary: "x",
  });
  assert.strictEqual(r.requires_human, true);
});

await t("outreach copy with no subject is treated as a refusal to send", async () => {
  assert.throws(
    () => aiTypes.validateOutreachCopy({ subject: "", body_text: "hi", observation_used: "too thin" }),
    /declined/
  );
});

await t("outreach copy with no body is rejected", async () => {
  assert.throws(
    () => aiTypes.validateOutreachCopy({ subject: "a subject", body_text: "", observation_used: "x" }),
    /no body/
  );
});

console.log(`\n  ${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
