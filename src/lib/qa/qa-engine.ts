/**
 * AVORRIA — QA ENGINE (Phase 4)
 * Technical QA, Factual QA, Visual QA, and Pre-Launch Production QA.
 */

import type { SiteVersion, DesignTokens, PageDefinition } from "@/types/admin";
import { COMPONENT_REGISTRY } from "@/lib/factory/component-registry";

export interface QAResult {
  passed: boolean;
  score: number;
  criticalIssues: string[];
  warnings: string[];
  checks: {
    category: "technical" | "factual" | "visual" | "seo" | "accessibility";
    name: string;
    passed: boolean;
    details?: string;
  }[];
}

export function runTechnicalQA(version: SiteVersion): QAResult {
  const checks: QAResult["checks"] = [];
  const criticalIssues: string[] = [];
  const warnings: string[] = [];

  const pages = version.page_definitions as PageDefinition[];
  const tokens = version.design_tokens as DesignTokens;

  // 1. Check home page exists
  const hasHome = pages.some(p => p.slug === "home" || p.slug === "");
  checks.push({ category: "technical", name: "Homepage exists", passed: hasHome });
  if (!hasHome) criticalIssues.push("Missing homepage definition");

  // 2. Validate all components
  let validComponents = true;
  for (const page of pages) {
    for (const section of page.sections) {
      if (!(section.component_key in COMPONENT_REGISTRY)) {
        validComponents = false;
        criticalIssues.push(`[${page.slug}] Unknown component "${section.component_key}"`);
      }
    }
  }
  checks.push({ category: "technical", name: "Component registry compliance", passed: validComponents });

  // 3. Check design tokens validity
  const validTokens = !!(tokens && tokens.background && tokens.text_primary && tokens.accent);
  checks.push({ category: "technical", name: "Design tokens complete", passed: validTokens });
  if (!validTokens) criticalIssues.push("Missing core design tokens (background, text_primary, or accent)");

  // 4. Check for preview leak in content
  const serialized = JSON.stringify(version.content);
  const previewLeaks = ["lorem ipsum", "TODO", "placeholder_image", "temp_company"].filter(w =>
    serialized.toLowerCase().includes(w.toLowerCase())
  );
  checks.push({
    category: "factual",
    name: "No placeholder leaks",
    passed: previewLeaks.length === 0,
    details: previewLeaks.length > 0 ? `Found: ${previewLeaks.join(", ")}` : undefined,
  });
  if (previewLeaks.length > 0) {
    warnings.push(`Placeholder content detected: ${previewLeaks.join(", ")}`);
  }

  // Calculate score
  const total = checks.length;
  const passedCount = checks.filter(c => c.passed).length;
  const score = Math.round((passedCount / total) * 100);

  return {
    passed: criticalIssues.length === 0 && score >= 75,
    score,
    criticalIssues,
    warnings,
    checks,
  };
}
