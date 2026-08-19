import fs from "fs";
import path from "path";

const FORBIDDEN_SYNTHETIC_PATTERNS = [
  "careeros-portrait.svg",
  "careeros-ui-preview.svg",
  "alkota-product-hero.svg",
  "alkota-macro-frame.svg",
  "alkota-engineering.svg",
  "alkota-digital-flagship.svg",
  "alkota-signal.svg",
  "nestiq-property-hero.svg",
  "nestiq-spatial-map.svg",
  "nestiq-ui-preview.svg",
  "nestiq-signal.svg",
  "drawdown-chart-hero.svg",
  "drawdown-full-ui.svg",
  "drawdown-module-plan.svg",
  "drawdown-module-risk.svg",
  "drawdown-signal.svg",
  "entirefm-workorder-hero.svg",
  "entirefm-field-mobile.svg",
  "entirefm-asset-hierarchy.svg",
  "entirefm-signal.svg",
  "ogn-previous-desktop.svg",
  "ogn-new-desktop.svg",
  "ogn-new-mobile.svg",
  "ogn-wall-hero.svg",
  "build-fragment-careeros.svg",
  "build-fragment-nestiq.svg",
  "build-fragment-drawdown.svg",
  "build-fragment-entirefm.svg",
  "build-fragment-alkota.svg"
];

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== ".git") {
        scanDirectory(fullPath, fileList);
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".jsx") || file.endsWith(".js")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const srcFiles = scanDirectory(path.resolve("src"));
let violations = [];

for (const filePath of srcFiles) {
  // Allow scripts or audit tools to reference names for checking
  if (filePath.includes("audit") || filePath.includes("scripts")) continue;

  const content = fs.readFileSync(filePath, "utf-8");
  for (const pattern of FORBIDDEN_SYNTHETIC_PATTERNS) {
    if (content.includes(pattern)) {
      violations.push({
        filePath: path.relative(process.cwd(), filePath),
        pattern
      });
    }
  }
}

console.log(`[Media Guard] Scanned ${srcFiles.length} source files.`);

if (violations.length > 0) {
  console.error(`\n❌ [Media Guard Failed] Found ${violations.length} forbidden synthetic asset references:`);
  for (const v of violations) {
    console.error(`  - ${v.filePath}: references "${v.pattern}"`);
  }
  process.exit(1);
} else {
  console.log(`\n✅ [Media Guard Passed] Zero forbidden synthetic media references found in production source files.`);
  process.exit(0);
}
