import React from "react";

interface TechnicalRuleProps {
  orientation?: "horizontal" | "vertical";
  variant?: "subtle" | "default" | "strong" | "signal";
  className?: string;
}

export function TechnicalRule({
  orientation = "horizontal",
  variant = "default",
  className = ""
}: TechnicalRuleProps) {
  const colorMap = {
    subtle: "bg-avorria-line-subtle",
    default: "bg-avorria-line",
    strong: "bg-avorria-line-strong",
    signal: "bg-avorria-signal"
  };

  if (orientation === "vertical") {
    return (
      <div
        className={`w-[1px] h-full ${colorMap[variant]} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`w-full h-[1px] ${colorMap[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}
