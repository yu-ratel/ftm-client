import React from "react";
import { availableTags } from "../constants";

interface TagPopupProps {
  isOpen: boolean;
  selectedTags: string[];
  onClose: () => void;
  onToggleTag: (tag: string) => void;
  onApply: () => void;
}

const TagPopup = ({
  isOpen,
  selectedTags,
  onClose,
  onToggleTag,
  onApply,
}: TagPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative h-[462px] w-full max-w-[556px] rounded-3xl bg-white shadow-2xl">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Content */}
      <div className="flex h-full flex-col p-6">
        {/* Title */}
        <div className="mb-8 mt-4 text-center text-xl font-bold leading-none text-[#374254]">
          나의 그루밍 팁에 알맞는 태그들을 선택해주세요
        </div>

        {/* Tags Container */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {availableTags.map((tag: string) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={`whitespace-nowrap rounded-md border border-transparent px-3.5 py-2.5 text-sm font-medium leading-none transition-colors ${
                    isSelected
                      ? "bg-[#1481fd] text-white"
                      : "bg-[#ededf3] text-[#374254] hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-6 px-4">
          <button
            onClick={onApply}
            className="h-12 w-full rounded-xl bg-[#1481fd] text-base font-bold leading-normal text-white transition-colors hover:bg-blue-600"
          >
            태그 적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagPopup;
