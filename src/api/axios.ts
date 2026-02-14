import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'web'
  ? 'http://127.0.0.1:8000/api/'
  : 'http://10.0.2.2:8000/api/';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
