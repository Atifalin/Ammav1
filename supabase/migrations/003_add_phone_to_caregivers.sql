-- Add phone number field to caregivers table
-- Created: 2025-10-26
-- Description: Collect phone numbers for future SMS verification (not implemented yet)

ALTER TABLE caregivers
ADD COLUMN IF NOT EXISTS phone text;

COMMENT ON COLUMN caregivers.phone IS 'Phone number for future SMS verification (not currently used)';
