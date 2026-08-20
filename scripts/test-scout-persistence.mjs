/**
 * Scout persistence & deduplication — behaviour the pipeline's safety depends on.
 * Runs against the in-process backend (no Supabase credentials needed).
 */
import assert from "assert";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const store = await import(`${ROOT}/lib/db/scout-store.ts`);
const dedupe = await import(`${ROOT}/lib/scout/deduplication.ts`);

let pass = 0, fail = 0;
const t = async (name, fn) => {
  try { await fn(); console.log(`  PASS  ${name}`); pass++; }
  catch (e) { console.log(`  FAIL  ${name}\n        ${e.message}`); fail++; }
};

console.log("\n=== SCOUT PERSISTENCE & DEDUPLICATION ===\n");

const mkProspect = (name, website, extra = {}) => ({
  business: { company_name: name, website_url: website, sector: "Automotive", source: "ai_scout", ...extra },
  assessment: { opportunity_score: 72, opportunity_band: "GOOD", website_quality_score: 28 },
  scout_run_id: "run_test_1",
});

await t("a qualified prospect survives the run that created it", async () => {
  store.__resetMemory();
  assert.strictEqual((await store.getKnownBusinesses()).length, 0);
  const r = await store.persistQualifiedProspect(mkProspect("Apex Autocare", "https://apexautocare.co.uk"));
  assert.strictEqual(r.ok, true);
  const known = await store.getKnownBusinesses();
  assert.strictEqual(known.length, 1, "business should be readable after the run");
  assert.strictEqual(known[0].domain, "apexautocare.co.uk", "domain should be normalised on write");
});

await t("a second run recognises the business as a duplicate", async () => {
  store.__resetMemory();
  await store.persistQualifiedProspect(mkProspect("Apex Autocare", "https://apexautocare.co.uk"));
  const known = await store.getKnownBusinesses();
  const check = dedupe.isDuplicate(
    { domain: dedupe.normalizeDomain("https://www.apexautocare.co.uk/services"), companyName: "Apex Autocare" },
    known
  );
  assert.strictEqual(check.isDuplicate, true, "www + path variant of a known domain must be caught");
});

await t("a genuinely new business is not flagged as a duplicate", async () => {
  store.__resetMemory();
  await store.persistQualifiedProspect(mkProspect("Apex Autocare", "https://apexautocare.co.uk"));
  const known = await store.getKnownBusinesses();
  const check = dedupe.isDuplicate(
    { domain: dedupe.normalizeDomain("https://northgategarage.co.uk"), companyName: "Northgate Garage" },
    known
  );
  assert.strictEqual(check.isDuplicate, false);
});

await t("a suppressed domain is respected on the next run", async () => {
  store.__resetMemory();
  await store.addSuppressionEntry({ domain: "https://www.optedout.co.uk", reason: "unsubscribe request" });
  const list = await store.getSuppressions();
  assert.strictEqual(
    dedupe.checkSuppression("https://optedout.co.uk/contact", "Opted Out Ltd", list),
    true,
    "a suppressed domain must match regardless of www or path"
  );
});

await t("suppression by company-name pattern actually matches", async () => {
  store.__resetMemory();
  // Regression guard: the field is company_name_pattern, not company_name.
  // Writing the wrong key type-checks (both optional) but never matches.
  await store.addSuppressionEntry({ company_name_pattern: "acme.*group", reason: "competitor" });
  const list = await store.getSuppressions();
  assert.strictEqual(dedupe.checkSuppression("https://acme.co.uk", "ACME Holdings Group", list), true);
});

await t("an unrelated business is not suppressed", async () => {
  store.__resetMemory();
  await store.addSuppressionEntry({ domain: "https://optedout.co.uk", reason: "unsubscribe" });
  const list = await store.getSuppressions();
  assert.strictEqual(dedupe.checkSuppression("https://stillfairgame.co.uk", "Still Fair Game Ltd", list), false);
});

await t("dedupe catches a shared phone number across differing names", async () => {
  store.__resetMemory();
  await store.persistQualifiedProspect(
    mkProspect("Apex Autocare", "https://apexautocare.co.uk", { phone: "01614960000" })
  );
  const known = await store.getKnownBusinesses();
  const check = dedupe.isDuplicate(
    { domain: "apex-autocare-manchester.co.uk", phone: "0161 496 0000", companyName: "Apex Autocare Manchester" },
    known
  );
  assert.strictEqual(check.isDuplicate, true, "same phone in a different format must still match");
});

await t("the backend is reported honestly, never assumed durable", async () => {
  store.__resetMemory();
  const r = await store.persistQualifiedProspect(mkProspect("Backend Check", "https://backendcheck.test"));
  assert.strictEqual(r.backend, "memory", "with no Supabase credentials this must report 'memory'");
});

console.log(`\n  ${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
