"use client";
/**
 * AVORRIA PREVIEW RUNTIME — Site Renderer
 * Renders a stored site configuration as a live website.
 * Security: Never executes arbitrary JS. Only renders approved components.
 */

import React from "react";
import type { SiteProject, SiteVersion, PageDefinition, ComponentDefinition, DesignTokens } from "@/types/admin";
import { isValidComponent } from "@/lib/factory/component-registry";

interface Props {
  project: SiteProject;
  version: SiteVersion;
  presentationMode?: boolean;
  token?: string;
}

export function PreviewSiteRenderer({ project, version, presentationMode, token }: Props) {
  const [currentPage, setCurrentPage] = React.useState("home");
  const tokens = version.design_tokens as DesignTokens;

  const pages = version.page_definitions as PageDefinition[];
  const activePage = pages.find(p => p.slug === currentPage) ?? pages[0];

  const cssVars = tokensToCSS(tokens);

  return (
    <div style={cssVars as React.CSSProperties}>
      {presentationMode && (
        <PresentationShell project={project} token={token} />
      )}
      <div className="preview-site-root" style={{ fontFamily: tokens.body_font }}>
        {/* Navigation */}
        <nav style={{ background: tokens.background, borderBottom: `1px solid ${tokens.border}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontFamily: tokens.heading_font, fontWeight: 700, color: tokens.text_primary }}>
            {String((version.content as Record<string, unknown>).company_name ?? project.title)}
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {pages.map(p => (
              <button key={p.slug} onClick={() => setCurrentPage(p.slug)} style={{ background: "none", border: "none", cursor: "pointer", color: p.slug === currentPage ? tokens.accent : tokens.text_secondary, fontFamily: tokens.body_font, fontSize: 15, fontWeight: p.slug === currentPage ? 600 : 400 }}>
                {p.title}
              </button>
            ))}
          </div>
        </nav>

        {/* Page content */}
        {activePage && (
          <div>
            {activePage.sections
              .filter(s => isValidComponent(s.component_key))
              .sort((a, b) => a.order - b.order)
              .map(section => (
                <SectionRenderer key={section.id} section={section} tokens={tokens} content={version.content as Record<string, unknown>} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function tokensToCSS(tokens: DesignTokens): Record<string, string> {
  return {
    "--bg":       tokens.background || "#ffffff",
    "--surface":  tokens.surface || "#f8f8f8",
    "--fg":       tokens.text_primary || "#111111",
    "--fg-muted": tokens.text_secondary || "#555555",
    "--border":   tokens.border || "#e5e5e5",
    "--accent":   tokens.accent || "#1a1a1a",
    "--font-heading": `"${tokens.heading_font || "Inter"}", sans-serif`,
    "--font-body":    `"${tokens.body_font || "Inter"}", sans-serif`,
    backgroundColor: tokens.background || "#ffffff",
    color: tokens.text_primary || "#111111",
    minHeight: "100vh",
  };
}

function PresentationShell({ project, token: _token }: { project: SiteProject; token?: string }) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;
  return (
    <div style={{ background: "#111", color: "#fff", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 4 }}>
          Concept created by Avorria
        </div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          A website concept for {project.title}
        </div>
        <div style={{ fontSize: 14, color: "#aaa", marginTop: 4 }}>
          We thought your online presence could better reflect the business you&apos;ve already built.
        </div>
      </div>
      <button onClick={() => setDismissed(true)} style={{ background: "white", color: "black", border: "none", borderRadius: 4, padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
        View Concept →
      </button>
    </div>
  );
}

function SectionRenderer({ section, tokens, content: _content }: { section: ComponentDefinition; tokens: DesignTokens; content: Record<string, unknown> }) {
  const props = section.props as Record<string, unknown>;

  switch (section.component_key) {
    case "HeroCinematic":
    case "HeroEditorial":
    case "HeroSplit":
      return <HeroSection props={props} tokens={tokens} />;
    case "ServiceGrid":
      return <ServicesSection props={props} tokens={tokens} />;
    case "SplitContent":
      return <SplitSection props={props} tokens={tokens} />;
    case "TrustStrip":
      return <TrustSection props={props} tokens={tokens} />;
    case "ReviewFeature":
      return <ReviewSection props={props} tokens={tokens} />;
    case "CTASection":
      return <CTASection props={props} tokens={tokens} />;
    case "LocationSection":
      return <LocationSection props={props} tokens={tokens} />;
    case "FeatureInteractive":
      return <FeatureSection props={props} tokens={tokens} />;
    case "FAQ":
      return <FAQSection props={props} tokens={tokens} />;
    case "Navigation":
    case "Footer":
      return null; // Handled separately
    default:
      return null;
  }
}

// ── SECTION COMPONENTS ────────────────────────────────────────────────────────

function HeroSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  return (
    <section style={{ background: tokens.background, padding: "120px 48px 100px", textAlign: "center", borderBottom: `1px solid ${tokens.border}` }}>
      {props.eyebrow ? <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: tokens.text_secondary, marginBottom: 16 }}>{String(props.eyebrow)}</div> : null}
      <h1 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800, color: tokens.text_primary, maxWidth: 900, margin: "0 auto 24px", lineHeight: 1.1 }}>
        {String(props.headline ?? "")}
      </h1>
      {props.sub_headline ? <p style={{ fontSize: 20, color: tokens.text_secondary, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>{String(props.sub_headline)}</p> : null}
      {props.cta_label ? (
        <a href={String(props.cta_href ?? "#")} style={{ display: "inline-block", background: tokens.accent, color: "#fff", padding: "16px 40px", textDecoration: "none", fontWeight: 600, fontSize: 16, letterSpacing: "0.02em" }}>
          {String(props.cta_label)}
        </a>
      ) : null}
    </section>
  );
}

function ServicesSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  const services = Array.isArray(props.services) ? (props.services as Array<Record<string, unknown>>) : [];
  return (
    <section style={{ padding: "80px 48px", background: tokens.surface }}>
      {props.heading ? <h2 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 36, fontWeight: 700, color: tokens.text_primary, textAlign: "center", marginBottom: 48 }}>{String(props.heading)}</h2> : null}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, maxWidth: 1200, margin: "0 auto" }}>
        {services.map((svc, i) => (
          <div key={i} style={{ padding: 32, background: tokens.background, border: `1px solid ${tokens.border}` }}>
            <h3 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 20, fontWeight: 600, color: tokens.text_primary, marginBottom: 12 }}>{String(svc.title ?? "")}</h3>
            {svc.description ? <p style={{ color: tokens.text_secondary, lineHeight: 1.6, fontSize: 15 }}>{String(svc.description)}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function SplitSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  return (
    <section style={{ padding: "80px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          {props.eyebrow ? <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.accent, marginBottom: 12 }}>{String(props.eyebrow)}</div> : null}
          <h2 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 40, fontWeight: 700, color: tokens.text_primary, marginBottom: 20, lineHeight: 1.2 }}>{String(props.heading ?? "")}</h2>
          {props.body_copy ? <p style={{ color: tokens.text_secondary, lineHeight: 1.7, fontSize: 17 }}>{String(props.body_copy)}</p> : null}
          {props.cta_label ? (
            <a href={String(props.cta_href ?? "#")} style={{ display: "inline-block", marginTop: 32, color: tokens.accent, fontWeight: 600, textDecoration: "none", borderBottom: `2px solid ${tokens.accent}`, paddingBottom: 2 }}>
              {String(props.cta_label)} →
            </a>
          ) : null}
        </div>
        <div style={{ background: tokens.surface, aspectRatio: "4/3" }} />
      </div>
    </section>
  );
}

function TrustSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  const items = Array.isArray(props.trust_items) ? (props.trust_items as Array<Record<string, unknown>>) : [];
  return (
    <section style={{ padding: "48px", background: tokens.accent, color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
        {items.map((item, i) => (
          <div key={i} style={{ fontSize: 18, fontWeight: 600 }}>{String(item.label ?? "")}</div>
        ))}
      </div>
    </section>
  );
}

function ReviewSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  return (
    <section style={{ padding: "80px 48px", background: tokens.surface, textAlign: "center" }}>
      {props.heading ? <h2 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 36, fontWeight: 700, color: tokens.text_primary, marginBottom: 48 }}>{String(props.heading)}</h2> : null}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
        {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#f59e0b", fontSize: 28 }}>{s}</span>)}
      </div>
      <div style={{ fontSize: 48, fontWeight: 800, color: tokens.text_primary }}>{String(props.rating ?? "5.0")}</div>
      {props.review_count ? <div style={{ color: tokens.text_secondary, marginTop: 8 }}>Based on {String(props.review_count)} Google reviews</div> : null}
    </section>
  );
}

function CTASection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  return (
    <section style={{ padding: "100px 48px", textAlign: "center", background: tokens.text_primary }}>
      <h2 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 48, fontWeight: 800, color: tokens.background, marginBottom: 16 }}>{String(props.heading ?? "")}</h2>
      {props.sub_heading ? <p style={{ color: tokens.background, opacity: 0.7, fontSize: 18, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>{String(props.sub_heading)}</p> : null}
      <a href={String(props.cta_href ?? "#")} style={{ display: "inline-block", background: tokens.accent, color: "#fff", padding: "18px 48px", textDecoration: "none", fontWeight: 600, fontSize: 18 }}>
        {String(props.cta_label ?? "Get In Touch")}
      </a>
    </section>
  );
}

function LocationSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  const locations = Array.isArray(props.locations) ? (props.locations as Array<Record<string, unknown>>) : [];
  return (
    <section style={{ padding: "80px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {props.heading ? <h2 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 36, fontWeight: 700, color: tokens.text_primary, marginBottom: 40 }}>{String(props.heading)}</h2> : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {locations.map((loc, i) => (
            <span key={i} style={{ background: tokens.surface, border: `1px solid ${tokens.border}`, padding: "8px 20px", fontSize: 15, color: tokens.text_primary }}>
              {String((loc as Record<string, unknown>).name ?? loc)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  return (
    <section style={{ padding: "80px 48px", background: tokens.surface }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {props.heading ? <h2 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 36, fontWeight: 700, color: tokens.text_primary, marginBottom: 32, textAlign: "center" }}>{String(props.heading)}</h2> : null}
        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input type="text" placeholder="Your Name" style={{ padding: "14px 16px", border: `1px solid ${tokens.border}`, fontSize: 16, background: tokens.background, color: tokens.text_primary }} />
          <input type="tel" placeholder="Phone Number" style={{ padding: "14px 16px", border: `1px solid ${tokens.border}`, fontSize: 16, background: tokens.background, color: tokens.text_primary }} />
          <input type="email" placeholder="Email Address" style={{ padding: "14px 16px", border: `1px solid ${tokens.border}`, fontSize: 16, background: tokens.background, color: tokens.text_primary }} />
          <textarea placeholder="Your Message" rows={4} style={{ padding: "14px 16px", border: `1px solid ${tokens.border}`, fontSize: 16, resize: "vertical", background: tokens.background, color: tokens.text_primary }} />
          <button type="submit" style={{ background: tokens.accent, color: "#fff", padding: "16px", fontWeight: 600, fontSize: 16, border: "none", cursor: "pointer" }}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

function FAQSection({ props, tokens }: { props: Record<string, unknown>; tokens: DesignTokens }) {
  const questions = Array.isArray(props.questions) ? (props.questions as Array<Record<string, unknown>>) : [];
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <section style={{ padding: "80px 48px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {props.heading ? <h2 style={{ fontFamily: `"${tokens.heading_font}", sans-serif`, fontSize: 36, fontWeight: 700, color: tokens.text_primary, marginBottom: 40 }}>{String(props.heading)}</h2> : null}
        {questions.map((q, i) => {
          const qObj = q as Record<string, unknown>;
          return (
            <div key={i} style={{ borderBottom: `1px solid ${tokens.border}`, padding: "20px 0" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 17, fontWeight: 600, color: tokens.text_primary, display: "flex", justifyContent: "space-between" }}>
                <span>{String(qObj.question ?? q)}</span>
                <span>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && qObj.answer ? (
                <p style={{ color: tokens.text_secondary, marginTop: 12, lineHeight: 1.7 }}>{String(qObj.answer)}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
