-- ============================================================
-- AVORRIA ADMIN — PHASE 12: PROPOSALS & PAYMENTS RLS POLICIES
-- Migration: 20260819_016_phase12_proposals_rls_policies.sql
--
-- Proposal tables are admin-only. The client-facing view at
-- /proposal/[token] is served by a server route using the service role and
-- scoped to a single token — the anon key must never be able to enumerate
-- proposals, read another client's commercials, or see contact details.
-- ============================================================

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_webhook_events ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['proposals','proposal_events','payment_webhook_events'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "admin_only_%s" ON %I', tbl, tbl);
    EXECUTE format(
      'CREATE POLICY "admin_only_%s" ON %I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text))',
      tbl, tbl
    );
  END LOOP;
END $$;

-- No anon policy is defined on purpose: with RLS enabled and no permissive
-- policy, the anon role reads nothing. Client access goes exclusively through
-- the server route, which looks a proposal up by its single opaque token.
