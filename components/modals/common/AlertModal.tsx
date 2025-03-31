"use client";

import React from "react";
import { useModalStore } from "@/stores/ModalStore";

interface AlertModalProps {
  message: string;
  buttonText?: string;
  onConfirm?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  message,
  buttonText = "확인",
  onConfirm,
}) => {
  const hideModal = useModalStore((state) => state.hideModal);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    hideModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex h-[160px] w-[680px] flex-col items-center justify-center rounded-[12px] bg-white px-8 py-6 text-center shadow-xl">
        <p className="mb-6 font-pretendard text-[16px] font-medium text-black">
          {message}
        </p>
        <button
          className="transitio h-[38px] w-[168px] rounded-[10px] bg-blue-500 text-sm font-medium text-white"
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
