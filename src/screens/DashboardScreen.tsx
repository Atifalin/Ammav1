import { StyleSheet, Text } from 'react-native';

import { Screen } from '../components/Screen';
import { colors } from '../theme';

export function DashboardScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        Weekly and 24-hour stats, trends, and AI-generated insights will live here. Phase 1 will
        focus on simple aggregates from logged activities.
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
