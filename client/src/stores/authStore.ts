import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

// Mock credentials - displayed on login page
export const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

let currentPassword = MOCK_CREDENTIALS.password;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,
      login: (username: string, password: string) => {
        if (username === MOCK_CREDENTIALS.username && password === currentPassword) {
          set({ isAuthenticated: true, username });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, username: null });
      },
      changePassword: (oldPassword: string, newPassword: string) => {
        if (oldPassword === currentPassword) {
          currentPassword = newPassword;
          return true;
        }
        return false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
