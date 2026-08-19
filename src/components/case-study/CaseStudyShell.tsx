import React, { ReactNode } from "react";
import Link from "next/link";
import { CaseStudyConfig } from "@/types/case-study";
import { generateThemeStyles } from "@/lib/case-studies/theme-engine";
import { SceneErrorBoundary } from "@/components/cinematic/SceneErrorBoundary";

interface CaseStudyShellProps {
  config: CaseStudyConfig;
  children: ReactNode;
}

export function CaseStudyShell({ config, children }: CaseStudyShellProps) {
  const themeStyles = generateThemeStyles(config.theme);

  return (
    <div
      className="w-full min-h-screen bg-avorria-black text-avorria-white transition-colors duration-500"
      style={themeStyles}
    >
      {/* Semantic Breadcrumbs / Instrumentation Bar */}
      <nav
        aria-label="Breadcrumb"
        className="fixed top-20 left-0 right-0 z-40 bg-avorria-black/90 backdrop-blur-md border-b border-avorria-line py-3 px-6 sm:px-12 lg:px-16"
      >
        <div className="max-w-[1760px] mx-auto flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet">
          <ol className="flex items-center gap-2 sm:gap-3 list-none p-0 m-0">
            <li>
              <Link
                href="/work"
                className="text-avorria-muted hover:text-avorria-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
              >
                WORK
              </Link>
            </li>
            <li aria-hidden="true" className="text-avorria-line-strong">/</li>
            {config.projectIndex && (
              <>
                <li className="text-avorria-signal font-bold">{config.projectIndex.split("/")[0].trim()}</li>
                <li aria-hidden="true" className="text-avorria-line-strong">/</li>
              </>
            )}
            <li className="text-avorria-white font-bold truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {config.canonicalTitle}
            </li>
          </ol>

          <div className="hidden sm:flex items-center gap-4 text-avorria-quiet">
            <span>{config.relationship}</span>
            <span aria-hidden="true">•</span>
            <span className="text-avorria-signal">{config.status}</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area Wrapped in Error Boundary */}
      <SceneErrorBoundary sceneId={config.projectSlug} sceneLabel={`${config.canonicalTitle} Case Study`}>
        <main className="pt-32 sm:pt-36">{children}</main>
      </SceneErrorBoundary>
    </div>
  );
}
