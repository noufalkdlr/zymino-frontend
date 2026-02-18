import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const setToken = async (key: string, value: string) => {
  if (!isWeb) {
    await SecureStore.setItemAsync(key, value);
  }
};

export const getToken = async (key: string) => {
  if (!isWeb) {
    return await SecureStore.getItemAsync(key);
  }
};

export const deleteToken = async (key: string) => {
  if (!isWeb) {
    await SecureStore.deleteItemAsync(key);
  }
}
