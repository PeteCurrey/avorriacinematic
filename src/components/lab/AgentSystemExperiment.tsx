"use client";

import React, { useState } from "react";

interface AgentStage {
  stageNumber: string;
  stageName: string;
  description: string;
  outputs: string[];
  humanGateRequired: boolean;
  status: "PENDING" | "PROCESSING" | "COMPLETED";
}

interface PreconfiguredGoal {
  id: string;
  title: string;
  category: string;
  goalStatement: string;
  scopeBoundaries: {
    permitted: string[];
    forbidden: string[];
  };
  stages: AgentStage[];
}

const PRECONFIGURED_GOALS: PreconfiguredGoal[] = [
  {
    id: "goal-migration",
    title: "50,000 URL Platform Migration",
    category: "SEARCH & TECHNICAL INFRASTRUCTURE",
    goalStatement: "Migrate 50,000 legacy e-commerce URLs to a modern Next.js architecture with zero organic rank degradation and 100% 301 redirect parity.",
    scopeBoundaries: {
      permitted: [
        "Generate 1:1 redirect map from historical server logs",
        "Validate HTTP 301 response headers on staging environment",
        "Flag non-canonical duplicate parameters for human review"
      ],
      forbidden: [
        "Cannot deploy redirects to production without human sign-off",
        "Cannot modify robots.txt or XML sitemap without approval",
        "Cannot prune legacy URLs with historical backlink equity"
      ]
    },
    stages: [
      {
        stageNumber: "01",
        stageName: "Crawl & Historical Equity Audit",
        description: "Parse server access logs, index coverage data, and external backlink profiles to identify all URLs with positive search equity.",
        outputs: ["48,219 Active URL Nodes Indexed", "1,781 Orphan Parameters Categorized", "Top 500 High-Authority Target URLs Mapped"],
        humanGateRequired: false,
        status: "COMPLETED"
      },
      {
        stageNumber: "02",
        stageName: "1:1 Destination Resolution Matrix",
        description: "Map each legacy path to its exact semantic equivalent on the target Next.js App Router hierarchy.",
        outputs: ["100% 1:1 Redirect Table Generated", "0 Loop Chained Redirects Detected", "Regex Rules for Paginated Archives Synthesized"],
        humanGateRequired: false,
        status: "COMPLETED"
      },
      {
        stageNumber: "03",
        stageName: "Staging Parity Verification",
        description: "Execute automated headless crawl across staging environment to verify status codes, canonical headers, and OpenGraph tags.",
        outputs: ["Zero 404 Exceptions on Seed Test Set", "Average Redirect Hop Latency: 12ms", "JSON Schema Entity Parity Confirmed"],
        humanGateRequired: true,
        status: "COMPLETED"
      },
      {
        stageNumber: "04",
        stageName: "Human Approval Gate & Production Cutover",
        description: "Surface structured sign-off package to technical lead before atomic DNS / CDN edge rule deployment.",
        outputs: ["Immutable Audit Hash Generated", "Automated Rollback Snapshot Ready", "Awaiting Manual Operator Authorization"],
        humanGateRequired: true,
        status: "COMPLETED"
      }
    ]
  },
  {
    id: "goal-dispatch",
    title: "Field Engineer Dispatch State Machine",
    category: "OPERATIONAL WORKFLOW AUTOMATION",
    goalStatement: "Automate facilities work order triage and geographic engineer assignment while guaranteeing offline field synchronization and durable audit logs.",
    scopeBoundaries: {
      permitted: [
        "Sort incoming maintenance tickets by SLA urgency and geographic proximity",
        "Draft work order packets with equipment schematics and location coordinates",
        "Queue offline state synchronization events in IndexedDB"
      ],
      forbidden: [
        "Cannot reassign emergency gas/electrical faults without human dispatcher sign-off",
        "Cannot close out work orders without technician signature and photo evidence",
        "Cannot modify customer billing records autonomously"
      ]
    },
    stages: [
      {
        stageNumber: "01",
        stageName: "Ticket Ingestion & Fault Classification",
        description: "Deterministic categorization of incoming fault reports against commercial property asset trees.",
        outputs: ["Asset Hierarchy Matched (HVAC Level 04)", "SLA Tier Resolved (4-Hour Response Window)", "Required Tooling & Spares Pre-Allocated"],
        humanGateRequired: false,
        status: "COMPLETED"
      },
      {
        stageNumber: "02",
        stageName: "Geographic Routing & Skills Match",
        description: "Evaluate nearest qualified mobile engineer with available van stock and valid certifications.",
        outputs: ["Primary Engineer Identified (12.4km distance)", "Certification Validated (Gas Safe Active)", "Route Optimized for Traffic Clearance"],
        humanGateRequired: false,
        status: "COMPLETED"
      },
      {
        stageNumber: "03",
        stageName: "Dispatcher Review & Job Push",
        description: "Surface suggested assignment to central operations controller for 1-click authorization.",
        outputs: ["Work Order WO-4091 Packet Compiled", "Offline Payload Cached for Mobile App", "Dispatcher Signature Captured"],
        humanGateRequired: true,
        status: "COMPLETED"
      },
      {
        stageNumber: "04",
        stageName: "Field Execution & Telemetry Sync",
        description: "Record arrival timestamp, parts consumed, and completion verification into immutable operational ledger.",
        outputs: ["Time-on-Site: 48 Minutes", "Zero Offline Sync Conflicts", "Durable Compliance Certificate Generated"],
        humanGateRequired: false,
        status: "COMPLETED"
      }
    ]
  }
];

