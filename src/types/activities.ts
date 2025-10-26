// Activity Types for Amma

export type ActivityType = 'feed' | 'diaper' | 'sleep' | 'pump' | 'growth';

// Feed Activity
export interface FeedMeta {
  type: 'breast' | 'bottle';
  side?: 'left' | 'right' | 'both'; // For breastfeeding
  duration?: number; // Minutes
  volume_ml?: number; // For bottle feeding
  notes?: string;
}

// Diaper Activity
export interface DiaperMeta {
  type: 'wet' | 'dirty' | 'both';
  color?: 'yellow' | 'green' | 'brown' | 'black' | 'other';
  photo_key?: string; // Supabase storage key
  notes?: string;
}

// Sleep Activity
export interface SleepMeta {
  type: 'nap' | 'night';
  duration?: number; // Minutes
  end_time?: string; // ISO timestamp
  notes?: string;
}

// Pump Activity
export interface PumpMeta {
  side: 'left' | 'right' | 'both';
  volume_ml: number;
  pain_rating?: 1 | 2 | 3 | 4 | 5; // 1 = no pain, 5 = severe
  notes?: string;
}

// Growth Activity
export interface GrowthMeta {
  weight_kg?: number;
  length_cm?: number;
  head_circumference_cm?: number;
  notes?: string;
}

export type ActivityMeta = FeedMeta | DiaperMeta | SleepMeta | PumpMeta | GrowthMeta;

export interface Activity {
  id: string;
  family_id: string;
  caregiver_id: string;
  type: ActivityType;
  meta: ActivityMeta;
  timestamp: string;
}

export interface CreateActivityInput {
  type: ActivityType;
  meta: ActivityMeta;
  timestamp?: string; // Defaults to now
}
