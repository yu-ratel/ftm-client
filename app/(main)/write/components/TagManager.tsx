import React from "react";

interface TagManagerProps {
  hashtags: string[];
  onOpenTagPopup: () => void;
  onRemoveTag: (tag: string) => void;
}

const TagManager = ({
  hashtags,
  onOpenTagPopup,
  onRemoveTag,
}: TagManagerProps) => {
  return (
    <div className="border-b border-gray-100 px-6 py-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Add Tag Button */}
        <button
          onClick={onOpenTagPopup}
          className="flex h-[36px] w-fit flex-row items-center justify-center gap-2.5 rounded-[10px] border border-[#9aabc5] bg-[#ffffff] px-4"
        >
          <span className="whitespace-nowrap font-['Pretendard',_sans-serif] text-[16px] font-medium leading-[36px] tracking-[0%] text-[#9aabc5]">
            태그 추가
          </span>
          <svg
            className="h-4 w-4 shrink-0 text-[#9aabc5]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        {/* Existing Tags */}
        {hashtags.map((tag: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-1.5 rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
          >
            <span className="font-medium">#{tag}</span>
            <button
              onClick={() => onRemoveTag(tag)}
              className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300 hover:text-gray-700"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagManager;
