import { create } from "zustand";

export interface ToastType {
  id: string;
  title: string;
  message: string;
  duration?: number;
}

interface ToastState {
  toasts: ToastType[];
  showToast: (options: {
    title: string;
    message: string;
    duration?: number;
  }) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: ({ title, message, duration = 3000 }) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, title, message, duration }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      }, duration);
    }
  },
  hideToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

export const showToast = useToastStore.getState().showToast;
export const hideToast = useToastStore.getState().hideToast;
export const clearToasts = useToastStore.getState().clearToasts;

