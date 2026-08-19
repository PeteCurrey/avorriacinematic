import React from "react";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { CapabilityHero } from "@/components/capabilities/CapabilityHero";
import { CapabilityOfferings, CapabilityOfferingItem } from "@/components/capabilities/CapabilityOfferings";
import { CapabilityArchitecture } from "@/components/capabilities/CapabilityArchitecture";
import { CapabilityProof, CapabilityProofProject } from "@/components/capabilities/CapabilityProof";
import { CapabilityProcess } from "@/components/capabilities/CapabilityProcess";
import { CapabilityCTA } from "@/components/capabilities/CapabilityCTA";
import { SystemsFlowDiagram } from "@/components/capabilities/SystemsFlowDiagram";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Systems — AI Integration & Operational Software | Avorria",
    description: "Avorria engineers AI-assisted workflows, operational software, and intelligent automation systems with transparent human oversight and durable data architectures.",
    path: "/capabilities/systems",
  });
}

const SYSTEMS_OFFERINGS: CapabilityOfferingItem[] = [
  {
    id: "offering-ai-product",
    code: "01 // AI PRODUCTS",
    title: "AI-Assisted Product Design & Integration",
    description: "Purpose-built AI product features engineered to augment user decision-making: natural language interfaces, intelligent recommendations, and structured context pipelines — without replacing human judgment.",
    whoItIsFor: "Technology ventures, talent platforms, and intelligence products requiring AI interactions that feel considered, not generic.",
    problemsSolved: [
      "AI integrations that feel like tacked-on chatbot afterthoughts",
      "Uncontrolled LLM outputs with no scope or safety boundaries",
      "User confusion about what is AI-generated versus system-computed"
    ],
    deliverables: [
      "Scoped LLM Prompt Architecture & Safety Boundaries",
      "Transparent AI Output Labeling in UI",
      "Structured Input → Structured Output Pipelines",
      "Human Review & Correction Workflows"
    ]
  },
  {
    id: "offering-workflow-automation",
    code: "02 // WORKFLOW AUTOMATION",
    title: "Operational Workflow Automation",
    description: "Structured, bounded automation of repeatable operational sequences — dispatch routing, status transitions, document generation, and data-entry elimination — using deterministic rule engines where AI adds no genuine value.",
    whoItIsFor: "Operations teams, logistics organizations, and facilities management networks drowning in manual coordination overhead.",
    problemsSolved: [
      "Manual email dispatching replacing what should be automated status routing",
      "Human time wasted on deterministic rule-based data classification",
      "Brittle spreadsheet automation collapsing under volume"
    ],
    deliverables: [
      "Deterministic Rule Engine Design",
      "Event-Driven State Machine Architecture",
      "Audit Trail & Rollback Governance",
      "API Webhook Trigger Pipelines"
    ]
  },
  {
    id: "offering-ai-agents",
    code: "03 // AI AGENTS",
    title: "Bounded AI Agent Systems",
    description: "Goal-directed agent workflows operating within explicit, auditable scope boundaries. Input → structured reasoning → constrained action set → human sign-off. No broad autonomous tooling.",
    whoItIsFor: "Organizations needing systematic intelligence to pre-process decisions or generate structured plans — with humans retaining final control.",
    problemsSolved: [
      "Repetitive data synthesis tasks requiring hours of human analyst time",
      "Unstructured briefs that need converting to actionable structured plans",
      "Agent systems with no clear scope, audit trail, or human override"
    ],
    deliverables: [
      "Explicit Action Set Boundary Specification",
      "Structured Output Schema Design",
      "Human Override & Approval Gates",
      "Full Agent Action Audit Logging"
    ]
  },
  {
    id: "offering-internal-tools",
    code: "04 // INTERNAL TOOLS",
    title: "Custom Operational Dashboards & Admin Tools",
    description: "High-density internal workspaces: dispatch consoles, analytics dashboards, data management interfaces, and operations command centres engineered for daily operational precision.",
    whoItIsFor: "Operations-intensive businesses that have outgrown generic off-the-shelf tools and require tailored interfaces for their specific workflows.",
    problemsSolved: [
      "Twelve browser tabs open simultaneously to perform one operational task",
      "Fragile Excel dashboards generating incorrect insights at volume",
      "Staff training bottlenecks caused by unintelligible legacy admin interfaces"
    ],
    deliverables: [
      "Unified Operational Command Interfaces",
      "Real-Time Telemetry & Status Dashboards",
      "Batch Processing & Bulk Action Tools",
      "Role-Gated Access & Permission Layers"
    ]
  },
  {
    id: "offering-data-pipelines",
    code: "05 // DATA SYSTEMS",
    title: "Data Pipelines & API Integration Architecture",
    description: "Reliable, observable data ingestion pipelines connecting third-party APIs, operational databases, and product surfaces with zero silent failure tolerance.",
    whoItIsFor: "Multi-system organizations requiring synchronized operational data across CRMs, ERPs, field tooling, and digital products.",
    problemsSolved: [
      "Data living in siloed systems with no reliable synchronization layer",
      "Silent API failures causing undetected data corruption",
      "Slow business intelligence caused by manual exports and spreadsheet joining"
    ],
    deliverables: [
      "REST & Webhook API Integration Architecture",
      "Observable Pipeline with Failure Alerting",
      "Real-Time Data Synchronization Layers",
      "Schema Validation & Data Integrity Guards"
    ]
  },
  {
    id: "offering-ai-decision",
    code: "06 // DECISION SYSTEMS",
    title: "AI-Assisted Decision Surfaces",
    description: "Structured recommendation and signal interfaces that surface AI-computed context to humans — clearly distinguishing model output from verified data, and supporting rather than replacing human decisions.",
    whoItIsFor: "Professionals in property, finance, HR, or operations where decisions carry real consequences and require verifiable evidence.",
    problemsSolved: [
      "AI black-box outputs users cannot trust, verify, or challenge",
      "Recommendations presented without evidence attribution",
      "Decision systems optimizing for AI engagement rather than human outcomes"
    ],
    deliverables: [
      "Evidence-First Recommendation UI Architecture",
      "Confidence Scoring with Source Attribution",
      "AI vs. Deterministic Output Distinction Layer",
      "User Correction & Feedback Loop Engineering"
    ]
  }
];

