import axiosClient from "@/utilities/axiosClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,

      login: async (username: string, password: string): Promise<boolean> => {
        const response = await axiosClient.post<{ token: string }>(
          "/auth/login",
          {
            email: username,
            password: password,
          }
        );
        if (response.status !== 200) {
          // Login unsuccessful
          console.error("Login failed:", response.data);
          return false;
        }

        // Login successful
        localStorage.setItem("authToken", response.data.access_token);
        set({ isAuthenticated: true, username });
        return true;
      },
      logout: async () => {
        const response = await axiosClient.post("/auth/logout");
        if (response.status !== 200) {
          // Logout unsuccessful
          console.error("Logout failed:", response.data);
          return false;
        }

        // Logout successful
        set({ isAuthenticated: false, username: null });
      },
      changePassword: async (oldPassword: string, newPassword: string) => {
        // TODO: Implement password change logic
        return false;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
