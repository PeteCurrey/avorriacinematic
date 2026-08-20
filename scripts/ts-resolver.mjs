/**
 * Minimal ESM resolver hook so `node --experimental-strip-types` can run the
 * project's TypeScript directly in test scripts:
 *   - maps the "@/..." path alias to ./src/...
 *   - appends .ts / .tsx / /index.ts when a relative import omits the extension
 * Test tooling only — the Next build has its own resolution.
 */
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import fs from "fs";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const EXTS = [".ts", ".tsx", ".mjs", ".js", "/index.ts", "/index.tsx"];

function firstExisting(base) {
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;
  for (const ext of EXTS) {
    const candidate = base + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const resolved = firstExisting(path.join(SRC, specifier.slice(2)));
    if (resolved) return { url: pathToFileURL(resolved).href, shortCircuit: true };
  }

  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL) {
    const parentDir = path.dirname(fileURLToPath(context.parentURL));
    const resolved = firstExisting(path.resolve(parentDir, specifier));
    if (resolved) return { url: pathToFileURL(resolved).href, shortCircuit: true };
  }

  // `server-only` is a Next.js build-time guard with no runtime behaviour here.
  if (specifier === "server-only") {
    return { url: pathToFileURL(path.join(SRC, "../node_modules/server-only/empty.js")).href, shortCircuit: true };
  }

  return nextResolve(specifier, context);
}
