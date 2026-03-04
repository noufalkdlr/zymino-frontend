import { Redirect } from 'expo-router';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/reviews" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
