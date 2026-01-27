"use client";

import React, { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { PostDetail } from "../../../types/PostType";
import { formatImageUrl } from "../utils";
import "../../../write2/components/tiptap-styles.css";

interface TiptapPostContentProps {
  postData: PostDetail;
}

const TiptapPostContent = ({ postData }: TiptapPostContentProps) => {
  // Tiptap 에디터 설정 (읽기 전용)
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
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editable: false, // 읽기 전용 모드
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  // HTML 콘텐츠를 처리하여 이미지 URL 교체
  const processedContent = useMemo(() => {
    if (!postData?.content) return "";

    try {
      let htmlContent = postData.content;

      // blob URL을 실제 이미지 URL로 교체
      if (postData.postImages && postData.postImages.length > 0) {
        let imageIndex = 0;
        // blob: URL 패턴을 찾아서 실제 이미지 URL로 교체
        htmlContent = htmlContent.replace(
          /<img[^>]+src="(blob:[^"]+)"[^>]*>/g,
          (match) => {
            const actualImageUrl = postData.postImages?.[imageIndex]?.imageUrl;
            if (actualImageUrl) {
              imageIndex++;
              const formattedUrl = formatImageUrl(actualImageUrl);
              return match.replace(/src="blob:[^"]+"/, `src="${formattedUrl}"`);
            }
            return match;
          }
        );

        // blob: URL이 src 속성에 없는 경우도 처리 (다른 형식의 이미지 태그)
        htmlContent = htmlContent.replace(/src="(blob:[^"]+)"/g, (match) => {
          const actualImageUrl = postData.postImages?.[imageIndex]?.imageUrl;
          if (actualImageUrl) {
            imageIndex++;
            return `src="${formatImageUrl(actualImageUrl)}"`;
          }
          return match;
        });
      }

      // 일반 이미지 URL도 formatImageUrl로 처리
      htmlContent = htmlContent.replace(
        /<img[^>]+src="([^"]+)"[^>]*>/g,
        (match, src) => {
          // blob URL이 아닌 경우에만 formatImageUrl 적용
          if (!src.startsWith("blob:")) {
            const formattedUrl = formatImageUrl(src);
            return match.replace(src, formattedUrl);
          }
          return match;
        }
      );

      return htmlContent;
    } catch (error) {
      console.error("Content processing error:", error);
      return postData.content || "";
    }
  }, [postData?.content, postData?.postImages]);

  // 콘텐츠가 변경될 때마다 에디터에 설정
  useEffect(() => {
    if (editor && processedContent) {
      editor.commands.setContent(processedContent);
    }
  }, [editor, processedContent]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="min-h-96 w-full rounded-lg">
        {processedContent ? (
          <EditorContent editor={editor} />
        ) : (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <p>콘텐츠가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TiptapPostContent;
