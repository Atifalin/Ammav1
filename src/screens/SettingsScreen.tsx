import { Text } from 'react-native';

import { Screen } from '../components/Screen';

export function SettingsScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Settings</Text>
      <Text style={{ marginTop: 12 }}>
        Configure caregivers, quiet hours, notification preferences, and account details from this
        screen. Phase 1 will host Supabase-authenticated profile info.
      </Text>
    </Screen>
  );
}
