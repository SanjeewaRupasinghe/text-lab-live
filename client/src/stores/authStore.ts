import axiosClient from "@/utilities/axiosClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

// Mock credentials - displayed on login page
export const MOCK_CREDENTIALS = {
  username: "a@mail.com",
  password: "password",
};

let currentPassword = MOCK_CREDENTIALS.password;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,

      login: async (username: string, password: string): Promise<boolean> => {
        const response = await axiosClient.post("/auth/login", {
          email: username,
          password: password,
        });
        if (response.status !== 200) {
          // Login unsuccessful
          console.error("Login failed:", response.data);
          return false;
        }

        set({ isAuthenticated: true, username });
        return true;
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
      name: "auth-storage",
    }
  )
);
