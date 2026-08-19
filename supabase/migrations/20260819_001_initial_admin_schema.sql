-- ==============================================================================
-- AVORRIA ADMIN OS: CORE SCHEMA (Phase 1)
-- Migration: 20260819_001_initial_admin_schema.sql
-- Description: Core tables for Admin OS, AI Auto client acquisition engine,
--              opportunity scoring, job queue, and audit trails.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN USERS & ROLES
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'sales', 'designer', 'developer', 'content_editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BUSINESSES (Discovered & Ingested Entities)
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  legal_name TEXT,
  slug TEXT UNIQUE NOT NULL,
  website_url TEXT,
  domain TEXT,
  phone TEXT,
  primary_email TEXT,
  address_line_1 TEXT,
  address_line_2 TEXT,
  city TEXT,
  county_region TEXT,
  postcode TEXT,
  country TEXT NOT NULL DEFAULT 'GB',
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  sector TEXT NOT NULL,
  sub_sector TEXT,
  business_description TEXT,
  google_business_url TEXT,
  google_rating NUMERIC(3, 2),
  google_review_count INTEGER DEFAULT 0,
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  company_number TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'dormant', 'dissolved', 'unknown')),
  source TEXT NOT NULL DEFAULT 'manual',
  source_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_businesses_sector ON businesses(sector);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
CREATE INDEX IF NOT EXISTS idx_businesses_domain ON businesses(domain);

-- 3. PROSPECT ASSESSMENTS (Heuristic & AI Evaluation Snapshot)
CREATE TABLE IF NOT EXISTS prospect_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  assessment_version TEXT NOT NULL DEFAULT 'v1-heuristic',
  assessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  website_quality_score INTEGER NOT NULL CHECK (website_quality_score BETWEEN 0 AND 100),
  visual_quality_score INTEGER NOT NULL CHECK (visual_quality_score BETWEEN 0 AND 100),
  mobile_score INTEGER NOT NULL CHECK (mobile_score BETWEEN 0 AND 100),
  seo_score INTEGER NOT NULL CHECK (seo_score BETWEEN 0 AND 100),
  conversion_score INTEGER NOT NULL CHECK (conversion_score BETWEEN 0 AND 100),
  trust_score INTEGER NOT NULL CHECK (trust_score BETWEEN 0 AND 100),
  business_quality_score INTEGER NOT NULL CHECK (business_quality_score BETWEEN 0 AND 100),
  commercial_value_score INTEGER NOT NULL CHECK (commercial_value_score BETWEEN 0 AND 100),
  opportunity_score INTEGER NOT NULL CHECK (opportunity_score BETWEEN 0 AND 100),
  opportunity_band TEXT NOT NULL CHECK (opportunity_band IN ('PRIORITY', 'GOOD', 'SECONDARY', 'LOW')),
  estimated_website_age TEXT,
  website_platform TEXT,
  has_ssl BOOLEAN NOT NULL DEFAULT true,
  mobile_friendly BOOLEAN NOT NULL DEFAULT true,
  has_online_booking BOOLEAN NOT NULL DEFAULT false,
  has_contact_form BOOLEAN NOT NULL DEFAULT false,
  has_live_chat BOOLEAN NOT NULL DEFAULT false,
  has_google_reviews BOOLEAN NOT NULL DEFAULT false,
  has_clear_cta BOOLEAN NOT NULL DEFAULT false,
  has_structured_data BOOLEAN NOT NULL DEFAULT false,
  has_recent_content BOOLEAN NOT NULL DEFAULT false,
  identified_problems JSONB NOT NULL DEFAULT '[]'::jsonb,
  identified_opportunities JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommended_features JSONB NOT NULL DEFAULT '[]'::jsonb,
  competitor_notes TEXT,
  ai_summary TEXT NOT NULL,
  ai_reasoning_summary TEXT NOT NULL,
  model_provider TEXT NOT NULL DEFAULT 'heuristic-engine',
  model_name TEXT NOT NULL DEFAULT 'v1-rule-engine',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessments_business_id ON prospect_assessments(business_id);
CREATE INDEX IF NOT EXISTS idx_assessments_opp_score ON prospect_assessments(opportunity_score DESC);

-- 4. PROSPECTS (Acquisition Workflow Entities)
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  current_assessment_id UUID REFERENCES prospect_assessments(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'discovered' CHECK (status IN (
    'discovered', 'analysing', 'qualified', 'awaiting_review', 'approved',
    'rejected', 'watch', 'research_requested', 'researching', 'research_complete',
    'build_queued', 'building', 'qa', 'preview_ready', 'outreach_queued',
    'contacted', 'engaged', 'replied', 'opportunity', 'won', 'lost', 'suppressed'
  )),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  opportunity_score INTEGER NOT NULL DEFAULT 0,
  assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  review_status TEXT NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'watch', 'research_requested')),
  reviewed_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  approval_notes TEXT,
  rejection_reason TEXT,
  research_status TEXT,
  next_action TEXT,
  next_action_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_review_status ON prospects(review_status);
CREATE INDEX IF NOT EXISTS idx_prospects_opportunity_score ON prospects(opportunity_score DESC);

-- 5. AUTOMATION JOBS (Asynchronous Task Queue)
CREATE TABLE IF NOT EXISTS automation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_type TEXT NOT NULL CHECK (job_type IN (
    'discover_businesses', 'analyse_business', 'score_prospect',
    'prospect_additional_research', 'prospect_deep_research', 'create_strategy',
    'generate_site', 'run_qa', 'publish_preview', 'prepare_outreach',
    'send_outreach', 'process_reply', 'schedule_followup'
  )),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled', 'waiting_for_human')),
  priority INTEGER NOT NULL DEFAULT 10,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  scheduled_for TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  error_code TEXT,
  error_message TEXT,
  created_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_automation_jobs_status ON automation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_type ON automation_jobs(job_type);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_scheduled ON automation_jobs(scheduled_for);

-- 6. AUDIT EVENTS (Explainable, Immutable Action Log)
CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_type TEXT NOT NULL CHECK (actor_type IN ('user', 'agent', 'system')),
  actor_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  actor_agent TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  summary TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_events_entity ON audit_events(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_created_at ON audit_events(created_at DESC);

-- 7. AI AUTO SETTINGS
CREATE TABLE IF NOT EXISTS ai_auto_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  settings_key TEXT UNIQUE NOT NULL DEFAULT 'global',
  targeting JSONB NOT NULL DEFAULT '{
    "countries": ["GB"],
    "cities": ["London", "Manchester", "Birmingham", "Leeds", "Bristol"],
    "radius_km": 50,
    "sectors": ["Architects", "Commercial Real Estate", "Luxury Hospitality", "Aviation", "Specialist Engineering", "Law Firms", "High-End Medical"],
    "excluded_sectors": ["Gambling", "Adult", "Cryptocurrency Speculation"],
    "min_opportunity_score": 70,
    "min_google_rating": 4.0,
    "min_review_count": 5,
    "businesses_per_day_target": 25
  }'::jsonb,
  review_settings JSONB NOT NULL DEFAULT '{
    "require_prospect_approval": true,
    "require_website_approval_before_outreach": true
  }'::jsonb,
  autopilot_mode TEXT NOT NULL DEFAULT 'ASSISTED' CHECK (autopilot_mode IN ('ASSISTED', 'FULL_AUTOPILOT')),
  updated_by TEXT NOT NULL DEFAULT 'system',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
