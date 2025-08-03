import React, { RefObject } from "react";
import { BlockNoteEditor } from "@blocknote/core";

interface ToolbarProps {
  editor: BlockNoteEditor;
  onImageUpload: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

interface BlockData {
  id: string;
  type: string;
  props?: {
    level?: number;
    textAlignment?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const Toolbar = ({ editor, onImageUpload, fileInputRef }: ToolbarProps) => {
  // ===== EDITOR FORMATTING HANDLERS =====
  const handleHeading = (level: 1 | 2 | 3) => {
    const selection = editor.getSelection?.();
    if (selection) {
      selection.blocks.forEach((block: BlockData) => {
        editor.updateBlock(block, {
          type: "heading",
          props: { level },
        });
      });
    }
  };

  const handleAlignment = (alignment: "left" | "center" | "right") => {
    const selection = editor.getSelection?.();
    if (selection) {
      selection.blocks.forEach((block: BlockData) => {
        editor.updateBlock(block, {
          props: { textAlignment: alignment },
        });
      });
    }
  };

  return (
    <div>
      <div className="custom-toolbar">
        <button
          className="toolbar-button font-bold"
          title="굵게"
          onClick={() => editor.toggleStyles({ bold: true })}
        >
          B
        </button>
        <button
          className="toolbar-button italic"
          title="기울임"
          onClick={() => editor.toggleStyles({ italic: true })}
        >
          I
        </button>
        <button
          className="toolbar-button underline"
          title="밑줄"
          onClick={() => editor.toggleStyles({ underline: true })}
        >
          U
        </button>
        <button
          className="toolbar-button"
          title="취소선"
          onClick={() => editor.toggleStyles({ strike: true })}
        >
          S
        </button>

        <div className="toolbar-divider"></div>

        <button
          className="toolbar-button"
          title="제목 1 (H1)"
          onClick={() => handleHeading(1)}
        >
          H1
        </button>
        <button
          className="toolbar-button"
          title="제목 2 (H2)"
          onClick={() => handleHeading(2)}
        >
          H2
        </button>
        <button
          className="toolbar-button"
          title="제목 3 (H3)"
          onClick={() => handleHeading(3)}
        >
          H3
        </button>

        <div className="toolbar-divider"></div>

        <button
          className="toolbar-button"
          title="왼쪽 정렬"
          onClick={() => handleAlignment("left")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="18" y2="18" />
          </svg>
        </button>
        <button
          className="toolbar-button"
          title="가운데 정렬"
          onClick={() => handleAlignment("center")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="6" y1="12" x2="18" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button
          className="toolbar-button"
          title="오른쪽 정렬"
          onClick={() => handleAlignment("right")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="9" y1="12" x2="21" y2="12" />
            <line x1="6" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="toolbar-divider"></div>

        <button
          className="toolbar-button"
          title="이미지 첨부"
          onClick={onImageUpload}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default Toolbar;
