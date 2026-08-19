"use client";

import React, { useTransition, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  CheckSquare, 
  FlaskConical, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck
} from "lucide-react";
import { seedFixtureAction } from "@/app/admin/actions";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [seedSuccess, setSeedSuccess] = useState(false);

  // Generate readable breadcrumbs
  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    const label = part.replace(/-/g, " ").toUpperCase();
    const isLast = index === pathParts.length - 1;
    return { href, label, isLast };
  });

  const handleSeedFixture = () => {
    startTransition(async () => {
      const res = await seedFixtureAction();
      if (res.success) {
        setSeedSuccess(true);
        router.refresh();
        setTimeout(() => setSeedSuccess(false), 3000);
      }
    });
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#080808]/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Breadcrumb path */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs">
        <span className="text-avorria-signal font-bold">AVORRIA</span>
        <span className="text-white/20">/</span>
        {breadcrumbs.map((bc) => (
          <React.Fragment key={bc.href}>
            {bc.isLast ? (
              <span className="text-avorria-white font-bold tracking-wider uppercase">
                {bc.label}
              </span>
            ) : (
              <>
                <Link 
                  href={bc.href} 
                  className="text-avorria-muted hover:text-avorria-white transition-colors uppercase tracking-wider"
                >
                  {bc.label}
                </Link>
                <span className="text-white/20">/</span>
              </>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Action shortcuts & telemetry */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Development Seed Fixture Button (clearly marked) */}
        <button
          onClick={handleSeedFixture}
          disabled={isPending}
          className="hidden md:inline-flex items-center gap-2 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] uppercase tracking-wider rounded-[2px] transition-all disabled:opacity-50"
          title="Seed one marked test prospect for review testing"
        >
          {isPending ? (
            <RefreshCw className="w-3 h-3 animate-spin" />
          ) : seedSuccess ? (
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          ) : (
            <FlaskConical className="w-3 h-3" />
          )}
          <span>{seedSuccess ? "FIXTURE SEEDED" : "SEED TEST PROSPECT"}</span>
        </button>

        {/* Quick Review Shortcut */}
        <Link
          href="/admin/ai-auto/review"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-avorria-signal/15 hover:bg-avorria-signal/25 border border-avorria-signal/40 text-avorria-signal font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all"
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">DAILY REVIEW QUEUE</span>
          <span className="sm:hidden">REVIEW</span>
        </Link>

        {/* Security badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 font-mono text-[10px] text-avorria-muted uppercase tracking-wider rounded-[2px]">
          <ShieldCheck className="w-3.5 h-3.5 text-avorria-signal" />
          <span>SUPER_ADMIN ACCESS</span>
        </div>
      </div>
    </header>
  );
}
