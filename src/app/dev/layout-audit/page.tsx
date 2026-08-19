import { Metadata } from "next";
import { LayoutAuditClient } from "@/components/dev/LayoutAuditClient";

export const metadata: Metadata = {
  title: "Layout Audit — Avorria Dev",
  robots: { index: false, follow: false },
};

export default function LayoutAuditPage() {
  return <LayoutAuditClient />;
}
