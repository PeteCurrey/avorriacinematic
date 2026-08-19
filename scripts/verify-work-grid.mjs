import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/Users/petercurrey/Desktop/Career OS/career-os/package.json");
const { chromium } = require("playwright");

const VIEWPORTS = [
  { name: "desktop_1440", width: 1440, height: 900 },
  { name: "desktop_1920", width: 1920, height: 1080 },
  { name: "tablet_landscape", width: 1024, height: 768 },
  { name: "tablet_portrait", width: 768, height: 1024 },
  { name: "mobile_390", width: 390, height: 844 },
];

const outputDir = path.resolve("./artifacts/work-grid-qa");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function main() {
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const report = {};

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`Inspecting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });

    const page = await context.newPage();
    await page.goto("http://localhost:3000/?workGridDebug=1", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Scroll to #scene-12-work
    const workSection = await page.$("#scene-12-work");
    if (!workSection) {
      console.error("Could not find #scene-12-work!");
      continue;
    }

    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Measure all work grid items
    const measurements = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll("#scene-12-work .work-grid-item"));
      return items.map((item, index) => {
        const rect = item.getBoundingClientRect();
        const article = item.querySelector("article");
        const media = item.querySelector("article > div:first-child");
        const mediaRect = media ? media.getBoundingClientRect() : null;
        const titleEl = item.querySelector("h3");
        const title = titleEl ? titleEl.textContent.trim() : `Item ${index}`;
        const hasLink = !!item.querySelector("a");

        return {
          index,
          title,
          hasLink,
          itemRect: { width: Math.round(rect.width), height: Math.round(rect.height) },
          mediaRect: mediaRect ? {
            width: Math.round(mediaRect.width),
            height: Math.round(mediaRect.height),
            aspectRatio: +(mediaRect.width / mediaRect.height).toFixed(3)
          } : null
        };
      });
    });

    report[vp.name] = measurements;

    console.log(`Found ${measurements.length} projects in Selected Work.`);
    measurements.forEach((m) => {
      console.log(
        `[#${(m.index + 1).toString().padStart(2)}] ${m.title.padEnd(20)} | Link: ${m.hasLink ? "YES" : "NO "} | Card: ${m.itemRect.width}x${m.itemRect.height}px | Media: ${m.mediaRect?.width}x${m.mediaRect?.height}px (ratio: ${m.mediaRect?.aspectRatio})`
      );
    });

    // Check Row Variance for desktop/tablet 2-column mode
    if (vp.width >= 768) {
      const pairs = [
        [0, 1, "Row 1 (Alkota vs EntireFM)"],
        [2, 3, "Row 2 (ForecourIQ [no link] vs AESUK [link])"],
        [4, 5, "Row 3 (Steward vs Travis)"],
        [7, 8, "Ventures Row 1 (CareerOS vs NestIQ)"],
        [9, 10, "Ventures Row 2 (Amplios [no link] vs Drawdown [link])"],
      ];

      for (const [i1, i2, label] of pairs) {
        if (measurements[i1] && measurements[i2]) {
          const m1 = measurements[i1];
          const m2 = measurements[i2];
          const widthDiff = Math.abs(m1.mediaRect.width - m2.mediaRect.width);
          const heightDiff = Math.abs(m1.mediaRect.height - m2.mediaRect.height);
          console.log(`-> ${label}: Width diff = ${widthDiff}px, Height diff = ${heightDiff}px`);
        }
      }
    }

    // Capture visual review screenshots for 1440 and mobile
    if (vp.name === "desktop_1440") {
      // A. Selected Work heading + first client row
      await page.evaluate(() => {
        const el = document.querySelector("#scene-12-work");
        if (el) el.scrollIntoView();
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(outputDir, "01_desktop_1440_heading_and_client_row1.png")
      });

      // B. Middle client rows
      await page.evaluate(() => {
        const items = document.querySelectorAll("#scene-12-work .work-grid-item");
        if (items[2]) items[2].scrollIntoView({ block: "center" });
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(outputDir, "02_desktop_1440_middle_client_rows.png")
      });

      // C. Transition from client work to ventures
      await page.evaluate(() => {
        const venturesHeading = document.querySelectorAll("#scene-12-work > div")[2];
        if (venturesHeading) venturesHeading.scrollIntoView({ block: "start" });
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(outputDir, "03_desktop_1440_client_to_ventures_transition.png")
      });

      // D. Ventures grid
      await page.evaluate(() => {
        const venturesHeading = document.querySelectorAll("#scene-12-work > div")[2];
        if (venturesHeading) venturesHeading.scrollIntoView({ block: "center" });
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(outputDir, "04_desktop_1440_ventures_grid.png")
      });
    }

    if (vp.name === "mobile_390") {
      await page.evaluate(() => {
        const el = document.querySelector("#scene-12-work");
        if (el) el.scrollIntoView();
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(outputDir, "05_mobile_390_work_grid.png")
      });
    }

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(outputDir, "geometry_report.json"),
    JSON.stringify(report, null, 2)
  );
  console.log(`\nQA Report written to ${path.join(outputDir, "geometry_report.json")}`);
}

main().catch(console.error);
