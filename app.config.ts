import { ConfigContext, ExpoConfig } from 'expo/config';
import 'dotenv/config';

const NAME = 'Amma';
const SLUG = 'amma-app';
const BACKGROUND_COLOR = '#FFF8F4';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: NAME,
  slug: SLUG,
  scheme: 'amma',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: BACKGROUND_COLOR,
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: BACKGROUND_COLOR,
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    supabaseUrl: process.env.SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? '',
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? '',
    },
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  plugins: ['expo-secure-store'],
});
