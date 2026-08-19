import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { FolderKanban } from "lucide-react";

export default async function AdminProjectsPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={FolderKanban}
      title="Client Projects"
      subtitle="Active engineering commissions, milestone deliverables and client workspaces."
      description="No active commissioned client projects in delivery. Converted previews and signed contracts transition into this delivery workspace."
      actionHref="/admin"
      actionLabel="Return to Command"
      badge="DELIVERY STUDIO"
    />
  );
}
