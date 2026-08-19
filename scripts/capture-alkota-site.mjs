import { chromium } from "playwright";
import path from "path";
import fs from "fs";

async function main() {
  const outputDir = path.resolve(process.cwd(), "public/media/projects/alkota/interface");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  // 1. Desktop capture: 1920x1080
  console.log("Capturing Desktop 1920x1080...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:3333/uk", { waitUntil: "networkidle" });
  await desktopPage.evaluate(() => document.fonts.ready);
  await desktopPage.waitForTimeout(1000);

  const desktopPath = path.join(outputDir, "homepage-desktop.png");
  await desktopPage.screenshot({ path: desktopPath, fullPage: false });
  console.log(`Saved desktop capture: ${desktopPath}`);

  // 2. Mobile capture: 390x844
  console.log("Capturing Mobile 390x844...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3333/uk", { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => document.fonts.ready);
  await mobilePage.waitForTimeout(1000);

  const mobilePath = path.join(outputDir, "homepage-mobile.png");
  await mobilePage.screenshot({ path: mobilePath, fullPage: false });
  console.log(`Saved mobile capture: ${mobilePath}`);

  await browser.close();
  console.log("Capture completed successfully!");
}

main().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
