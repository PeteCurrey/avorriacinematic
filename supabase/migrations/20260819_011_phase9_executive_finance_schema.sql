-- ============================================================
-- AVORRIA ADMIN — PHASE 9: EXECUTIVE COMMAND & FINANCE SCHEMA
-- Migration: 20260819_011_phase9_executive_finance_schema.sql
-- ============================================================

-- 1. Financial Events (Canonical audit-trailed commercial events)
CREATE TABLE IF NOT EXISTS financial_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN (
    'contracted_revenue',
    'payment_received',
    'refund',
    'external_cost',
    'ai_cost',
    'email_cost',
    'data_cost',
    'hosting_cost',
    'contractor_cost',
    'manual_adjustment'
  )),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  project_id UUID REFERENCES site_projects(id) ON DELETE SET NULL,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  service_id TEXT,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  amount_reporting_currency DECIMAL(12,2) NOT NULL,
  reporting_fx_rate DECIMAL(10,6) NOT NULL DEFAULT 1.000000,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  recognised_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Business Targets
CREATE TABLE IF NOT EXISTS business_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key TEXT NOT NULL,
  period_type TEXT NOT NULL CHECK (period_type IN ('monthly', 'quarterly', 'annual')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  target_value DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  notes TEXT,
  created_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Forecast Snapshots
CREATE TABLE IF NOT EXISTS forecast_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forecast_type TEXT NOT NULL,
  as_of_date DATE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  base_value DECIMAL(12,2) NOT NULL,
  downside_value DECIMAL(12,2) NOT NULL,
  upside_value DECIMAL(12,2) NOT NULL,
  assumptions JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Executive Anomalies
CREATE TABLE IF NOT EXISTS executive_anomalies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
  detected_value DECIMAL(12,2) NOT NULL,
  baseline_value DECIMAL(12,2) NOT NULL,
  threshold DECIMAL(12,2) NOT NULL,
  period TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'investigating', 'resolved', 'ignored')),
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 5. Executive Decisions Log
CREATE TABLE IF NOT EXISTS executive_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  decision TEXT NOT NULL,
  rationale TEXT NOT NULL,
  linked_recommendation_id UUID,
  decided_by TEXT NOT NULL DEFAULT 'Pete Currey',
  decided_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  review_at TIMESTAMPTZ,
  outcome TEXT,
  notes TEXT
);

-- 6. Internal Cost Rates (Manual labour cost modeling)
CREATE TABLE IF NOT EXISTS internal_cost_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL UNIQUE,
  hourly_cost DECIMAL(8,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  effective_from DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 7. Business Entities (Multi-entity preparation)
CREATE TABLE IF NOT EXISTS business_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'GB',
  currency TEXT NOT NULL DEFAULT 'GBP',
  tax_identifier TEXT,
  active BOOLEAN NOT NULL DEFAULT true
);
