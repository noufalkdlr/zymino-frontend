import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function InvoicesHome() {
  const topTabs = ['Invoice History', 'Clients', 'Catalogues', 'Drafts'];

  const [activeTab, setActiveTab] = useState(topTabs[0]);

  return (
    <View className="flex-1 bg-slate-50 pt-6">
      <Text className="text-2xl font-bold text-slate-800 px-6 mb-6">📄 Invoices</Text>

      <View className="h-12 mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6"
          contentContainerStyle={{ paddingRight: 40 }}
        >
          {topTabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(tab)}
              className={`mr-3 px-5 py-2 rounded-full border items-center justify-center ${activeTab === tab
                ? 'bg-blue-600 border-blue-600'
                : 'bg-white border-slate-300'
                }`}
            >
              <Text className={`font-semibold ${activeTab === tab ? 'text-white' : 'text-slate-600'
                }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="flex-1 px-6">

        {activeTab === 'Invoice History' && (
          <View className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-2">
            <Text className="text-lg font-bold text-slate-800">📜 Invoice History</Text>
            <Text className="text-slate-500 mt-2">ഇവിടെ നിങ്ങളുടെ പഴയ ഇൻവോയ്‌സുകളുടെ ലിസ്റ്റ് കാണിക്കാം.</Text>
          </View>
        )}

        {activeTab === 'Clients' && (
          <View className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-2">
            <Text className="text-lg font-bold text-slate-800">👥 My Clients</Text>
            <Text className="text-slate-500 mt-2">നിങ്ങൾ ഇൻവോയ്‌സ് അയച്ച ക്ലയന്റുകളുടെ വിവരങ്ങൾ ഇവിടെ വരും.</Text>
          </View>
        )}

        {activeTab === 'Catalogues' && (
          <View className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-2">
            <Text className="text-lg font-bold text-slate-800">📦 Catalogues</Text>
            <Text className="text-slate-500 mt-2">നിങ്ങളുടെ പ്രൊഡക്റ്റുകൾ അല്ലെങ്കിൽ സർവീസുകൾ ഇവിടെ ലിസ്റ്റ് ചെയ്യാം.</Text>
          </View>
        )}

        {activeTab === 'Drafts' && (
          <View className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-2">
            <Text className="text-lg font-bold text-slate-800">📝 Drafts</Text>
            <Text className="text-slate-500 mt-2">സേവ് ചെയ്ത് വെച്ച, ഇതുവരെ അയക്കാത്ത ഇൻവോയ്‌സുകൾ.</Text>
          </View>
        )}

      </View>
    </View>
  );
}
