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

// 이미지 URL과 File 객체를 매핑하는 인터페이스
interface ImageMapping {
  url: string;
  file: File;
}

const EditorComponent = ({
  onContentChange,
  onImagesChange,
}: EditorComponentProps) => {
  const [postImages, setPostImages] = useState<File[]>([]);
  const [imageMappings, setImageMappings] = useState<ImageMapping[]>([]);
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

  // 에디터 내용 변경 시 부모에게 알림 및 이미지 삭제 감지
  useEffect(() => {
    const handleContentChange = () => {
      onContentChange(editor.document);

      // 현재 에디터에 있는 이미지 URL들 추출
      const currentImageUrls = new Set<string>();
      editor.document.forEach((block) => {
        if (block.type === "image" && block.props.url) {
          currentImageUrls.add(block.props.url);
        }
      });

      // 삭제된 이미지 감지 및 postImages에서 제거
      const deletedImages = imageMappings.filter(
        (mapping) => !currentImageUrls.has(mapping.url)
      );

      if (deletedImages.length > 0) {
        // 삭제된 이미지들의 File 객체를 postImages에서 제거
        setPostImages((prev) =>
          prev.filter(
            (file) => !deletedImages.some((deleted) => deleted.file === file)
          )
        );

        // 삭제된 이미지들을 imageMappings에서도 제거
        setImageMappings((prev) =>
          prev.filter(
            (mapping) =>
              !deletedImages.some((deleted) => deleted.url === mapping.url)
          )
        );
      }
    };

    // onChange 이벤트 리스너 등록
    editor.onChange(handleContentChange);
  }, [editor, onContentChange, imageMappings]);

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

      // 이미지 매핑 추가
      setImageMappings((prev) => [...prev, { url: imageUrl, file }]);

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

      // 이미지 매핑 추가
      setImageMappings((prev) => [...prev, { url: imageUrl, file }]);

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
