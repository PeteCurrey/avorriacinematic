-- ============================================================
-- AVORRIA ADMIN — PHASE 7: OPTIMISATION & COMMERCIAL INTELLIGENCE
-- Migration: 20260819_007_phase7_optimisation_schema.sql
-- ============================================================

-- Prospect Commercial Outcomes
CREATE TABLE IF NOT EXISTS prospect_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  final_status TEXT NOT NULL DEFAULT 'open',
  contacted BOOLEAN NOT NULL DEFAULT false,
  preview_viewed BOOLEAN NOT NULL DEFAULT false,
  replied BOOLEAN NOT NULL DEFAULT false,
  became_opportunity BOOLEAN NOT NULL DEFAULT false,
  proposal_sent BOOLEAN NOT NULL DEFAULT false,
  proposal_accepted BOOLEAN NOT NULL DEFAULT false,
  became_client BOOLEAN NOT NULL DEFAULT false,
  revenue DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'GBP',
  time_to_reply_hours NUMERIC(8,2),
  time_to_close_days NUMERIC(8,2),
  loss_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- A/B Experiments
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  hypothesis TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  metric TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','running','paused','completed','inconclusive','cancelled')),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  minimum_sample_size INTEGER NOT NULL DEFAULT 50,
  confidence_target DECIMAL(4,2) NOT NULL DEFAULT 0.95,
  winner_variant_id UUID,
  created_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Experiment Variants
CREATE TABLE IF NOT EXISTS experiment_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  allocation DECIMAL(4,2) NOT NULL DEFAULT 0.50,
  configuration JSONB NOT NULL DEFAULT '{}'::JSONB,
  sample_size INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Experiment Assignments (sticky)
CREATE TABLE IF NOT EXISTS experiment_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  entity_id TEXT NOT NULL,
  variant_id UUID NOT NULL REFERENCES experiment_variants(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(experiment_id, entity_id)
);

-- Optimisation Recommendations
CREATE TABLE IF NOT EXISTS optimisation_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('TARGETING','SCORING','MODEL_ROUTING','CREATIVE','OUTREACH','FOLLOWUP','PRICING','COST','CAPACITY','OPERATION')),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '{}'::JSONB,
  expected_impact TEXT NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('INSUFFICIENT_DATA','EARLY_SIGNAL','MODERATE','STRONG')),
  risk TEXT NOT NULL CHECK (risk IN ('LOW','MEDIUM','HIGH')),
  action_type TEXT NOT NULL,
  proposed_config_change JSONB NOT NULL DEFAULT '{}'::JSONB,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','accepted','rejected','deferred','implemented','expired')),
  rejection_reason TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Optimisation Playbooks
CREATE TABLE IF NOT EXISTS optimisation_playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sector TEXT NOT NULL,
  title TEXT NOT NULL,
  strategy_tag TEXT NOT NULL,
  recommended_structure JSONB DEFAULT '[]'::JSONB,
  creative_direction_guidance TEXT,
  conversion_features JSONB DEFAULT '[]'::JSONB,
  outreach_strategy_guidance TEXT,
  sample_size INTEGER NOT NULL DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scoring Shadow Runs
CREATE TABLE IF NOT EXISTS scoring_shadow_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scoring_version TEXT NOT NULL,
  weights JSONB NOT NULL,
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  original_score INTEGER NOT NULL,
  shadow_score INTEGER NOT NULL,
  original_decision TEXT NOT NULL,
  shadow_decision TEXT NOT NULL,
  actual_outcome TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
