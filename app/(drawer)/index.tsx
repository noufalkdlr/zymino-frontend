import { Text, View, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function HomePage() {
  const { logout } = useAuthStore()
  return (
    <View>
      <Text>Hello</Text>
      <TouchableOpacity className='bg-red-500 px-8 py-4' onPress={logout}>
        <Text className='text-white'>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
