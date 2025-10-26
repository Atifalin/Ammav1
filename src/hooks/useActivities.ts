import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../lib/supabase';
import type { Activity, CreateActivityInput } from '../types/activities';
import { useAuth } from '../contexts/AuthContext';

export function useActivities() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch activities for the current family
  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data as Activity[];
    },
    enabled: !!user,
  });

  // Create new activity
  const createActivity = useMutation({
    mutationFn: async (input: CreateActivityInput) => {
      if (!user) throw new Error('User not authenticated');

      // Get caregiver record to find family_id
      const { data: caregiver, error: caregiverError } = await supabase
        .from('caregivers')
        .select('family_id')
        .eq('id', user.id)
        .single();

      if (caregiverError) throw caregiverError;

      const { data, error } = await supabase
        .from('activities')
        .insert({
          family_id: caregiver.family_id,
          caregiver_id: user.id,
          type: input.type,
          meta: input.meta,
          timestamp: input.timestamp || new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as Activity;
    },
    onSuccess: () => {
      // Invalidate and refetch activities
      queryClient.invalidateQueries({ queryKey: ['activities', user?.id] });
    },
  });

  return {
    activities: activities || [],
    isLoading,
    createActivity: createActivity.mutate,
    isCreating: createActivity.isPending,
  };
}
