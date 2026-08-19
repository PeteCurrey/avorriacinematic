import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getAiAutoSettings } from "@/lib/db/repository";
import { AiAutoSettingsForm } from "@/components/admin/AiAutoSettingsForm";
import { Sliders, ArrowLeft } from "lucide-react";

export default async function AiAutoSettingsPage() {
  await requireAdmin();
  const settings = await getAiAutoSettings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-avorria-signal mb-1">
            <Link href="/admin/ai-auto" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> AI AUTO
            </Link>
            <span className="text-white/20">/</span>
            <span>PARAMETERS & GOVERNANCE</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white leading-none">
            AI AUTO SETTINGS
          </h1>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-1">
            Configure acquisition targeting, sector filters, minimum score thresholds, and review gates.
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <AiAutoSettingsForm settings={settings} />
    </div>
  );
}
