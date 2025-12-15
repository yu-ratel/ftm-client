"use client";
import { FiBookmark, FiThumbsUp } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useBookmark } from "@/hooks/useBookmark";
import { useQueryClient } from "@tanstack/react-query";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import { useAuthStore } from "@/stores/AuthStore";
import OptimizedImage from "./OptimizedImage";

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
  sectionType?: "popular" | "bible" | "topBookmarks" | "groomingStory";
  ranking?: number;
  priority?: boolean; // 우선 로딩 여부
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
  ranking,
  priority = false,
}: PostCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

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
          case "groomingStory":
            queryClient.invalidateQueries({
              queryKey: ["groomingStoryPosts"],
            });
            break;
        }
      } else {
        // sectionType이 없으면 모든 쿼리 무효화 (기본값)
        queryClient.invalidateQueries({ queryKey: ["userPickPopularPosts"] });
        queryClient.invalidateQueries({ queryKey: ["userPickBiblePosts"] });
        queryClient.invalidateQueries({ queryKey: ["userPickTopBookmarks"] });
        queryClient.invalidateQueries({ queryKey: ["groomingStoryPosts"] });
      }
    },
  });

  const cardHeight = size === "small" ? "h-[253px]" : "h-[264px]";
  const cardWidth = size === "small" ? "max-w-[253px]" : "md:w-[392px]";
  const titleSize = size === "small" ? "text-xl" : "text-lg";

  return (
    <div
      className={`group relative mx-auto flex w-full ${cardWidth} cursor-pointer flex-col overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1`}
      onClick={() => router.push(`/user-pick/${id}`)}
    >
      <div
        className={`relative ${cardHeight} w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-out group-hover:shadow-2xl`}
      >
        <div className="absolute left-4 right-4 top-4 z-20 flex flex-row items-center justify-between opacity-100 transition-opacity duration-300 group-hover:opacity-100">
          {showRanking && (
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffffff] shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center text-center text-2xl font-bold leading-[24px] text-[#374254]">
                {ranking}
              </div>
            </div>
          )}
          <div
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffffff] shadow-lg backdrop-blur-sm transition-all duration-300 ${showRanking ? "" : "ml-auto"} ${isLoading ? "opacity-50" : "cursor-pointer hover:scale-110 hover:bg-gray-50"}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isLoading) {
                if (!user) {
                  openSigninSelectModal();
                } else {
                  handleBookmark(id);
                }
              }
            }}
          >
            <FiBookmark
              className={`h-6 w-6 transition-colors duration-200 ${isBookmarked ? "fill-[#1481fd] text-[#1481fd]" : "text-gray-600"}`}
            />
          </div>
        </div>
        <OptimizedImage
          src={image}
          alt={title}
          fill
          objectFit="cover"
          sizes={size === "small" ? "253px" : "(min-width: 768px) 392px, 100vw"}
          enableHoverEffect={true}
          priority={priority}
          lazy={!priority}
        />
      </div>

      <div className={size === "small" ? "pt-4" : "pt-3"}>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="text-sm leading-none text-[#6f7c90] transition-colors duration-200 group-hover:text-[#374254]">
              {author}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 transition-transform duration-200 group-hover:scale-105">
                <FiThumbsUp className="h-4 w-4 text-[#6f7c90]" />
                <span className="text-sm leading-none text-[#6f7c90]">
                  {likes.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 transition-transform duration-200 group-hover:scale-105">
                <FiBookmark className="h-4 w-4 text-[#6f7c90]" />
                <span className="text-sm leading-none text-[#6f7c90]">
                  {bookmarks.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center">
            <h2
              className={`${titleSize} font-semibold leading-normal text-[#374254] transition-colors duration-200 group-hover:text-[#1481fd]`}
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
