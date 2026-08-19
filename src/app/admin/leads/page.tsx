import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Inbox } from "lucide-react";

export default async function AdminLeadsPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={Inbox}
      title="Inbound Leads"
      subtitle="Public enquiry submissions from the Avorria start-project intake funnel."
      description="No inbound intake submissions pending qualification. Direct inquiries submitted via /start-project will appear here for architectural evaluation."
      actionHref="/start-project"
      actionLabel="Inspect Public Brief Funnel"
      badge="INBOUND INTAKE"
    />
  );
}
