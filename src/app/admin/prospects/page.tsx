import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getProspects } from "@/lib/db/repository";
import { ProspectsDataGrid } from "@/components/admin/ProspectsDataGrid";
import { Users, CheckSquare, Sparkles, Sliders } from "lucide-react";

export default async function ProspectsDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    band?: string;
    sector?: string;
    search?: string;
    page?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const page = Number(params.page || 1);
  const result = await getProspects({
    status: (params.status as any) || "all",
    band: (params.band as any) || "all",
    sector: params.sector,
    search: params.search,
    page,
    limit: 50,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-avorria-signal mb-1">
            <Users className="w-3.5 h-3.5" />
            ACQUISITION TARGET REPOSITORY
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white leading-none">
            PROSPECT DATABASE
          </h1>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-1">
            Total Ingested: {result.total} entities across UK high-value sectors
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/ai-auto/review"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Open Review Queue</span>
          </Link>
        </div>
      </div>

      {/* Prospects Data Table */}
      <ProspectsDataGrid
        prospects={result.prospects}
        total={result.total}
        currentPage={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}
