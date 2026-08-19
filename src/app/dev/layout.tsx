import type { Metadata } from "next";

// All /dev routes are internal tooling — must not be indexed
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Dev environment indicator — visually present so dev routes are obviously internal */}
      {process.env.NODE_ENV !== "production" && (
        <div
          className="fixed bottom-4 right-4 z-[200] bg-amber-500 text-black font-mono text-[10px] px-3 py-1 uppercase tracking-wider"
          aria-hidden="true"
        >
          DEV TOOL — NOT FOR PRODUCTION
        </div>
      )}
      {children}
    </>
  );
}
