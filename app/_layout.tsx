import '@/global.css';
import { useRouter, useSegments, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useState, useEffect } from 'react';


export default function RootLayout() {
  const { isAuthenticated, checkLoginStatus } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      await checkLoginStatus();
      setIsReady(true)
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(drawer)');
    }
  }, [isAuthenticated, segments, isReady])

  if (!isReady) {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }
      }>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        < Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

