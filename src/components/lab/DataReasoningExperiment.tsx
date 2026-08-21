"use client";

import React, { useState } from "react";

interface SystemArchitectureOption {
  id: string;
  name: string;
  category: string;
  description: string;
  scores: {
    throughput: number; // 0 - 100
    latency: number; // 0 - 100 (100 = lowest latency)
    faultTolerance: number; // 0 - 100
    costEfficiency: number; // 0 - 100
  };
  bestFor: string;
}

const ARCHITECTURES: SystemArchitectureOption[] = [
  {
    id: "edge-ssr",
    name: "Edge Static SSR (Next.js App Router)",
    category: "GLOBAL CONTENT & COMMERCE",
    description: "Pre-rendered static HTML cached globally on edge CDN nodes with incremental revalidation and zero database bottleneck.",
    scores: {
      throughput: 95,
      latency: 98,
      faultTolerance: 90,
      costEfficiency: 92
    },
    bestFor: "Marketing flagships, editorial platforms, search-dominant websites"
  },
  {
    id: "event-serverless",
    name: "Event-Driven Serverless Micro-Pipelines",
    category: "ASYNC DATA & WEBHOOKS",
    description: "Stateless function invocations triggered by Kafka/Webhook events with auto-scaling down to zero idle cost.",
    scores: {
      throughput: 85,
      latency: 70,
      faultTolerance: 88,
      costEfficiency: 95
    },
    bestFor: "Background dispatching, PDF document generation, webhook ingestion"
  },
  {
    id: "redis-cluster",
    name: "In-Memory Redis / Valkey State Mesh",
    category: "REAL-TIME TELEMETRY",
    description: "Sub-millisecond read/write cache cluster for active user sessions, rate limiting, and live orderbook telemetry.",
    scores: {
      throughput: 98,
      latency: 99,
      faultTolerance: 82,
      costEfficiency: 70
    },
    bestFor: "Trading dashboards, live dispatch location streams, multi-user cursors"
  },
  {
    id: "dedicated-sql",
    name: "Partitioned PostgreSQL + Read Replicas",
    category: "DURABLE RELATIONAL DATA",
    description: "Strict ACID transactions with connection pooling, multi-region read replicas, and immutable audit logging.",
    scores: {
      throughput: 78,
      latency: 82,
      faultTolerance: 96,
      costEfficiency: 80
    },
    bestFor: "Financial ledger balances, work order state machines, cadastral maps"
  }
];

