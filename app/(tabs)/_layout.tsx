import { Tabs, Link, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const segments = useSegments();
  const { logout } = useAuthStore();

  // ഏത് ടാബ് ആണ് ആക്റ്റീവ് എന്ന് എളുപ്പം കണ്ടുപിടിക്കാൻ ഒരു ഫംഗ്ഷൻ
  const isActive = (routeName: string) => (segments as string[]).includes(routeName);

  const Sidebar = () => (
    <View className="w-64 bg-white border-r border-slate-200 h-full p-6">
      <Text className="text-2xl font-bold mb-8 text-blue-600">Zymino ✨</Text>

      <View className="space-y-2">
        <Link href="/(tabs)/reviews" asChild>
          <TouchableOpacity className={`p-4 rounded-xl flex-row items-center ${isActive('reviews') ? 'bg-blue-100' : ''}`}>
            <Ionicons name="star" size={20} color={isActive('reviews') ? '#2563eb' : '#64748b'} />
            <Text className={`ml-3 font-semibold ${isActive('reviews') ? 'text-blue-600' : 'text-slate-600'}`}>Reviews</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/invoices" asChild>
          <TouchableOpacity className={`p-4 rounded-xl flex-row items-center ${isActive('invoices') ? 'bg-blue-100' : ''}`}>
            <Ionicons name="document-text" size={20} color={isActive('invoices') ? '#2563eb' : '#64748b'} />
            <Text className={`ml-3 font-semibold ${isActive('invoices') ? 'text-blue-600' : 'text-slate-600'}`}>Invoices</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity className={`p-4 rounded-xl flex-row items-center ${isActive('profile') ? 'bg-blue-100' : ''}`}>
            <Ionicons name="person" size={20} color={isActive('profile') ? '#2563eb' : '#64748b'} />
            <Text className={`ml-3 font-semibold ${isActive('profile') ? 'text-blue-600' : 'text-slate-600'}`}>Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="flex-1 justify-end">
        <TouchableOpacity onPress={logout} className="p-4 bg-red-50 rounded-xl flex-row justify-center items-center">
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 flex-row">
      {isDesktop && <Sidebar />}

      <View className="flex-1 bg-slate-50">
        <Tabs screenOptions={{
          headerShown: false,
          tabBarStyle: isDesktop ? { display: 'none' } : {},
        }}>
          <Tabs.Screen name="reviews" options={{ title: 'Reviews', tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} /> }} />
          <Tabs.Screen name="invoices" options={{ title: 'Invoices', tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} /> }} />
          <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }} />
        </Tabs>
      </View>
    </View>
  );
}
