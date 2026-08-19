"use client";

import React, { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/track";

type DisciplineType = "BUILD" | "SEARCH" | "SYSTEMS" | "COMBINATION" | "NOT_SURE";
type ExistingStateType = "NEW_VENTURE" | "EXISTING_PLATFORM" | "OPERATIONAL_SYSTEM" | "SEARCH_CRISIS" | "OTHER";
type TimelineType = "IMMEDIATE" | "1_TO_3_MONTHS" | "3_TO_6_MONTHS" | "FLEXIBLE";
type BudgetTerritoryType = "TERRITORY_15_30" | "TERRITORY_30_75" | "TERRITORY_75_PLUS" | "SCOPE_FIRST";

interface ProjectIntakeData {
  discipline: DisciplineType;
  existingState: ExistingStateType;
  objective: string;
  websiteUrl: string;
  timeline: TimelineType;
  budgetTerritory: BudgetTerritoryType;
  fullName: string;
  workEmail: string;
  companyName: string;
  honeypot: string; // Anti-spam trap
  consent: boolean;
}

const TOTAL_STEPS = 5;

export function StartProjectJourney() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectIntakeData>({
    discipline: "BUILD",
    existingState: "NEW_VENTURE",
    objective: "",
    websiteUrl: "",
    timeline: "1_TO_3_MONTHS",
    budgetTerritory: "TERRITORY_30_75",
    fullName: "",
    workEmail: "",
    companyName: "",
    honeypot: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 2 && !formData.objective.trim()) {
      newErrors.objective = "Please briefly describe your primary challenge or objective";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    trackEvent("start_project_step_complete", { step: currentStep });
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Spam trap check
    if (formData.honeypot) {
      // Silently drop bot submissions
      setIsSuccess(true);
      return;
    }

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.workEmail.trim() || !formData.workEmail.includes("@")) {
      newErrors.workEmail = "A valid work email is required";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Company or venture name is required";
    if (!formData.consent) newErrors.consent = "Please confirm consent to evaluate your brief";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      trackEvent("start_project_error", { errorCount: Object.keys(newErrors).length });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    trackEvent("start_project_submit_success", {
      discipline: formData.discipline,
      timeline: formData.timeline,
      budget: formData.budgetTerritory,
    });

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-16 border border-avorria-signal/40 bg-avorria-surface max-w-3xl space-y-8">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-avorria-signal" aria-hidden="true" />
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            PROJECT BRIEF TRANSMITTED
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="display-lg font-display font-black uppercase text-avorria-white">
            THANK YOU, {formData.fullName.toUpperCase()}
          </h2>
          <p className="font-body text-base sm:text-lg text-avorria-white/80 leading-relaxed">
            Your project brief has been logged into our intake system. Our practice leadership will evaluate your technical requirements and respond with initial strategic observations.
          </p>
        </div>

        <div className="p-6 bg-avorria-black/60 border border-avorria-line space-y-3 font-mono text-xs text-avorria-muted">
          <span className="text-[10px] text-avorria-signal uppercase tracking-widest block">
            TRANSMISSION RECORD
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-avorria-white">
            <div>DISCIPLINE: <strong className="text-avorria-signal">{formData.discipline}</strong></div>
            <div>TIMELINE: <strong>{formData.timeline}</strong></div>
            <div>TERRITORY: <strong>{formData.budgetTerritory}</strong></div>
            <div>EMAIL: <strong>{formData.workEmail}</strong></div>
          </div>
        </div>

        <div className="pt-4 border-t border-avorria-line/40 flex flex-wrap items-center gap-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-white hover:text-avorria-signal transition-colors"
          >
            <span>EXPLORE CLIENT WORK</span>
            <span>→</span>
          </Link>
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white transition-colors"
          >
            <span>READ INTELLIGENCE ESSAYS</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-12">
      {/* ── Progress Bar Header ───────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-avorria-muted">
          <span className="text-avorria-signal font-bold uppercase">
            STEP 0{currentStep} {"//"} 0{TOTAL_STEPS}
          </span>
          <span className="text-avorria-quiet uppercase">
            {currentStep === 1 && "CORE DISCIPLINE"}
            {currentStep === 2 && "CURRENT STATE & OBJECTIVE"}
            {currentStep === 3 && "TIMELINE & BUDGET TERRITORY"}
            {currentStep === 4 && "COMMISSION CONTACT"}
            {currentStep === 5 && "REVIEW & TRANSMIT"}
          </span>
        </div>

        <div className="w-full h-1 bg-avorria-line overflow-hidden">
          <div
            className="h-full bg-avorria-signal transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Step Container ─────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Anti-spam honeypot (hidden from real users) */}
        <input
          type="text"
          name="website_reference_trap"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          className="hidden"
          aria-hidden="true"
        />

        {/* STEP 1: Discipline */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                01 // PRIMARY REQUIREMENT
              </span>
              <h2 className="display-lg font-display font-black uppercase text-avorria-white">
                WHAT ARE WE BUILDING?
              </h2>
              <p className="font-body text-base text-avorria-white/80">
                Select the primary discipline required for your project.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {[
                { id: "BUILD", title: "BUILD // DIGITAL PRODUCT", desc: "Flagship website, web application, configurator, or design system." },
                { id: "SEARCH", title: "SEARCH // TECHNICAL VISIBILITY", desc: "Technical SEO, crawl architecture, entity schemas, or platform migration." },
                { id: "SYSTEMS", title: "SYSTEMS // AI & AUTOMATION", desc: "Bounded AI product integration, operational dashboards, or workflow state machines." },
                { id: "COMBINATION", title: "MULTIDISCIPLINARY COMMISSION", desc: "Full-stack transformation spanning design, technical search, and backend systems." },
                { id: "NOT_SURE", title: "STRATEGIC DIAGNOSIS", desc: "Evaluate problem space and define appropriate architectural scope." }
              ].map((item) => {
                const isSelected = formData.discipline === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, discipline: item.id as DisciplineType })}
                    className={`p-6 text-left border transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal shadow-lg"
                        : "bg-avorria-surface text-avorria-white border-avorria-line hover:border-avorria-white"
                    }`}
                  >
                    <span className="font-display font-black text-base uppercase">{item.title}</span>
                    <span className={`font-body text-xs ${isSelected ? "text-avorria-black/85" : "text-avorria-muted"}`}>
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Current State & Objective */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                02 // CONTEXT & OBJECTIVE
              </span>
              <h2 className="display-lg font-display font-black uppercase text-avorria-white">
                WHAT EXISTS TODAY?
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              {[
                { id: "NEW_VENTURE", label: "NEW VENTURE" },
                { id: "EXISTING_PLATFORM", label: "EXISTING PLATFORM" },
                { id: "OPERATIONAL_SYSTEM", label: "INTERNAL SYSTEM" },
                { id: "SEARCH_CRISIS", label: "SEARCH PROBLEM" }
              ].map((st) => {
                const isSelected = formData.existingState === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, existingState: st.id as ExistingStateType })}
                    className={`p-4 text-left border uppercase transition-all ${
                      isSelected
                        ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal"
                        : "bg-avorria-surface text-avorria-muted border-avorria-line hover:text-avorria-white"
                    }`}
                  >
                    <span className="text-[10px] opacity-70 block">STATE</span>
                    <span className="text-xs font-display font-black">{st.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="project-objective" className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                  WHAT IS THE PRIMARY PROBLEM OR DESIRED OUTCOME? *
                </label>
                <textarea
                  id="project-objective"
                  rows={4}
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  placeholder="e.g. Overhauling our B2B SaaS platform to eliminate customer churn and achieve sub-second response times..."
                  className="w-full bg-avorria-surface border border-avorria-line p-4 font-mono text-xs text-avorria-white placeholder:text-avorria-quiet focus:border-avorria-signal focus:outline-none"
                />
                {errors.objective && <span className="font-mono text-[10px] text-red-400 block">{errors.objective}</span>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="website-url" className="font-mono text-xs text-avorria-muted uppercase tracking-widest block">
                  EXISTING WEBSITE OR REPOSITORY URL (IF APPLICABLE)
                </label>
                <input
                  id="website-url"
                  type="text"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-avorria-surface border border-avorria-line px-4 py-3 font-mono text-xs text-avorria-white placeholder:text-avorria-quiet focus:border-avorria-signal focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Timeline & Budget Territory */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                03 // PARAMETERS & TIMING
              </span>
              <h2 className="display-lg font-display font-black uppercase text-avorria-white">
                TIMELINE & BUDGET TERRITORY
              </h2>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider block">
                TARGET COMMENCEMENT TIMELINE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {[
                  { id: "IMMEDIATE", label: "IMMEDIATE (< 4 WKS)" },
                  { id: "1_TO_3_MONTHS", label: "1–3 MONTHS" },
                  { id: "3_TO_6_MONTHS", label: "3–6 MONTHS" },
                  { id: "FLEXIBLE", label: "FLEXIBLE" }
                ].map((tl) => {
                  const isSelected = formData.timeline === tl.id;
                  return (
                    <button
                      key={tl.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: tl.id as TimelineType })}
                      className={`p-4 text-left border uppercase transition-all ${
                        isSelected
                          ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal"
                          : "bg-avorria-surface text-avorria-muted border-avorria-line hover:text-avorria-white"
                      }`}
                    >
                      <span className="text-[9px] opacity-70 block">WINDOW</span>
                      <span className="text-xs font-display font-black">{tl.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Territory */}
            <div className="space-y-3 pt-4 border-t border-avorria-line/40">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider block">
                INDICATIVE CAPITAL TERRITORY
              </span>
              <p className="font-body text-xs text-avorria-muted">
                We design bespoke solutions rather than selling rigid packages. Broad ranges help us scope appropriate architecture.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {[
                  { id: "TERRITORY_15_30", label: "£15,000 – £30,000", desc: "Targeted digital flagships, technical search audits & migrations, or focused product configurators." },
                  { id: "TERRITORY_30_75", label: "£30,000 – £75,000", desc: "Comprehensive web applications, design systems, bounded AI workflows, and bespoke multi-site platforms." },
                  { id: "TERRITORY_75_PLUS", label: "£75,000+", desc: "Enterprise platform transformations, multi-system operational backbones, and flagship digital products." },
                  { id: "SCOPE_FIRST", label: "EVALUATE & SCOPE FIRST", desc: "Define technical requirements collaboratively before committing capital." }
                ].map((bd) => {
                  const isSelected = formData.budgetTerritory === bd.id;
                  return (
                    <button
                      key={bd.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetTerritory: bd.id as BudgetTerritoryType })}
                      className={`p-5 text-left border transition-all space-y-2 ${
                        isSelected
                          ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal"
                          : "bg-avorria-surface text-avorria-white border-avorria-line hover:border-avorria-white"
                      }`}
                    >
                      <span className="text-sm font-display font-black block">{bd.label}</span>
                      <span className={`font-body text-xs block ${isSelected ? "text-avorria-black/85" : "text-avorria-muted"}`}>
                        {bd.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Contact Information */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                04 // COMMISSION CONTACT
              </span>
              <h2 className="display-lg font-display font-black uppercase text-avorria-white">
                WHO ARE WE SPEAKING WITH?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-avorria-muted uppercase block">FULL NAME *</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Alexander Vance"
                  className="w-full bg-avorria-surface border border-avorria-line p-3.5 text-avorria-white placeholder:text-avorria-quiet focus:border-avorria-signal focus:outline-none"
                />
                {errors.fullName && <span className="text-[10px] text-red-400 block">{errors.fullName}</span>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="workEmail" className="text-avorria-muted uppercase block">WORK EMAIL *</label>
                <input
                  id="workEmail"
                  type="email"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="alexander@vance.com"
                  className="w-full bg-avorria-surface border border-avorria-line p-3.5 text-avorria-white placeholder:text-avorria-quiet focus:border-avorria-signal focus:outline-none"
                />
                {errors.workEmail && <span className="text-[10px] text-red-400 block">{errors.workEmail}</span>}
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <label htmlFor="companyName" className="text-avorria-muted uppercase block">ORGANIZATION / COMPANY *</label>
              <input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Vance Logistics"
                className="w-full bg-avorria-surface border border-avorria-line p-3.5 text-avorria-white placeholder:text-avorria-quiet focus:border-avorria-signal focus:outline-none"
              />
              {errors.companyName && <span className="text-[10px] text-red-400 block">{errors.companyName}</span>}
            </div>

            <div className="p-4 bg-avorria-surface border border-avorria-line flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 accent-avorria-signal cursor-pointer"
              />
              <label htmlFor="consent" className="font-mono text-xs text-avorria-muted cursor-pointer">
                I agree to Avorria reviewing and processing this brief for the purpose of strategic project evaluation.
              </label>
            </div>
            {errors.consent && <span className="font-mono text-[10px] text-red-400 block">{errors.consent}</span>}
          </div>
        )}

        {/* STEP 5: Summary Review & Transmit */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                05 // FINAL REVIEW
              </span>
              <h2 className="display-lg font-display font-black uppercase text-avorria-white">
                CONFIRM PROJECT BRIEF
              </h2>
            </div>

            <div className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-avorria-line/40 pb-4">
                <div>
                  <span className="text-[10px] text-avorria-quiet uppercase block">REQUIREMENT</span>
                  <span className="text-avorria-signal font-bold text-sm">{formData.discipline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-avorria-quiet uppercase block">CURRENT STATE</span>
                  <span className="text-avorria-white text-sm">{formData.existingState}</span>
                </div>
                <div>
                  <span className="text-[10px] text-avorria-quiet uppercase block">TIMELINE</span>
                  <span className="text-avorria-white text-sm">{formData.timeline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-avorria-quiet uppercase block">BUDGET TERRITORY</span>
                  <span className="text-avorria-signal text-sm font-bold">{formData.budgetTerritory}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-avorria-quiet uppercase block">OBJECTIVE SUMMARY</span>
                <p className="font-body text-sm text-avorria-white/90 leading-relaxed">
                  {formData.objective || "No detailed objective provided."}
                </p>
              </div>

              <div className="border-t border-avorria-line/40 pt-4 flex flex-wrap justify-between text-avorria-muted">
                <span>COMMISSION CONTACT: <strong className="text-avorria-white">{formData.fullName} ({formData.workEmail})</strong></span>
                <span>ORGANIZATION: <strong className="text-avorria-white">{formData.companyName}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* ── Navigation Buttons ───────────────────────────── */}
        <div className="pt-6 border-t border-avorria-line flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white transition-colors"
            >
              ← PREVIOUS STEP
            </button>
          ) : (
            <div />
          )}

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs uppercase tracking-wider px-8 py-4 hover:bg-avorria-white transition-colors"
            >
              <span>CONTINUE TO STEP 0{currentStep + 1}</span>
              <span>→</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs uppercase tracking-wider px-10 py-4 hover:bg-avorria-white transition-colors disabled:opacity-50"
            >
              <span>{isSubmitting ? "TRANSMITTING BRIEF..." : "TRANSMIT PROJECT BRIEF →"}</span>
            </button>
          )}
        </div>
      </form>

      {/* ── Direct Email Fallback ─────────────────────────── */}
      <div className="p-6 bg-avorria-black/60 border border-avorria-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <span className="text-avorria-muted">
          PREFER DIRECT CORRESPONDENCE? REACH OUT VIA EMAIL:
        </span>
        <a
          href="mailto:enquiries@avorria.com"
          className="text-avorria-signal hover:text-avorria-white uppercase tracking-wider font-bold"
        >
          ENQUIRIES@AVORRIA.COM →
        </a>
      </div>
    </div>
  );
}
