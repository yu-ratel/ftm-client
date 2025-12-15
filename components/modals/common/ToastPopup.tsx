"use client";

import React from "react";
import { useToastStore } from "@/stores/ToastStore";

const ToastPopup: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const hideToast = useToastStore((state) => state.hideToast);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-6 z-[100] flex -translate-x-1/2 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-down relative flex h-[150px] w-[450px] rounded-[12px] bg-white px-6 py-5 shadow-lg transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-1 flex-col">
            <p className="mb-3 font-pretendard text-[16px] font-medium leading-[16px] text-black">
              {toast.title}
            </p>
            <p className="font-pretendard text-[16px] font-medium leading-[16px] text-black">
              {toast.message}
            </p>
          </div>
          <button
            className="absolute bottom-5 right-5 h-[38px] w-[77px] rounded-[8px] bg-[#1481fd] font-pretendard text-[14px] font-medium leading-[14px] text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            onClick={() => hideToast(toast.id)}
          >
            확인
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastPopup;
