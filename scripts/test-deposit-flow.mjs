import crypto from "crypto";
import assert from "assert";

import path from "path";
import { fileURLToPath } from "url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const stripe = await import(`${ROOT}/lib/payments/stripe-provider.ts`);
const repo = await import(`${ROOT}/lib/db/proposals-repository.ts`);
const email = await import(`${ROOT}/lib/email/email-provider.ts`);

let pass = 0, fail = 0;
const t = async (name, fn) => {
  try { await fn(); console.log(`  PASS  ${name}`); pass++; }
  catch (e) { console.log(`  FAIL  ${name}\n        ${e.message}`); fail++; }
};

console.log("\n=== DEPOSIT FLOW — SAFETY & CORRECTNESS ===\n");

// ---------------------------------------------------------------- money
await t("rejects a non-integer amount rather than sending it to Stripe", async () => {
  const r = await stripe.createPaymentSession({
    proposalId: "p1", amountMinor: 1850.5, currency: "GBP",
    customerEmail: "a@b.com", customerName: "A", description: "d",
    successUrl: "https://x.test/s", cancelUrl: "https://x.test/c",
  });
  assert.strictEqual(r.status, "error");
  assert.match(r.error, /minor units/);
});

await t("rejects a zero or negative amount", async () => {
  for (const amt of [0, -100]) {
    const r = await stripe.createPaymentSession({
      proposalId: "p1", amountMinor: amt, currency: "GBP",
      customerEmail: "a@b.com", customerName: "A", description: "d",
      successUrl: "https://x.test/s", cancelUrl: "https://x.test/c",
    });
    assert.strictEqual(r.status, "error", `amount ${amt} should error`);
  }
});

await t("with no key configured, reports provider 'test' — never 'stripe'", async () => {
  delete process.env.STRIPE_SECRET_KEY;
  const r = await stripe.createPaymentSession({
    proposalId: "p1", amountMinor: 50000, currency: "GBP",
    customerEmail: "a@b.com", customerName: "A", description: "d",
    successUrl: "https://x.test/s", cancelUrl: "https://x.test/c",
  });
  assert.strictEqual(r.provider, "test");
  assert.strictEqual(r.status, "created");
});

// ------------------------------------------------------- webhook signature
const SECRET = "whsec_test_secret";
const sign = (body, ts = Math.floor(Date.now() / 1000)) =>
  `t=${ts},v1=${crypto.createHmac("sha256", SECRET).update(`${ts}.${body}`, "utf8").digest("hex")}`;

await t("accepts a correctly signed webhook", async () => {
  process.env.STRIPE_WEBHOOK_SECRET = SECRET;
  const body = JSON.stringify({ id: "evt_1", type: "checkout.session.completed", data: { object: {} } });
  const v = stripe.verifyWebhookSignature(body, sign(body));
  assert.strictEqual(v.valid, true);
  assert.strictEqual(v.event.id, "evt_1");
});

await t("rejects a forged signature", async () => {
  process.env.STRIPE_WEBHOOK_SECRET = SECRET;
  const body = JSON.stringify({ id: "evt_2", type: "x", data: { object: {} } });
  const v = stripe.verifyWebhookSignature(body, `t=${Math.floor(Date.now()/1000)},v1=${"0".repeat(64)}`);
  assert.strictEqual(v.valid, false);
});

await t("rejects a tampered body carrying a once-valid signature", async () => {
  process.env.STRIPE_WEBHOOK_SECRET = SECRET;
  const body = JSON.stringify({ id: "evt_3", amount_total: 10000 });
  const sig = sign(body);
  const tampered = JSON.stringify({ id: "evt_3", amount_total: 1 });
  assert.strictEqual(stripe.verifyWebhookSignature(tampered, sig).valid, false);
});

await t("rejects a replayed signature outside the tolerance window", async () => {
  process.env.STRIPE_WEBHOOK_SECRET = SECRET;
  const body = JSON.stringify({ id: "evt_4" });
  const old = Math.floor(Date.now() / 1000) - 4000;
  assert.strictEqual(stripe.verifyWebhookSignature(body, sign(body, old)).valid, false);
});

await t("rejects everything when no webhook secret is configured", async () => {
  delete process.env.STRIPE_WEBHOOK_SECRET;
  const body = JSON.stringify({ id: "evt_5" });
  assert.strictEqual(stripe.verifyWebhookSignature(body, sign(body)).valid, false);
  process.env.STRIPE_WEBHOOK_SECRET = SECRET;
});

// ------------------------------------------------------------ state machine
const mkProposal = () => repo.createProposal({
  business_name: "Apex Autocare Ltd", contact_name: "Sam Reed", contact_email: "sam@apex.test",
  title: "Website Development & Launch", summary: "s", scope: [{ label: "Build" }],
  total_minor: 185000, deposit_minor: 50000, currency: "GBP", status: "sent",
});

