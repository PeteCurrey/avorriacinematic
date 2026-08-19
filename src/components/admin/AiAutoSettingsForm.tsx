"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AiAutoSettings } from "@/types/admin";
import { updateSettingsAction } from "@/app/admin/actions";
import { 
  Sliders, 
  ShieldAlert, 
  MapPin, 
  Building, 
  Save, 
  CheckCircle2, 
  Radio, 
  Lock,
  Compass
} from "lucide-react";

interface AiAutoSettingsFormProps {
  settings: AiAutoSettings;
}

export function AiAutoSettingsForm({ settings }: AiAutoSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateSettingsAction(formData);
      if (res.success) {
        setSavedSuccess(true);
        router.refresh();
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Top Banner with Save feedback */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2 rounded-[2px] animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>AI Auto targeting & control parameters saved successfully.</span>
        </div>
      )}

      {/* SECTION 1: AUTOPILOT OPERATING MODE */}
      <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
            <Radio className="w-4 h-4 text-avorria-signal" />
            <span>AUTOPILOT OPERATING GOVERNANCE</span>
          </div>
          <span className="font-mono text-[10px] text-avorria-signal uppercase">
            Phase 1 Baseline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ASSISTED MODE (DEFAULT) */}
          <label className="p-4 bg-[#141414] border border-avorria-signal/50 rounded-[2px] cursor-pointer space-y-2 block relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-avorria-signal">
                ASSISTED MODE (RECOMMENDED)
              </span>
              <input
                type="radio"
                name="autopilot_mode"
                value="ASSISTED"
                defaultChecked={settings.autopilot_mode === "ASSISTED"}
                className="accent-avorria-signal"
              />
            </div>
            <p className="font-mono text-[11px] text-avorria-muted leading-relaxed">
              AI automatically scouts, scores, and prepares intelligence briefs. Every prospect approval and outbound contact requires manual operator authorization.
            </p>
          </label>

          {/* FULL AUTOPILOT (LOCKED FOR SAFETY) */}
          <label className="p-4 bg-[#141414] border border-white/10 rounded-[2px] opacity-60 cursor-not-allowed space-y-2 block relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-avorria-muted flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> FULL AUTOPILOT
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-avorria-quiet rounded">
                PHASE 3
              </span>
            </div>
            <p className="font-mono text-[11px] text-avorria-quiet leading-relaxed">
              Autonomous end-to-end prospecting, site building, and email outreach without human gates. Disabled during Phase 1 validation.
            </p>
          </label>
        </div>
      </section>

      {/* SECTION 2: TARGETING RULES */}
      <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-5">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
          <Compass className="w-4 h-4 text-avorria-signal" />
          <span>GEOGRAPHIC & SECTOR TARGETING</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] uppercase text-avorria-muted mb-1.5">
              Target High-Value Sectors (Comma separated)
            </label>
            <textarea
              name="sectors"
              defaultValue={settings.targeting.sectors.join(", ")}
              rows={3}
              className="w-full bg-[#141414] border border-white/10 p-3 font-mono text-xs text-avorria-white focus:outline-none focus:border-avorria-signal rounded-[2px]"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase text-avorria-muted mb-1.5">
              Target UK Cities (Comma separated)
            </label>
            <input
              type="text"
              name="cities"
              defaultValue={settings.targeting.cities.join(", ")}
              className="w-full bg-[#141414] border border-white/10 p-2.5 font-mono text-xs text-avorria-white focus:outline-none focus:border-avorria-signal rounded-[2px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-mono text-[10px] uppercase text-avorria-muted mb-1">
                Min Opp Score (0-100)
              </label>
              <input
                type="number"
                name="min_opportunity_score"
                defaultValue={settings.targeting.min_opportunity_score}
                min={0}
                max={100}
                className="w-full bg-[#141414] border border-white/10 p-2 font-mono text-xs text-avorria-white focus:outline-none focus:border-avorria-signal rounded-[2px]"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-avorria-muted mb-1">
                Min Google Rating
              </label>
              <input
                type="number"
                step="0.1"
                name="min_google_rating"
                defaultValue={settings.targeting.min_google_rating}
                min={1}
                max={5}
                className="w-full bg-[#141414] border border-white/10 p-2 font-mono text-xs text-avorria-white focus:outline-none focus:border-avorria-signal rounded-[2px]"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-avorria-muted mb-1">
                Min Review Count
              </label>
              <input
                type="number"
                name="min_review_count"
                defaultValue={settings.targeting.min_review_count}
                min={0}
                className="w-full bg-[#141414] border border-white/10 p-2 font-mono text-xs text-avorria-white focus:outline-none focus:border-avorria-signal rounded-[2px]"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-avorria-muted mb-1">
                Daily Intake Target
              </label>
              <input
                type="number"
                name="businesses_per_day_target"
                defaultValue={settings.targeting.businesses_per_day_target}
                min={1}
                max={500}
                className="w-full bg-[#141414] border border-white/10 p-2 font-mono text-xs text-avorria-white focus:outline-none focus:border-avorria-signal rounded-[2px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SAFETY GATES & REVIEW CONTROLS */}
      <section className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white border-b border-white/10 pb-3">
          <ShieldAlert className="w-4 h-4 text-avorria-signal" />
          <span>HUMAN REVIEW GATES</span>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-[#141414] border border-white/5 rounded-[2px] cursor-pointer font-mono text-xs text-avorria-white">
            <input
              type="checkbox"
              name="require_prospect_approval"
              defaultChecked={settings.review_settings.require_prospect_approval}
              className="accent-avorria-signal w-4 h-4"
            />
            <span>Require human operator approval before initiating deep research</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-[#141414] border border-white/5 rounded-[2px] cursor-pointer font-mono text-xs text-avorria-white">
            <input
              type="checkbox"
              name="require_website_approval_before_outreach"
              defaultChecked={settings.review_settings.require_website_approval_before_outreach}
              className="accent-avorria-signal w-4 h-4"
            />
            <span>Require human design sign-off on generated website before dispatching outreach</span>
          </label>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-[2px] flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isPending ? "SAVING..." : "SAVE CONFIGURATION"}</span>
        </button>
      </div>
    </form>
  );
}
