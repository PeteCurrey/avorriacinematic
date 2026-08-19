import React from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Search } from "lucide-react";

export default async function AdminSeoPage() {
  await requireAdmin();

  return (
    <AdminEmptyState
      icon={Search}
      title="Technical SEO & Authority"
      subtitle="Canonical crawl topology, schema graphs, Google indexing telemetry and SERP monitors."
      description="Sitemap and JSON-LD entity structures are active and valid in code. External Google Search Console API metrics will be integrated in the reporting phase."
      actionHref="/sitemap.xml"
      actionLabel="Inspect Live XML Sitemap"
      badge="INDEX TOPOLOGY"
    />
  );
}
