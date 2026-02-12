import { create } from 'zustand';
import { setToken, deleteToken, getToken } from '../utils/tokenStorage'; // <-- Helper
import { loginUser } from '../api/auth';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email, password) => Promise<void>;
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

      // Helper വഴി ടോക്കൺ സേവ് ചെയ്യുന്നു
      await setToken('access_token', data.access);
      await setToken('refresh_token', data.refresh);

      set({ isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error(error);
      set({
        error: 'Login Failed! Check email/password.',
        isLoading: false
      });
    }
  },

  logout: async () => {
    await deleteToken('access_token');
    await deleteToken('refresh_token');
    set({ isAuthenticated: false });
  },

  checkLoginStatus: async () => {
    const token = await getToken('access_token');
    if (token) {
      set({ isAuthenticated: true });
    }
  }
}));
