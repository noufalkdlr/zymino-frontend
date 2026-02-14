import { create } from "zustand";
import { getToken, setToken, deleteToken } from "../utils/tokenStorage";
import { loginUser, registerUser } from "../api/auth";


interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkLoginStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginUser(email, password);

      await setToken('access_token', data.access);
      await setToken('refresh_token', data.refresh);

      set({ isAuthenticated: true, isLoading: false });

    } catch (error) {
      console.error(error);
      set({
        error: 'Login Failed! Check email/password.',
        isLoading: false,
      })
    }
  },

  signup: async (email, username, password) => {
    set({ isLoading: true, error: null });
    try {
      await registerUser(email, username, password);
      set({ isLoading: false });
      return true

    } catch (error) {
      console.error(error);
      set({
        error: 'Signup Failed! Please check your details.',
        isLoading: false,
      })
      return false;
    }
  },

  logout: async () => {
    await deleteToken('access_token');
    await deleteToken('refresh_token');
    set({ isAuthenticated: false })
  },

  checkLoginStatus: async () => {
    const token = await getToken('access_token');
    if (token) {
      set({ isAuthenticated: true })
    }
  }
}));
