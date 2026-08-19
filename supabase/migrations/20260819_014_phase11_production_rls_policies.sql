-- ============================================================
-- AVORRIA ADMIN — PHASE 11: PRODUCTION RLS POLICIES
-- Migration: 20260819_014_phase11_production_rls_policies.sql
-- ============================================================

ALTER TABLE ai_auto_operating_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE rollout_cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE autonomy_gate_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_defects ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_change_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailbox_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_prospect_lineage ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_events ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'ai_auto_operating_config','rollout_cohorts','autonomy_gate_policies',
    'production_defects','production_change_log','mailbox_configs',
    'review_sessions','cohort_prospect_lineage','cohort_events'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text))',
      tbl, tbl
    );
  END LOOP;
END $$;
