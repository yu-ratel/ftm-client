"use client";
import { useEffect, useRef } from "react";
import PostCard from "./PostCard";
import { PostData } from "../types";

interface PostSectionProps {
  title: string;
  subtitle: string;
  posts: PostData[];
  layout: "3-column" | "2x2-grid";
  showRanking?: boolean;
  sectionType?: "popular" | "bible" | "topBookmarks" | "groomingStory";
  // 무한 스크롤 관련 props
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export default function PostSection({
  title,
  subtitle,
  posts,
  layout,
  showRanking = false,
  sectionType,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: PostSectionProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const gridClasses = {
    "3-column": "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3",
    "2x2-grid": "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2",
  };

  const cardSize = layout === "3-column" ? "small" : "large";

  // Intersection Observer를 사용한 무한 스크롤
  useEffect(() => {
    if (!hasNextPage || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, onLoadMore, isFetchingNextPage]);

  return (
    <div className="relative mx-auto mt-8 w-full max-w-[808px] px-4">
      <h3 className="text-xl font-bold text-[#374254]">{title}</h3>
      <p className="mt-1 text-base text-[#6f7c90]">{subtitle}</p>

      <div className={`mt-6 ${gridClasses[layout]}`}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            author={post.author}
            likes={post.likes}
            bookmarks={post.bookmarks}
            tags={post.tags}
            size={cardSize}
            showRanking={showRanking}
            ranking={post.ranking}
            isBookmarked={post.userBookmarkYn || false}
            sectionType={sectionType}
          />
        ))}
      </div>

      {/* 무한 스크롤 로딩 영역 */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="mt-8 flex justify-center">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-[#6f7c90]">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#6f7c90] border-t-transparent"></div>
              <span>더 많은 게시물을 불러오는 중...</span>
            </div>
          ) : (
            <div className="text-[#6f7c90]">스크롤하여 더 보기</div>
          )}
        </div>
      )}
    </div>
  );
}
