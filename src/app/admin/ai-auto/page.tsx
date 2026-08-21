import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getCommandMetrics, getReviewQueue } from "@/lib/db/repository";
import { 
  Sparkles, 
  CheckSquare, 
  Search, 
  Layers, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Users, 
  ShieldAlert,
  Clock
} from "lucide-react";

export default async function AiAutoMainPage() {
  await requireAdmin();
  const metrics = await getCommandMetrics();
  const reviewQueue = await getReviewQueue();

  const LIFECYCLE_STAGES = [
    {
      id: "scout",
      name: "SCOUT",
      status: "ACTIVE (HEURISTIC ENGINE)",
      description: "Discovers and extracts web signals, domain health, and contact points.",
      count: metrics.aiAuto.discoveredToday + metrics.aiAuto.analysedToday,
      subtext: `${metrics.aiAuto.discoveredToday} discovered today`,
      active: true,
      href: "/admin/prospects"
    },
    {
      id: "review",
      name: "REVIEW",
      status: "ACTIVE (HUMAN IN THE LOOP)",
      description: "Human operator evaluates high-probability business opportunities.",
      count: metrics.aiAuto.awaitingReview,
      subtext: `${reviewQueue.length} awaiting decision`,
      active: true,
      highlight: true,
      href: "/admin/ai-auto/review"
    },
    {
      id: "research",
      name: "RESEARCH",
      status: "ACTIVE (DEEP INTEL QUEUE)",
      description: "Gathers architectural requirements, competitor benchmarks, and briefs.",
      count: metrics.aiAuto.approved + metrics.aiAuto.researchRequested,
      subtext: `${metrics.aiAuto.approved} approved prospects`,
      active: true,
      href: "/admin/automations"
    },
    {
      id: "build",
      name: "BUILD",
      status: "COMING IN NEXT PHASE",
      description: "Generates bespoke Next.js site code, layout structure, and copy.",
      count: null,
      subtext: "Automated site factory",
      active: false
    },
    {
      id: "qa",
      name: "QA",
      status: "COMING IN NEXT PHASE",
      description: "Automated accessibility, Lighthouse CWV, and cross-device testing.",
      count: null,
      subtext: "Quality assurance suite",
      active: false
    },
    {
      id: "outreach",
      name: "OUTREACH",
      status: "COMING IN NEXT PHASE",
      description: "Personalised email sequence dispatch with custom interactive preview.",
      count: null,
      subtext: "Targeted executive outreach",
      active: false
    },
    {
      id: "engage",
      name: "ENGAGE",
      status: "COMING IN NEXT PHASE",
      description: "Real-time tracking of preview site clicks, video views, and email opens.",
      count: null,
      subtext: "Visitor telemetry",
      active: false
    },
    {
      id: "close",
      name: "CLOSE",
      status: "COMING IN NEXT PHASE",
      description: "Converts verified preview site directly into production client project.",
      count: null,
      subtext: "Commercial commission",
      active: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-avorria-signal mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            FLAGSHIP ACQUISITION OPERATING ENGINE
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-avorria-white leading-none">
            AI AUTO
          </h1>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-2">
            Autonomous client acquisition.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/ai-auto/settings"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-avorria-white font-mono text-xs uppercase tracking-wider rounded-[2px] transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-avorria-signal" />
            <span>Targeting & Settings</span>
          </Link>

          <Link
            href="/admin/ai-auto/review"
            className="inline-flex items-center gap-2 px-4 py-2 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Review Queue ({metrics.aiAuto.awaitingReview})</span>
          </Link>
        </div>
      </div>

      {/* Lifecycle Flow Architecture */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white flex items-center gap-2">
            <span>CLIENT ACQUISITION LIFECYCLE</span>
            <span className="text-[10px] text-avorria-muted font-normal">
              (8 Deterministic Stages)
            </span>
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal">
            Assisted Mode Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIFECYCLE_STAGES.map((stage, idx) => {
            const isClickable = Boolean(stage.href);
            const CardWrapper = isClickable ? Link : "div";
            
            return (
              <CardWrapper
                key={stage.id}
                href={stage.href || "#"}
                className={`p-5 border rounded-[2px] transition-all flex flex-col justify-between space-y-4 ${
                  stage.highlight
                    ? "bg-[#111111] border-avorria-signal/50 shadow-[0_0_20px_rgba(77, 159, 255,0.06)] hover:border-avorria-signal"
                    : stage.active
                      ? "bg-[#0D0D0D] border-white/15 hover:border-white/30"
                      : "bg-[#090909] border-white/5 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold text-avorria-signal">
                      STAGE 0{idx + 1}
                    </span>
                    <span className={`px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider rounded-[2px] ${
                      stage.active
                        ? "bg-avorria-signal/15 text-avorria-signal border border-avorria-signal/30"
                        : "bg-white/5 text-avorria-muted border border-white/10"
                    }`}>
                      {stage.active ? "ACTIVE" : "PHASE 2"}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg uppercase tracking-wider text-avorria-white">
                    {stage.name}
                  </h3>

                  <p className="font-mono text-[11px] text-avorria-muted mt-1 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xl font-black text-avorria-white">
                        {stage.count !== null ? stage.count : "—"}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-avorria-quiet">
                        {stage.subtext}
                      </div>
                    </div>
                    {isClickable && (
                      <ArrowRight className="w-4 h-4 text-avorria-signal" />
                    )}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </section>

      {/* Review Queue Immediate Callout */}
      {reviewQueue.length > 0 ? (
        <section className="p-6 bg-[#0E0E0E] border border-avorria-signal/30 rounded-[2px] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal font-bold">
                <CheckSquare className="w-4 h-4" />
                ACTION REQUIRED: {reviewQueue.length} PROSPECTS READY FOR HUMAN REVIEW
              </div>
              <p className="font-mono text-xs text-avorria-muted">
                Heuristic scoring has qualified high-opportunity commercial candidates. Review now to queue deep research.
              </p>
            </div>
            <Link
              href="/admin/ai-auto/review"
              className="px-4 py-2.5 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all shrink-0 inline-flex items-center gap-2"
            >
              <span>LAUNCH REVIEW QUEUE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      ) : (
        <section className="p-8 bg-[#0D0D0D] border border-white/10 rounded-[2px] text-center space-y-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-[2px] flex items-center justify-center mx-auto text-avorria-muted">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
            NO PROSPECTS AWAITING REVIEW
          </div>
          <p className="font-mono text-xs text-avorria-muted max-w-md mx-auto leading-relaxed">
            AI Scout has not ingested new candidates yet or all items have been decided. You can seed a marked test prospect or adjust targeting.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/ai-auto/settings"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 font-mono text-xs text-avorria-signal uppercase tracking-wider rounded-[2px]"
            >
              <span>Configure Scout Targeting →</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
