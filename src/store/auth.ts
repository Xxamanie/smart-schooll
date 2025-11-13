import { create } from 'zustand';
import { User } from '../utils/validation';
import { STORAGE_KEYS, setLocalStorage, removeLocalStorage } from '../utils/storage';
import { handleApiError } from '../utils/error-handling';
import axios from 'axios';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    role: User['role'];
  }) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
      setLocalStorage(STORAGE_KEYS.USER_DATA, user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: () => {
    removeLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
    removeLocalStorage(STORAGE_KEYS.USER_DATA);

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, userData);
      const { token, user } = response.data;

      setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
      setLocalStorage(STORAGE_KEYS.USER_DATA, user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw handleApiError(error);
    }
  },
}));