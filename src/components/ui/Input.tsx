import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="font-mono text-xs text-avorria-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-avorria-surface border ${
          error ? "border-red-500" : "border-avorria-line focus:border-avorria-signal"
        } px-4 py-3 text-sm text-avorria-white placeholder:text-avorria-muted/50 focus:outline-none transition-colors duration-200 ${className}`}
        {...props}
      />
      {error && <span className="font-mono text-[10px] text-red-400">{error}</span>}
    </div>
  );
}
