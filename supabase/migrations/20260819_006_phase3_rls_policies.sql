-- ============================================================
-- AVORRIA ADMIN — PHASE 3: CREATIVE DIRECTOR RLS POLICIES
-- Migration: 20260819_006_phase3_rls_policies.sql
-- ============================================================

ALTER TABLE creative_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE preview_links ENABLE ROW LEVEL SECURITY;

-- Admin-only for all internal tables
DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['creative_briefs','site_strategies','site_projects','site_versions','design_reviews','site_media'] LOOP
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text))',
      tbl, tbl
    );
  END LOOP;
END $$;

-- Preview links: allow public SELECT via token (for prospect preview pages)
CREATE POLICY "admin_all_preview_links" ON preview_links
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text));

CREATE POLICY "public_read_preview_links" ON preview_links
  FOR SELECT TO anon
  USING (status = 'active' AND (expires_at IS NULL OR expires_at > NOW()));
