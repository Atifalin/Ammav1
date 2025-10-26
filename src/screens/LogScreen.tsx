import { StyleSheet, Text } from 'react-native';

import { Screen } from '../components/Screen';
import { colors } from '../theme';

export function LogScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Log Activity</Text>
      <Text style={styles.subtitle}>
        Capture feeds, diapers, sleep, pumping sessions, and growth updates. Phase 1 will add
        quick-entry cards and offline caching here.
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
