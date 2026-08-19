-- ============================================================
-- AVORRIA ADMIN — PHASE 2: AI SCOUT SCHEMA
-- Migration: 20260819_003_ai_scout_schema.sql
-- ============================================================

-- AI Task Configuration
CREATE TABLE IF NOT EXISTS ai_task_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_key TEXT NOT NULL UNIQUE,
  provider TEXT NOT NULL CHECK (provider IN ('openai', 'anthropic')),
  model TEXT NOT NULL,
  reasoning_effort TEXT CHECK (reasoning_effort IN ('low', 'medium', 'high')),
  enabled BOOLEAN NOT NULL DEFAULT true,
  fallback_provider TEXT CHECK (fallback_provider IN ('openai', 'anthropic')),
  fallback_model TEXT,
  temperature DECIMAL(3,2),
  max_output_tokens INTEGER,
  timeout_seconds INTEGER NOT NULL DEFAULT 60,
  max_retries INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI Usage Events
CREATE TABLE IF NOT EXISTS ai_usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  task_key TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  automation_job_id UUID,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  cached_tokens INTEGER DEFAULT 0,
  search_calls INTEGER DEFAULT 0,
  latency_ms INTEGER NOT NULL DEFAULT 0,
  success BOOLEAN NOT NULL DEFAULT true,
  error_code TEXT,
  estimated_cost DECIMAL(10,6) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scout Targeting Profiles
CREATE TABLE IF NOT EXISTS targeting_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  countries TEXT[] NOT NULL DEFAULT ARRAY['GB'],
  regions TEXT[] DEFAULT ARRAY[]::TEXT[],
  cities TEXT[] DEFAULT ARRAY[]::TEXT[],
  postcode_areas TEXT[] DEFAULT ARRAY[]::TEXT[],
  radius_km INTEGER DEFAULT 50,
  sectors TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  sub_sectors TEXT[] DEFAULT ARRAY[]::TEXT[],
  excluded_sectors TEXT[] DEFAULT ARRAY[]::TEXT[],
  excluded_domains TEXT[] DEFAULT ARRAY[]::TEXT[],
  min_google_rating DECIMAL(2,1) DEFAULT 3.5,
  min_review_count INTEGER DEFAULT 3,
  max_website_quality_score INTEGER DEFAULT 65,
  min_opportunity_score INTEGER DEFAULT 60,
  max_prospects_per_run INTEGER DEFAULT 50,
  max_qualified_per_day INTEGER DEFAULT 20,
  max_search_operations INTEGER DEFAULT 15,
  max_ai_spend_per_run DECIMAL(10,4) DEFAULT 2.00,
  max_daily_ai_spend DECIMAL(10,4) DEFAULT 10.00,
  priority INTEGER DEFAULT 5,
  notes TEXT,
  last_run_at TIMESTAMPTZ,
  last_run_status TEXT,
  created_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scout Runs
CREATE TABLE IF NOT EXISTS scout_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  targeting_profile_id UUID REFERENCES targeting_profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','running','completed','completed_with_errors','failed','cancelled')),
  test_mode BOOLEAN NOT NULL DEFAULT false,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  businesses_found INTEGER DEFAULT 0,
  businesses_new INTEGER DEFAULT 0,
  businesses_duplicate INTEGER DEFAULT 0,
  businesses_verified INTEGER DEFAULT 0,
  websites_analysed INTEGER DEFAULT 0,
  prospects_qualified INTEGER DEFAULT 0,
  prospects_rejected INTEGER DEFAULT 0,
  ai_cost_estimate DECIMAL(10,4) DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  error_log JSONB DEFAULT '[]'::JSONB,
  triggered_by TEXT NOT NULL DEFAULT 'manual',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Business Source Provenance
CREATE TABLE IF NOT EXISTS business_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL,
  source_type TEXT NOT NULL,
  source_url TEXT,
  source_name TEXT,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confidence DECIMAL(3,2),
  raw_reference TEXT,
  metadata JSONB DEFAULT '{}'::JSONB
);

