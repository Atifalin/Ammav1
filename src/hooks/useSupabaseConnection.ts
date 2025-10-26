import { useEffect, useState } from 'react';

import { supabase } from '../lib/supabase';

interface ConnectionStatus {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to verify Supabase connection on app startup
 * Tests database connectivity by querying families table
 */
export function useSupabaseConnection(): ConnectionStatus {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function testConnection() {
      try {
        // Simple query to test connection
        const { error } = await supabase.from('families').select('id').limit(1);

        if (error) {
          setStatus({
            isConnected: false,
            isLoading: false,
            error: error.message,
          });
        } else {
          setStatus({
            isConnected: true,
            isLoading: false,
            error: null,
          });
        }
      } catch (err) {
        setStatus({
          isConnected: false,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    testConnection();
  }, []);

  return status;
}
