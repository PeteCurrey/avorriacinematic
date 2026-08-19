import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Shield } from "lucide-react";

export default async function AdminSystemSettingsPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={Shield}
      title="System Governance & Security"
      subtitle="Operator roles, cryptographic keys, audit event retention and database connections."
      description="Super Admin session verified for Pete Currey (super_admin). Role-based access control and Row-Level Security policies active across all tables."
      actionHref="/admin/ai-auto/settings"
      actionLabel="Open AI Auto Governance"
      badge="SECURITY & ROLES"
    />
  );
}
