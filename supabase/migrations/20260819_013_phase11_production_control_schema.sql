-- ============================================================
-- AVORRIA ADMIN — PHASE 11: PRODUCTION CONTROL & COHORTS SCHEMA
-- Migration: 20260819_013_phase11_production_control_schema.sql
-- ============================================================

-- 1. AI Auto Operating Config (single row singleton)
CREATE TABLE IF NOT EXISTS ai_auto_operating_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_mode TEXT NOT NULL DEFAULT 'TEST' CHECK (current_mode IN ('TEST','PILOT','CONTROLLED_PRODUCTION','SCALED_PRODUCTION','FULL_AUTOPILOT')),
  previous_mode TEXT,
  mode_changed_at TIMESTAMPTZ DEFAULT NOW(),
  mode_changed_by TEXT DEFAULT 'system',
  mode_change_reason TEXT,
  -- Global Daily Limits
  max_scout_per_day INTEGER NOT NULL DEFAULT 50,
  max_qualified_per_day INTEGER NOT NULL DEFAULT 20,
  max_sites_per_day INTEGER NOT NULL DEFAULT 10,
  max_outreach_per_day INTEGER NOT NULL DEFAULT 5,
  max_followups_per_day INTEGER NOT NULL DEFAULT 10,
  max_ai_spend_per_day DECIMAL(8,2) NOT NULL DEFAULT 20.00,
  max_ai_spend_per_month DECIMAL(10,2) NOT NULL DEFAULT 400.00,
  max_concurrent_site_builds INTEGER NOT NULL DEFAULT 3,
  max_concurrent_scout_jobs INTEGER NOT NULL DEFAULT 2,
  -- Human Capacity
  human_prospect_reviews_per_day INTEGER NOT NULL DEFAULT 10,
  human_site_reviews_per_day INTEGER NOT NULL DEFAULT 10,
  human_sales_responses_per_day INTEGER NOT NULL DEFAULT 20,
  human_client_launches_per_week INTEGER NOT NULL DEFAULT 2,
  -- Production State
  production_outreach_confirmed BOOLEAN NOT NULL DEFAULT false,
  production_outreach_confirmed_at TIMESTAMPTZ,
  production_outreach_confirmed_by TEXT,
  emergency_stop_active BOOLEAN NOT NULL DEFAULT false,
  emergency_stop_reason TEXT,
  emergency_stop_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO ai_auto_operating_config (id) VALUES ('00000000-0000-0000-0000-000000000001') ON CONFLICT DO NOTHING;

