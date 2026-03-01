import axios from "axios";
import { Platform } from "react-native";

import { getToken } from "../utils/tokenStorage";
import { setToken, deleteToken } from "../utils/tokenStorage";

const isWeb = Platform.OS === "web";

// export const BASE_URL =
//   process.env.EXPO_PUBLIC_API_URL ||
//   (isWeb
//     ? process.env.EXPO_PUBLIC_API_URL_WEB
//     : process.env.EXPO_PUBLIC_API_URL_MOBILE);

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.31.117/api/'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken("access_token");
  if (token && !isWeb) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});


export const refreshTokenApi = async () => {
  const isWeb = Platform.OS === "web";

  try {
    if (isWeb) {
      return await axios.post(
        `${BASE_URL}users/token/refresh/`,
        { platform: "web" },
        { withCredentials: true },
      );
    } else {
      const refresh = await getToken("refresh_token");
      if (!refresh) throw new Error("No refresh token");

      return await axios.post(`${BASE_URL}users/token/refresh/`, {
        refresh: refresh,
        platform: "mobile",
      });
    }
  } catch (error) {
    throw error;
  }
};



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refreshTokenApi();

        if (!isWeb) {
          const { access, refresh } = refreshResponse.data;
          await setToken("access_token", access);
          await setToken("refresh_token", refresh);

          originalRequest.headers.set('Authorization', `Bearer ${access}`);
        }

        return api(originalRequest);
      } catch (refreshError) {
        if (!isWeb) {
          await deleteToken("access_token");
          await deleteToken("refresh_token");
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
