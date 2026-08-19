import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { FileText } from "lucide-react";

export default async function AdminCmsPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={FileText}
      title="CMS & Media Library"
      subtitle="Editorial intelligence articles, case studies, WebGL assets and client media."
      description="Static markdown content is currently managed via the codebase repository. Database-backed dynamic publishing engine will initialize in subsequent releases."
      actionHref="/intelligence"
      actionLabel="Inspect Public Intelligence Articles"
      badge="CONTENT REPOSITORY"
    />
  );
}
