-- ============================================================
-- AVORRIA ADMIN — PHASE 2: AI SCOUT RLS POLICIES
-- Migration: 20260819_004_scout_rls_policies.sql
-- ============================================================

ALTER TABLE ai_task_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE targeting_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scout_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_suppressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Admin-only access for all Phase 2 tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'ai_task_configs', 'ai_usage_events', 'targeting_profiles', 'scout_runs',
    'business_sources', 'business_suppressions', 'website_captures',
    'business_research', 'system_settings'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text)
      )',
      tbl, tbl
    );
  END LOOP;
END
$$;
