import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuthStore } from '../../src/store/useAuthStore';

import { Ionicons } from '@expo/vector-icons';


const CustomHeader = ({ navigation }: any) => (
  <View className="h-16 bg-white flex-row items-center px-4">
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      className="mr-4"
    >
      <Ionicons name="menu" size={30} color="black" />
    </TouchableOpacity>

    <Text className="font-bold text-xl">Zymino ✨</Text>
  </View>
);

function CustomDrawerContent(props: any) {
  const { logout } = useAuthStore();

  const { state, navigation, descriptors } = props;

  return (
    <View className="flex-1 bg-slate-50">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View className="p-8 bg-blue-600 rounded-br-[50px] mb-6">
          <View className="w-16 h-16 bg-white rounded-full mb-4 items-center justify-center">
            <Ionicons name="person" size={30} color="#2563eb" />
          </View>
          <Text className="text-white text-xl font-bold">Hello.. 😊</Text>
          <Text className="text-blue-100">User ID: #12345</Text>
        </View>

        <View className="px-4 space-y-2">
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];

            const label = options.drawerLabel !== undefined
              ? options.drawerLabel
              : options.title !== undefined
                ? options.title
                : route.name;

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                className={`flex-row items-center p-4 rounded-xl ${isFocused ? 'bg-blue-100' : ''}`}
              >
                {options.drawerIcon && options.drawerIcon({ color: isFocused ? "#2563eb" : "#475569", size: 22 })}

                <Text className={`ml-4 font-semibold ${isFocused ? 'text-blue-600' : 'text-slate-700'}`}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      <View className="p-6 border-t border-slate-200">
        <TouchableOpacity
          onPress={logout}
          className="bg-red-50 py-4 rounded-2xl flex-row justify-center items-center"
        >
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-2">Logout Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Zymino Home',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="my-reviews"
          options={{
            drawerLabel: 'My Reviews',
            title: 'My Reviews',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="star-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
