import React from "react";
import { CaseStudyChapter } from "@/types/case-study";
import { StatementChapter } from "./chapters/StatementChapter";
import { MediaChapter } from "./chapters/MediaChapter";
import { SplitChapter } from "./chapters/SplitChapter";
import { ProcessChapter } from "./chapters/ProcessChapter";
import { InterfaceChapter } from "./chapters/InterfaceChapter";
import { DataChapter } from "./chapters/DataChapter";
import { TransformationChapter } from "./chapters/TransformationChapter";
import { ProofChapter } from "./chapters/ProofChapter";
import { QuoteChapter } from "./chapters/QuoteChapter";

interface CaseStudyChapterRendererProps {
  chapters: CaseStudyChapter[];
}

export function CaseStudyChapterRenderer({ chapters }: CaseStudyChapterRendererProps) {
  return (
    <section aria-label="Case Study Narrative Chapters" className="w-full">
      {chapters.map((chapter) => {
        switch (chapter.type) {
          case "STATEMENT":
            return <StatementChapter key={chapter.id} chapter={chapter} />;
          case "MEDIA":
            return <MediaChapter key={chapter.id} chapter={chapter} />;
          case "SPLIT":
            return <SplitChapter key={chapter.id} chapter={chapter} />;
          case "PROCESS":
            return <ProcessChapter key={chapter.id} chapter={chapter} />;
          case "INTERFACE":
            return <InterfaceChapter key={chapter.id} chapter={chapter} />;
          case "DATA":
            return <DataChapter key={chapter.id} chapter={chapter} />;
          case "TRANSFORMATION":
            return <TransformationChapter key={chapter.id} chapter={chapter} />;
          case "PROOF":
            return <ProofChapter key={chapter.id} chapter={chapter} />;
          case "QUOTE":
            return <QuoteChapter key={chapter.id} chapter={chapter} />;
          default:
            return <StatementChapter key={chapter.id} chapter={chapter} />;
        }
      })}
    </section>
  );
}
