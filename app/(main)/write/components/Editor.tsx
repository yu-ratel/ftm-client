import React, { RefObject } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface EditorProps {
  editor: BlockNoteEditor;
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

const Editor = ({
  editor,
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileChange,
  fileInputRef,
}: EditorProps) => {
  return (
    <div className="pb-6">
      <div
        className={`editor-container ${isDragging ? "drag-active" : ""}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <BlockNoteView
          editor={editor}
          formattingToolbar={false}
          slashMenu={false}
          sideMenu={false}
          className="h-full"
          theme={{
            colors: {
              editor: {
                background: "#FFFFFF",
                text: "#333333",
              },
            },
            borderRadius: 0,
            fontFamily:
              "Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
          }}
        />
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default Editor;
