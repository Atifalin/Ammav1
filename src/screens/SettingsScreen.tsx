import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Screen } from '../components/Screen';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme';

export function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            Alert.alert('Error', 'Failed to sign out');
          }
        },
      },
    ]);
  };

  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Configure caregivers, quiet hours, notification preferences, and account details from this
        screen. Phase 1 will host Supabase-authenticated profile info.
      </Text>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.label}>Signed in as:</Text>
          <Text style={styles.email}>{user.email}</Text>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
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
  userInfo: {
    marginTop: 32,
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  signOutButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
  },
});
