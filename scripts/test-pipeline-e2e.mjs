/**
 * End-to-end pipeline chain, in-process, no credentials.
 *
 * Proves the stages actually connect: a business discovered by Scout is
 * remembered, enrolled, contacted, and — once they reply asking to stop —
 * is excluded from every later stage. Each stage is exercised through its
 * real module, not a stub.
 */
import assert from "assert";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const scout = await import(`${ROOT}/lib/db/scout-store.ts`);
const outreach = await import(`${ROOT}/lib/db/outreach-store.ts`);
const dedupe = await import(`${ROOT}/lib/scout/deduplication.ts`);
const engine = await import(`${ROOT}/lib/outreach/sequence-engine.ts`);

let pass = 0, fail = 0;
const t = async (name, fn) => {
  try { await fn(); console.log(`  PASS  ${name}`); pass++; }
  catch (e) { console.log(`  FAIL  ${name}\n        ${e.message}`); fail++; }
};

console.log("\n=== PIPELINE END-TO-END CHAIN ===\n");

const SEQ = "seq_e2e";
const STEPS = [
  { step_number: 1, delay_hours: 0, purpose: "open", copy_brief: "b" },
  { step_number: 2, delay_hours: 72, purpose: "follow up", copy_brief: "b" },
];
const CTX = { sequenceId: SEQ, steps: STEPS, maxSendsPerDay: 25 };

await t("a business discovered by Scout is still known to a later run", async () => {
  scout.__resetMemory(); outreach.__resetOutreachMemory();

  const persisted = await scout.persistQualifiedProspect({
    business: {
      company_name: "Apex Autocare", website_url: "https://apexautocare.co.uk",
      sector: "Automotive", source: "ai_scout",
    },
    assessment: { opportunity_score: 74, opportunity_band: "GOOD", website_quality_score: 26 },
    scout_run_id: "run_1",
  });
  assert.strictEqual(persisted.ok, true);

  // A second, independent run reads the same durable state.
  const known = await scout.getKnownBusinesses();
  const dup = dedupe.isDuplicate(
    { domain: dedupe.normalizeDomain("http://www.apexautocare.co.uk"), companyName: "Apex Autocare" },
    known
  );
  assert.strictEqual(dup.isDuplicate, true, "run 2 must not rediscover the same business");
});

await t("a reply stops the sequence and suppresses the domain", async () => {
  scout.__resetMemory(); outreach.__resetOutreachMemory();

  const e = (await outreach.enrolProspect({
    sequence_id: SEQ, prospect_id: "pros_apex", business_id: "biz_apex",
    contact_email: "owner@apexautocare.co.uk",
  })).data;
  assert.ok(await outreach.getDueEnrolments().then((d) => d.length === 1), "should start due");

  // What the inbound-email webhook does, in the same order.
  await outreach.stopEnrolment(e.id, "replied", "inbound reply received");
  await scout.addSuppressionEntry({
    domain: "apexautocare.co.uk", reason: "unsubscribe reply from owner@apexautocare.co.uk",
  });

  const due = await outreach.getDueEnrolments();
  assert.strictEqual(due.length, 0, "a replier must never receive the next step");
});

await t("once suppressed, a re-enrolled prospect is never actually contacted", async () => {
  scout.__resetMemory(); outreach.__resetOutreachMemory();
  await scout.addSuppressionEntry({ domain: "apexautocare.co.uk", reason: "opted out" });

  // Even if something re-enrols them, the send-time gate must catch it.
  const e = (await outreach.enrolProspect({
    sequence_id: SEQ, prospect_id: "pros_apex", business_id: "biz_apex",
    contact_email: "owner@apexautocare.co.uk",
  })).data;

  const summary = await engine.runDueOutreach(CTX, async () => ({
    company_name: "Apex Autocare", sector: "Automotive", city: "Manchester",
    website_url: "https://apexautocare.co.uk",
    website_quality_score: 26, major_issues: ["no mobile layout"],
  }));

  const outcome = summary.outcomes.find((o) => o.enrolmentId === e.id);
  assert.strictEqual(outcome.result, "skipped_suppressed", `got ${outcome.result}`);
  assert.strictEqual(summary.sent, 0, "nothing may be sent to a suppressed recipient");
});

await t("a suppressed business is also excluded from future discovery", async () => {
  scout.__resetMemory();
  await scout.addSuppressionEntry({ domain: "apexautocare.co.uk", reason: "opted out" });
  const list = await scout.getSuppressions();
  assert.strictEqual(
    dedupe.checkSuppression("https://apexautocare.co.uk", "Apex Autocare", list),
    true,
    "Scout must skip a suppressed business before spending any AI budget on it"
  );
});

await t("the full chain leaves no way to contact an opted-out business", async () => {
  scout.__resetMemory(); outreach.__resetOutreachMemory();

  // Discovered, contacted, replied "remove me".
  await scout.persistQualifiedProspect({
    business: { company_name: "Apex Autocare", website_url: "https://apexautocare.co.uk",
                sector: "Automotive", source: "ai_scout" },
    assessment: { opportunity_score: 74, opportunity_band: "GOOD", website_quality_score: 26 },
    scout_run_id: "run_1",
  });
  const e = (await outreach.enrolProspect({
    sequence_id: SEQ, prospect_id: "pros_apex", business_id: "biz_apex",
    contact_email: "owner@apexautocare.co.uk",
  })).data;
  await outreach.stopEnrolment(e.id, "unsubscribed", "unsubscribe reply");
  await scout.addSuppressionEntry({ domain: "apexautocare.co.uk", reason: "unsubscribe" });

  // 1. Discovery skips them.
  const sup = await scout.getSuppressions();
  assert.strictEqual(dedupe.checkSuppression("https://apexautocare.co.uk", "Apex Autocare", sup), true);

  // 2. Deduplication also knows them.
  const known = await scout.getKnownBusinesses();
  assert.strictEqual(
    dedupe.isDuplicate({ domain: "apexautocare.co.uk", companyName: "Apex Autocare" }, known).isDuplicate,
    true
  );

  // 3. The enrolment is terminal and cannot be reopened.
  const reopen = await outreach.stopEnrolment(e.id, "bounced", "late event");
  assert.strictEqual(reopen.data.status, "unsubscribed");

  // 4. Nothing is due, and a fresh run sends nothing.
  assert.strictEqual((await outreach.getDueEnrolments()).length, 0);
  const summary = await engine.runDueOutreach(CTX, async () => ({
    company_name: "Apex Autocare", website_quality_score: 26, major_issues: [],
    website_url: "https://apexautocare.co.uk",
  }));
  assert.strictEqual(summary.sent, 0);
});

console.log(`\n  ${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
