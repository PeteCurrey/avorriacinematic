-- ============================================================
-- AVORRIA ADMIN — PHASE 3: CREATIVE DIRECTOR & WEBSITE FACTORY
-- Migration: 20260819_005_phase3_creative_schema.sql
-- ============================================================

-- Creative Briefs (Claude Creative Director output)
CREATE TABLE IF NOT EXISTS creative_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL,
  business_id UUID NOT NULL,
  research_id UUID,
  version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','approved','superseded','archived')),
  provider TEXT NOT NULL DEFAULT 'anthropic',
  model TEXT,
  prompt_version TEXT,
  strategy_summary TEXT,
  positioning TEXT,
  primary_objective TEXT,
  target_audience JSONB DEFAULT '[]'::JSONB,
  tone JSONB DEFAULT '[]'::JSONB,
  visual_direction JSONB DEFAULT '{}'::JSONB,
  photography_direction JSONB DEFAULT '{}'::JSONB,
  typography_direction JSONB DEFAULT '{}'::JSONB,
  colour_strategy JSONB DEFAULT '{}'::JSONB,
  layout_direction TEXT,
  interaction_direction JSONB DEFAULT '[]'::JSONB,
  animation_direction JSONB DEFAULT '[]'::JSONB,
  hero_concept JSONB DEFAULT '{}'::JSONB,
  narrative_flow TEXT,
  trust_strategy JSONB DEFAULT '[]'::JSONB,
  conversion_strategy JSONB DEFAULT '[]'::JSONB,
  recommended_pages JSONB DEFAULT '[]'::JSONB,
  homepage_sections JSONB DEFAULT '[]'::JSONB,
  recommended_features JSONB DEFAULT '[]'::JSONB,
  avoid_list JSONB DEFAULT '[]'::JSONB,
  implementation_notes TEXT,
  confidence DECIMAL(3,2),
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site Strategies (buildable information architecture)
CREATE TABLE IF NOT EXISTS site_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL,
  creative_brief_id UUID REFERENCES creative_briefs(id) ON DELETE SET NULL,
  version INTEGER NOT NULL DEFAULT 1,
  provider TEXT,
  model TEXT,
  prompt_version TEXT,
  primary_conversion_goal TEXT,
  secondary_conversion_goals JSONB DEFAULT '[]'::JSONB,
  navigation JSONB DEFAULT '[]'::JSONB,
  page_map JSONB DEFAULT '[]'::JSONB,
  homepage_strategy JSONB DEFAULT '{}'::JSONB,
  page_strategies JSONB DEFAULT '[]'::JSONB,
  feature_strategy JSONB DEFAULT '[]'::JSONB,
  content_strategy TEXT,
  seo_considerations JSONB DEFAULT '[]'::JSONB,
  mobile_strategy TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site Projects (one per prospect site)
CREATE TABLE IF NOT EXISTS site_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL,
  business_id UUID NOT NULL,
  creative_brief_id UUID REFERENCES creative_briefs(id) ON DELETE SET NULL,
  site_strategy_id UUID REFERENCES site_strategies(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'strategy' CHECK (status IN ('strategy','generating','generated','needs_review','revision_requested','ready_for_qa','qa','preview_ready','archived')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  current_version_id UUID,
  preview_status TEXT DEFAULT 'none' CHECK (preview_status IN ('none','generating','live','error')),
  ai_cost_total DECIMAL(10,4) DEFAULT 0,
  auto_revision_count INTEGER DEFAULT 0,
  max_auto_revisions INTEGER DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site Versions (immutable, versioned snapshots)
CREATE TABLE IF NOT EXISTS site_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_project_id UUID NOT NULL REFERENCES site_projects(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  source_type TEXT NOT NULL CHECK (source_type IN ('generated','revised','manual','restored')),
  configuration JSONB DEFAULT '{}'::JSONB,
  content JSONB DEFAULT '{}'::JSONB,
  design_tokens JSONB DEFAULT '{}'::JSONB,
  page_definitions JSONB DEFAULT '[]'::JSONB,
  component_definitions JSONB DEFAULT '[]'::JSONB,
  generated_code_reference TEXT,
  provider TEXT,
  model TEXT,
  prompt_version TEXT,
  generation_status TEXT DEFAULT 'pending' CHECK (generation_status IN ('pending','generating','complete','failed')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL DEFAULT 'system'
);

-- Design Reviews (Claude visual critique)
CREATE TABLE IF NOT EXISTS design_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_project_id UUID NOT NULL REFERENCES site_projects(id) ON DELETE CASCADE,
  site_version_id UUID REFERENCES site_versions(id) ON DELETE SET NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_version TEXT,
  overall_score INTEGER,
  visual_score INTEGER,
  hierarchy_score INTEGER,
  typography_score INTEGER,
  imagery_score INTEGER,
  brand_score INTEGER,
  conversion_score INTEGER,
  mobile_score INTEGER,
  originality_score INTEGER,
  ai_slop_score INTEGER,
  issues JSONB DEFAULT '[]'::JSONB,
  recommendations JSONB DEFAULT '[]'::JSONB,
  auto_revision_applied BOOLEAN DEFAULT false,
  passed_threshold BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Preview Links (secure shareable prospect links)
CREATE TABLE IF NOT EXISTS preview_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_project_id UUID NOT NULL REFERENCES site_projects(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','expired','revoked')),
  expires_at TIMESTAMPTZ,
  presentation_mode BOOLEAN NOT NULL DEFAULT true,
  first_viewed_at TIMESTAMPTZ,
  last_viewed_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

-- Site Media Library
CREATE TABLE IF NOT EXISTS site_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_project_id UUID REFERENCES site_projects(id) ON DELETE CASCADE,
  business_id UUID,
  source_type TEXT NOT NULL CHECK (source_type IN ('business_website','social','stock','generated','manual_upload','placeholder')),
  source_url TEXT,
  storage_path TEXT,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image','video','logo','icon','background')),
  width INTEGER,
  height INTEGER,
  quality_score INTEGER,
  usage_status TEXT DEFAULT 'available' CHECK (usage_status IN ('available','hero','gallery','service','background','logo','archived')),
  rights_notes TEXT,
  alt_text TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add Phase 3 columns to existing prospect / business tables
ALTER TABLE prospects
  ADD COLUMN IF NOT EXISTS site_project_id UUID REFERENCES site_projects(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS research_id UUID,
  ADD COLUMN IF NOT EXISTS creative_brief_id UUID REFERENCES creative_briefs(id) ON DELETE SET NULL;
