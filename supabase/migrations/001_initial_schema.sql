-- Amma Initial Schema Migration
-- Created: 2025-10-26
-- Description: Core tables for families, caregivers, activities, memory, notifications, and flags

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Families table
CREATE TABLE families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_name text,
  dob date,
  language text DEFAULT 'en-IN',
  quiet_hours_start time DEFAULT '22:00:00',
  quiet_hours_end time DEFAULT '06:00:00',
  created_at timestamptz DEFAULT now()
);

-- Caregivers table
CREATE TABLE caregivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES families(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text DEFAULT 'co-caregiver',
  device_token text,
  notifications_enabled boolean DEFAULT true,
  snooze_until timestamptz,
  on_duty_start time,
  on_duty_end time,
  created_at timestamptz DEFAULT now()
);

-- Activities table (feed/diaper/sleep/pump/growth)
CREATE TABLE activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES families(id) ON DELETE CASCADE,
  caregiver_id uuid REFERENCES caregivers(id),
  type text CHECK(type IN ('feed','diaper','sleep','pump','growth')),
  meta jsonb, -- flexible: {duration,side,volume_ml,color,photo_key}
  timestamp timestamptz DEFAULT now()
);

-- Memory table (compact JSON summary per family)
CREATE TABLE memory (
  family_id uuid PRIMARY KEY REFERENCES families(id) ON DELETE CASCADE,
  memory jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Notifications log table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES families(id) ON DELETE CASCADE,
  caregiver_id uuid REFERENCES caregivers(id),
  rule text,
  ai_message jsonb, -- {push_title, push_body, in_app}
  delivered_at timestamptz,
  status text,
  created_at timestamptz DEFAULT now()
);

-- Flags table (urgent events)
CREATE TABLE flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES families(id) ON DELETE CASCADE,
  type text,
  message text,
  created_at timestamptz DEFAULT now(),
  acknowledged boolean DEFAULT false
);

-- Create indexes for common queries
CREATE INDEX idx_caregivers_family_id ON caregivers(family_id);
CREATE INDEX idx_activities_family_id ON activities(family_id);
CREATE INDEX idx_activities_timestamp ON activities(timestamp DESC);
CREATE INDEX idx_notifications_family_id ON notifications(family_id);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_flags_family_id ON flags(family_id);
CREATE INDEX idx_flags_acknowledged ON flags(acknowledged) WHERE acknowledged = false;

-- Add comments for documentation
COMMENT ON TABLE families IS 'Core family unit with baby info and preferences';
COMMENT ON TABLE caregivers IS 'Family members with access to the app';
COMMENT ON TABLE activities IS 'All logged activities (feeds, diapers, sleep, pumps, growth)';
COMMENT ON TABLE memory IS 'Compact JSON memory summary for AI context';
COMMENT ON TABLE notifications IS 'Log of all notifications sent to caregivers';
COMMENT ON TABLE flags IS 'Critical alerts requiring immediate attention';