await t("a draft proposal cannot be accepted", async () => {
  const p = await repo.createProposal({
    business_name: "B", contact_name: "C", contact_email: "c@d.test",
    title: "T", summary: "", scope: [], total_minor: 1000, deposit_minor: 500, currency: "GBP",
  });
  const r = await repo.acceptProposal(p.token, "X", "x@y.test");
  assert.strictEqual(r.ok, false);
});

await t("tokens are unguessable and unique", async () => {
  const a = await mkProposal(), b = await mkProposal();
  assert.notStrictEqual(a.token, b.token);
  assert.ok(a.token.length >= 32, `token too short: ${a.token.length}`);
});

await t("accepting records the signature but does NOT mark it paid", async () => {
  const p = await mkProposal();
  const r = await repo.acceptProposal(p.token, "Sam Reed", "sam@apex.test");
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.proposal.status, "accepted");
  assert.strictEqual(r.proposal.payment_status, "pending", "acceptance must never imply payment");
});

await t("an expired proposal cannot be accepted", async () => {
  const p = await repo.createProposal({
    business_name: "B", contact_name: "C", contact_email: "c@d.test",
    title: "T", summary: "", scope: [], total_minor: 1000, deposit_minor: 500,
    currency: "GBP", status: "sent",
    expires_at: new Date(Date.now() - 1000).toISOString(),
  });
  const r = await repo.acceptProposal(p.token, "X", "x@y.test");
  assert.strictEqual(r.ok, false);
  assert.match(r.error, /expired/i);
});

await t("deposit confirmation is idempotent across webhook retries", async () => {
  const p = await mkProposal();
  await repo.acceptProposal(p.token, "Sam", "sam@apex.test");
  await repo.attachCheckoutSession(p.id, "cs_test_123", "stripe");

  const first = await repo.markDepositPaid("cs_test_123", 50000);
  assert.strictEqual(first.alreadyRecorded, false);
  assert.strictEqual(first.proposal.status, "deposit_paid");

  const retry = await repo.markDepositPaid("cs_test_123", 50000);
  assert.strictEqual(retry.alreadyRecorded, true, "a retry must be detected as a duplicate");

  const events = await repo.getProposalEvents(p.id);
  const paidEvents = events.filter((e) => e.type === "deposit_paid");
  assert.strictEqual(paidEvents.length, 1, `expected 1 deposit_paid event, got ${paidEvents.length}`);
});

await t("a later failure event cannot un-pay a confirmed deposit", async () => {
  const p = await mkProposal();
  await repo.acceptProposal(p.token, "Sam", "sam@apex.test");
  await repo.attachCheckoutSession(p.id, "cs_test_456", "stripe");
  await repo.markDepositPaid("cs_test_456", 50000);
  const after = await repo.markPaymentFailed("cs_test_456", "late failure event");
  assert.strictEqual(after.payment_status, "paid");
});

await t("an unknown session id does not resolve to any proposal", async () => {
  const r = await repo.markDepositPaid("cs_does_not_exist", 50000);
  assert.strictEqual(r.proposal, null);
});

await t("handover only applies to a paid proposal", async () => {
  const unpaid = await mkProposal();
  await repo.acceptProposal(unpaid.token, "Sam", "sam@apex.test");
  const r1 = await repo.markHandedOff(unpaid.id, "pete@avorria.com");
  assert.strictEqual(r1.status, "accepted", "unpaid proposal must not hand off");

  const paid = await mkProposal();
  await repo.acceptProposal(paid.token, "Sam", "sam@apex.test");
  await repo.attachCheckoutSession(paid.id, "cs_test_789", "stripe");
  await repo.markDepositPaid("cs_test_789", 50000);
  const r2 = await repo.markHandedOff(paid.id, "pete@avorria.com");
  assert.strictEqual(r2.status, "handed_off");
});

// ------------------------------------------------------------------- email
await t("email is suppressed, never 'sent', when not explicitly live", async () => {
  delete process.env.AVORRIA_EMAIL_LIVE;
  process.env.RESEND_API_KEY = "re_fake_key";
  const r = await email.sendEmail({ lane: "outreach", to: "a@b.test", subject: "s", text: "t" });
  assert.strictEqual(r.status, "suppressed");
  assert.strictEqual(r.provider, "dry_run");
  assert.match(r.error, /AVORRIA_EMAIL_LIVE/);
});

await t("an API key alone does not make the outreach lane live", async () => {
  delete process.env.AVORRIA_EMAIL_LIVE;
  process.env.RESEND_API_KEY = "re_fake_key";
  assert.strictEqual(email.isEmailLive("outreach"), false);
});

await t("an invalid recipient fails instead of being reported as sent", async () => {
  const r = await email.sendEmail({ lane: "transactional", to: "not-an-email", subject: "s", text: "t" });
  assert.strictEqual(r.status, "failed");
});

console.log(`\n  ${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
