import React, { useState, useRef, useEffect } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { Toolbar, Editor } from "./index";
import { useEditorStyles } from "../hooks/useEditorStyles";
import { useImageResize } from "../hooks/useImageResize";
import { openAlert } from "@/utils/modal/OpenAlert";

interface EditorComponentProps {
  onContentChange: (content: unknown) => void;
  onImagesChange: (images: File[]) => void;
}

const EditorComponent = ({
  onContentChange,
  onImagesChange,
}: EditorComponentProps) => {
  const [postImages, setPostImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Apply custom styles and image resize functionality
  useEditorStyles();
  useImageResize();

  // ===== EDITOR SETUP =====
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "나만의 그루밍을 공유해보세요.",
      },
    ],
    uploadFile: async (file: File) => {
      return URL.createObjectURL(file);
    },
    domAttributes: {
      editor: {
        "class": "custom-editor-class",
        "data-testid": "editor",
      },
      block: {
        class: "custom-block-class",
      },
    },
  });

  // 에디터 내용 변경 시 부모에게 알림
  useEffect(() => {
    const handleContentChange = () => {
      onContentChange(editor.document);
    };

    const interval = setInterval(handleContentChange, 1000);
    return () => clearInterval(interval);
  }, [editor, onContentChange]);

  // 이미지 변경 시 부모에게 알림
  useEffect(() => {
    onImagesChange(postImages);
  }, [postImages, onImagesChange]);

  // ===== IMAGE HANDLERS =====
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // 게시글 이미지 파일 목록에 추가
      setPostImages((prev) => [...prev, file]);

      // 에디터에 이미지 표시
      const imageUrl = URL.createObjectURL(file);
      const selection = editor.getSelection?.();
      const referenceBlock = selection?.blocks?.[0] ?? editor.document?.[0];
      if (referenceBlock) {
        editor.insertBlocks(
          [{ type: "image", props: { url: imageUrl } }],
          referenceBlock,
          "after"
        );
      }
    } else if (file) {
      openAlert("이미지 파일만 업로드할 수 있습니다.");
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ===== DRAG & DROP HANDLERS =====
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      openAlert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    imageFiles.forEach((file) => {
      setPostImages((prev) => [...prev, file]);

      const imageUrl = URL.createObjectURL(file);
      const selection = editor.getSelection?.();
      const referenceBlock = selection?.blocks?.[0] ?? editor.document?.[0];

      if (referenceBlock) {
        editor.insertBlocks(
          [{ type: "image", props: { url: imageUrl } }],
          referenceBlock,
          "after"
        );
      }
    });
  };

  return (
    <>
      <Toolbar
        editor={editor}
        onImageUpload={handleImageUpload}
        fileInputRef={fileInputRef}
      />

      <Editor
        editor={editor}
        isDragging={isDragging}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onFileChange={handleFileChange}
        fileInputRef={fileInputRef}
      />
    </>
  );
};

export default EditorComponent;
