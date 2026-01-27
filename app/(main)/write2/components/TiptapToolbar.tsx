import React from "react";
import { Editor } from "@tiptap/react";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiCodeLine,
  RiH1,
  RiH2,
  RiH3,
  RiListOrdered,
  RiListUnordered,
  RiDoubleQuotesL,
  RiSeparator,
  RiImageAddLine,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from "react-icons/ri";

interface TiptapToolbarProps {
  editor: Editor;
  onImageUpload: () => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`rounded p-2 transition-colors ${
      isActive
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
  >
    {children}
  </button>
);

const Divider = () => <div className="mx-1 h-6 w-px bg-gray-300" />;

export const TiptapToolbar = ({ editor, onImageUpload }: TiptapToolbarProps) => {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-gray-200 bg-white p-2">
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="실행 취소"
      >
        <RiArrowGoBackLine className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="다시 실행"
      >
        <RiArrowGoForwardLine className="h-5 w-5" />
      </ToolbarButton>

      <Divider />

      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="굵게"
      >
        <RiBold className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="기울임"
      >
        <RiItalic className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="밑줄"
      >
        <RiUnderline className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="취소선"
      >
        <RiStrikethrough className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        title="코드"
      >
        <RiCodeLine className="h-5 w-5" />
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="제목 1"
      >
        <RiH1 className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="제목 2"
      >
        <RiH2 className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="제목 3"
      >
        <RiH3 className="h-5 w-5" />
      </ToolbarButton>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="글머리 기호 목록"
      >
        <RiListUnordered className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="번호 매기기 목록"
      >
        <RiListOrdered className="h-5 w-5" />
      </ToolbarButton>

      <Divider />

      {/* Blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="인용"
      >
        <RiDoubleQuotesL className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="수평선"
      >
        <RiSeparator className="h-5 w-5" />
      </ToolbarButton>

      <Divider />

      {/* Text Align */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="왼쪽 정렬"
      >
        <RiAlignLeft className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="가운데 정렬"
      >
        <RiAlignCenter className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="오른쪽 정렬"
      >
        <RiAlignRight className="h-5 w-5" />
      </ToolbarButton>

      <Divider />

      {/* Image */}
      <ToolbarButton onClick={onImageUpload} title="이미지 추가">
        <RiImageAddLine className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
};

