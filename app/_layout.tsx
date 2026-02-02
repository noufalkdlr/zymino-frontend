import "../global.css";
import { Slot } from 'expo-router';

import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Slot />
    </View>
  );
}
