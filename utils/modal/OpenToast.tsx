import { showToast } from "@/stores/ToastStore";

export const openToast = (
  title: string,
  message: string,
  duration?: number
) => {
  showToast({ title, message, duration });
};

