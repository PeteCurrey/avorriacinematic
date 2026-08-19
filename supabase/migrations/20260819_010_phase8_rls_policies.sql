-- ============================================================
-- AVORRIA ADMIN — PHASE 8: RLS POLICIES
-- Migration: 20260819_010_phase8_rls_policies.sql
-- ============================================================

ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_page_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_globals ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audit_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbound_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'cms_pages','cms_page_versions','cms_globals','cms_navigation_items',
    'media_assets','case_studies','insights','seo_audit_runs','seo_issues',
    'seo_redirects','inbound_leads','admin_team_members','admin_notifications'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text))',
      tbl, tbl
    );
  END LOOP;
END $$;
