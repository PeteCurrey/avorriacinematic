import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  badge?: string;
}

export function AdminEmptyState({
  icon: Icon,
  title,
  subtitle,
  description,
  actionHref,
  actionLabel,
  badge = "MODULE READY"
}: AdminEmptyStateProps) {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-white/10">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-avorria-signal mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal" />
          {badge}
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white leading-none">
          {title}
        </h1>
        <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-1">
          {subtitle}
        </p>
      </div>

      <div className="p-12 bg-[#0D0D0D] border border-white/10 rounded-[2px] text-center space-y-4 max-w-2xl mx-auto my-8">
        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-[2px] flex items-center justify-center mx-auto text-avorria-signal">
          <Icon className="w-6 h-6" />
        </div>
        <div className="font-mono text-sm font-bold uppercase tracking-widest text-avorria-white">
          {title.toUpperCase()}
        </div>
        <p className="font-mono text-xs text-avorria-muted leading-relaxed">
          {description}
        </p>
        {actionHref && actionLabel && (
          <div className="pt-2">
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-4 py-2 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all"
            >
              <span>{actionLabel}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
