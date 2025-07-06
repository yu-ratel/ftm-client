import React from "react";

interface ActionButtonsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const ActionButtons = ({
  isSubmitting,
  onCancel,
  onSave,
}: ActionButtonsProps) => {
  return (
    <div className="flex justify-center gap-3 px-6 pb-6 pt-6">
      <button
        onClick={onCancel}
        className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        disabled={isSubmitting}
      >
        임시 저장
      </button>
      <button
        onClick={onSave}
        className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        disabled={isSubmitting}
      >
        게시하기
      </button>
    </div>
  );
};

export default ActionButtons;
