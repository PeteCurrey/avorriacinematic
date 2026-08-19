import React from "react";
import type { Metadata } from "next";
import { getAdminSession } from "@/lib/admin/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Avorria Command — Operations & AI Acquisition OS",
  description: "Avorria Autonomous Acquisition & Digital Operations Engine.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If no session is found, render content bare (e.g. /admin/login page handles authentication)
  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-[#050505] text-avorria-white font-mono antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-avorria-white antialiased flex flex-col font-sans selection:bg-avorria-signal selection:text-black">
      {/* Sidebar Navigation */}
      <AdminSidebar user={session.user} />

      {/* Main Command Viewport */}
      <div className="flex-1 flex flex-col pl-16 md:pl-64 transition-all duration-300">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-[1720px] w-full mx-auto" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
