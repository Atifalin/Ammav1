import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { useSupabaseConnection } from '../hooks/useSupabaseConnection';
import { colors } from '../theme';

export function HomeScreen() {
  const { isConnected, isLoading, error } = useSupabaseConnection();

  return (
    <Screen>
      <Text style={styles.title}>Amma Home</Text>
      <Text style={styles.subtitle}>
        Daily glance with baby highlights, caregiver reminders, and recent activity summary will
        appear here.
      </Text>

      {/* Supabase Connection Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Database Connection</Text>
        {isLoading ? (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.statusText}>Testing connection...</Text>
          </View>
        ) : isConnected ? (
          <View style={styles.statusRow}>
            <Text style={styles.statusSuccess}>✓ Connected</Text>
          </View>
        ) : (
          <View style={styles.statusRow}>
            <Text style={styles.statusError}>✗ Connection failed</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusSuccess: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  statusError: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
});
