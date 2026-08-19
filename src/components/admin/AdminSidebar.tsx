"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  CheckSquare, 
  Settings, 
  Cpu, 
  Layers, 
  Send, 
  TrendingUp, 
  Inbox, 
  FolderKanban, 
  FileText, 
  Search, 
  BarChart3, 
  Sliders, 
  LogOut,
  ChevronRight,
  Shield,
  Radio
} from "lucide-react";
import { signOutAdminAction } from "@/app/admin/actions";
import { AdminUser } from "@/types/admin";

interface AdminSidebarProps {
  user: AdminUser;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  highlight?: boolean;
}

const PRIMARY_NAVIGATION: { section: string; items: NavItem[] }[] = [
  {
    section: "CORE OPERATIONS",
    items: [
      { label: "Command", href: "/admin", icon: LayoutDashboard },
      { label: "AI Auto", href: "/admin/ai-auto", icon: Sparkles, highlight: true },
      { label: "Review Queue", href: "/admin/ai-auto/review", icon: CheckSquare, badge: "DAILY" },
      { label: "Prospects", href: "/admin/prospects", icon: Users },
      { label: "Automations", href: "/admin/automations", icon: Cpu },
      { label: "AI Auto Config", href: "/admin/ai-auto/settings", icon: Sliders },
    ]
  },
  {
    section: "ACQUISITION & CLIENTS",
    items: [
      { label: "Pipeline", href: "/admin/pipeline", icon: TrendingUp },
      { label: "Outreach", href: "/admin/outreach", icon: Send },
      { label: "Inbound Leads", href: "/admin/leads", icon: Inbox },
      { label: "Client Projects", href: "/admin/projects", icon: FolderKanban },
    ]
  },
  {
    section: "PLATFORM & STUDIO",
    items: [
      { label: "Studio Engine", href: "/admin/studio", icon: Layers },
      { label: "CMS & Media", href: "/admin/cms", icon: FileText },
      { label: "Technical SEO", href: "/admin/seo", icon: Search },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Integrations", href: "/admin/integrations", icon: Settings },
      { label: "System Settings", href: "/admin/settings", icon: Shield },
    ]
  }
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0A0A0A] border-r border-white/10 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      aria-label="Admin Navigation"
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
        >
          <div className="w-7 h-7 bg-white/5 border border-white/15 flex items-center justify-center font-display font-black text-xs text-avorria-white">
            A
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-display font-black text-sm tracking-widest uppercase text-avorria-white leading-none">
                AVORRIA <span className="text-avorria-signal">OS</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-avorria-muted mt-0.5">
                COMMAND ENGINE
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 text-avorria-muted hover:text-avorria-white transition-colors focus:outline-none"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin">
        {PRIMARY_NAVIGATION.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1 font-mono text-[9px] uppercase tracking-widest text-avorria-quiet">
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  className={`group flex items-center justify-between px-3 py-2 text-xs font-mono transition-all rounded-[2px] ${
                    isActive
                      ? "bg-white/10 text-avorria-white font-bold border-l-2 border-avorria-signal pl-2.5"
                      : "text-avorria-muted hover:text-avorria-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive 
                        ? "text-avorria-signal" 
                        : item.highlight 
                          ? "text-avorria-signal/70 group-hover:text-avorria-signal" 
                          : "text-avorria-muted group-hover:text-avorria-white"
                    }`} />
                    {!isCollapsed && (
                      <span className="truncate uppercase tracking-wider text-[11px]">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="px-1.5 py-0.5 font-mono text-[9px] font-bold bg-avorria-signal/15 text-avorria-signal border border-avorria-signal/30 rounded-[2px]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* System Status Telemetry */}
      {!isCollapsed && (
        <div className="px-4 py-3 mx-3 mb-3 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-avorria-signal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-avorria-signal"></span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-white">
                NODE ENGINE ONLINE
              </span>
            </div>
            <Radio className="w-3 h-3 text-avorria-signal/80" />
          </div>
          <div className="font-mono text-[9px] text-avorria-quiet flex justify-between">
            <span>HEURISTIC v1</span>
            <span className="text-avorria-signal/80 font-bold">ASSISTED</span>
          </div>
        </div>
      )}

      {/* User Profile & Sign Out */}
      <div className="p-3 border-t border-white/10 bg-[#080808]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 bg-avorria-signal/15 border border-avorria-signal/40 flex items-center justify-center font-mono font-bold text-xs text-avorria-signal rounded-[2px] shrink-0">
              {user.name.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="font-mono text-[11px] font-bold text-avorria-white truncate">
                  {user.name}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-avorria-signal truncate">
                  {user.role}
                </div>
              </div>
            )}
          </div>
          <form action={signOutAdminAction}>
            <button
              type="submit"
              title="Sign Out"
              aria-label="Sign Out"
              className="p-1.5 text-avorria-muted hover:text-red-400 hover:bg-white/5 transition-colors rounded-[2px] focus:outline-none"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
