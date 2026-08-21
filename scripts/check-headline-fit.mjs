/**
 * HEADLINE FIT GUARD
 *
 * Display type is sized in viewport units while its container is often capped
 * at a fixed measure, so a long word can need more line than the column has.
 * The CSS backstop then breaks it mid-word — "AVORRIA STUDIO" rendering as
 * "AVORRI / A STUDIO". It looks broken, and nothing in a build or typecheck
 * catches it.
 *
 * This measures, for every display heading on every page, the widest single
 * word against the width actually available to it, at each breakpoint.
 *
 *   BASE=http://localhost:3100 node scripts/check-headline-fit.mjs
 */
import { createRequire } from "module";
const require = createRequire("/Users/petercurrey/Desktop/Career OS/career-os/package.json");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:3100";
const WIDTHS = (process.env.WIDTHS || "360,390,768,1024,1440,1920").split(",").map(Number);
const PAGES = (
  process.env.PAGES ||
  "/,/work,/services,/services/websites,/studio,/lab,/intelligence,/contact,/start-project,/work/alkota-bikes,/intelligence/your-website-is-infrastructure"
).split(",");

const SELECTOR = ".display-xxl, .display-xl, .display-lg, .display-column, h1, h2";

(async () => {
  let browser;
  try { browser = await chromium.launch(); }
  catch { browser = await chromium.launch({ channel: "chrome" }); }

  const failures = [];
  let checked = 0;

  for (const width of WIDTHS) {
    for (const path of PAGES) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      try {
        await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.waitForTimeout(1500);

        const found = await page.evaluate((sel) => {
          const out = [];
          const probe = document.createElement("span");
          probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;top:-9999px;";
          document.body.appendChild(probe);

          for (const el of document.querySelectorAll(sel)) {
            // <br> is a break opportunity but contributes no whitespace to
            // textContent, so "SOMETHING<br>IN" would measure as one word.
            const text = (el.innerHTML || "")
              .replace(/<br\s*\/?>/gi, " ")
              .replace(/<wbr\s*\/?>/gi, " ")
              .replace(/<[^>]+>/g, "")
              .replace(/&nbsp;/g, " ")
              .trim();
            if (!text) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0) continue;

            const cs = getComputedStyle(el);
            // Only display-scale type is at risk; body copy wraps fine.
            if (parseFloat(cs.fontSize) < 32) continue;

            probe.style.font = cs.font;
            probe.style.letterSpacing = cs.letterSpacing;
            probe.style.textTransform = cs.textTransform;

            let longest = "", need = 0;
            for (const word of text.split(/\s+/)) {
              if (!word) continue;
              probe.textContent = word;
              const w = probe.getBoundingClientRect().width;
              if (w > need) { need = w; longest = word; }
            }
            // Available width is the element's own content box.
            const avail = rect.width;
            if (need > avail + 1) {
              out.push({
                longest, need: Math.round(need), avail: Math.round(avail),
                fs: Math.round(parseFloat(cs.fontSize)),
                text: text.slice(0, 46),
              });
            }
          }
          probe.remove();
          return out;
        }, SELECTOR);

        checked++;
        for (const f of found) failures.push({ width, path, ...f });
      } catch (err) {
        failures.push({ width, path, error: String(err).slice(0, 70) });
      }
      await page.close();
    }
  }

  await browser.close();

  console.log(`\nHEADLINE FIT — ${checked} page renders across ${WIDTHS.length} breakpoints\n`);
  if (!failures.length) {
    console.log("  No headline breaks mid-word. All display type fits its container.\n");
    process.exit(0);
  }
  for (const f of failures) {
    if (f.error) { console.log(`  ERROR ${f.path} @${f.width}: ${f.error}`); continue; }
    console.log(
      `  BREAKS  ${String(f.width).padStart(4)}px  ${f.path}\n` +
      `          "${f.longest}" needs ${f.need}px, has ${f.avail}px at ${f.fs}px  — in "${f.text}"`
    );
  }
  console.log(`\n  ${failures.length} headline(s) will break mid-word.\n`);
  process.exit(1);
})();
