import { Text } from 'react-native';

import { Screen } from '../components/Screen';

export function LogScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Log Activity</Text>
      <Text style={{ marginTop: 12 }}>
        Capture feeds, diapers, sleep, pumping sessions, and growth updates. Phase 1 will add
        quick-entry cards and offline caching here.
      </Text>
    </Screen>
  );
}
