import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuthStore } from '../../src/store/useAuthStore';


function CustomDrawerContent(props: any) {
  const { logout } = useAuthStore();

  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="p-6 border-b border-gray-200 mb-4 mt-4">
          <Text className="text-2xl font-bold text-gray-800">Zymino App</Text>
          <Text className="text-gray-500 mt-1">Welcome User!</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View className="p-4 border-t border-gray-200 pb-8">
        <TouchableOpacity
          onPress={logout}
          className="bg-red-500 py-3 rounded-lg flex-row justify-center items-center active:bg-red-600"
        >
          <Text className="text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Zymino Home',
          }}
        />

        <Drawer.Screen
          name="my-reviews"
          options={{
            drawerLabel: 'My Reviews',
            title: 'My Reviews', 
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}