-- Business Suppressions
CREATE TABLE IF NOT EXISTS business_suppressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT,
  company_name_pattern TEXT,
  reason TEXT NOT NULL,
  suppressed_by TEXT NOT NULL DEFAULT 'system',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Website Captures (screenshots)
CREATE TABLE IF NOT EXISTS website_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL,
  url TEXT NOT NULL,
  viewport TEXT NOT NULL CHECK (viewport IN ('desktop', 'mobile')),
  storage_path TEXT,
  captured_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'captured', 'not_configured', 'failed')),
  error_message TEXT,
  width INTEGER,
  height INTEGER
);

-- Business Research (deep research for approved prospects -> Phase 3 Creative Director)
CREATE TABLE IF NOT EXISTS business_research (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL,
  prospect_id UUID,
  research_version INTEGER NOT NULL DEFAULT 1,
  company_summary TEXT,
  positioning TEXT,
  services JSONB DEFAULT '[]'::JSONB,
  service_areas JSONB DEFAULT '[]'::JSONB,
  target_customers TEXT,
  differentiators JSONB DEFAULT '[]'::JSONB,
  reputation_summary TEXT,
  reviews_summary TEXT,
  brand_observations TEXT,
  logo_assets JSONB DEFAULT '[]'::JSONB,
  brand_colours JSONB DEFAULT '[]'::JSONB,
  typography_observations TEXT,
  contact_information JSONB DEFAULT '{}'::JSONB,
  social_profiles JSONB DEFAULT '{}'::JSONB,
  accreditations JSONB DEFAULT '[]'::JSONB,
  team_information JSONB DEFAULT '[]'::JSONB,
  opening_hours JSONB DEFAULT '{}'::JSONB,
  frequently_asked_questions JSONB DEFAULT '[]'::JSONB,
  key_claims JSONB DEFAULT '[]'::JSONB,
  content_sources JSONB DEFAULT '[]'::JSONB,
  competitor_context TEXT,
  recommended_site_features JSONB DEFAULT '[]'::JSONB,
  potential_conversion_improvements JSONB DEFAULT '[]'::JSONB,
  unresolved_questions JSONB DEFAULT '[]'::JSONB,
  confidence DECIMAL(3,2),
  researched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  provider TEXT,
  model TEXT,
  prompt_version TEXT,
  assessment_schema_version TEXT,
  scoring_version TEXT
);

-- Extend prospect_assessments with Phase 2 fields
ALTER TABLE prospect_assessments
  ADD COLUMN IF NOT EXISTS digital_reputation_gap_score INTEGER,
  ADD COLUMN IF NOT EXISTS assessment_confidence INTEGER,
  ADD COLUMN IF NOT EXISTS scout_recommendation TEXT CHECK (scout_recommendation IN ('STRONG_TARGET','TARGET','MAYBE','DO_NOT_TARGET')),
  ADD COLUMN IF NOT EXISTS recommendation_reason TEXT,
  ADD COLUMN IF NOT EXISTS scoring_version TEXT DEFAULT 'v1_heuristic',
  ADD COLUMN IF NOT EXISTS prompt_version TEXT,
  ADD COLUMN IF NOT EXISTS scout_run_id UUID,
  ADD COLUMN IF NOT EXISTS screenshot_desktop_path TEXT,
  ADD COLUMN IF NOT EXISTS screenshot_mobile_path TEXT;

-- Extend prospects
ALTER TABLE prospects
  ADD COLUMN IF NOT EXISTS scout_run_id UUID,
  ADD COLUMN IF NOT EXISTS not_qualified_reason TEXT,
  ADD COLUMN IF NOT EXISTS ai_cost_estimate DECIMAL(10,6);

-- Extend automation_jobs
ALTER TABLE automation_jobs
  ADD COLUMN IF NOT EXISTS scout_run_id UUID;

-- System Settings (key-value for AI Auto pause state etc.)
CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_by TEXT NOT NULL DEFAULT 'system',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO system_settings (key, value) VALUES ('ai_auto_paused', 'false') ON CONFLICT (key) DO NOTHING;
