-- ==============================================================================
-- AVORRIA ADMIN OS: ROW-LEVEL SECURITY POLICIES (Phase 1)
-- Migration: 20260819_002_rls_policies.sql
-- Description: Enforces Row-Level Security across all internal admin tables.
--              Disallows any anonymous/public access. Requires verified admin role.
-- ==============================================================================

-- Enable RLS on all internal tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_auto_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an active admin
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current authenticated user has super_admin role
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid() AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. admin_users policies
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Super admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (is_super_admin());

-- 2. businesses policies
CREATE POLICY "Admins have full access to businesses"
  ON businesses FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- 3. prospect_assessments policies
CREATE POLICY "Admins have full access to assessments"
  ON prospect_assessments FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- 4. prospects policies
CREATE POLICY "Admins have full access to prospects"
  ON prospects FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- 5. automation_jobs policies
CREATE POLICY "Admins have full access to automation_jobs"
  ON automation_jobs FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- 6. audit_events policies
CREATE POLICY "Admins can view audit events"
  ON audit_events FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can insert audit events"
  ON audit_events FOR INSERT
  TO authenticated
  WITH CHECK (is_admin_user());

-- 7. ai_auto_settings policies
CREATE POLICY "Admins can view settings"
  ON ai_auto_settings FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can update settings"
  ON ai_auto_settings FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());
