// Supabase Database Types
// Auto-generated types for type-safe database queries

export interface Database {
  public: {
    Tables: {
      families: {
        Row: {
          id: string;
          baby_name: string | null;
          dob: string | null;
          language: string;
          quiet_hours_start: string;
          quiet_hours_end: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          baby_name?: string | null;
          dob?: string | null;
          language?: string;
          quiet_hours_start?: string;
          quiet_hours_end?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          baby_name?: string | null;
          dob?: string | null;
          language?: string;
          quiet_hours_start?: string;
          quiet_hours_end?: string;
          created_at?: string;
        };
      };
      caregivers: {
        Row: {
          id: string;
          family_id: string;
          name: string;
          role: string;
          phone: string | null;
          device_token: string | null;
          notifications_enabled: boolean;
          snooze_until: string | null;
          on_duty_start: string | null;
          on_duty_end: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          family_id: string;
          name: string;
          role?: string;
          phone?: string | null;
          device_token?: string | null;
          notifications_enabled?: boolean;
          snooze_until?: string | null;
          on_duty_start?: string | null;
          on_duty_end?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          family_id?: string;
          name?: string;
          role?: string;
          phone?: string | null;
          device_token?: string | null;
          notifications_enabled?: boolean;
          snooze_until?: string | null;
          on_duty_start?: string | null;
          on_duty_end?: string | null;
          created_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          family_id: string;
          caregiver_id: string | null;
          type: 'feed' | 'diaper' | 'sleep' | 'pump' | 'growth';
          meta: Record<string, any> | null;
          timestamp: string;
        };
        Insert: {
          id?: string;
          family_id: string;
          caregiver_id?: string | null;
          type: 'feed' | 'diaper' | 'sleep' | 'pump' | 'growth';
          meta?: Record<string, any> | null;
          timestamp?: string;
        };
        Update: {
          id?: string;
          family_id?: string;
          caregiver_id?: string | null;
          type?: 'feed' | 'diaper' | 'sleep' | 'pump' | 'growth';
          meta?: Record<string, any> | null;
          timestamp?: string;
        };
      };
    };
  };
}
