-- ============================================================
-- AVORRIA ADMIN — PHASE 7: RLS POLICIES
-- Migration: 20260819_008_phase7_rls_policies.sql
-- ============================================================

ALTER TABLE prospect_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiment_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiment_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimisation_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimisation_playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE scoring_shadow_evaluations ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'prospect_outcomes','experiments','experiment_variants','experiment_assignments',
    'optimisation_recommendations','optimisation_playbooks','scoring_shadow_evaluations'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text))',
      tbl, tbl
    );
  END LOOP;
END $$;