-- 2. Rollout Cohorts
CREATE TABLE IF NOT EXISTS rollout_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  environment TEXT NOT NULL DEFAULT 'TEST' CHECK (environment IN ('TEST','PILOT','CONTROLLED_PRODUCTION','SCALED_PRODUCTION')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','ready','running','paused','completed','failed','cancelled')),
  target_profile_id TEXT,
  target_sectors TEXT[],
  target_locations TEXT[],
  min_opportunity_score INTEGER NOT NULL DEFAULT 70,
  min_business_strength_score INTEGER NOT NULL DEFAULT 60,
  max_prospects INTEGER NOT NULL DEFAULT 10,
  max_qualified INTEGER NOT NULL DEFAULT 8,
  max_approved INTEGER NOT NULL DEFAULT 6,
  max_sites_generated INTEGER NOT NULL DEFAULT 6,
  max_outreach_sent INTEGER NOT NULL DEFAULT 6,
  daily_ai_budget_limit DECIMAL(8,2) NOT NULL DEFAULT 5.00,
  total_ai_budget_limit DECIMAL(8,2) NOT NULL DEFAULT 30.00,
  email_send_limit INTEGER NOT NULL DEFAULT 6,
  outcome_observation_days INTEGER NOT NULL DEFAULT 30,
  started_at TIMESTAMPTZ,
  operationally_completed_at TIMESTAMPTZ,
  outcome_matured_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by TEXT NOT NULL DEFAULT 'Pete Currey',
  notes TEXT,
  post_mortem_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Autonomy Gate Policies
CREATE TABLE IF NOT EXISTS autonomy_gate_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID REFERENCES rollout_cohorts(id) ON DELETE CASCADE,
  gate_key TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'MANUAL' CHECK (mode IN ('MANUAL','ASSISTED','CONTROLLED_AUTO','AUTO')),
  criteria JSONB NOT NULL DEFAULT '{}'::JSONB,
  version INTEGER NOT NULL DEFAULT 1,
  previous_mode TEXT,
  changed_by TEXT NOT NULL DEFAULT 'Pete Currey',
  change_reason TEXT,
  cohort_evidence JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Production Defects
CREATE TABLE IF NOT EXISTS production_defects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID REFERENCES rollout_cohorts(id) ON DELETE SET NULL,
  prospect_id UUID,
  system TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (severity IN ('CRITICAL','HIGH','MEDIUM','LOW')),
  category TEXT NOT NULL CHECK (category IN ('DATA','PROMPT','MODEL','CODE','PROVIDER','CONFIGURATION','HUMAN_ERROR','UNKNOWN')),
  defect_type TEXT NOT NULL,
  description TEXT NOT NULL,
  detected_by TEXT NOT NULL DEFAULT 'human',
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','investigating','resolved','wont_fix')),
  resolution TEXT,
  auto_pause_triggered BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 5. Production Change Log
CREATE TABLE IF NOT EXISTS production_change_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID REFERENCES rollout_cohorts(id) ON DELETE SET NULL,
  change_type TEXT NOT NULL CHECK (change_type IN (
    'MODE_CHANGE','MODEL_CHANGE','PROMPT_CHANGE','SCORE_CHANGE',
    'TARGET_CHANGE','EMAIL_CHANGE','AUTONOMY_CHANGE','VOLUME_CHANGE',
    'COHORT_PAUSE','COHORT_RESUME','COHORT_STOP','BUDGET_CHANGE',
    'SAFETY_PAUSE','SAFETY_RESUME','GATE_ROLLBACK','EMERGENCY_STOP'
  )),
  description TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  changed_by TEXT NOT NULL DEFAULT 'Pete Currey',
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Mailbox Configs
CREATE TABLE IF NOT EXISTS mailbox_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mailbox_type TEXT NOT NULL CHECK (mailbox_type IN ('OUTREACH','TRANSACTIONAL','REPLY_INBOX')),
  name TEXT NOT NULL,
  from_name TEXT NOT NULL,
  from_email TEXT NOT NULL,
  reply_to TEXT,
  sending_domain TEXT NOT NULL,
  daily_send_limit INTEGER NOT NULL DEFAULT 20,
  status TEXT NOT NULL DEFAULT 'unconfigured' CHECK (status IN ('unconfigured','warming','active','paused','suspended')),
  is_production BOOLEAN NOT NULL DEFAULT false,
  warm_up_day INTEGER,
  provider TEXT NOT NULL DEFAULT 'unset',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Review Sessions
CREATE TABLE IF NOT EXISTS review_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID REFERENCES rollout_cohorts(id) ON DELETE SET NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('PROSPECT_REVIEW','SITE_REVIEW','OUTREACH_REVIEW')),
  started_by TEXT NOT NULL DEFAULT 'Pete Currey',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  total_items INTEGER NOT NULL DEFAULT 0,
  approved INTEGER NOT NULL DEFAULT 0,
  rejected INTEGER NOT NULL DEFAULT 0,
  revised INTEGER NOT NULL DEFAULT 0,
  skipped INTEGER NOT NULL DEFAULT 0,
  scout_quality_rating INTEGER CHECK (scout_quality_rating BETWEEN 1 AND 5),
  design_quality_rating INTEGER CHECK (design_quality_rating BETWEEN 1 AND 5),
  email_quality_rating INTEGER CHECK (email_quality_rating BETWEEN 1 AND 5),
  system_confidence_rating INTEGER CHECK (system_confidence_rating BETWEEN 1 AND 5),
  session_notes TEXT
);

-- 8. Cohort Prospect Lineage
CREATE TABLE IF NOT EXISTS cohort_prospect_lineage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID NOT NULL REFERENCES rollout_cohorts(id) ON DELETE CASCADE,
  prospect_id UUID NOT NULL,
  discovered_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  qualified_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  researched_at TIMESTAMPTZ,
  designed_at TIMESTAMPTZ,
  generated_at TIMESTAMPTZ,
  qa_passed_at TIMESTAMPTZ,
  outreach_approved_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  preview_viewed_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  opportunity_at TIMESTAMPTZ,
  client_at TIMESTAMPTZ,
  design_sendability TEXT CHECK (design_sendability IN ('SENDABLE','NEEDS_WORK','UNSENDABLE')),
  design_rejection_reason TEXT,
  outreach_edit_distance TEXT CHECK (outreach_edit_distance IN ('UNCHANGED','MINOR_EDIT','MAJOR_EDIT','REWRITTEN')),
  scout_human_rejected BOOLEAN DEFAULT false,
  scout_rejection_reason TEXT,
  ai_cost_discovery DECIMAL(8,4) DEFAULT 0,
  ai_cost_research DECIMAL(8,4) DEFAULT 0,
  ai_cost_generation DECIMAL(8,4) DEFAULT 0,
  ai_cost_qa DECIMAL(8,4) DEFAULT 0,
  ai_cost_total DECIMAL(8,4) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Cohort Events Timeline
CREATE TABLE IF NOT EXISTS cohort_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID NOT NULL REFERENCES rollout_cohorts(id) ON DELETE CASCADE,
  prospect_id UUID,
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  actor TEXT NOT NULL DEFAULT 'system',
  metadata JSONB DEFAULT '{}'::JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
