import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Settings } from "lucide-react";

export default async function AdminIntegrationsPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={Settings}
      title="Third-Party Integrations"
      subtitle="Supabase, Google Maps Places API, Companies House, Gemini API, Resend, Vercel."
      description="API connections are managed via secure server environment variables. In-browser integration connectors will be unlocked in Phase 2."
      actionHref="/admin/ai-auto/settings"
      actionLabel="Configure AI Auto Settings"
      badge="CONNECTORS"
    />
  );
}
