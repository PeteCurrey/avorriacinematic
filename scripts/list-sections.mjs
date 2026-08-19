import { createRequire } from "module";
const require = createRequire("/Users/petercurrey/Desktop/Career OS/career-os/package.json");
const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", err => console.error("PAGE ERROR:", err));

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const html = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    return {
      bodyLength: document.body.innerHTML.length,
      sectionCount: document.querySelectorAll("section").length,
      sectionIds: Array.from(document.querySelectorAll("section")).map(s => s.id)
    };
  });

  console.log("HTML evaluation:", html);
  await browser.close();
}

main().catch(console.error);
