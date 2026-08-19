import React from "react";

interface SceneMarkerProps {
  index: number | string;
  label: string;
  category?: string;
  className?: string;
}

export function SceneMarker({
  index,
  label,
  category,
  className = ""
}: SceneMarkerProps) {
  const formattedIndex = String(index).padStart(3, "0");

  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-avorria-quiet ${className}`}>
      <span className="text-avorria-signal">{formattedIndex}</span>
      <span className="text-avorria-line-strong">/</span>
      <span className="text-avorria-white">{label}</span>
      {category && (
        <>
          <span className="text-avorria-line-strong">/</span>
          <span className="text-avorria-muted">{category}</span>
        </>
      )}
    </div>
  );
}
