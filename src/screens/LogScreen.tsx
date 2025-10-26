import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { ActivityButton } from '../components/ActivityButton';
import { Screen } from '../components/Screen';
import { colors } from '../theme';
import { FeedForm } from './log/FeedForm';

type ActivityModal = 'feed' | 'diaper' | 'sleep' | 'pump' | 'growth' | null;

export function LogScreen() {
  const [activeModal, setActiveModal] = useState<ActivityModal>(null);

  return (
    <Screen>
      <Text style={styles.title}>Log Activity</Text>
      <Text style={styles.subtitle}>
        Quick-tap to log feeds, diapers, sleep, pumping, and growth updates
      </Text>

      <View style={styles.grid}>
        <ActivityButton
          icon="nutrition"
          label="Feed"
          color={colors.primary}
          onPress={() => setActiveModal('feed')}
        />
        <ActivityButton
          icon="water"
          label="Diaper"
          color="#4ECDC4"
          onPress={() => setActiveModal('diaper')}
        />
        <ActivityButton
          icon="moon"
          label="Sleep"
          color="#9B59B6"
          onPress={() => setActiveModal('sleep')}
        />
        <ActivityButton
          icon="heart"
          label="Pump"
          color="#E74C3C"
          onPress={() => setActiveModal('pump')}
        />
        <ActivityButton
          icon="trending-up"
          label="Growth"
          color={colors.accent}
          onPress={() => setActiveModal('growth')}
        />
      </View>

      {/* Feed Modal */}
      <Modal
        visible={activeModal === 'feed'}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setActiveModal(null)}
      >
        <FeedForm onClose={() => setActiveModal(null)} />
      </Modal>

      {/* TODO: Add other activity modals */}
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
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