export function AgentSystemExperiment() {
  const [selectedGoal, setSelectedGoal] = useState<PreconfiguredGoal>(PRECONFIGURED_GOALS[0]);
  const [customGoal, setCustomGoal] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [approvalGranted, setApprovalGranted] = useState(false);

  const runPlanGeneration = () => {
    setIsExecuting(true);
    setExecutionLog([]);
    setApprovalGranted(false);

    const logs = [
      "STAGE 01 // Goal analyzed against deterministic scope boundary contract...",
      "STAGE 02 // Constraints established: 3 permitted actions, 3 hard-forbidden actions.",
      "STAGE 03 // Multi-step execution pipeline synthesized with full schema validation.",
      "STAGE 04 // Human Approval Gate reached. Awaiting operator signature..."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setExecutionLog((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setIsExecuting(false);
        }
      }, (index + 1) * 400);
    });
  };

  return (
    <div className="space-y-12">
      {/* Scope Constraint Callout */}
      <div className="p-6 bg-avorria-surface border border-avorria-signal/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            BOUNDED AGENT CONTRACT
          </span>
          <p className="font-body text-xs text-avorria-white/80">
            Agents operate inside explicit permission boundaries. Actions that carry operational or commercial consequence halt at an engineered Human Approval Gate.
          </p>
        </div>
        <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-wider px-3 py-1 bg-avorria-black border border-avorria-signal/50 shrink-0">
          HUMAN APPROVAL REQUIRED
        </span>
      </div>

      {/* Goal Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Goal Presets & Boundary Rules */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line space-y-6">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block border-b border-avorria-line/40 pb-3">
              01 // SELECT OPERATIONAL OBJECTIVE
            </span>

            <div className="space-y-3">
              {PRECONFIGURED_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => {
                    setSelectedGoal(goal);
                    setExecutionLog([]);
                    setApprovalGranted(false);
                  }}
                  className={`w-full p-4 text-left border transition-all font-mono text-xs flex flex-col gap-1 ${
                    selectedGoal.id === goal.id
                      ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal"
                      : "bg-avorria-black/60 text-avorria-white border-avorria-line hover:border-avorria-white"
                  }`}
                >
                  <span className="text-[10px] opacity-75">{goal.category}</span>
                  <span className="text-sm font-display font-black uppercase">{goal.title}</span>
                </button>
              ))}
            </div>

            {/* Scope Boundary Table */}
            <div className="space-y-4 pt-4 border-t border-avorria-line/40">
              <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
                ENGINEERED SCOPE CONTRACT
              </span>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-avorria-signal uppercase block">
                  PERMITTED AGENT ACTIONS (BOUNDED)
                </span>
                <ul className="space-y-1 font-mono text-[11px] text-avorria-white/80 list-none p-0 m-0">
                  {selectedGoal.scopeBoundaries.permitted.map((perm, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-avorria-signal">✓</span>
                      <span>{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-red-400 uppercase block">
                  STRICTLY FORBIDDEN ACTIONS (HARD CONSTRAINT)
                </span>
                <ul className="space-y-1 font-mono text-[11px] text-red-300/80 list-none p-0 m-0">
                  {selectedGoal.scopeBoundaries.forbidden.map((forb, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400">✕</span>
                      <span>{forb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Execute Button */}
            <button
              onClick={runPlanGeneration}
              disabled={isExecuting}
              className="w-full py-4 bg-avorria-white text-avorria-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-avorria-signal transition-colors disabled:opacity-50"
            >
              {isExecuting ? "SYNTHESIZING BOUNDED PLAN..." : "SYNTHESIZE OPERATIONAL PLAN →"}
            </button>
          </div>
        </div>

        {/* Right: Plan Execution & Human Approval Gate */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line space-y-6">
            <div className="flex items-center justify-between border-b border-avorria-line/40 pb-3 font-mono text-xs">
              <span className="text-avorria-signal uppercase tracking-widest">
                STRUCTURED PLAN EXECUTION PIPELINE
              </span>
              <span className="text-avorria-muted text-[10px] uppercase">
                4 STAGES // AUDITABLE
              </span>
            </div>

            {/* Goal Statement */}
            <div className="p-4 bg-avorria-black/70 border border-avorria-line font-mono text-xs text-avorria-white space-y-1">
              <span className="text-[10px] text-avorria-signal uppercase block">ACTIVE GOAL SPECIFICATION</span>
              <p>{selectedGoal.goalStatement}</p>
            </div>

            {/* Stage Pipeline */}
            <div className="space-y-4">
              {selectedGoal.stages.map((stage) => (
                <div
                  key={stage.stageNumber}
                  className={`p-5 border transition-all ${
                    stage.humanGateRequired
                      ? "border-avorria-signal/50 bg-avorria-surface/80"
                      : "border-avorria-line bg-avorria-black/40"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs border-b border-avorria-line/30 pb-2">
                    <span className="text-avorria-signal font-bold">
                      STAGE {stage.stageNumber} {"//"} {stage.stageName}
                    </span>
                    {stage.humanGateRequired ? (
                      <span className="text-[9px] bg-avorria-signal text-avorria-black px-2 py-0.5 font-bold uppercase">
                        HUMAN APPROVAL GATE
                      </span>
                    ) : (
                      <span className="text-[9px] text-avorria-quiet uppercase">
                        AUTOMATED (BOUNDED)
                      </span>
                    )}
                  </div>

                  <p className="font-body text-xs text-avorria-white/80 mt-3 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-avorria-line/20 space-y-1">
                    <span className="font-mono text-[9px] text-avorria-quiet uppercase block">VERIFIED OUTPUTS</span>
                    <div className="flex flex-wrap gap-2">
                      {stage.outputs.map((out, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] bg-avorria-black px-2 py-0.5 border border-avorria-line text-avorria-muted"
                        >
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Human Gate Action Box */}
            <div className="p-6 bg-avorria-black border border-avorria-signal/40 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-avorria-signal font-bold uppercase">
                  OPERATOR SIGN-OFF GATE
                </span>
                <span className="text-[10px] text-avorria-muted">STAGE 04 CUTOVER</span>
              </div>
              <p className="font-body text-xs text-avorria-white/80">
                The agent has generated all pre-execution verifications and snapshots. Production deployment cannot proceed without explicit operator confirmation.
              </p>
              <button
                type="button"
                onClick={() => setApprovalGranted(true)}
                className={`w-full py-3.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors ${
                  approvalGranted
                    ? "bg-avorria-signal text-avorria-black border border-avorria-signal"
                    : "bg-avorria-surface border border-avorria-signal text-avorria-white hover:bg-avorria-signal hover:text-avorria-black"
                }`}
              >
                {approvalGranted ? "✓ HUMAN AUTHORIZATION CONFIRMED (AUDIT LOGGED)" : "AUTHORIZE PRODUCTION EXECUTION →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
