import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800">
        Welcome Home! 🎉
      </Text>
      <Text className="text-gray-500 mt-4 text-base">
        Swipe Right 👉 to open the side menu
      </Text>
    </View>
  );
}