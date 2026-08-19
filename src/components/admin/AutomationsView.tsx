"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AutomationJob, JobStatus, JobType } from "@/types/admin";
import { retryJobAction, cancelJobAction } from "@/app/admin/actions";
import { 
  Cpu, 
  RefreshCw, 
  XCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Code,
  Layers,
  Search
} from "lucide-react";

interface AutomationsViewProps {
  jobs: AutomationJob[];
}

export function AutomationsView({ jobs }: AutomationsViewProps) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<AutomationJob | null>(null);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredJobs = jobs.filter((j) => {
    if (selectedStatus !== "all" && j.status !== selectedStatus) return false;
    return true;
  });

  const handleRetry = (jobId: string) => {
    startTransition(async () => {
      const res = await retryJobAction(jobId);
      if (res.success) {
        setFeedback(`Job ${jobId} requeued`);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    });
  };

  const handleCancel = (jobId: string) => {
    startTransition(async () => {
      const res = await cancelJobAction(jobId);
      if (res.success) {
        setFeedback(`Job ${jobId} cancelled`);
        router.refresh();
        setTimeout(() => setFeedback(null), 3000);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter bar & Actions */}
      <div className="p-4 bg-[#0D0D0D] border border-white/10 rounded-[2px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-avorria-muted">
            FILTER QUEUE:
          </div>
          <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-[2px] font-mono text-xs">
            {["all", "queued", "running", "completed", "failed", "cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-[2px] transition-colors ${
                  selectedStatus === st
                    ? "bg-white/15 text-avorria-white font-bold"
                    : "text-avorria-muted hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="px-3 py-1 bg-avorria-signal/15 border border-avorria-signal/30 text-avorria-signal font-mono text-xs rounded-[2px]">
            {feedback}
          </div>
        )}
      </div>

      {/* Main Jobs Table */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 bg-[#0D0D0D] border border-white/10 rounded-[2px] text-center space-y-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-[2px] flex items-center justify-center mx-auto text-avorria-muted">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
            NO AUTOMATION JOBS IN CURRENT QUEUE
          </div>
          <p className="font-mono text-xs text-avorria-muted max-w-md mx-auto leading-relaxed">
            When you approve prospects in the Review Queue, deep research and strategy generation jobs will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table List */}
          <div className="lg:col-span-8 bg-[#0D0D0D] border border-white/10 rounded-[2px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#141414] border-b border-white/10 text-[10px] uppercase tracking-widest text-avorria-muted select-none">
                  <tr>
                    <th className="py-3 px-4">Job Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Entity</th>
                    <th className="py-3 px-4 text-center">Attempts</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`hover:bg-white/[0.04] transition-colors cursor-pointer ${
                        selectedJob?.id === job.id ? "bg-white/[0.06]" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-avorria-white uppercase">
                          {job.job_type.replace(/_/g, " ")}
                        </div>
                        <div className="text-[10px] text-avorria-quiet">
                          {job.id}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded-[2px] ${
                          job.status === "completed"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : job.status === "running"
                              ? "bg-avorria-signal/15 text-avorria-signal border border-avorria-signal/30"
                              : job.status === "failed"
                                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                : job.status === "cancelled"
                                  ? "bg-white/5 text-avorria-quiet border border-white/10"
                                  : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}>
                          {job.status === "running" && <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-ping" />}
                          {job.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-avorria-muted">
                        <div className="text-avorria-white uppercase">{job.entity_type}</div>
                        <div className="text-[10px] text-avorria-quiet truncate max-w-[120px]">{job.entity_id}</div>
                      </td>

                      <td className="py-3 px-4 text-center text-avorria-muted">
                        {job.attempts} / {job.max_attempts}
                      </td>

                      <td className="py-3 px-4 text-right space-x-2">
                        {job.status === "failed" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetry(job.id);
                            }}
                            disabled={isPending}
                            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-avorria-white uppercase text-[10px] rounded-[2px]"
                          >
                            Retry
                          </button>
                        )}

                        {job.status === "queued" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancel(job.id);
                            }}
                            disabled={isPending}
                            className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 uppercase text-[10px] rounded-[2px]"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Job Inspector Panel (4 cols) */}
          <div className="lg:col-span-4 bg-[#0D0D0D] border border-white/10 rounded-[2px] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
              <span className="font-bold uppercase tracking-widest text-avorria-white flex items-center gap-2">
                <Code className="w-4 h-4 text-avorria-signal" />
                JOB TELEMETRY
              </span>
              {selectedJob && (
                <span className="text-[10px] text-avorria-muted uppercase">
                  {selectedJob.id}
                </span>
              )}
            </div>

            {selectedJob ? (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="text-[10px] uppercase text-avorria-muted">Job Type</div>
                  <div className="text-avorria-white font-bold uppercase mt-0.5">
                    {selectedJob.job_type}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] uppercase text-avorria-muted">Scheduled</div>
                    <div className="text-avorria-white text-[11px]">
                      {new Date(selectedJob.scheduled_for).toLocaleTimeString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-avorria-muted">Priority</div>
                    <div className="text-avorria-signal font-bold">
                      {selectedJob.priority}
                    </div>
                  </div>
                </div>

                {selectedJob.error_message && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-[2px] text-red-300 text-[11px]">
                    <div className="font-bold uppercase text-[10px] mb-1">Execution Failure:</div>
                    {selectedJob.error_message}
                  </div>
                )}

                <div>
                  <div className="text-[10px] uppercase text-avorria-muted mb-1">Payload Parameters</div>
                  <pre className="p-3 bg-[#141414] border border-white/5 rounded-[2px] text-[10px] text-avorria-white/80 overflow-x-auto">
                    {JSON.stringify(selectedJob.payload, null, 2)}
                  </pre>
                </div>

                <div className="pt-2 flex gap-2">
                  {selectedJob.status === "failed" && (
                    <button
                      onClick={() => handleRetry(selectedJob.id)}
                      disabled={isPending}
                      className="w-full py-2 bg-avorria-signal text-black font-bold uppercase text-xs rounded-[2px]"
                    >
                      Retry Job
                    </button>
                  )}
                  {selectedJob.status === "queued" && (
                    <button
                      onClick={() => handleCancel(selectedJob.id)}
                      disabled={isPending}
                      className="w-full py-2 bg-red-500/20 text-red-400 border border-red-500/30 font-bold uppercase text-xs rounded-[2px]"
                    >
                      Cancel Job
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-avorria-muted font-mono text-xs text-center py-12">
                Select a job from the queue table to inspect payload parameters and execution telemetry.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
