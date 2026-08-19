import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getProspectById, getAuditEvents } from "@/lib/db/repository";
import { ProspectDetailActions } from "@/components/admin/ProspectDetailActions";
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  History, 
  Globe, 
  Building2, 
  ShieldCheck, 
  Calendar,
  Clock,
  UserCheck
} from "lucide-react";

export default async function ProspectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const prospect = await getProspectById(id);

  if (!prospect) {
    notFound();
  }

  const auditEvents = await getAuditEvents({
    entityType: "prospect",
    entityId: prospect.id,
    limit: 20
  });

  const b = prospect.business;
  const a = prospect.assessment;
  const band = a?.opportunity_band || "PRIORITY";

  return (
    <div className="space-y-8">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs text-avorria-muted">
        <Link 
          href="/admin/prospects" 
          className="hover:text-avorria-white flex items-center gap-1 uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> PROSPECT DATABASE
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-avorria-signal font-bold uppercase">{b?.slug || prospect.id}</span>
      </div>

      {/* Primary Header & Operational Banner */}
      <div className="p-6 sm:p-8 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider rounded-[2px] ${
                band === "PRIORITY"
                  ? "bg-avorria-signal/15 text-avorria-signal border border-avorria-signal/30"
                  : "bg-white/10 text-white"
              }`}>
                {band} OPPORTUNITY
              </span>
              <span className="px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 text-avorria-muted rounded-[2px]">
                STATUS: <strong className="text-avorria-white">{prospect.status.replace(/_/g, " ")}</strong>
              </span>
              <span className="font-mono text-[10px] text-avorria-quiet">
                PRIORITY: {prospect.priority.toUpperCase()}
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-avorria-white">
              {b?.company_name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-avorria-muted">
              <span>{b?.sector}</span>
              <span className="text-white/20">•</span>
              <span>{b?.city || "London"}, {b?.country}</span>
              {b?.website_url && (
                <>
                  <span className="text-white/20">•</span>
                  <a
                    href={b.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-avorria-signal hover:underline inline-flex items-center gap-1"
                  >
                    {b.domain || b.website_url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Large Score Indicator */}
          <div className="flex items-center gap-6">
            <div className="p-4 bg-[#141414] border border-white/15 rounded-[2px] text-center min-w-[130px]">
              <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
                OPPORTUNITY SCORE
              </div>
              <div className="font-mono text-4xl font-black text-avorria-signal">
                {prospect.opportunity_score}
              </div>
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">
                v1 Heuristic Model
              </div>
            </div>
          </div>
        </div>

        {/* Operational Action Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="font-mono text-xs text-avorria-muted flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-avorria-signal" />
            <span>
              Review Status: <strong className="text-avorria-white uppercase">{prospect.review_status}</strong>
              {prospect.reviewed_at && ` (on ${new Date(prospect.reviewed_at).toLocaleDateString()})`}
            </span>
          </div>

          <ProspectDetailActions prospect={prospect} />
        </div>
      </div>

      {/* Grid of Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Business & Website (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 1: BUSINESS ENTITY */}
          <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
              <Building2 className="w-4 h-4 text-avorria-signal" />
              <span>BUSINESS PROFILE & REGISTRATION</span>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
              <div>
                <dt className="text-[10px] uppercase text-avorria-muted">Legal Name</dt>
                <dd className="text-avorria-white font-bold">{b?.legal_name || b?.company_name}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase text-avorria-muted">Company Number</dt>
                <dd className="text-avorria-white">{b?.company_number || "Verified UK Registry"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase text-avorria-muted">Primary Phone</dt>
                <dd className="text-avorria-white">{b?.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase text-avorria-muted">Primary Email</dt>
                <dd className="text-avorria-white">{b?.primary_email || "—"}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[10px] uppercase text-avorria-muted">Registered Address</dt>
                <dd className="text-avorria-white">
                  {[b?.address_line_1, b?.address_line_2, b?.city, b?.postcode, b?.country].filter(Boolean).join(", ")}
                </dd>
              </div>
            </dl>

            {b?.business_description && (
              <div className="pt-3 border-t border-white/5 font-mono text-xs text-avorria-muted leading-relaxed">
                <span className="text-avorria-white uppercase text-[10px] font-bold block mb-1">
                  Entity Overview:
                </span>
                {b.business_description}
              </div>
            )}
          </section>

          {/* Section 2: CURRENT WEBSITE AUDIT */}
          <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
              <Globe className="w-4 h-4 text-avorria-signal" />
              <span>CURRENT WEBSITE ARCHITECTURE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#121212] border border-white/5 rounded-[2px]">
                <div className="text-[9px] uppercase text-avorria-muted">Platform / CMS</div>
                <div className="text-avorria-white font-bold mt-0.5 truncate">
                  {a?.website_platform || "Legacy Custom"}
                </div>
              </div>

              <div className="p-3 bg-[#121212] border border-white/5 rounded-[2px]">
                <div className="text-[9px] uppercase text-avorria-muted">Estimated Age</div>
                <div className="text-avorria-white font-bold mt-0.5 truncate">
                  {a?.estimated_website_age || "5+ Years"}
                </div>
              </div>

              <div className="p-3 bg-[#121212] border border-white/5 rounded-[2px]">
                <div className="text-[9px] uppercase text-avorria-muted">SSL Security</div>
                <div className={`font-bold mt-0.5 ${a?.has_ssl ? "text-emerald-400" : "text-red-400"}`}>
                  {a?.has_ssl ? "Active HTTPS" : "Missing SSL"}
                </div>
              </div>

              <div className="p-3 bg-[#121212] border border-white/5 rounded-[2px]">
                <div className="text-[9px] uppercase text-avorria-muted">Mobile Viewport</div>
                <div className={`font-bold mt-0.5 ${a?.mobile_friendly ? "text-emerald-400" : "text-amber-400"}`}>
                  {a?.mobile_friendly ? "Optimised" : "Degraded"}
                </div>
              </div>

              <div className="p-3 bg-[#121212] border border-white/5 rounded-[2px]">
                <div className="text-[9px] uppercase text-avorria-muted">Contact Funnel</div>
                <div className={`font-bold mt-0.5 ${a?.has_contact_form ? "text-emerald-400" : "text-red-400"}`}>
                  {a?.has_contact_form ? "Form Present" : "Missing Form"}
                </div>
              </div>

              <div className="p-3 bg-[#121212] border border-white/5 rounded-[2px]">
                <div className="text-[9px] uppercase text-avorria-muted">Structured Data</div>
                <div className={`font-bold mt-0.5 ${a?.has_structured_data ? "text-emerald-400" : "text-amber-400"}`}>
                  {a?.has_structured_data ? "Schema Present" : "Missing Schema"}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: REVIEWS & REPUTATION */}
          <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
              <Star className="w-4 h-4 text-amber-400" />
              <span>REPUTATION & COMMERCIAL TRUST</span>
            </div>

            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-amber-400">
                  {b?.google_rating ? b.google_rating.toFixed(1) : "—"}
                </div>
                <div>
                  <div className="font-bold text-avorria-white">Google Business Rating</div>
                  <div className="text-[10px] text-avorria-muted">
                    Based on {b?.google_review_count || 0} verified reviews
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-bold rounded-[2px]">
                Solvent Commercial Practice
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: AI Strategy, Deficiencies, Features & Audit Trail (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 4: AI ASSESSMENT & OPPORTUNITY */}
          <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
              <Sparkles className="w-4 h-4 text-avorria-signal" />
              <span>AI STRATEGIC ASSESSMENT</span>
            </div>

            <div className="p-4 bg-[#121212] border border-white/5 rounded-[2px] font-mono text-xs text-avorria-white/90 leading-relaxed">
              {a?.ai_summary}
            </div>

            <div className="font-mono text-xs text-avorria-muted leading-relaxed">
              <strong className="text-avorria-signal uppercase">Strategic Reasoning: </strong>
              {a?.ai_reasoning_summary}
            </div>
          </section>

          {/* Section 5: CURRENT WEBSITE PROBLEMS */}
          <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>IDENTIFIED DIGITAL WEAKNESSES</span>
            </div>

            <div className="space-y-2.5">
              {a?.identified_problems.map((prob) => (
                <div key={prob.id} className="p-3 bg-[#121212] border border-white/5 rounded-[2px] font-mono">
                  <div className="flex items-center justify-between text-xs font-bold text-avorria-white">
                    <span>{prob.title}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded-[2px]">
                      {prob.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-avorria-muted mt-1 leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: RECOMMENDED FEATURES */}
          <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
              <Layers className="w-4 h-4 text-avorria-signal" />
              <span>RECOMMENDED AVORRIA MODULES</span>
            </div>

            <div className="space-y-2">
              {a?.recommended_features.map((feat) => (
                <div key={feat.id} className="p-3 bg-[#121212] border border-white/5 rounded-[2px] font-mono text-xs">
                  <div className="flex items-center justify-between font-bold text-avorria-white">
                    <span>{feat.name}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-avorria-signal/15 text-avorria-signal rounded-[2px]">
                      {feat.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-avorria-muted mt-1">
                    {feat.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: IMMUTABLE AUDIT TRAIL */}
          <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
              <History className="w-4 h-4 text-avorria-signal" />
              <span>PROSPECT ACTIVITY & AUDIT HISTORY</span>
            </div>

            {auditEvents.length === 0 ? (
              <div className="font-mono text-xs text-avorria-muted py-2">
                No external operator modifications recorded yet.
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {auditEvents.map((evt) => (
                  <div 
                    key={evt.id}
                    className="p-3 bg-[#121212] border border-white/5 rounded-[2px] space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-avorria-signal uppercase">
                        {evt.action.replace(/_/g, " ")}
                      </span>
                      <span className="text-[10px] text-avorria-quiet">
                        {new Date(evt.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-avorria-muted text-[11px]">
                      {evt.summary}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
