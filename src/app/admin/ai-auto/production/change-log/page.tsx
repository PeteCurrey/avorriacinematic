import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getProductionChangeLog } from "@/lib/db/repository";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default async function ProductionChangeLogPage() {
  await requireAdmin();
  const logs = await getProductionChangeLog(100);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/ai-auto/production" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Production Control
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Production Operations Change Log</h1>
        <p className="text-white/50 mt-1">Audit ledger of all operating mode changes, gate modifications, and safety pauses.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Change Type</th>
              <th className="p-3">Description</th>
              <th className="p-3">Changed By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((l) => (
              <tr key={l.id} className="hover:bg-white/[0.01]">
                <td className="p-3 font-mono text-white/50">{new Date(l.created_at).toLocaleString()}</td>
                <td className="p-3">
                  <span className="bg-white/10 text-white/80 px-2 py-0.5 rounded text-[9px] font-bold font-mono">
                    {l.change_type}
                  </span>
                </td>
                <td className="p-3 text-white/90 font-medium">{l.description}</td>
                <td className="p-3 text-white/60">{l.changed_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
