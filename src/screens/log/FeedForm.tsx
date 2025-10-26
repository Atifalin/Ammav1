import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '../../theme';
import { useActivities } from '../../hooks/useActivities';
import type { FeedMeta } from '../../types/activities';

interface FeedFormProps {
  onClose: () => void;
}

export function FeedForm({ onClose }: FeedFormProps) {
  const { createActivity, isCreating } = useActivities();
  const [feedType, setFeedType] = useState<'breast' | 'bottle'>('breast');
  const [side, setSide] = useState<'left' | 'right' | 'both'>('left');
  const [duration, setDuration] = useState('');
  const [volume, setVolume] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const meta: FeedMeta = {
      type: feedType,
      ...(feedType === 'breast' && { side }),
      ...(duration && { duration: parseInt(duration, 10) }),
      ...(volume && { volume_ml: parseInt(volume, 10) }),
      ...(notes && { notes }),
    };

    createActivity(
      { type: 'feed', meta },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Feed logged successfully');
          onClose();
        },
        onError: (error) => {
          Alert.alert('Error', error instanceof Error ? error.message : 'Failed to log feed');
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Log Feed</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Feed Type */}
        <View style={styles.section}>
          <Text style={styles.label}>Feed Type</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.optionButton, feedType === 'breast' && styles.optionButtonActive]}
              onPress={() => setFeedType('breast')}
            >
              <Ionicons
                name="heart"
                size={24}
                color={feedType === 'breast' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.optionText,
                  feedType === 'breast' && styles.optionTextActive,
                ]}
              >
                Breast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, feedType === 'bottle' && styles.optionButtonActive]}
              onPress={() => setFeedType('bottle')}
            >
              <Ionicons
                name="flask"
                size={24}
                color={feedType === 'bottle' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.optionText,
                  feedType === 'bottle' && styles.optionTextActive,
                ]}
              >
                Bottle
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Side (for breastfeeding) */}
        {feedType === 'breast' && (
          <View style={styles.section}>
            <Text style={styles.label}>Side</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.smallButton, side === 'left' && styles.smallButtonActive]}
                onPress={() => setSide('left')}
              >
                <Text style={[styles.smallButtonText, side === 'left' && styles.smallButtonTextActive]}>
                  Left
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, side === 'right' && styles.smallButtonActive]}
                onPress={() => setSide('right')}
              >
                <Text style={[styles.smallButtonText, side === 'right' && styles.smallButtonTextActive]}>
                  Right
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, side === 'both' && styles.smallButtonActive]}
                onPress={() => setSide('both')}
              >
                <Text style={[styles.smallButtonText, side === 'both' && styles.smallButtonTextActive]}>
                  Both
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.label}>Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 15"
            value={duration}
            onChangeText={setDuration}
            keyboardType="number-pad"
            editable={!isCreating}
          />
        </View>

        {/* Volume (for bottle) */}
        {feedType === 'bottle' && (
          <View style={styles.section}>
            <Text style={styles.label}>Volume (ml)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 120"
              value={volume}
              onChangeText={setVolume}
              keyboardType="number-pad"
              editable={!isCreating}
            />
          </View>
        )}

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any observations..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            editable={!isCreating}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, isCreating && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isCreating}
        >
          {isCreating ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <Text style={styles.submitButtonText}>Log Feed</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  optionTextActive: {
    color: colors.card,
  },
  smallButton: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  smallButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  smallButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  smallButtonTextActive: {
    color: colors.card,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
