import React from "react";
import Link from "next/link";
import { STUDIO_INFO } from "@/content/studio";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { PrecisionField } from "@/components/cinematic/PrecisionField";

export const metadata = generatePageMetadata({
  title: "Contact — Commission Enquiries & Studio Communications | Avorria",
  description:
    "Direct contact for new project commissions, strategic enquiries, and studio communications. Avorria responds to all qualified project briefs.",
  path: "/contact",
});

/**
 * CONTACT
 *
 * Previously two small cards inside a max-w-3xl block on a 1720px container,
 * so two thirds of the page was empty and it read as unfinished. Rebuilt as a
 * full composition: a hero that states the two ways in, the routes themselves
 * at full width, and a studio panel carrying the facts a prospective client
 * actually asks for — where we are, what we are taking on, how fast we reply.
 */

const ROUTES = [
  {
    n: "01",
    kicker: "New commissions",
    title: "Project enquiry",
    body: "A structured brief so we can evaluate scope, timeline and budget properly before we speak. Ten minutes, and you get a considered response rather than a discovery call.",
    action: "Start a project",
    href: "/start-project",
    primary: true,
  },
  {
    n: "02",
    kicker: "Everything else",
    title: "Direct studio email",
    body: "Press, partnerships, academic collaboration, or anything that does not fit a brief. Straight to the studio inbox — no forms, no routing.",
    action: STUDIO_INFO.contact.email,
    href: `mailto:${STUDIO_INFO.contact.email}`,
    primary: false,
  },
] as const;

const VITALS = [
  { label: "Studio", value: STUDIO_INFO.contact.address },
  { label: "Response", value: "Within one working day" },
  { label: "Engagements", value: "Retained & project-based" },
  { label: "Availability", value: "Select commissions, 2025/2026" },
] as const;

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-avorria-line pt-32 pb-16 sm:pt-40 sm:pb-24">
        <PrecisionField intensity={0.8} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 72% at 32% 48%, rgba(8,8,8,0.93) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0) 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4 mb-10">
            <span className="text-avorria-signal font-bold">06</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span className="text-avorria-white font-bold" aria-current="page">CONTACT</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span>DIRECT STUDIO COMMUNICATIONS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              {/* Short words on purpose. A hero headline sits in a 7-column
                  measure, and a 12-character word like "CONVERSATION" cannot
                  fit there at display scale without breaking mid-word. */}
              <h1 className="display-xxl font-display font-black uppercase tracking-tight text-avorria-white leading-none">
                Two ways in.
              </h1>
              <p className="font-body text-lg sm:text-2xl text-avorria-white/85 max-w-2xl leading-relaxed">
                A structured brief if you have a project, or the studio inbox if you have a
                question. Both reach the same people.
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-avorria-signal">
                {STUDIO_INFO.contact.availability}
              </p>
            </div>

            {/* Studio vitals — the questions a prospective client asks first */}
            <div className="lg:col-span-5 lg:border-l lg:border-avorria-line/60 lg:pl-10">
              <span className="block font-mono text-[11px] uppercase tracking-widest text-avorria-signal font-bold border-b border-avorria-line/60 pb-3">
                Studio
              </span>
              <dl className="divide-y divide-avorria-line/40">
                {VITALS.map((v) => (
                  <div key={v.label} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-avorria-quiet shrink-0">
                      {v.label}
                    </dt>
                    <dd className="font-mono text-xs text-avorria-white text-right">{v.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Routes ───────────────────────────────────────────── */}
      <section
        aria-label="Ways to contact the studio"
        className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {ROUTES.map((r) => (
            <Link
              key={r.n}
              href={r.href}
              className={`group relative flex flex-col justify-between gap-10 p-8 sm:p-12 border transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal ${
                r.primary
                  ? "border-avorria-signal/40 bg-avorria-signal/[0.04] hover:border-avorria-signal"
                  : "border-avorria-line bg-avorria-surface/40 hover:border-avorria-white/40"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span className={r.primary ? "text-avorria-signal font-bold" : "text-avorria-quiet"}>
                    {r.kicker}
                  </span>
                  <span className="text-avorria-quiet">{r.n}</span>
                </div>

                <h2 className="font-display font-black uppercase tracking-tight text-3xl sm:text-4xl text-avorria-white">
                  {r.title}
                </h2>

                <p className="font-body text-base text-avorria-white/75 leading-relaxed max-w-md">
                  {r.body}
                </p>
              </div>

              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal">
                <span className="border-b border-avorria-signal/40 pb-0.5 group-hover:border-avorria-signal transition-colors normal-case sm:uppercase">
                  {r.action}
                </span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
