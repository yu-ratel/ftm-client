import React from "react";

interface TagManagerProps {
  hashtags: { id: string; label: string }[];
  onOpenTagPopup: () => void;
  onRemoveTag: (tag: string) => void;
}

const TagManager = ({
  hashtags,
  onOpenTagPopup,
  onRemoveTag,
}: TagManagerProps) => {
  return (
    <div className="flex min-h-12 items-center gap-2 overflow-x-auto rounded-lg bg-[#f5f5f7] px-[6px]">
      {/* Add Tag Button */}
      <button
        onClick={onOpenTagPopup}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-white px-4"
      >
        <span className="whitespace-nowrap text-sm font-medium text-[#1481fd]">
          태그 추가
        </span>
        <svg
          className="h-4 w-4 shrink-0 text-[#1481fd]"
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
      {hashtags.map((tag: { id: string; label: string }, index: number) => (
        <div
          key={index}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-white px-4 text-sm text-[#374254]"
        >
          <span className="font-medium">{tag.label}</span>
          <button
            onClick={() => onRemoveTag(tag.label)}
            className="flex h-4 w-4 items-center justify-center text-[#374254] hover:text-gray-600"
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
  );
};

export default TagManager;
