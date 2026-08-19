import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Layers } from "lucide-react";

export default async function AdminStudioPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={Layers}
      title="Studio Engine"
      subtitle="Autonomous site generator, component compiler and WebGL scene builder."
      description="No active site builds in progress. Approve candidates in the Daily Review Queue to trigger deep research and automated design strategy compilation."
      actionHref="/admin/ai-auto/review"
      actionLabel="Open Review Queue"
      badge="PHASE 2 ENGINE"
    />
  );
}
