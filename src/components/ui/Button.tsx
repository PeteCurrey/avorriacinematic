import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "outline" | "signal";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "text",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono uppercase tracking-widest transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal disabled:opacity-40 disabled:pointer-events-none";

  const variantStyles = {
    text: "text-avorria-white hover:text-avorria-signal bg-transparent border-b border-avorria-line hover:border-avorria-signal pb-0.5",
    outline: "text-avorria-white hover:text-avorria-signal bg-avorria-surface/40 hover:bg-avorria-surface border border-avorria-line hover:border-avorria-signal",
    signal: "text-avorria-black bg-avorria-signal hover:bg-avorria-white border border-avorria-signal font-semibold"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3 text-xs"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
