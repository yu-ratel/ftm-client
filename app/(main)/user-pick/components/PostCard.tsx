"use client";
import { FiBookmark, FiThumbsUp } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBookmark } from "@/hooks/useBookmark";
import { useQueryClient } from "@tanstack/react-query";

interface PostCardProps {
  id: number;
  title: string;
  image: string;
  author: string;
  likes: number;
  bookmarks: number;
  tags?: string[];
  size?: "small" | "large";
  showRanking?: boolean;
  isBookmarked?: boolean;
  sectionType?: "popular" | "bible" | "topBookmarks";
}

export default function PostCard({
  id,
  title,
  image,
  author,
  likes,
  bookmarks,
  tags = [],
  size = "large",
  showRanking = false,
  isBookmarked = false,
  sectionType,
}: PostCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { handleBookmark, isLoading } = useBookmark({
    initialBookmarked: isBookmarked,
    onSuccess: () => {
      // 섹션별로 필요한 쿼리만 무효화
      if (sectionType) {
        switch (sectionType) {
          case "popular":
            queryClient.invalidateQueries({
              queryKey: ["userPickPopularPosts"],
            });
            break;
          case "bible":
            queryClient.invalidateQueries({ queryKey: ["userPickBiblePosts"] });
            break;
          case "topBookmarks":
            queryClient.invalidateQueries({
              queryKey: ["userPickTopBookmarks"],
            });
            break;
        }
      } else {
        // sectionType이 없으면 모든 쿼리 무효화 (기본값)
        queryClient.invalidateQueries({ queryKey: ["userPickPopularPosts"] });
        queryClient.invalidateQueries({ queryKey: ["userPickBiblePosts"] });
        queryClient.invalidateQueries({ queryKey: ["userPickTopBookmarks"] });
      }
    },
  });

  const cardHeight = size === "small" ? "h-[253px]" : "h-[264px]";
  const cardWidth = size === "small" ? "max-w-[253px]" : "md:w-[392px]";
  const titleSize = size === "small" ? "text-xl" : "text-lg";

  return (
    <div
      className={`relative mx-auto flex w-full ${cardWidth} cursor-pointer flex-col overflow-hidden`}
      onClick={() => router.push(`/user-pick/${id}`)}
    >
      <div
        className={`relative ${cardHeight} w-full overflow-hidden rounded-lg`}
      >
        <div className="absolute left-4 right-4 top-4 z-10 flex flex-row items-center justify-between">
          {showRanking && (
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffffff]">
              <div className="flex items-center text-center text-2xl font-bold leading-[24px] text-[#374254]">
                {id}
              </div>
            </div>
          )}
          <div
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffffff] ${showRanking ? "" : "ml-auto"} ${isLoading ? "opacity-50" : "cursor-pointer hover:bg-gray-50"}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isLoading) {
                handleBookmark(id);
              }
            }}
          >
            <FiBookmark
              className={`h-6 w-6 ${isBookmarked ? "fill-[#1481fd] text-[#1481fd]" : "text-gray-600"}`}
            />
          </div>
        </div>
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt="thumbnail"
            fill
            className="object-cover"
            sizes={
              size === "small" ? "253px" : "(min-width: 768px) 392px, 100vw"
            }
          />
        </div>
      </div>

      <div className={size === "small" ? "pt-4" : "pt-3"}>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="text-sm leading-none text-[#6f7c90]">{author}</div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <FiThumbsUp className="h-4 w-4 text-[#6f7c90]" />
                <span className="text-sm leading-none text-[#6f7c90]">
                  {likes.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiBookmark className="h-4 w-4 text-[#6f7c90]" />
                <span className="text-sm leading-none text-[#6f7c90]">
                  {bookmarks.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center">
            <h2
              className={`${titleSize} font-semibold leading-normal text-[#374254]`}
            >
              {title}
            </h2>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex h-6 items-center rounded-[6px] bg-[#e1e1e7] px-2"
                >
                  <div className="text-xs font-medium leading-none text-[#374254]">
                    {tag}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
