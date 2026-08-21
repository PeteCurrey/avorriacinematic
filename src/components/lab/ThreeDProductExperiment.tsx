"use client";

import React, { useState, useRef, useEffect } from "react";

type RenderMode = "WIREFRAME" | "SOLID" | "XRAY" | "EXPLODED";

export function ThreeDProductExperiment() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>("WIREFRAME");
  const [isRotating, setIsRotating] = useState(true);
  const [explodedAmount, setExplodedAmount] = useState(0);
  const [activeComponent, setActiveComponent] = useState<string>("TITANIUM MAIN TRIANGLE");

  const rotationRef = useRef({ x: 0.2, y: 0.8 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Draw 3D Geometric Object onto Canvas
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.y += 0.008;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.35;

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // Project 3D (x,y,z) to 2D (px, py)
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective division
        const distance = 4;
        const fov = distance / (distance + z2);

        return {
          px: cx + x1 * scale * fov,
          py: cy + y2 * scale * fov,
          z: z2
        };
      };

      // Bike Frame Geometric Nodes (Normalized Coordinates)
      const explodeOffset = renderMode === "EXPLODED" ? explodedAmount * 0.4 : 0;

      const nodes = {
        headTop: { x: 0.8 + explodeOffset, y: -0.6, z: 0 },
        headBottom: { x: 0.7 + explodeOffset, y: -0.1, z: 0 },
        bb: { x: -0.1, y: 0.6, z: 0 },
        seatTop: { x: -0.4 - explodeOffset, y: -0.5, z: 0 },
        rearDropL: { x: -1.0 - explodeOffset, y: 0.4, z: -0.15 },
        rearDropR: { x: -1.0 - explodeOffset, y: 0.4, z: 0.15 },
        frontDropL: { x: 0.9 + explodeOffset * 1.5, y: 0.5, z: -0.12 },
        frontDropR: { x: 0.9 + explodeOffset * 1.5, y: 0.5, z: 0.12 }
      };

      // Project Nodes
      const pHeadTop = project(nodes.headTop.x, nodes.headTop.y, nodes.headTop.z);
      const pHeadBottom = project(nodes.headBottom.x, nodes.headBottom.y, nodes.headBottom.z);
      const pBB = project(nodes.bb.x, nodes.bb.y, nodes.bb.z);
      const pSeatTop = project(nodes.seatTop.x, nodes.seatTop.y, nodes.seatTop.z);
      const pRearDropL = project(nodes.rearDropL.x, nodes.rearDropL.y, nodes.rearDropL.z);
      const pRearDropR = project(nodes.rearDropR.x, nodes.rearDropR.y, nodes.rearDropR.z);
      const pFrontDropL = project(nodes.frontDropL.x, nodes.frontDropL.y, nodes.frontDropL.z);
      const pFrontDropR = project(nodes.frontDropR.x, nodes.frontDropR.y, nodes.frontDropR.z);

      // Line Drawing Helper
      const drawLine = (p1: any, p2: any, color: string, width = 2, dashed = false) => {
        ctx.beginPath();
        if (dashed) ctx.setLineDash([4, 4]);
        else ctx.setLineDash([]);
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      };

      const primaryColor = renderMode === "XRAY" ? "rgba(56, 189, 248, 0.8)" : "#4D9FFF";
      const secondaryColor = renderMode === "SOLID" ? "rgba(255,255,255,0.7)" : "rgba(77, 159, 255, 0.4)";
      const ghostColor = "rgba(255, 255, 255, 0.15)";

      // Draw Main Triangle
      drawLine(pHeadTop, pHeadBottom, primaryColor, 4); // Headtube
      drawLine(pHeadTop, pSeatTop, primaryColor, 3); // Toptube
      drawLine(pHeadBottom, pBB, primaryColor, 4); // Downtube
      drawLine(pSeatTop, pBB, primaryColor, 3.5); // Seattube

      // Draw Rear Stays
      drawLine(pSeatTop, pRearDropL, secondaryColor, 2);
      drawLine(pSeatTop, pRearDropR, secondaryColor, 2);
      drawLine(pBB, pRearDropL, secondaryColor, 2.5);
      drawLine(pBB, pRearDropR, secondaryColor, 2.5);

      // Draw Front Fork
      drawLine(pHeadBottom, pFrontDropL, primaryColor, 2.5);
      drawLine(pHeadBottom, pFrontDropR, primaryColor, 2.5);

      // Draw Dropouts
      drawLine(pRearDropL, pRearDropR, ghostColor, 1, true);
      drawLine(pFrontDropL, pFrontDropR, ghostColor, 1, true);

      // Draw Node Vertices
      const drawNode = (p: any, label?: string) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, 4, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (label && renderMode === "WIREFRAME") {
          ctx.font = "9px monospace";
          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.fillText(label, p.px + 8, p.py - 4);
        }
      };

      drawNode(pHeadTop, "N_01 HEAD");
      drawNode(pBB, "N_02 BB");
      drawNode(pSeatTop, "N_03 SEAT");
      drawNode(pRearDropL, "N_04 REAR");
      drawNode(pFrontDropL, "N_05 FORK");

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRotating, renderMode, explodedAmount]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    rotationRef.current.y += dx * 0.01;
    rotationRef.current.x += dy * 0.01;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="space-y-12">
      {/* 3D Visualizer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 sm:p-6 bg-avorria-surface border border-avorria-line space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-avorria-line/40 pb-3 font-mono text-xs">
              <span className="text-avorria-signal uppercase tracking-widest font-bold">
                CANVAS GEOMETRY ENGINE // ALKOTA 3D TOPOLOGY
              </span>
              <span className="text-avorria-quiet text-[10px] uppercase">
                DRAG OR TOUCH TO ROTATE
              </span>
            </div>

            {/* Canvas Viewport */}
            <div className="relative w-full aspect-[16/10] bg-avorria-black border border-avorria-line overflow-hidden cursor-grab active:cursor-grabbing">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="w-full h-full object-contain block"
              />

              {/* Viewport Overlay Controls */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRotating(!isRotating)}
                  className={`font-mono text-[10px] uppercase px-3 py-1.5 border transition-colors ${
                    isRotating
                      ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal"
                      : "bg-avorria-black text-avorria-white border-avorria-line"
                  }`}
                >
                  {isRotating ? "AUTO-ROTATE: ON" : "AUTO-ROTATE: PAUSED"}
                </button>
              </div>

              <div className="absolute top-4 right-4 font-mono text-[9px] text-avorria-signal bg-avorria-black/80 px-2.5 py-1 border border-avorria-line uppercase">
                60 FPS // ZERO WEBGL BLOAT
              </div>
            </div>

            {/* Render Mode Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {(["WIREFRAME", "SOLID", "XRAY", "EXPLODED"] as RenderMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setRenderMode(mode);
                    if (mode === "EXPLODED" && explodedAmount === 0) setExplodedAmount(1);
                  }}
                  className={`p-3 border text-left uppercase transition-all ${
                    renderMode === mode
                      ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal"
                      : "bg-avorria-black text-avorria-muted border-avorria-line hover:border-avorria-white hover:text-avorria-white"
                  }`}
                >
                  <span className="block text-[9px] opacity-70">MODE</span>
                  <span className="text-xs font-display font-black">{mode}</span>
                </button>
              ))}
            </div>

            {/* Exploded Slider if in EXPLODED mode */}
            {renderMode === "EXPLODED" && (
              <div className="p-4 bg-avorria-black border border-avorria-line space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[10px] text-avorria-muted uppercase">
                  <span>EXPLOSION SEPARATION OFFSET</span>
                  <span className="text-avorria-signal font-bold">{Math.round(explodedAmount * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.05}
                  value={explodedAmount}
                  onChange={(e) => setExplodedAmount(parseFloat(e.target.value))}
                  className="w-full accent-avorria-signal cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Calipers & Material Specification */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line space-y-6">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block border-b border-avorria-line/40 pb-3">
              GEOMETRIC CALIPERS
            </span>

            {/* Caliper Readouts */}
            <div className="space-y-3 font-mono text-xs">
              {[
                { label: "HEAD TUBE ANGLE", value: "73.5°", note: "Aggressive road trail" },
                { label: "CHAINSTAY LENGTH", value: "415 mm", note: "Compact power transfer" },
                { label: "BB DROP", value: "68 mm", note: "Low centre of mass" },
                { label: "TOPTUBE DIAMETER", value: "34.9 mm", note: "Triple-butted Ti-3Al-2.5V" },
                { label: "WEIGHT TARGET", value: "1,240 g", note: "Bare frame (Size 54)" }
              ].map((cal) => (
                <div key={cal.label} className="p-3 bg-avorria-black/60 border border-avorria-line flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-avorria-quiet uppercase block">{cal.label}</span>
                    <span className="text-avorria-muted text-[10px]">{cal.note}</span>
                  </div>
                  <span className="text-avorria-signal font-bold text-sm">{cal.value}</span>
                </div>
              ))}
            </div>

            {/* Material Specification */}
            <div className="pt-4 border-t border-avorria-line/40 space-y-2">
              <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
                MATERIAL ARCHITECTURE
              </span>
              <p className="font-body text-xs text-avorria-white/80 leading-relaxed">
                Grade 9 aerospace-grade seamless titanium tubing cold-worked with precision CNC-machined 6Al-4V dropouts and bottom bracket shell.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
