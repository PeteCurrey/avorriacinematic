"use client";

import React, { useState } from "react";
import Image from "next/image";

interface VisionSample {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  description: string;
  metrics: {
    gridColumns: string;
    aspectRatio: string;
    contrastRatio: string;
    dominantGeometry: string;
  };
  annotations: {
    label: string;
    position: string;
    analysis: string;
  }[];
}

const VISION_SAMPLES: VisionSample[] = [
  {
    id: "sample-alkota",
    name: "Alkota Frame Geometry",
    category: "PHYSICAL CRAFTSMANSHIP & 3D TOPOLOGY",
    imageSrc: "/media/projects/alkota/product/naked-carbon-hero.jpg",
    description: "Structural analysis of bespoke titanium bicycle tubing, weld fillets, and aerodynamic down-tube angles.",
    metrics: {
      gridColumns: "12-Col Modular",
      aspectRatio: "16:10 Horizontal",
      contrastRatio: "14.2:1 (AAA)",
      dominantGeometry: "Diamond Truss Polygon"
    },
    annotations: [
      { label: "HEADTUBE ANGLE", position: "Top Left", analysis: "73.5° aggressive trail geometry for high-speed descent stability." },
      { label: "BOTTOM BRACKET DROP", position: "Centre Low", analysis: "68mm drop lowering rider centre-of-mass through fast corners." },
      { label: "CHAINSTAY CLEARANCE", position: "Rear Triangle", analysis: "415mm compact chainstay optimized for instantaneous power transfer." }
    ]
  },
  {
    id: "sample-nestiq",
    name: "NestIQ Spatial Vector Map",
    category: "SPATIAL DATA & GEOGRAPHIC VECTORS",
    imageSrc: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    description: "Cadastral boundary indexing, travel-time isochrones, and spatial heat clustering across urban parcels.",
    metrics: {
      gridColumns: "Vector Quadtree",
      aspectRatio: "16:9 Map Canvas",
      contrastRatio: "16.8:1 (AAA)",
      dominantGeometry: "Voronoi Isochrone Cells"
    },
    annotations: [
      { label: "ISOCHRONE BOUNDARY", position: "Inner Radius", analysis: "15-minute public transit travel boundary calculated via Dijkstra vector graph." },
      { label: "PARCEL ENCLOSURE", position: "Cadastral Layer", analysis: "HM Land Registry title vector polygon rendered at sub-pixel precision." },
      { label: "ELEVATION CONTOUR", position: "Topographic Grid", analysis: "5m interval contour topology indicating flood risk boundaries." }
    ]
  },
  {
    id: "sample-drawdown",
    name: "Drawdown Orderbook & Chart",
    category: "QUANTITATIVE DATA & FINANCIAL DENSITY",
    imageSrc: "/media/projects/drawdown/interface/dashboard.png",
    description: "High-density tick-level candlestick telemetry, risk boundary bands, and modular execution panels.",
    metrics: {
      gridColumns: "8-Col Telemetry",
      aspectRatio: "16:10 Viewport",
      contrastRatio: "18.1:1 (AAA)",
      dominantGeometry: "Orthogonal Coordinate Grid"
    },
    annotations: [
      { label: "RISK CEILING", position: "Upper Band", analysis: "Calculated maximum daily drawdown threshold (-2.00%) with hard alert trigger." },
      { label: "VOLUME DELTA", position: "Lower Histogram", analysis: "Aggregated bid-ask imbalance per 1-minute execution interval." },
      { label: "PLAYBOOK TAG", position: "Top Header", analysis: "Pre-trade classification enforcing strict execution discipline." }
    ]
  },
  {
    id: "sample-ogn",
    name: "One Great Northern Facade",
    category: "ARCHITECTURAL PROPORTION & LEASING UX",
    imageSrc: "/media/projects/ogn/ogn-industrial.svg",
    description: "Floorplate volume calculation, curtain-wall mullion spacing, and daylight penetration ratios.",
    metrics: {
      gridColumns: "Golden Ratio Cadence",
      aspectRatio: "16:9 Panoramic",
      contrastRatio: "12.4:1 (AAA)",
      dominantGeometry: "Cantilevered Glazing Grid"
    },
    annotations: [
      { label: "CURTAIN WALL MULLION", position: "Facade Plane", analysis: "1.5m modular mullion grid facilitating flexible tenant floor subdivision." },
      { label: "CANTILEVER ENTRANCE", position: "Ground Level", analysis: "Double-height colonnade providing sheltered pedestrian transition." },
      { label: "TERRACE APERTURE", position: "Level 06", analysis: "Biophilic outdoor workspace with direct city skyline sightlines." }
    ]
  }
];

