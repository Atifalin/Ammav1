-- Amma Row Level Security Policies
-- Created: 2025-10-26
-- Description: RLS policies to ensure caregivers can only access their family's data

-- Enable RLS on all tables
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE flags ENABLE ROW LEVEL SECURITY;

-- Helper function to get current caregiver's family_id
CREATE OR REPLACE FUNCTION public.get_caregiver_family_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT family_id FROM public.caregivers WHERE id = auth.uid();
$$;

-- Families policies
CREATE POLICY "Caregivers can view their own family"
  ON families FOR SELECT
  USING (id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can update their own family"
  ON families FOR UPDATE
  USING (id = public.get_caregiver_family_id());

-- Caregivers policies
CREATE POLICY "Caregivers can view family members"
  ON caregivers FOR SELECT
  USING (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can insert family members"
  ON caregivers FOR INSERT
  WITH CHECK (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can update family members"
  ON caregivers FOR UPDATE
  USING (family_id = public.get_caregiver_family_id());

-- Activities policies
CREATE POLICY "Caregivers can view family activities"
  ON activities FOR SELECT
  USING (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can insert activities"
  ON activities FOR INSERT
  WITH CHECK (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can update their own activities"
  ON activities FOR UPDATE
  USING (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can delete their own activities"
  ON activities FOR DELETE
  USING (family_id = public.get_caregiver_family_id());

-- Memory policies
CREATE POLICY "Caregivers can view family memory"
  ON memory FOR SELECT
  USING (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can update family memory"
  ON memory FOR UPDATE
  USING (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can insert family memory"
  ON memory FOR INSERT
  WITH CHECK (family_id = public.get_caregiver_family_id());

-- Notifications policies
CREATE POLICY "Caregivers can view family notifications"
  ON notifications FOR SELECT
  USING (family_id = public.get_caregiver_family_id());

-- Flags policies
CREATE POLICY "Caregivers can view family flags"
  ON flags FOR SELECT
  USING (family_id = public.get_caregiver_family_id());

CREATE POLICY "Caregivers can acknowledge family flags"
  ON flags FOR UPDATE
  USING (family_id = public.get_caregiver_family_id());

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
