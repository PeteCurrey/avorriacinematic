"use client";
import React from "react";
import { Users, Shield, Plus } from "lucide-react";

export default function TeamManagementPage() {
  const members = [
    { name: "Pete Currey", email: "pete@avorria.com", role: "super_admin", status: "active", lastActive: "Just now" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="border-b border-white/10 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Team & Access Control</h1>
          <p className="text-sm text-white/50 mt-1">Manage staff roles, granular permissions, and security sessions.</p>
        </div>
        <button className="bg-white text-black font-semibold text-xs px-4 py-2 rounded flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Invite Team Member
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((m) => (
              <tr key={m.email} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{m.name}</td>
                <td className="p-4 font-mono text-white/70">{m.email}</td>
                <td className="p-4">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {m.role}
                  </span>
                </td>
                <td className="p-4 text-emerald-400 font-bold">{m.status.toUpperCase()}</td>
                <td className="p-4 text-white/40">{m.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
