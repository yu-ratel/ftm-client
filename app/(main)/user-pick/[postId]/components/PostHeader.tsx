import React from "react";
import Image from "next/image";
import { PostDetail } from "../../../types/PostType";
import { formatDate, formatImageUrl } from "../utils";
import { useBookmark } from "@/hooks/useBookmark";

interface PostHeaderProps {
  postData: PostDetail;
}

const PostHeader = ({ postData }: PostHeaderProps) => {
  const { isBookmarked, handleBookmark, isLoading } = useBookmark();
  console.log("postData", postData);
  return (
    <>
      {/* 제목 */}
      <h1 className="mb-4 font-pretendard text-xl font-bold leading-tight tracking-normal text-primary sm:text-2xl">
        {postData.title}
      </h1>

      {/* 태그 섹션 */}
      <div className="mb-6 flex flex-wrap gap-1">
        {postData.hashtags.map((tag: string, index: number) => (
          <div
            key={index}
            className="relative flex flex-row items-center justify-center gap-3 rounded-md border border-solid border-[transparent] bg-[#e1e1e7] pb-1.5 pl-2 pr-2 pt-1.5"
          >
            <div className="relative text-left font-['Pretendard-Medium',_sans-serif] text-[10px] font-medium leading-none text-[#374254]">
              {tag}
            </div>
          </div>
        ))}
      </div>

      {/* 작성자 정보와 액션 버튼 */}
      <div className="mb-8 flex items-center justify-between">
        {/* 작성자 정보 */}
        <div className="flex items-center gap-3">
          {/* 프로필 이미지 */}
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#d9d9d9]">
            {postData.writer.imageUrl && (
              <Image
                src={formatImageUrl(postData.writer.imageUrl)}
                alt={postData.writer.nickname}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* 작성자 정보 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">
                {postData.writer.nickname}
              </span>
              <span className="text-sm text-secondary">
                {postData.groomingCategory}
              </span>
            </div>
            <span className="text-sm text-secondary">
              {formatDate(postData.createdAt)}
            </span>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex gap-2">
          {/* 좋아요 버튼 */}
          <button className="flex flex-col items-center rounded p-2 hover:bg-gray-50">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#374254]"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-xs text-gray-500">{postData.likeCount}</span>
          </button>

          {/* 스크랩 버튼 */}
          <button
            onClick={() => handleBookmark(postData.postId)}
            className="flex flex-col items-center rounded p-2 hover:bg-gray-50"
            disabled={isLoading}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`${isBookmarked ? "text-blue-600" : "text-[#374254]"}`}
            >
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 공유 버튼 */}
          <button className="flex flex-col items-center rounded p-2 hover:bg-gray-50">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#374254]"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="mb-8 border-t border-gray-200" />
    </>
  );
};

export default PostHeader;
