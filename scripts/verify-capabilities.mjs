import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/Users/petercurrey/Desktop/Career OS/career-os/package.json");
const { chromium } = require("playwright");

const VIEWPORTS = [
  { name: "desktop_1440", width: 1440, height: 900 },
  { name: "desktop_1920", width: 1920, height: 1080 },
  { name: "desktop_1366", width: 1366, height: 768 },
  { name: "mobile_390", width: 390, height: 844 },
];

const outputDir = path.resolve("./artifacts/capabilities-qa");
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
    console.log(`Capabilities Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });

    const page = await context.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    const sectionMetrics = await page.evaluate(() => {
      const scene = document.querySelector("#scene-capabilities-showcase");
      const rect = scene.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollDist = rect.height - window.innerHeight;
      return { top: rect.top + scrollY, height: rect.height, scrollDist };
    });

    if (!sectionMetrics) {
      console.error("Could not find section metrics");
      continue;
    }

    const { top, scrollDist } = sectionMetrics;

    const chapters = [
      { name: "01_build", progress: 0.15 },
      { name: "02_search", progress: 0.50 },
      { name: "03_systems", progress: 0.85 },
    ];

    const vpMetrics = [];

    for (const ch of chapters) {
      const targetScroll = top + ch.progress * scrollDist;
      await page.evaluate((y) => window.scrollTo(0, y), targetScroll);
      await page.waitForTimeout(500);

      const metrics = await page.evaluate((chName) => {
        const scene = document.querySelector("#scene-capabilities-showcase");
        const safeFrame = scene?.querySelector(".overflow-hidden.relative");
        const safeRect = safeFrame?.getBoundingClientRect();

        const articles = Array.from(scene?.querySelectorAll("article") || []);
        const activeArticle = articles.find((a) => {
          const style = window.getComputedStyle(a);
          return parseFloat(style.opacity) > 0.5 && style.visibility !== "hidden";
        });

        if (!activeArticle) {
          return { chName, found: false };
        }

        const articleRect = activeArticle.getBoundingClientRect();
        const titleEl = activeArticle.querySelector("h3");
        const titleRect = titleEl?.getBoundingClientRect();
        const headerEl = activeArticle.querySelector("div:first-child");
        const headerRect = headerEl?.getBoundingClientRect();
        const footerEl = activeArticle.querySelector("div:last-child");
        const footerRect = footerEl?.getBoundingClientRect();
        const ctaEl = activeArticle.querySelector("a");
        const ctaRect = ctaEl?.getBoundingClientRect();
        const visualEl = activeArticle.querySelector(".lg\\:col-span-5");
        const visualRect = visualEl?.getBoundingClientRect();

        const safeW = safeRect ? Math.round(safeRect.width) : window.innerWidth;
        const articleW = Math.round(articleRect.width);
        const usableWidthPct = Math.round((articleW / safeW) * 100);

        return {
          chName,
          found: true,
          safeFrameWidth: safeW,
          articleWidth: articleW,
          usableWidthPct,
          title: titleEl?.textContent?.trim() || "",
          titleRect: titleRect ? { x: Math.round(titleRect.x), y: Math.round(titleRect.y), width: Math.round(titleRect.width), height: Math.round(titleRect.height) } : null,
          headerRect: headerRect ? { x: Math.round(headerRect.x), y: Math.round(headerRect.y), width: Math.round(headerRect.width) } : null,
          footerRect: footerRect ? { x: Math.round(footerRect.x), y: Math.round(footerRect.y), width: Math.round(footerRect.width) } : null,
          ctaRect: ctaRect ? { x: Math.round(ctaRect.x), y: Math.round(ctaRect.y), width: Math.round(ctaRect.width) } : null,
          visualVisible: !!(visualRect && visualRect.width > 0),
          pointerEvents: window.getComputedStyle(activeArticle).pointerEvents
        };
      }, ch.name);

      vpMetrics.push(metrics);
      if (metrics.found) {
        console.log(`[${ch.name}] Usable Width: ${metrics.usableWidthPct}% (${metrics.articleWidth}px / ${metrics.safeFrameWidth}px safe frame) | Title: ${metrics.title} | Visual: ${metrics.visualVisible ? "YES" : "NO"} | PointerEvents: ${metrics.pointerEvents}`);
      }

      // Capture screenshot
      const filename = `${vp.name}_${ch.name}.png`;
      await page.screenshot({
        path: path.join(outputDir, filename),
        clip: { x: 0, y: 0, width: vp.width, height: vp.height }
      });
    }

    report[vp.name] = vpMetrics;
    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(outputDir, "capabilities_report.json"),
    JSON.stringify(report, null, 2)
  );
  console.log(`\nCapabilities QA Report written to ${path.join(outputDir, "capabilities_report.json")}`);
}

main().catch(console.error);
