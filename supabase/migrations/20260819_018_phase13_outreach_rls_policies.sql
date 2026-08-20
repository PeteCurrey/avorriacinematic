-- ============================================================
-- AVORRIA ADMIN — PHASE 13: OUTREACH RLS POLICIES
-- Migration: 20260819_018_phase13_outreach_rls_policies.sql
--
-- Outreach tables hold third-party business contact details and the full
-- text of messages sent to them. Admin-only, no anon policy. Webhook
-- routes reach these tables through the service role, which bypasses RLS.
-- ============================================================

ALTER TABLE outreach_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_enrolments ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_delivery_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_replies ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'outreach_sequences','outreach_sequence_steps','outreach_enrolments',
    'outreach_messages','outreach_delivery_events','outreach_replies'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "admin_only_%s" ON %I', tbl, tbl);
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text))',
      tbl, tbl
    );
  END LOOP;
END $$;
