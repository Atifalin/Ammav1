import { Text } from 'react-native';

import { Screen } from '../components/Screen';

export function DashboardScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Dashboard</Text>
      <Text style={{ marginTop: 12 }}>
        Weekly and 24-hour stats, trends, and AI-generated insights will live here. Phase 1 will
        focus on simple aggregates from logged activities.
      </Text>
    </Screen>
  );
}
