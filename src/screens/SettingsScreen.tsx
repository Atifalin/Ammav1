import { StyleSheet, Text } from 'react-native';

import { Screen } from '../components/Screen';
import { colors } from '../theme';

export function SettingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Configure caregivers, quiet hours, notification preferences, and account details from this
        screen. Phase 1 will host Supabase-authenticated profile info.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
