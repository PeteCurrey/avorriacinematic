import React from "react";
import { Z } from "@/lib/scene-z";

interface CareerOSConversationStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CareerOSConversationStage({
  containerRef,
}: CareerOSConversationStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
      aria-hidden="true"
    >
      <div className="max-w-xl flex flex-col gap-6 bg-avorria-surface/80 backdrop-blur-md border border-avorria-line p-6 sm:p-8">
        {/* Dialogue Prompt Header */}
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal">AI CAREER MENTOR</span>
          <span>01 / CONTEXT</span>
        </div>

        {/* Mentor Question */}
        <div className="font-display font-bold text-xl sm:text-2xl text-avorria-white uppercase tracking-tight">
          &ldquo;Tell me where you are right now.&rdquo;
        </div>

        {/* Sample Context Input */}
        <div className="font-body text-sm sm:text-base text-avorria-muted border-l-2 border-avorria-signal pl-4 py-1 italic leading-relaxed">
          &ldquo;I&#39;ve finished college and I&#39;m not sure what direction to take.&rdquo;
        </div>

        {/* Semantic Context Nodes Forming */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 font-mono text-[10px] uppercase tracking-wider text-avorria-quiet">
          <div className="px-2.5 py-1.5 bg-avorria-black/60 border border-avorria-line text-avorria-white">
            <span className="text-avorria-signal block text-[8px]">CONTEXT</span>
            GRADUATE
          </div>
          <div className="px-2.5 py-1.5 bg-avorria-black/60 border border-avorria-line text-avorria-white">
            <span className="text-avorria-signal block text-[8px]">INTENT</span>
            EXPLORATION
          </div>
          <div className="px-2.5 py-1.5 bg-avorria-black/60 border border-avorria-line text-avorria-white col-span-2 sm:col-span-1">
            <span className="text-avorria-signal block text-[8px]">MODEL</span>
            DYNAMIC TWIN
          </div>
        </div>
      </div>
    </div>
  );
}