export function VisionStudyExperiment() {
  const [selectedSample, setSelectedSample] = useState<VisionSample>(VISION_SAMPLES[0]);
  const [activeLayers, setActiveLayers] = useState<{
    grid: boolean;
    annotations: boolean;
    contrast: boolean;
    geometry: boolean;
  }>({
    grid: true,
    annotations: true,
    contrast: false,
    geometry: true
  });

  const toggleLayer = (layer: "grid" | "annotations" | "contrast" | "geometry") => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="space-y-12">
      {/* Privacy Notice Header */}
      <div className="p-6 bg-avorria-surface border border-avorria-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            ETHICAL VISION PRINCIPLE
          </span>
          <p className="font-body text-xs text-avorria-white/80">
            This study operates strictly on curated architectural and engineering samples. Zero camera permissions, zero biometric tracking, and zero public file uploads.
          </p>
        </div>
        <span className="font-mono text-[10px] text-avorria-muted uppercase tracking-wider px-3 py-1 bg-avorria-black border border-avorria-line shrink-0">
          CURATED SAMPLES ONLY
        </span>
      </div>

      {/* Main Study Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Sample Selector & Layer Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sample Picker */}
          <div className="p-6 bg-avorria-surface border border-avorria-line space-y-4">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              01 // SELECT SAMPLE ARTIFACT
            </span>
            <div className="space-y-2">
              {VISION_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => setSelectedSample(sample)}
                  className={`w-full p-4 text-left border transition-all font-mono text-xs flex flex-col gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal ${
                    selectedSample.id === sample.id
                      ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal"
                      : "bg-avorria-black/60 text-avorria-white border-avorria-line hover:border-avorria-white"
                  }`}
                >
                  <span className="text-[10px] opacity-75">{sample.category}</span>
                  <span className="text-sm font-display font-black uppercase">{sample.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Layer Toggles */}
          <div className="p-6 bg-avorria-surface border border-avorria-line space-y-4">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              02 // STRUCTURAL OVERLAY LAYERS
            </span>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {[
                { key: "grid", label: "MODULAR GRID" },
                { key: "annotations", label: "ANNOTATIONS" },
                { key: "geometry", label: "GEOMETRY VECTORS" },
                { key: "contrast", label: "HIGH CONTRAST" }
              ].map((layer) => {
                const isActive = activeLayers[layer.key as keyof typeof activeLayers];
                return (
                  <button
                    key={layer.key}
                    onClick={() => toggleLayer(layer.key as keyof typeof activeLayers)}
                    className={`p-3 border text-left text-[11px] uppercase transition-all ${
                      isActive
                        ? "bg-avorria-white text-avorria-black font-bold border-avorria-white"
                        : "bg-avorria-black text-avorria-muted border-avorria-line"
                    }`}
                  >
                    <span className="block text-[9px] opacity-70">LAYER</span>
                    <span>{layer.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Interactive Canvas & Structural Analysis */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 bg-avorria-surface border border-avorria-line space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-avorria-line/40 pb-4">
              <div>
                <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
                  VISUAL INTERPRETATION CANVAS // {selectedSample.name}
                </span>
                <p className="font-body text-xs text-avorria-white/70 mt-1">
                  {selectedSample.description}
                </p>
              </div>
              <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-wider">
                {selectedSample.metrics.aspectRatio}
              </span>
            </div>

            {/* Visual Canvas with Overlays */}
            <div className={`relative w-full aspect-[16/10] bg-avorria-black border border-avorria-line overflow-hidden ${
              activeLayers.contrast ? "invert contrast-200" : ""
            }`}>
              <Image
                src={selectedSample.imageSrc}
                alt={selectedSample.name}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center"
              />

              {/* Grid Overlay */}
              {activeLayers.grid && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none border border-avorria-signal/30"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border border-avorria-signal/15" />
                  ))}
                </div>
              )}

              {/* Geometry Vector Vectors */}
              {activeLayers.geometry && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                >
                  <div className="w-3/4 h-3/4 border-2 border-dashed border-avorria-signal/40 rounded-sm" />
                </div>
              )}

              {/* Annotation Callouts */}
              {activeLayers.annotations && (
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                  {selectedSample.annotations.map((ann, idx) => (
                    <div
                      key={idx}
                      className="inline-block bg-avorria-black/90 border border-avorria-signal/60 px-3 py-1.5 font-mono text-[10px] text-avorria-white max-w-xs pointer-events-auto backdrop-blur-sm self-start"
                    >
                      <span className="text-avorria-signal font-bold mr-2">[{ann.position}]</span>
                      <span>{ann.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Metric Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs border-t border-avorria-line/40 pt-4">
              <div className="p-3 bg-avorria-black/60 border border-avorria-line">
                <span className="text-[9px] text-avorria-quiet uppercase block">GRID CADENCE</span>
                <span className="text-avorria-white text-[11px] font-bold">{selectedSample.metrics.gridColumns}</span>
              </div>
              <div className="p-3 bg-avorria-black/60 border border-avorria-line">
                <span className="text-[9px] text-avorria-quiet uppercase block">CONTRAST SCORE</span>
                <span className="text-avorria-signal text-[11px] font-bold">{selectedSample.metrics.contrastRatio}</span>
              </div>
              <div className="p-3 bg-avorria-black/60 border border-avorria-line">
                <span className="text-[9px] text-avorria-quiet uppercase block">DOMINANT GEOMETRY</span>
                <span className="text-avorria-white text-[11px] font-bold">{selectedSample.metrics.dominantGeometry}</span>
              </div>
              <div className="p-3 bg-avorria-black/60 border border-avorria-line">
                <span className="text-[9px] text-avorria-quiet uppercase block">ASPECT RATIO</span>
                <span className="text-avorria-white text-[11px] font-bold">{selectedSample.metrics.aspectRatio}</span>
              </div>
            </div>

            {/* Detailed Annotations Breakdown */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block">
                STRUCTURAL ANNOTATION LOG
              </span>
              <div className="space-y-2">
                {selectedSample.annotations.map((ann, idx) => (
                  <div key={idx} className="p-3 bg-avorria-black/40 border border-avorria-line flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-avorria-signal font-bold uppercase">{ann.label} ({ann.position})</span>
                    <p className="font-body text-xs text-avorria-white/80">{ann.analysis}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
