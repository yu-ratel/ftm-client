"use client";

import React from "react";
import { useModalStore } from "@/stores/ModalStore";

interface ConfirmModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  const hideModal = useModalStore((state) => state.hideModal);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    hideModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex h-[180px] w-[680px] flex-col items-center justify-center rounded-[12px] bg-white px-8 py-6 text-center shadow-xl">
        <p className="mb-6 font-pretendard text-[16px] font-medium text-black">
          {message}
        </p>
        <div className="flex gap-4">
          <button
            className="h-[38px] w-[168px] rounded-[10px] bg-gray-300 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-400"
            onClick={handleCancel}
          >
            {cancelText}
          </button>
          <button
            className="h-[38px] w-[168px] rounded-[10px] bg-blue-500 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
