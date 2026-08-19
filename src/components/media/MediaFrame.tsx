import React from "react";

interface MediaFrameProps {
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
}

export function MediaFrame({
  children,
  aspectRatio = "16/9",
  className = ""
}: MediaFrameProps) {
  return (
    <div
      style={{ aspectRatio }}
      className={`group relative overflow-hidden bg-avorria-surface border border-avorria-line transition-all duration-300 ${className}`}
    >
      <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        {children}
      </div>
    </div>
  );
}
