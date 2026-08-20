-- ============================================================
-- AVORRIA ADMIN — PHASE 12: PROPOSALS, DEPOSITS & HUMAN HANDOVER
-- Migration: 20260819_015_phase12_proposals_payments_schema.sql
--
-- The handover point of the AI Auto pipeline. Everything upstream is
-- autonomous; a signed proposal and a paid deposit are where a real
-- commercial commitment exists and a human takes ownership.
--
-- Money is stored in MINOR UNITS (pence) as BIGINT. Never floats.
-- No card data, payment credential or raw webhook secret is ever stored here —
-- only provider-issued identifiers.
-- ============================================================

-- 1. Proposals
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Opaque, unguessable client-facing URL token.
  token TEXT NOT NULL UNIQUE,

  prospect_id UUID REFERENCES prospects(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,

  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  scope JSONB NOT NULL DEFAULT '[]'::jsonb,

  total_minor BIGINT NOT NULL CHECK (total_minor > 0),
  deposit_minor BIGINT NOT NULL CHECK (deposit_minor > 0),
  currency TEXT NOT NULL DEFAULT 'GBP',
  CONSTRAINT deposit_not_greater_than_total CHECK (deposit_minor <= total_minor),

  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','sent','viewed','accepted','deposit_paid','handed_off','declined','expired')),

  signed_by_name TEXT,
  signed_by_email TEXT,
  signed_at TIMESTAMPTZ,

  payment_session_id TEXT UNIQUE,
  payment_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending','paid','failed','refunded','cancelled')),
  paid_at TIMESTAMPTZ,

  handed_off_at TIMESTAMPTZ,
  handed_off_to TEXT,

  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- A paid deposit must carry its timestamp, and vice versa.
  CONSTRAINT paid_has_timestamp CHECK (
    (payment_status = 'paid') = (paid_at IS NOT NULL)
  )
);

-- Token lookup is the hot path for the client-facing proposal view.
CREATE INDEX IF NOT EXISTS idx_proposals_token ON proposals(token);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_prospect ON proposals(prospect_id);
-- Drives the "awaiting human handover" queue.
CREATE INDEX IF NOT EXISTS idx_proposals_awaiting_handover
  ON proposals(paid_at) WHERE status = 'deposit_paid';

-- 2. Proposal event log — append-only audit trail
CREATE TABLE IF NOT EXISTS proposal_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  type TEXT NOT NULL
    CHECK (type IN ('created','sent','viewed','accepted','checkout_created',
                    'deposit_paid','payment_failed','handed_off','declined','expired')),
  detail TEXT,
  actor TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_proposal_events_proposal
  ON proposal_events(proposal_id, created_at);

-- 3. Processed webhook deliveries — idempotency guard
--    Payment providers retry deliveries. Recording the provider event id and
--    rejecting duplicates is what stops a retry from double-recording a
--    deposit or re-triggering the handover notification.
CREATE TABLE IF NOT EXISTS payment_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL DEFAULT 'stripe',
  provider_event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, provider_event_id)
);

-- 4. updated_at maintenance
CREATE OR REPLACE FUNCTION touch_proposals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_proposals_updated_at ON proposals;
CREATE TRIGGER trg_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION touch_proposals_updated_at();
