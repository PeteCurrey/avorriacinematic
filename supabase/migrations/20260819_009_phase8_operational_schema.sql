-- ============================================================
-- AVORRIA ADMIN — PHASE 8: OPERATIONAL SYSTEMS SCHEMA
-- Migration: 20260819_009_phase8_operational_schema.sql
-- ============================================================

-- 1. CMS Pages & Versions
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','scheduled','published','archived')),
  page_type TEXT NOT NULL DEFAULT 'standard',
  template TEXT NOT NULL DEFAULT 'default',
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  social_title TEXT,
  social_description TEXT,
  social_image_id UUID,
  noindex BOOLEAN NOT NULL DEFAULT false,
  published_version_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_page_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  content JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  publication_status TEXT NOT NULL DEFAULT 'draft',
  notes TEXT
);

-- 2. CMS Global & Navigation
CREATE TABLE IF NOT EXISTS cms_globals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::JSONB,
  updated_by TEXT NOT NULL DEFAULT 'system',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_location TEXT NOT NULL DEFAULT 'primary' CHECK (menu_location IN ('primary','footer','mobile')),
  label TEXT NOT NULL,
  destination TEXT NOT NULL,
  is_external BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  parent_id UUID REFERENCES cms_navigation_items(id) ON DELETE CASCADE,
  visibility BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Media Assets
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image','video','document')),
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  file_size INTEGER NOT NULL DEFAULT 0,
  alt_text TEXT,
  caption TEXT,
  source TEXT,
  rights TEXT,
  photographer_creator TEXT,
  usage_notes TEXT,
  focal_point_x DECIMAL(3,2) DEFAULT 0.50,
  focal_point_y DECIMAL(3,2) DEFAULT 0.50,
  created_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','published','archived')),
  sector TEXT NOT NULL,
  location TEXT,
  short_summary TEXT NOT NULL,
  challenge TEXT NOT NULL,
  strategy TEXT NOT NULL,
  solution TEXT NOT NULL,
  outcome TEXT NOT NULL,
  hero_media_id UUID,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  metrics JSONB DEFAULT '[]'::JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Insights / Content Hub
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'article' CHECK (content_type IN ('article','guide','opinion','project_note','news','research')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','scheduled','published','archived')),
  author_id TEXT NOT NULL DEFAULT 'system',
  hero_media_id UUID,
  topics TEXT[] DEFAULT ARRAY[]::TEXT[],
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  social_image_id UUID,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SEO Audit Runs, Issues & Redirects
CREATE TABLE IF NOT EXISTS seo_audit_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  pages_crawled INTEGER NOT NULL DEFAULT 0,
  critical_issues INTEGER NOT NULL DEFAULT 0,
  warnings INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running','completed','failed'))
);

CREATE TABLE IF NOT EXISTS seo_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_run_id UUID REFERENCES seo_audit_runs(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('CRITICAL','HIGH','MEDIUM','LOW','INFO')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','resolved','ignored')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL UNIQUE,
  destination TEXT NOT NULL,
  status_code INTEGER NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  active BOOLEAN NOT NULL DEFAULT true,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Inbound Leads
CREATE TABLE IF NOT EXISTS inbound_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  service_interest TEXT,
  budget_range TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'website_form',
  landing_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewed','qualified','contacted','converted_to_opportunity','not_qualified','spam','archived')),
  lead_score INTEGER DEFAULT 50,
  assigned_to TEXT,
  sales_opportunity_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Team & Roles
CREATE TABLE IF NOT EXISTS admin_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('super_admin','admin','sales','designer','developer','content_editor')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','invited','disabled')),
  invited_at TIMESTAMPTZ,
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Admin Notifications
CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'NORMAL' CHECK (severity IN ('CRITICAL','HIGH','NORMAL','LOW')),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  read_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
