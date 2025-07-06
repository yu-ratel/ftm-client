import React, { useMemo, useEffect } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { PostDetail } from "../../../types/PostType";
import { formatImageUrl } from "../utils";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface PostContentProps {
  postData: PostDetail;
}

interface BlockProps {
  url?: string;
  [key: string]: unknown;
}

interface BlockData {
  type: string;
  props?: BlockProps;
  [key: string]: unknown;
}

const PostContent = ({ postData }: PostContentProps) => {
  // BlockNote 에디터 설정 (읽기 전용)
  const contentBlocks = useMemo(() => {
    if (!postData?.content) return undefined;

    try {
      // content가 이미 JSON 객체인지 문자열인지 확인
      const parsedContent =
        typeof postData.content === "string"
          ? JSON.parse(postData.content)
          : postData.content;
      console.log("parsedContent", parsedContent);

      if (!Array.isArray(parsedContent)) return undefined;

      // 이미지 블록의 blob URL을 실제 이미지 URL로 교체
      let imageIndex = 0;
      const updatedContent = parsedContent.map((block: BlockData) => {
        if (block.type === "image" && block.props?.url?.startsWith("blob:")) {
          // postImages 배열에서 순서대로 실제 이미지 URL 가져오기
          const actualImageUrl = postData.postImages?.[imageIndex]?.imageUrl;
          if (actualImageUrl) {
            imageIndex++;
            return {
              ...block,
              props: {
                ...block.props,
                url: formatImageUrl(actualImageUrl),
              },
            };
          }
        }
        return block;
      });

      console.log("Updated content with real image URLs:", updatedContent);
      return updatedContent;
    } catch (error) {
      console.error("Content parsing error:", error);
      return undefined;
    }
  }, [postData?.content, postData?.postImages]);

  // 기본 BlockNote 에디터 생성
  const editor = useCreateBlockNote({
    uploadFile: async (file: File) => {
      return URL.createObjectURL(file);
    },
  });

  // content가 변경될 때마다 에디터 document 업데이트
  useEffect(() => {
    if (contentBlocks && contentBlocks.length > 0) {
      console.log("Updating editor content with:", contentBlocks);
      editor.replaceBlocks(
        editor.document,
        contentBlocks as unknown as Parameters<typeof editor.replaceBlocks>[1]
      );
    }
  }, [contentBlocks, editor]);

  return (
    <div className="prose max-w-none">
      <div className="min-h-96 rounded-lg border border-gray-200 p-4">
        {contentBlocks && contentBlocks.length > 0 ? (
          <BlockNoteView
            editor={editor}
            editable={false}
            formattingToolbar={false}
            slashMenu={false}
            sideMenu={false}
          />
        ) : (
          <div className="flex items-center justify-center text-gray-500">
            <p>콘텐츠가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContent;
