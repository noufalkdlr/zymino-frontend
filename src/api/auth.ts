import { Platform } from "react-native";
import { api } from "./axios";
import { getToken } from "../utils/tokenStorage";

const platform = Platform.OS === "web" ? "web" : "mobile";

export const loginUser = async (email: string, password: string,) => {
  try {
    const response = await api.post("users/login/", {
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
  referralCode: string
) => {
  try {
    const response = await api.post("users/signup/", {
      email,
      username,
      password,
      referral_code_input: referralCode,
      platform,
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

    const response = await api.post("users/logout/", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
