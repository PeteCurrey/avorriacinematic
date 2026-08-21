import React from "react";

/**
 * Renders a title with explicit break opportunities after internal
 * punctuation.
 *
 * A token like "Drawdown.Trading" is one unbreakable 16-character word to the
 * browser, so in a 640px column at display scale it can only be broken by the
 * `overflow-wrap` backstop — which cuts it at an arbitrary letter. A <wbr>
 * after the period lets it wrap as "Drawdown." / "Trading", which is where a
 * person would break it anyway.
 *
 * No-op for titles without internal punctuation.
 */
export function BreakableTitle({ text }: { text: string }) {
  const parts = text.split(/(?<=[.\/·—-])/g);
  if (parts.length < 2) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <wbr />}
        </React.Fragment>
      ))}
    </>
  );
}
