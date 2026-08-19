import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getAutomationJobs } from "@/lib/db/repository";
import { AutomationsView } from "@/components/admin/AutomationsView";
import { Cpu, RefreshCw, Layers, ShieldCheck } from "lucide-react";

export default async function AutomationsPage() {
  await requireAdmin();
  const jobs = await getAutomationJobs({ limit: 100 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-avorria-signal mb-1">
            <Cpu className="w-3.5 h-3.5" />
            ASYNCHRONOUS ENGINE WORKERS
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white leading-none">
            AUTOMATION JOBS
          </h1>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-1">
            Real-time execution queue for AI research, site generation, and outreach workers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-white/5 border border-white/10 font-mono text-xs text-avorria-muted uppercase tracking-wider rounded-[2px]">
            Workers: <strong className="text-avorria-signal">ONLINE</strong>
          </div>
        </div>
      </div>

      {/* Main Automations Table & Inspector */}
      <AutomationsView jobs={jobs} />
    </div>
  );
}
