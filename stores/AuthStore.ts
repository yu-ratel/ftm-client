import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/types/user";

interface AuthState {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
    }
  )
);

// 액션들을 직접 export
export const { setUser, clearUser } = useAuthStore.getState();
