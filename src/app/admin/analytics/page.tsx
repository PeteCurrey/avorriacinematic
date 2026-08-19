import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { BarChart3 } from "lucide-react";

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={BarChart3}
      title="Platform Analytics"
      subtitle="Visitor engagement, scene dwell times, Core Web Vitals telemetry and conversion funnels."
      description="No external analytics stream connected yet. Public client telemetry events are active via NEXT_PUBLIC_ANALYTICS_ID configuration."
      actionHref="/admin"
      actionLabel="Return to Command Center"
      badge="TELEMETRY"
    />
  );
}
