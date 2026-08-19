"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/content/services";
import { ServiceSlug } from "@/types/content";

export function VisualServiceIndex() {
  const [activeSlug, setActiveSlug] = useState<ServiceSlug>("websites");
  const activeService = SERVICES.find((s) => s.slug === activeSlug) || SERVICES[0];

  return (
    <section id="service-index" className="w-full border-b border-avorria-line bg-avorria-black py-16 sm:py-24">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-avorria-line pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-avorria-signal">01</span>
              <span className="text-avorria-line-strong">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
                Service Index
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white">
              FIVE PRINCIPAL DISCIPLINES
            </h2>
          </div>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider max-w-md">
            Direct commercial capabilities engineered for clarity, speed, and business growth.
          </p>
        </div>

        {/* Desktop Split View: Left 5 Service Cards / Right Live Working Artefact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: 5 Service List */}
          <div className="lg:col-span-6 space-y-4" role="tablist" aria-label="Services list">
            {SERVICES.map((service) => {
              const isActive = activeSlug === service.slug;

              return (
                <div
                  key={service.slug}
                  onMouseEnter={() => setActiveSlug(service.slug)}
                  onClick={() => setActiveSlug(service.slug)}
                  className={`group relative p-6 sm:p-8 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-avorria-surface border-avorria-signal"
                      : "bg-avorria-surface/30 border-avorria-line hover:border-avorria-muted hover:bg-avorria-surface/60"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveSlug(service.slug);
                    }
                  }}
                >
                  {/* Top Bar: Number & Category */}
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest pb-4 mb-4 border-b border-avorria-line/40">
                    <span className={isActive ? "text-avorria-signal font-bold" : "text-avorria-quiet"}>
                      {service.code}
                    </span>
                    <span className="text-avorria-muted">{service.category}</span>
                  </div>

                  {/* Title & Proposition */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-avorria-white/80 leading-relaxed">
                      {service.proposition}
                    </p>
                  </div>

                  {/* Sub-services pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.deliverablesSummary.slice(0, 5).map((deliv, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-avorria-black/60 border border-avorria-line/60 font-mono text-[11px] uppercase tracking-wider text-avorria-muted"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-avorria-line/40 font-mono text-xs">
                    <span className="text-avorria-quiet uppercase tracking-wider">
                      Canonical Route // /services/{service.slug}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-avorria-signal font-bold uppercase tracking-widest hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore Service</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Visual Proof Artefact (Desktop Sticky) */}
          <div className="lg:col-span-6">
            <div className="sticky top-28 border border-avorria-line bg-avorria-surface/80 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between min-h-[580px]">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b border-avorria-line pb-4 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-avorria-signal" aria-hidden="true" />
                  <span className="text-avorria-white font-bold">WORKING ARTEFACT</span>
                  <span className="text-avorria-line-strong">/</span>
                  <span className="text-avorria-signal">{activeService.code}</span>
                </div>
                <span className="font-mono text-[11px] text-avorria-quiet uppercase">
                  Production Verified
                </span>
              </div>

              {/* Dynamic Working Artefact Body */}
              <div className="my-auto py-2">
                {activeSlug === "websites" && <WebWorkingArtefact />}
                {activeSlug === "digital-products" && <ProductWorkingArtefact />}
                {activeSlug === "seo" && <SearchWorkingArtefact />}
                {activeSlug === "performance-marketing" && <GrowthWorkingArtefact />}
                {activeSlug === "ai-automation" && <SystemsWorkingArtefact />}
              </div>

              {/* Footer Metadata */}
              <div className="border-t border-avorria-line pt-4 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-avorria-muted">
                <div>
                  <span className="text-avorria-quiet uppercase">Key Outcome: </span>
                  <span className="text-avorria-white">{activeService.problemsSolved[0]?.outcome || "Measurable commercial advantage"}</span>
                </div>
                <Link
                  href={`/services/${activeService.slug}`}
                  className="text-avorria-signal font-bold uppercase tracking-widest hover:underline"
                >
                  View Full {activeService.shortTitle} Specs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 01 / WEB ARTEFACT: Browser frame & digital flagship composition ────────
function WebWorkingArtefact() {
  return (
    <div className="space-y-4">
      {/* Browser Chrome Window */}
      <div className="border border-avorria-line bg-avorria-black rounded-sm overflow-hidden shadow-2xl">
        {/* Browser Top Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-avorria-line bg-avorria-surface/90">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-avorria-line-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-avorria-line-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-avorria-line-strong" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-avorria-black border border-avorria-line/60 rounded text-[11px] font-mono text-avorria-muted">
            <span className="text-avorria-signal">https://</span>alkotabikes.com/configure
          </div>
          <div className="font-mono text-[10px] text-avorria-signal uppercase">
            LCP: 0.68s [100%]
          </div>
        </div>

        {/* Browser Viewport Surface */}
        <div className="relative aspect-[16/10] bg-[#07080A] p-4 flex flex-col justify-between overflow-hidden">
          <div className="relative w-full h-36 rounded overflow-hidden mb-3">
            <Image
              src="/media/projects/alkota/product/naked-carbon-hero.jpg"
              alt="Alkota Bikes digital flagship showcase"
              fill
              className="object-cover object-center opacity-90"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-avorria-black via-transparent to-transparent" />
          </div>

          <div className="flex items-end justify-between pt-2 border-t border-avorria-line/40">
            <div>
              <div className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest">
                Digital Flagship // Alkota Bikes
              </div>
              <div className="font-display font-bold text-sm uppercase text-avorria-white">
                Bespoke Titanium Configurator &amp; Reservation Flow
              </div>
            </div>
            <span className="px-2 py-0.5 bg-avorria-signal/20 text-avorria-signal font-mono text-[10px] uppercase">
              Live Production
            </span>
          </div>
        </div>
      </div>

      {/* Architectural Telemetry */}
      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Rendering</div>
          <div className="text-avorria-white font-bold mt-1">Next.js SSR</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">A11y Score</div>
          <div className="text-avorria-signal font-bold mt-1">100 / 100</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Framework</div>
          <div className="text-avorria-white font-bold mt-1">Zero-Bloat TS</div>
        </div>
      </div>
    </div>
  );
}

// ── 02 / PRODUCT ARTEFACT: Real SaaS interface & spatial data controls ──────
function ProductWorkingArtefact() {
  return (
    <div className="space-y-4">
      {/* SaaS App Shell */}
      <div className="border border-avorria-line bg-avorria-black rounded-sm overflow-hidden">
        {/* App Titlebar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-avorria-line bg-avorria-surface">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="font-bold text-avorria-white">NestIQ OS</span>
            <span className="text-avorria-quiet">/</span>
            <span className="text-avorria-muted">Spatial Multi-Criteria Query</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-avorria-signal">
            <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-pulse" />
            <span>24ms Query Time</span>
          </div>
        </div>

        {/* Dashboard Grid Surface */}
        <div className="p-4 space-y-3 bg-[#081018]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 bg-avorria-surface border border-avorria-line">
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">Cadastral Polygons</div>
              <div className="font-mono font-bold text-sm text-avorria-white mt-1">42,890 indexed</div>
            </div>
            <div className="p-2.5 bg-avorria-surface border border-avorria-line">
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">Isochrone Range</div>
              <div className="font-mono font-bold text-sm text-avorria-signal mt-1">15 min transit</div>
            </div>
            <div className="p-2.5 bg-avorria-surface border border-avorria-line">
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">Map Tiles</div>
              <div className="font-mono font-bold text-sm text-avorria-white mt-1">Vector Protobuf</div>
            </div>
          </div>

          <div className="relative h-40 rounded border border-avorria-line/60 overflow-hidden bg-avorria-black">
            <Image
              src="/media/projects/nestiq/interface/agent-dashboard-preview.png"
              alt="NestIQ Spatial dashboard interface"
              fill
              className="object-cover object-top opacity-85"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Architecture</div>
          <div className="text-avorria-white font-bold mt-1">Multi-Tenant SaaS</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Auth &amp; RBAC</div>
          <div className="text-avorria-white font-bold mt-1">Enterprise SSO</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Data Sync</div>
          <div className="text-avorria-signal font-bold mt-1">Sub-100ms API</div>
        </div>
      </div>
    </div>
  );
}

// ── 03 / SEARCH ARTEFACT: Entity Schema & Technical Crawl Topology ──────────
function SearchWorkingArtefact() {
  return (
    <div className="space-y-4">
      <div className="border border-avorria-line bg-avorria-black p-4 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-avorria-line/60 pb-3">
          <span className="text-avorria-signal font-bold uppercase tracking-wider">
            SEARCH TOPOLOGY &amp; ENTITY MODEL
          </span>
          <span className="text-avorria-quiet text-[10px]">Schema.org / JSON-LD</span>
        </div>

        {/* Entity Hierarchy Diagram */}
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-avorria-surface border border-avorria-line flex items-center justify-between">
            <span className="text-avorria-white font-bold">@type: Organization // Core Entity</span>
            <span className="text-avorria-signal text-[11px]">Wikidata Verified</span>
          </div>
          <div className="pl-6 border-l-2 border-avorria-signal/40 space-y-2">
            <div className="p-2 bg-avorria-surface/70 border border-avorria-line/60 flex items-center justify-between">
              <span className="text-avorria-white">@type: Service // Commercial Taxonomies (5 Units)</span>
              <span className="text-avorria-quiet text-[10px]">Rank #1 Target</span>
            </div>
            <div className="p-2 bg-avorria-surface/70 border border-avorria-line/60 flex items-center justify-between">
              <span className="text-avorria-white">@type: FAQPage // GEO / AI Answer Extraction</span>
              <span className="text-avorria-signal text-[10px]">Perplexity / GPT Ready</span>
            </div>
            <div className="p-2 bg-avorria-surface/70 border border-avorria-line/60 flex items-center justify-between">
              <span className="text-avorria-white">@type: BreadcrumbList // Clean Crawl Hierarchy</span>
              <span className="text-avorria-quiet text-[10px]">Max 2-Hop Depth</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#0A0D12] border border-avorria-line/60 rounded font-mono text-[11px] text-avorria-muted space-y-1">
          <div className="text-avorria-signal font-bold">COMMERCIAL INDEXATION STATUS</div>
          <div>Crawl Coverage: 100% indexed without redirect loops</div>
          <div>Googlebot Latency: 42ms response time via edge SSR</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Intent Focus</div>
          <div className="text-avorria-white font-bold mt-1">High-Intent B2B</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">AI Search</div>
          <div className="text-avorria-signal font-bold mt-1">GEO / AEO Ready</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Migrations</div>
          <div className="text-avorria-white font-bold mt-1">Zero Traffic Loss</div>
        </div>
      </div>
    </div>
  );
}

// ── 04 / GROWTH ARTEFACT: Commercial Acquisition to Revenue Pipeline ────────
function GrowthWorkingArtefact() {
  return (
    <div className="space-y-4">
      <div className="border border-avorria-line bg-avorria-black p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-avorria-line/60 pb-3">
          <span className="text-avorria-signal font-bold uppercase tracking-wider">
            CLOSED-LOOP CONVERSION PIPELINE
          </span>
          <span className="text-avorria-quiet text-[10px]">Server-Side CAPI</span>
        </div>

        {/* 5-Step Commercial Funnel Sequence */}
        <div className="space-y-2">
          {[
            { step: "01", label: "PAID MEDIA ADS", detail: "Google Ads / LinkedIn Intent Targeting", status: "Active Bid Control" },
            { step: "02", label: "BESPOKE LANDING PAGE", detail: "Sub-second LCP, message-matched copy", status: "A/B Testing" },
            { step: "03", label: "MULTI-STEP QUALIFIER", detail: "Frictionless form with budget & timeline", status: "High Conversion" },
            { step: "04", label: "CRM LEAD TRIAGE", detail: "Instant webhook into HubSpot & Sales rep", status: "< 60s Routing" },
            { step: "05", label: "REVENUE ATTRIBUTION", detail: "Offline conversion sent back to ad account", status: "Verified ROAS" }
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-center justify-between p-2 bg-avorria-surface/80 border border-avorria-line/60 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-avorria-signal font-bold">{item.step}</span>
                <span className="text-avorria-white font-bold">{item.label}</span>
                <span className="hidden sm:inline text-[11px] text-avorria-muted">({item.detail})</span>
              </div>
              <span className="text-[10px] text-avorria-quiet uppercase font-mono">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Tracking</div>
          <div className="text-avorria-white font-bold mt-1">Server-Side GTM</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Optimization</div>
          <div className="text-avorria-signal font-bold mt-1">Multivariate CRO</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Attribution</div>
          <div className="text-avorria-white font-bold mt-1">Closed-Loop CRM</div>
        </div>
      </div>
    </div>
  );
}

// ── 05 / SYSTEMS ARTEFACT: Real AI Workflow with Human Approval ─────────────
function SystemsWorkingArtefact() {
  return (
    <div className="space-y-4">
      <div className="border border-avorria-line bg-avorria-black p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-avorria-line/60 pb-3">
          <span className="text-avorria-signal font-bold uppercase tracking-wider">
            DETERMINISTIC WORKFLOW ENGINE
          </span>
          <span className="text-avorria-signal text-[10px] bg-avorria-signal/10 px-2 py-0.5 border border-avorria-signal/30">
            HUMAN-IN-THE-LOOP ACTIVE
          </span>
        </div>

        {/* State Machine Steps */}
        <div className="space-y-2">
          <div className="p-2.5 bg-avorria-surface border border-avorria-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avorria-signal" />
              <span className="text-avorria-white font-bold">1. INPUT INGESTION</span>
            </div>
            <span className="text-avorria-muted text-[11px]">PDF Contract / Inbound Lead</span>
          </div>

          <div className="p-2.5 bg-avorria-surface border border-avorria-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avorria-signal" />
              <span className="text-avorria-white font-bold">2. REASONING &amp; VALIDATION</span>
            </div>
            <span className="text-avorria-muted text-[11px]">Strict Zod Schema / Rule Engine</span>
          </div>

          <div className="p-2.5 bg-avorria-signal/10 border-2 border-avorria-signal flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-avorria-signal animate-ping" />
              <span className="text-avorria-signal font-bold">3. HUMAN REVIEW GATE</span>
            </div>
            <span className="text-avorria-white font-bold text-[11px] bg-avorria-signal/20 px-2 py-0.5">
              Operator Approval Required
            </span>
          </div>

          <div className="p-2.5 bg-avorria-surface border border-avorria-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avorria-line-strong" />
              <span className="text-avorria-white font-bold">4. ACTION DISPATCH</span>
            </div>
            <span className="text-avorria-muted text-[11px]">CRM Update / Webhook Payload</span>
          </div>

          <div className="p-2.5 bg-avorria-surface border border-avorria-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avorria-line-strong" />
              <span className="text-avorria-white font-bold">5. IMMUTABLE AUDIT LOG</span>
            </div>
            <span className="text-avorria-muted text-[11px]">PostgreSQL Transaction Log</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Safety</div>
          <div className="text-avorria-signal font-bold mt-1">Approval Gates</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Model Abstraction</div>
          <div className="text-avorria-white font-bold mt-1">Multi-LLM / Local</div>
        </div>
        <div className="p-3 border border-avorria-line bg-avorria-black">
          <div className="text-[10px] text-avorria-quiet uppercase">Audit Trail</div>
          <div className="text-avorria-white font-bold mt-1">100% Traceable</div>
        </div>
      </div>
    </div>
  );
}
