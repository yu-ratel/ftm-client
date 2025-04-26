import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/types/user";

interface AuthState {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  getUser: () => UserInfo | null;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      getUser: () => get().user,
      clearUser: () => set({ user: null }),
    }),
    {
      name: "userInfo",
    }
  )
);

// 액션들을 직접 export
export const { setUser, getUser, clearUser } = useAuthStore.getState();
