-- ============================================================
-- AVORRIA ADMIN — PHASE 13: OUTREACH SEQUENCING & REPLY HANDLING
-- Migration: 20260819_017_phase13_outreach_schema.sql
--
-- Cold outreach to real businesses. The constraints here are not
-- bookkeeping — they are what stops the system emailing someone twice,
-- emailing someone who opted out, or continuing a sequence after a human
-- has already replied.
-- ============================================================

-- 1. Sequences — a named, versioned cadence (e.g. "UK trades 3-step")
CREATE TABLE IF NOT EXISTS outreach_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','active','paused','archived')),
  -- Hard ceiling applied per sequence, on top of the global daily caps.
  max_sends_per_day INTEGER NOT NULL DEFAULT 20 CHECK (max_sends_per_day >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Steps within a sequence
CREATE TABLE IF NOT EXISTS outreach_sequence_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES outreach_sequences(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL CHECK (step_number >= 1),
  -- Delay measured from the PREVIOUS step's send, not from enrolment.
  delay_hours INTEGER NOT NULL DEFAULT 72 CHECK (delay_hours >= 0),
  purpose TEXT NOT NULL,
  -- Guidance handed to the copy model; the copy itself is generated per
  -- prospect and stored on the message, never templated blindly.
  copy_brief TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (sequence_id, step_number)
);

-- 3. Enrolments — one prospect's journey through one sequence
CREATE TABLE IF NOT EXISTS outreach_enrolments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES outreach_sequences(id) ON DELETE CASCADE,
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  contact_email TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','completed','replied','bounced','unsubscribed','stopped')),
  current_step INTEGER NOT NULL DEFAULT 0,
  next_send_at TIMESTAMPTZ,

  stopped_reason TEXT,
  stopped_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- A prospect is never enrolled in the same sequence twice. This is the
  -- single most important guard against duplicate contact.
  UNIQUE (sequence_id, prospect_id)
);

CREATE INDEX IF NOT EXISTS idx_enrolments_due
  ON outreach_enrolments(next_send_at) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_enrolments_prospect ON outreach_enrolments(prospect_id);

-- 4. Messages — one row per actual send attempt
CREATE TABLE IF NOT EXISTS outreach_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrolment_id UUID NOT NULL REFERENCES outreach_enrolments(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,

  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_text TEXT NOT NULL,
  body_html TEXT,

  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued','sent','failed','suppressed','bounced','complained')),
  -- 'dry_run' is a first-class provider so a suppressed send is never
  -- mistaken for a delivered one when reading the log back.
  provider TEXT NOT NULL DEFAULT 'dry_run',
  provider_message_id TEXT,
  error TEXT,

  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- A step is sent at most once per enrolment. Retries update this row;
  -- they never insert a second one.
  UNIQUE (enrolment_id, step_number)
);

CREATE INDEX IF NOT EXISTS idx_messages_provider_id
  ON outreach_messages(provider_message_id) WHERE provider_message_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON outreach_messages(sent_at);

-- 5. Delivery events from the sending provider (opens, bounces, complaints)
CREATE TABLE IF NOT EXISTS outreach_delivery_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES outreach_messages(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'resend',
  provider_event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Providers retry webhooks. Recording the provider's event id and
  -- rejecting duplicates keeps counts and state transitions correct.
  UNIQUE (provider, provider_event_id)
);

-- 6. Replies — inbound mail matched back to an enrolment
CREATE TABLE IF NOT EXISTS outreach_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrolment_id UUID REFERENCES outreach_enrolments(id) ON DELETE SET NULL,
  from_email TEXT NOT NULL,
  subject TEXT,
  body_text TEXT NOT NULL,

  -- Set by the reply_classification task. 'unclassified' until it runs, so
  -- an unclassified reply is visibly awaiting triage rather than silently
  -- treated as uninterested.
  intent TEXT NOT NULL DEFAULT 'unclassified'
    CHECK (intent IN ('unclassified','interested','not_interested','unsubscribe',
                      'out_of_office','wrong_person','question','auto_reply','hostile')),
  confidence NUMERIC(3,2),
  requires_human BOOLEAN NOT NULL DEFAULT true,

  handled_at TIMESTAMPTZ,
  handled_by TEXT,

  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_replies_enrolment ON outreach_replies(enrolment_id);
CREATE INDEX IF NOT EXISTS idx_replies_awaiting
  ON outreach_replies(received_at) WHERE handled_at IS NULL;

-- 7. updated_at maintenance
CREATE OR REPLACE FUNCTION touch_outreach_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_outreach_sequences_updated_at ON outreach_sequences;
CREATE TRIGGER trg_outreach_sequences_updated_at
  BEFORE UPDATE ON outreach_sequences
  FOR EACH ROW EXECUTE FUNCTION touch_outreach_updated_at();

DROP TRIGGER IF EXISTS trg_outreach_enrolments_updated_at ON outreach_enrolments;
CREATE TRIGGER trg_outreach_enrolments_updated_at
  BEFORE UPDATE ON outreach_enrolments
  FOR EACH ROW EXECUTE FUNCTION touch_outreach_updated_at();
