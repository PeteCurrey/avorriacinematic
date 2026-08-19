import React from "react";

const FLOW_STAGES = [
  {
    id: "input",
    code: "01",
    label: "INPUT",
    description: "User intent, operational trigger, or structured data event enters the system with full context.",
    type: "DETERMINISTIC",
    typeNote: "Rule-based capture"
  },
  {
    id: "intelligence",
    code: "02",
    label: "INTELLIGENCE",
    description: "AI, automation rules, or structured logic process the input within a defined scope boundary.",
    type: "AI OR RULES",
    typeNote: "Clearly distinguished"
  },
  {
    id: "human-control",
    code: "03",
    label: "HUMAN CONTROL",
    description: "A human reviews, approves, corrects, or overrides the system output before any action is taken.",
    type: "REQUIRED",
    typeNote: "Always architected in"
  },
  {
    id: "action",
    code: "04",
    label: "ACTION",
    description: "The approved output executes a bounded, auditable action: dispatch, notification, record update, API call.",
    type: "AUDITED",
    typeNote: "Full log, rollback capable"
  },
  {
    id: "feedback",
    code: "05",
    label: "FEEDBACK",
    description: "The outcome feeds back into the system to refine context, improve future suggestions, and surface operational insight.",
    type: "OBSERVABLE",
    typeNote: "Visible to operator"
  }
];

export function SystemsFlowDiagram() {
  return (
    <section
      aria-label="Systems Core Model: Input to Feedback"
      className="border-b border-avorria-line py-20 sm:py-28 bg-avorria-surface/10"
    >
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <div className="max-w-4xl space-y-4">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            00 // CORE MODEL
          </span>
          <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
            HOW A RESPONSIBLE SYSTEM OPERATES
          </h2>
          <p className="font-body text-lg text-avorria-white/80 leading-relaxed max-w-3xl">
            Every system we build follows this architecture. No black boxes. No unchecked autonomous actions. Every stage is observable, bounded, and reversible.
          </p>
        </div>

        {/* Flow stages */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 relative">
          {FLOW_STAGES.map((stage, index) => (
            <div key={stage.id} className="relative flex flex-col">
              {/* Connector line — horizontal on desktop, vertical on mobile */}
              {index < FLOW_STAGES.length - 1 && (
                <>
                  {/* Desktop horizontal arrow */}
                  <div
                    aria-hidden="true"
                    className="hidden sm:flex absolute top-10 right-0 translate-x-1/2 z-10 items-center justify-center w-6 h-6"
                  >
                    <span className="text-avorria-signal font-mono text-base leading-none">→</span>
                  </div>
                  {/* Mobile vertical connector */}
                  <div
                    aria-hidden="true"
                    className="sm:hidden absolute bottom-0 left-8 w-px h-6 bg-avorria-signal/40 translate-y-full"
                  />
                </>
              )}

              <div className="p-6 sm:p-5 lg:p-7 bg-avorria-surface border border-avorria-line hover:border-avorria-signal/40 transition-colors flex flex-col gap-4 h-full mx-0 sm:mx-1">
                {/* Stage number */}
                <div className="flex items-center justify-between border-b border-avorria-line/40 pb-3">
                  <span className="font-mono text-xs font-bold text-avorria-signal">{stage.code}</span>
                  <div className="text-right">
                    <span className="font-mono text-[9px] uppercase tracking-wider block text-avorria-quiet">
                      {stage.type}
                    </span>
                    <span className="font-mono text-[9px] text-avorria-muted block">
                      {stage.typeNote}
                    </span>
                  </div>
                </div>

                {/* Stage label */}
                <h3 className="font-display font-black text-xl sm:text-lg lg:text-xl uppercase tracking-tight text-avorria-white">
                  {stage.label}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-avorria-white/75 leading-relaxed flex-1">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Truth Callout */}
        <div className="p-6 sm:p-8 border border-avorria-signal/30 bg-avorria-surface/40 flex flex-col sm:flex-row items-start gap-6">
          <div className="font-mono text-xs uppercase tracking-widest text-avorria-signal shrink-0 pt-0.5">
            AI TRUTH RULE
          </div>
          <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
            We clearly label what is AI-generated, what is computed by deterministic rules, and what is verified data. We never apply machine learning where a conditional rule delivers the same outcome more reliably. We never falsely attribute intelligent behavior to ordinary automation. Human oversight is not optional — it is engineered in from the first specification.
          </p>
        </div>
      </div>
    </section>
  );
}