const SYSTEMS_PRINCIPLES = [
  {
    number: "01",
    title: "AI Where It Earns Its Place",
    description: "We only apply AI where probabilistic inference genuinely improves outcomes. Deterministic rule engines, not language models, handle classification, routing, and structured data transformation.",
    metric: "0",
    metricLabel: "FEATURES FALSELY LABELLED AS AI"
  },
  {
    number: "02",
    title: "Human Control as Architecture",
    description: "Human oversight is not a disclaimer. It is an engineered system constraint. Every agent system includes explicit approval gates, audit trails, rollback capabilities, and scope boundaries.",
    metric: "100%",
    metricLabel: "HUMAN OVERRIDE COVERAGE"
  },
  {
    number: "03",
    title: "Observable Systems",
    description: "Automation that runs silently and fails invisibly is operational risk. Every pipeline, agent action, and data transformation generates an auditable log visible to the operator.",
    metric: "Full",
    metricLabel: "AUDIT LOG ARCHITECTURE"
  },
  {
    number: "04",
    title: "Bounded Scope Contracts",
    description: "AI agents operate within explicit, signed-off scope contracts. We define exactly what actions an agent can and cannot take before any code is written.",
    metric: "Written",
    metricLabel: "SCOPE CONTRACT BEFORE BUILD"
  }
];

const CURATED_SYSTEMS_PROJECTS: CapabilityProofProject[] = [
  {
    slug: "careeros",
    projectIndex: "002 / CAREEROS",
    title: "CareerOS",
    category: "AI PRODUCT // CAREER INTELLIGENCE SYSTEM",
    description: "A human-centred AI career platform orchestrating structured career intelligence — Career Twin graph modeling, AI mentor conversations, and guided opportunity surfaces — with explicit human primacy at every step.",
    impactSummary: "Engineered scoped LLM prompt architecture, Career Twin graph model, and structured AI output pipeline with human correction loops.",
    mediaSrc: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    mediaAlt: "CareerOS AI career intelligence platform",
    tags: ["AI_PRODUCT", "BOUNDED_AGENTS", "GRAPH_INTELLIGENCE", "HUMAN_OVERSIGHT"]
  },
  {
    slug: "entirefm",
    projectIndex: "005 / ENTIREFM",
    title: "EntireFM",
    category: "FACILITIES OPERATIONS // WORKFLOW AUTOMATION",
    description: "A nationwide commercial facilities management platform with deterministic dispatch automation, 9-stage work order lifecycle state machines, and offline-capable field engineer synchronization.",
    impactSummary: "Engineered rule-based dispatch routing, durable work order state machines, and offline data sync — zero AI, full operational reliability.",
    mediaSrc: "/media/projects/entirefm/entirefm-operational.svg",
    mediaAlt: "EntireFM operational workflow system",
    tags: ["WORKFLOW_AUTOMATION", "STATE_MACHINES", "OFFLINE_SYNC", "OPERATIONAL_TOOLS"]
  },
  {
    slug: "drawdown-trading",
    projectIndex: "004 / DRAWDOWN.TRADING",
    title: "Drawdown.Trading",
    category: "FINANCIAL SOFTWARE // DECISION SYSTEMS",
    description: "A high-density trading discipline platform providing structured 6-stage workflow management, risk boundary engines, and deterministic trade playbook systems.",
    impactSummary: "Engineered disciplined risk boundary engine, structured trade state pipeline, and information-dense decision workspace — no AI, no fabricated signals.",
    mediaSrc: "/media/projects/drawdown/interface/dashboard.png",
    mediaAlt: "Drawdown.Trading decision discipline system",
    tags: ["DECISION_SYSTEMS", "WORKFLOW_ENGINEERING", "RISK_BOUNDARIES", "DATA_DENSE"]
  }
];

