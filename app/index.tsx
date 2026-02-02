import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  return (
    // Near-black dark gray background
    <View className="flex-1 bg-[#0a0a0a]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 40 }}>
        <View className="p-6 items-center w-full">

          {/* MAIN CARD (Glass Effect) */}
          <View
            style={{ maxWidth: 800, width: '100%' }}
            className="items-center border border-gray-800 bg-gray-900/50 p-8 md:p-16 rounded-3xl gap-8"
          >

            {/* TOP BADGE */}
            <View className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              <Text className="text-blue-400 font-bold text-xs uppercase tracking-widest">
                Coming Soon 2026
              </Text>
            </View>

            {/* HERO TEXT */}
            <View className="items-center gap-4 w-full">
              <Text className="text-white text-5xl md:text-7xl font-extrabold text-center leading-tight">
                Work Smarter.{'\n'}
                <Text className="text-blue-500">Get Paid Faster.</Text>
              </Text>
              <Text className="text-gray-400 text-lg md:text-xl text-center leading-7" style={{ maxWidth: 600 }}>
                Zymino is the new standard for freelancers. Manage clients, showcase reviews, and build your reputation on a platform designed for trust.
              </Text>
            </View>

            {/* EMAIL FORM - Button Outside */}
            <View className="w-full gap-3" style={{ maxWidth: 500 }}>
              <TextInput
                placeholder="name@example.com"
                placeholderTextColor="#9ca3af"
                className="w-full text-white px-6 py-4 text-base rounded-2xl border border-gray-700"
                style={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
              />
              <TouchableOpacity
                className="w-full bg-blue-600 px-8 py-4 rounded-2xl items-center justify-center active:bg-blue-700"
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-base">Join Waitlist</Text>
              </TouchableOpacity>
            </View>

            {/* SOCIAL PROOF (Avatars) */}
            <View className="items-center gap-3">
              <View className="flex-row items-center">
                {/* Fixed avatar margins */}
                <View className="w-10 h-10 rounded-full bg-red-500 border-2 border-gray-900" style={{ marginLeft: 0 }} />
                <View className="w-10 h-10 rounded-full bg-green-500 border-2 border-gray-900" style={{ marginLeft: -10 }} />
                <View className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-gray-900" style={{ marginLeft: -10 }} />
                <View className="w-10 h-10 rounded-full bg-purple-500 border-2 border-gray-900 items-center justify-center" style={{ marginLeft: -10 }}>
                  <Text className="text-white text-xs font-bold">+2K</Text>
                </View>
              </View>
              <Text className="text-gray-500 text-sm text-center">
                Join <Text className="text-white font-bold">2,000+</Text> freelancers waiting for launch.
              </Text>
            </View>

          </View>

          {/* FOOTER */}
          <View className="mt-10 flex-row gap-6 flex-wrap justify-center">
            <Text className="text-gray-600 text-sm">© Zymino Inc.</Text>
            <Text className="text-gray-600 text-sm">Privacy Policy</Text>
            <Text className="text-gray-600 text-sm">Contact Us</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
