import React from "react";
import Link from "next/link";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="flex items-center gap-3 mb-8 font-mono text-xs">
        <Link href="/intelligence" className="text-avorria-muted hover:text-avorria-white">
          Intelligence
        </Link>
        <span className="text-avorria-line-strong">/</span>
        <span className="text-avorria-signal uppercase">{slug}</span>
      </div>
      <h1 className="display-md uppercase text-avorria-white">Article // {slug}</h1>
      <p className="font-mono text-xs text-avorria-muted mt-4">Article reader layout initialized.</p>
    </div>
  );
}