export function DataReasoningExperiment() {
  const [weights, setWeights] = useState({
    throughput: 50,
    latency: 80,
    faultTolerance: 60,
    costEfficiency: 70
  });

  const updateWeight = (key: keyof typeof weights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate composite fitness score (0-100) based on user weights
  const getFitnessScore = (arch: SystemArchitectureOption) => {
    const totalWeight = weights.throughput + weights.latency + weights.faultTolerance + weights.costEfficiency;
    if (totalWeight === 0) return 50;

    const weightedSum =
      arch.scores.throughput * weights.throughput +
      arch.scores.latency * weights.latency +
      arch.scores.faultTolerance * weights.faultTolerance +
      arch.scores.costEfficiency * weights.costEfficiency;

    return Math.round(weightedSum / totalWeight);
  };

  const rankedArchitectures = [...ARCHITECTURES]
    .map((arch) => ({ ...arch, fitness: getFitnessScore(arch) }))
    .sort((a, b) => b.fitness - a.fitness);

  return (
    <div className="space-y-12">
      {/* Illustrative Disclaimer */}
      <div className="p-6 bg-avorria-surface border border-avorria-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            ILLUSTRATIVE DATASET
          </span>
          <p className="font-body text-xs text-avorria-white/80">
            This experiment uses benchmarked architectural profiles to model multi-dimensional trade-offs. Adjust the priorities below to observe how the optimal architectural fit dynamically shifts.
          </p>
        </div>
        <span className="font-mono text-[10px] text-avorria-muted uppercase tracking-wider px-3 py-1 bg-avorria-black border border-avorria-line shrink-0">
          DYNAMIC REASONING LENS
        </span>
      </div>

      {/* Main Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Priority Weight Sliders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line space-y-6">
            <div className="flex items-center justify-between border-b border-avorria-line/40 pb-3 font-mono text-xs">
              <span className="text-avorria-signal uppercase tracking-widest font-bold">
                01 // ADJUST PRIORITY WEIGHTS
              </span>
              <span className="text-avorria-quiet text-[10px]">0–100% SCALE</span>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              {[
                { key: "latency", label: "LATENCY SENSITIVITY (SUB-SECOND DELIVERY)", desc: "Priority on sub-50ms user-perceived response times" },
                { key: "throughput", label: "CONCURRENT THROUGHPUT (BURST CAPACITY)", desc: "Priority on handling millions of requests without queuing" },
                { key: "faultTolerance", label: "FAULT TOLERANCE & RECOVERY", desc: "Priority on zero data loss and automated failover recovery" },
                { key: "costEfficiency", label: "CAPITAL / CLOUD COST EFFICIENCY", desc: "Priority on minimal cloud infrastructure expenditure" }
              ].map((slider) => {
                const val = weights[slider.key as keyof typeof weights];
                return (
                  <div key={slider.key} className="space-y-2 font-mono text-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="text-avorria-white font-bold text-[11px]">{slider.label}</span>
                      <span className="text-avorria-signal font-bold">{val}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={val}
                      onChange={(e) => updateWeight(slider.key as keyof typeof weights, parseInt(e.target.value))}
                      className="w-full accent-avorria-signal cursor-pointer"
                    />
                    <p className="font-body text-[10px] text-avorria-muted">{slider.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Reset Weights */}
            <button
              type="button"
              onClick={() => setWeights({ throughput: 50, latency: 80, faultTolerance: 60, costEfficiency: 70 })}
              className="w-full py-2.5 bg-avorria-black text-avorria-muted border border-avorria-line font-mono text-[10px] uppercase hover:text-avorria-white hover:border-avorria-white transition-colors"
            >
              RESET TO BALANCED DEFAULT WEIGHTS
            </button>
          </div>
        </div>

        {/* Right: Dynamic Multi-Dimensional Fitness Ranking */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line space-y-6">
            <div className="flex items-center justify-between border-b border-avorria-line/40 pb-3 font-mono text-xs">
              <span className="text-avorria-signal uppercase tracking-widest">
                ARCHITECTURAL FITNESS REASONING FIELD
              </span>
              <span className="text-avorria-muted text-[10px] uppercase">
                RANKED BY WEIGHT COMPOSITE
              </span>
            </div>

            {/* Ranked Cards */}
            <div className="space-y-4">
              {rankedArchitectures.map((arch, index) => {
                const isOptimal = index === 0;
                return (
                  <div
                    key={arch.id}
                    className={`p-6 border transition-all ${
                      isOptimal
                        ? "border-avorria-signal bg-avorria-surface/90 shadow-[0_0_20px_rgba(77, 159, 255,0.1)]"
                        : "border-avorria-line bg-avorria-black/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-avorria-line/30 pb-3">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span className="text-avorria-signal font-bold">#{index + 1} RECOMMENDED</span>
                          <span className="text-avorria-line-strong">/</span>
                          <span className="text-avorria-quiet uppercase">{arch.category}</span>
                        </div>
                        <h3 className="font-display font-black text-base uppercase text-avorria-white mt-1">
                          {arch.name}
                        </h3>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-display font-black text-2xl text-avorria-signal">
                          {arch.fitness}
                          <span className="text-xs text-avorria-muted">/100</span>
                        </div>
                        <span className="font-mono text-[9px] text-avorria-quiet uppercase block">FITNESS INDEX</span>
                      </div>
                    </div>

                    <p className="font-body text-xs text-avorria-white/80 mt-3 leading-relaxed">
                      {arch.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-avorria-line/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px]">
                      <div className="flex items-center gap-4 text-avorria-muted">
                        <span>LATENCY: <strong className="text-avorria-white">{arch.scores.latency}</strong></span>
                        <span>BURST: <strong className="text-avorria-white">{arch.scores.throughput}</strong></span>
                        <span>FAULT: <strong className="text-avorria-white">{arch.scores.faultTolerance}</strong></span>
                      </div>
                      <span className="text-avorria-signal">BEST FOR: {arch.bestFor}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