const SYSTEMS_ENGAGEMENT_STEPS = [
  {
    number: "01",
    name: "System Mapping & Opportunity Analysis",
    duration: "WEEKS 1–2",
    description: "We audit your existing operational flows, identify genuine automation opportunities, and draw clear boundaries between what should be AI-assisted versus deterministically automated versus left to humans.",
    deliverables: [
      "Operational Flow & Bottleneck Audit",
      "AI vs. Automation Opportunity Map",
      "Scope Contract & Action Boundary Specification"
    ]
  },
  {
    number: "02",
    name: "Architecture & Data Modeling",
    duration: "WEEKS 2–4",
    description: "We design your system architecture: state machines, data schemas, API contracts, agent scopes, audit log structures, and human approval gate placements.",
    deliverables: [
      "System Architecture Blueprint",
      "Data Schema & API Contract Design",
      "Agent Scope Boundaries Document"
    ]
  },
  {
    number: "03",
    name: "System Engineering & Integration",
    duration: "WEEKS 4–10",
    description: "We build the system with observable pipelines, explicit human oversight gates, full audit logging, role-gated access controls, and resilient failure handling.",
    deliverables: [
      "Production-Grade System Codebase",
      "Full Audit Log Architecture",
      "Human Approval Gate Implementation",
      "API & Webhook Integration Layer"
    ]
  },
  {
    number: "04",
    name: "Operational Hardening & Handover",
    duration: "WEEKS 10+",
    description: "We validate system behavior at scale, conduct operator training, document scope boundaries, and establish ongoing observability protocols.",
    deliverables: [
      "Load & Edge-Case Testing",
      "Operator Documentation & Training",
      "Failure Alerting & Monitoring Setup"
    ]
  }
];

export default function SystemsCapabilityPage() {
  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32">
      {/* 01 // Hero */}
      <CapabilityHero
        code="03 // SYSTEMS"
        title="SYSTEMS"
        tagline="SYSTEMS. MAKE IT THINK."
        description="We engineer AI-assisted workflows, operational automation, and intelligent decision systems. Not generic chatbot wrappers — purposefully scoped systems where AI earns its place, humans retain control, and every action is auditable."
        primaryCtaText="START A SYSTEMS PROJECT"
        primaryCtaHref="/start-project"
      />

      {/* 02 // Input → Intelligence → Human Control → Action → Feedback */}
      <SystemsFlowDiagram />

      {/* 03 // Offerings */}
      <CapabilityOfferings
        sectionEyebrow="01 // WHAT WE BUILD"
        sectionTitle="SYSTEMS & AUTOMATION CAPABILITIES"
        sectionDescription="Operational software, bounded AI agent systems, and intelligent workflow automation for organizations where reliability and human oversight are non-negotiable."
        offerings={SYSTEMS_OFFERINGS}
      />

      {/* 04 // Architecture Standards */}
      <CapabilityArchitecture
        sectionEyebrow="02 // THE AVORRIA SYSTEMS STANDARD"
        sectionTitle="HOW WE THINK ABOUT AI & AUTOMATION"
        principles={SYSTEMS_PRINCIPLES}
      />

      {/* 05 // Proof Projects */}
      <CapabilityProof
        sectionEyebrow="03 // VERIFIED EVIDENCE"
        sectionTitle="ENGINEERED SYSTEMS IN PRODUCTION"
        projects={CURATED_SYSTEMS_PROJECTS}
      />

      {/* 06 // Engagement Process */}
      <CapabilityProcess
        sectionEyebrow="04 // HOW WE WORK"
        sectionTitle="SYSTEMS DELIVERY METHODOLOGY"
        steps={SYSTEMS_ENGAGEMENT_STEPS}
      />

      {/* 07 // CTA */}
      <CapabilityCTA
        capabilityName="SYSTEMS"
        ctaHeading="HAVE AN OPERATIONAL PROBLEM WORTH SOLVING?"
        ctaDescription="Whether building a bounded AI product, automating operational workflows, or architecting a custom data system — let's map scope, boundaries, and the right level of intelligence for your problem."
        buttonText="START A SYSTEMS PROJECT"
        buttonHref="/start-project"
      />
    </main>
  );
}
