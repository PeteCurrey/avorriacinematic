-- ============================================================
-- AVORRIA ADMIN — PHASE 9: FINANCE RLS POLICIES
-- Migration: 20260819_012_phase9_finance_rls_policies.sql
-- ============================================================

ALTER TABLE financial_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE forecast_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE executive_anomalies ENABLE ROW LEVEL SECURITY;
ALTER TABLE executive_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_cost_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_entities ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'financial_events','business_targets','forecast_snapshots',
    'executive_anomalies','executive_decisions','internal_cost_rates','business_entities'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text))',
      tbl, tbl
    );
  END LOOP;
END $$;
