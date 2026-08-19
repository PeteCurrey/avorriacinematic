import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/Users/petercurrey/Desktop/Career OS/career-os/package.json");
const { chromium } = require("playwright");

const outputDir = path.resolve("./artifacts/capabilities-qa");

async function main() {
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
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

  console.log("Section metrics:", sectionMetrics);

  const testSteps = [
    { name: "01_build", progress: 0.15 },
    { name: "02_search", progress: 0.50 },
    { name: "03_systems", progress: 0.85 },
  ];

  for (const step of testSteps) {
    const scrollY = sectionMetrics.top + step.progress * sectionMetrics.scrollDist;
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(500);

    const chapterStates = await page.evaluate(() => {
      const scene = document.querySelector("#scene-capabilities-showcase");
      const articles = Array.from(scene.querySelectorAll("article"));
      return articles.map((a, i) => {
        const style = window.getComputedStyle(a);
        const title = a.querySelector("h3")?.textContent?.trim();
        return {
          index: i,
          title,
          opacity: style.opacity,
          visibility: style.visibility,
          pointerEvents: style.pointerEvents
        };
      });
    });

    console.log(`\nAt step ${step.name} (progress ${step.progress}):`);
    console.table(chapterStates);

    await page.screenshot({
      path: path.join(outputDir, `1440_${step.name}.png`)
    });
  }

  await browser.close();
}

main().catch(console.error);
