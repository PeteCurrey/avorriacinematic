import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Send } from "lucide-react";

export default async function AdminOutreachPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={Send}
      title="Outreach Campaigns"
      subtitle="Executive email sequencing and custom preview site delivery."
      description="No outreach campaigns active yet. Outreach dispatches will be triggered once preview websites complete automated QA and receive operator sign-off."
      actionHref="/admin/ai-auto"
      actionLabel="View AI Auto Pipeline"
      badge="PHASE 3 DISPATCH"
    />
  );
}
