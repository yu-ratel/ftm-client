import React, { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TiptapToolbar } from "./TiptapToolbar";
import { openAlert } from "@/utils/modal/OpenAlert";
import "./tiptap-styles.css";

interface TiptapEditorProps {
  onContentChange: (content: string) => void;
  onImagesChange: (images: File[]) => void;
}

interface ImageMapping {
  url: string;
  file: File;
}

const TiptapEditor = ({
  onContentChange,
  onImagesChange,
}: TiptapEditorProps) => {
  const [postImages, setPostImages] = useState<File[]>([]);
  const [imageMappings, setImageMappings] = useState<ImageMapping[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      Placeholder.configure({
        placeholder: "나만의 그루밍을 공유해보세요.",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "tiptap-editor focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html);

      // 현재 에디터에 있는 이미지 URL들 추출
      const currentImageUrls = new Set<string>();
      const doc = editor.state.doc;
      doc.descendants((node) => {
        if (node.type.name === "image" && node.attrs.src) {
          currentImageUrls.add(node.attrs.src);
        }
      });

      // 삭제된 이미지 감지 및 postImages에서 제거
      const deletedImages = imageMappings.filter(
        (mapping) => !currentImageUrls.has(mapping.url)
      );

      if (deletedImages.length > 0) {
        setPostImages((prev) =>
          prev.filter(
            (file) => !deletedImages.some((deleted) => deleted.file === file)
          )
        );

        setImageMappings((prev) =>
          prev.filter(
            (mapping) =>
              !deletedImages.some((deleted) => deleted.url === mapping.url)
          )
        );
      }
    },
  });

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
      insertImage(file);
    } else if (file) {
      openAlert("이미지 파일만 업로드할 수 있습니다.");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const insertImage = (file: File) => {
    setPostImages((prev) => [...prev, file]);

    const imageUrl = URL.createObjectURL(file);
    setImageMappings((prev) => [...prev, { url: imageUrl, file }]);

    if (editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
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
      insertImage(file);
    });
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-[#e1e1e7] bg-white">
      <TiptapToolbar editor={editor} onImageUpload={handleImageUpload} />

      <div className="border-t border-[#e1e1e7]" />

      <div
        className={`relative min-h-[600px] ${isDragging ? "bg-blue-50" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <EditorContent editor={editor} />

        {isDragging && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg bg-blue-500 px-6 py-3 text-white">
              이미지를 여기에 놓으세요
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default TiptapEditor;
