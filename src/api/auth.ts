import { Platform } from "react-native";
import { api } from "./axios";
import { getToken } from "../utils/tokenStorage";

const platform = Platform.OS === "web" ? "web" : "mobile";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("login/", {
      email,
      password,
      platform,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  email: string,
  username: string,
  password: string,
) => {
  try {
    const response = await api.post("signup/", {
      user: {
        email,
        username,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const isWeb = Platform.OS === "web";
    let payload = {};

    if (!isWeb) {
      const refresh = await getToken("refresh_token");
      payload = { refresh };
    }

    const response = await api.post("logout/", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
