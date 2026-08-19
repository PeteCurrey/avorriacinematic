import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { TrendingUp } from "lucide-react";

export default async function AdminPipelinePage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={TrendingUp}
      title="Sales Pipeline"
      subtitle="Commercial opportunities, engagement stage tracking and deals."
      description="No active sales deals in stage yet. Qualified prospects that engage with preview sites will be automatically elevated to live commercial opportunities."
      actionHref="/admin/prospects"
      actionLabel="Explore Prospects Database"
      badge="COMMERCIAL INTELLIGENCE"
    />
  );
}
