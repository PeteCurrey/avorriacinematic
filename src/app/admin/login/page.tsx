import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { signInAdminAction } from "@/app/admin/actions";
import { Shield, KeyRound, Lock } from "lucide-react";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getAdminSession();
  if (session && session.user) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-avorria-white selection:bg-avorria-signal selection:text-black">
      <div className="w-full max-w-md bg-[#0D0D0D] border border-white/10 p-8 sm:p-10 shadow-2xl relative">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-avorria-signal to-transparent" />

        {/* Brand header */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="w-9 h-9 bg-white/5 border border-white/15 flex items-center justify-center font-display font-black text-sm text-avorria-white">
            A
          </div>
          <div>
            <div className="font-display font-black text-base tracking-widest uppercase text-avorria-white leading-none">
              AVORRIA <span className="text-avorria-signal">OS</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-avorria-muted mt-1">
              COMMAND ACCESS PORTAL
            </div>
          </div>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form action={signInAdminAction} className="space-y-5">
          <div>
            <label 
              htmlFor="email" 
              className="block font-mono text-[11px] uppercase tracking-wider text-avorria-muted mb-2"
            >
              Operator Identity (Email)
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue="pete@avorria.com"
                placeholder="pete@avorria.com"
                autoComplete="email"
                className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 font-mono text-xs text-avorria-white placeholder:text-avorria-quiet focus:outline-none focus:border-avorria-signal focus:ring-1 focus:ring-avorria-signal transition-colors rounded-[2px]"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block font-mono text-[11px] uppercase tracking-wider text-avorria-muted mb-2"
            >
              Security Key / Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                defaultValue="avorria2026!"
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 font-mono text-xs text-avorria-white placeholder:text-avorria-quiet focus:outline-none focus:border-avorria-signal focus:ring-1 focus:ring-avorria-signal transition-colors rounded-[2px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-[2px] flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-avorria-signal"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>AUTHENTICATE SESSION</span>
          </button>
        </form>

        {/* Security telemetry notice */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-2.5 text-avorria-quiet font-mono text-[10px] leading-relaxed">
          <Shield className="w-3.5 h-3.5 text-avorria-signal/80 shrink-0 mt-0.5" />
          <span>
            Authorised Avorria operators only. All access attempts are cryptographically verified and immutable audit events are recorded.
          </span>
        </div>
      </div>
    </div>
  );
}
