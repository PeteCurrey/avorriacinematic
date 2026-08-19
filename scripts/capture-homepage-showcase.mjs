import { createRequire } from "module";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve playwright from Career OS node_modules or Avorria
const require = createRequire("/Users/petercurrey/Desktop/Career OS/career-os/package.json");
let chromium;
try {
  const pw = require("playwright");
  chromium = pw.chromium;
} catch (err) {
  console.error("Could not load playwright:", err);
  process.exit(1);
}

const PROJECTS = [
  {
    slug: "alkota",
    name: "Alkota Bikes",
    url: "http://localhost:3333/uk",
    outputDir: "public/media/projects/alkota/interface",
  },
  {
    slug: "forecour-iq",
    name: "ForecourIQ",
    url: "https://forecour-iq-ag-v002-git-main-peter-curreys-projects.vercel.app/",
    outputDir: "public/media/projects/forecour-iq/interface",
  },
  {
    slug: "amplios",
    name: "Amplios",
    url: "https://amplios.co.uk/",
    outputDir: "public/media/projects/amplios/interface",
  },
  {
    slug: "careeros",
    name: "CareerOS",
    url: "http://localhost:3334/",
    outputDir: "public/media/projects/careeros/interface",
  },
  {
    slug: "nestiq",
    name: "NestIQ",
    url: "https://nestiq-ag-v001.vercel.app/",
    outputDir: "public/media/projects/nestiq/interface",
  },
  {
    slug: "entirefm",
    name: "EntireFM",
    url: "https://www.entirefm.com/",
    outputDir: "public/media/projects/entirefm/interface",
  },
];

async function captureProject(browser, proj) {
  const targetDir = path.resolve(process.cwd(), proj.outputDir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`\n======================================================`);
  console.log(`Capturing [${proj.name}] from ${proj.url}`);
  console.log(`======================================================`);

  // --- 1. Desktop: 1920x1080 ---
  console.log(`[${proj.slug}] Capturing Desktop (1920x1080)...`);
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();

  try {
    await desktopPage.goto(proj.url, { waitUntil: "domcontentloaded", timeout: 20000 });
  } catch (err) {
    console.warn(`[${proj.slug}] DOM load warning: ${err.message}`);
  }

  await desktopPage.evaluate(() => document.fonts.ready);
  await desktopPage.waitForTimeout(2000);

  // Clean overlays, cookie banners, toolbars
  await desktopPage.evaluate(() => {
    const selectorsToHide = [
      "#onetrust-consent-sdk",
      ".cookie-banner",
      "#cookie-banner",
      ".cc-banner",
      ".cc-window",
      "[aria-label='Cookie Consent']",
      "[aria-label='cookieconsent']",
      "#vercel-live-feedback",
      "nextjs-portal",
      "#__next-build-watcher",
    ];
    selectorsToHide.forEach((s) => {
      document.querySelectorAll(s).forEach((el) => {
        el.style.display = "none";
      });
    });
  });

  const desktopPath = path.join(targetDir, "homepage-desktop.png");
  await desktopPage.screenshot({ path: desktopPath, fullPage: false });
  console.log(`[${proj.slug}] Saved desktop screenshot: ${desktopPath}`);
  await desktopContext.close();

  // --- 2. Mobile: 390x844 ---
  console.log(`[${proj.slug}] Capturing Mobile (390x844)...`);
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  try {
    await mobilePage.goto(proj.url, { waitUntil: "domcontentloaded", timeout: 20000 });
  } catch (err) {
    console.warn(`[${proj.slug}] DOM load warning: ${err.message}`);
  }

  await mobilePage.evaluate(() => document.fonts.ready);
  await mobilePage.waitForTimeout(2000);

  // Clean overlays
  await mobilePage.evaluate(() => {
    const selectorsToHide = [
      "#onetrust-consent-sdk",
      ".cookie-banner",
      "#cookie-banner",
      ".cc-banner",
      ".cc-window",
      "[aria-label='Cookie Consent']",
      "[aria-label='cookieconsent']",
      "#vercel-live-feedback",
      "nextjs-portal",
      "#__next-build-watcher",
    ];
    selectorsToHide.forEach((s) => {
      document.querySelectorAll(s).forEach((el) => {
        el.style.display = "none";
      });
    });
  });

  const mobilePath = path.join(targetDir, "homepage-mobile.png");
  await mobilePage.screenshot({ path: mobilePath, fullPage: false });
  console.log(`[${proj.slug}] Saved mobile screenshot: ${mobilePath}`);
  await mobileContext.close();
}

async function main() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  for (const proj of PROJECTS) {
    try {
      await captureProject(browser, proj);
    } catch (err) {
      console.error(`Failed to capture ${proj.name}:`, err);
    }
  }
  await browser.close();
  console.log("\nAll project captures complete!");
}

main().catch((err) => {
  console.error("Capture process failed:", err);
  process.exit(1);
});
