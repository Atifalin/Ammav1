import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

export const env = {
  supabaseUrl: (extra as Record<string, any>).supabaseUrl ?? '',
  supabaseAnonKey: (extra as Record<string, any>).supabaseAnonKey ?? '',
};

if (!env.supabaseUrl || !env.supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase environment variables are missing. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in your environment.'
  );
}
