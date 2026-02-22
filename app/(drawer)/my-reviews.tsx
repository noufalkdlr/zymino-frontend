import { View, Text } from 'react-native';

export default function MyReviewsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-gray-800">
        My Reviews 📝
      </Text>
      <Text className="text-gray-500 mt-2">
        നിങ്ങളുടെ റിവ്യൂകൾ ഇവിടെ വരും...
      </Text>
    </View>
  );
}