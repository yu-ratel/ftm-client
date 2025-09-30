"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import SectionHeader from "../components/header/SectionHeader";
import PostSection from "./components/PostSection";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import CategorySection, { CategoryTab } from "./components/CategorySection";
import { useRouter } from "next/navigation";
import {
  getUserPickPopularPosts,
  getUserPickBiblePosts,
  getUserPickTopBookmarks,
} from "./api";
import { useInfiniteGroomingStory } from "@/hooks/useInfiniteGroomingStory";
import { UserPickPost, PostData } from "./types";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import { useAuthStore } from "@/stores/AuthStore";

// API 데이터를 PostSection에서 사용하는 형태로 변환하는 함수
const transformApiDataToPostData = (apiData: UserPickPost[]): PostData[] => {
  return apiData.map((post) => ({
    id: post.postId,
    title: post.title,
    image: post.imageUrl.startsWith("http")
      ? post.imageUrl
      : `https://${post.imageUrl}`,
    author: post.authorName,
    likes: post.likeCount,
    bookmarks: post.scrapCount,
    tags: post.hashtags,
    ranking: post.ranking,
    userBookmarkYn: post.userBookmarkYn || false,
  }));
};

export default function UserPick() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] =
    useState<CategoryTab>("grooming-award");

  // useQuery로 API 호출 - 그루밍 어워드일 때만 활성화
  const {
    data: popularPostsResponse,
    isLoading: isLoadingPopular,
    error: errorPopular,
  } = useQuery({
    queryKey: ["userPickPopularPosts"],
    queryFn: getUserPickPopularPosts,
    enabled: activeCategory === "grooming-award",
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  const {
    data: biblePostsResponse,
    isLoading: isLoadingBible,
    error: errorBible,
  } = useQuery({
    queryKey: ["userPickBiblePosts"],
    queryFn: getUserPickBiblePosts,
    enabled: activeCategory === "grooming-award",
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  const {
    data: topBookmarksResponse,
    isLoading: isLoadingTopBookmarks,
    error: errorTopBookmarks,
  } = useQuery({
    queryKey: ["userPickTopBookmarks"],
    queryFn: getUserPickTopBookmarks,
    enabled: activeCategory === "grooming-award",
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  // API 데이터를 PostSection 형태로 변환
  const popularPosts: PostData[] = popularPostsResponse?.data
    ? transformApiDataToPostData(popularPostsResponse.data)
    : [];

  const biblePosts: PostData[] = biblePostsResponse?.data
    ? transformApiDataToPostData(biblePostsResponse.data)
    : [];

  const topBookmarksPosts: PostData[] = topBookmarksResponse?.data
    ? transformApiDataToPostData(topBookmarksResponse.data)
    : [];

  // 그루밍 이야기 무한 스크롤
  const {
    data: groomingStoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingGroomingStory,
    error: errorGroomingStory,
  } = useInfiniteGroomingStory({
    limit: 5,
    enabled: activeCategory === "grooming-story",
  });

  // 그루밍 이야기 데이터 변환
  const groomingStoryPosts: PostData[] = groomingStoryData?.pages
    ? groomingStoryData.pages.flatMap((page) =>
        transformApiDataToPostData(page.data.data)
      )
    : [];

  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-[808px] px-4">
        <SectionHeader title="그루밍 라운지" />
      </div>

      {/* 카테고리 섹션 */}
      <CategorySection className="mt-8" onCategoryChange={setActiveCategory} />

      {/* 그루밍 어워드일 때만 기존 섹션들 표시 */}
      {activeCategory === "grooming-award" && (
        <>
          {/* 요즘 인기있는 글 섹션 - API 데이터 연동 */}
          <PostSection
            title="요즘 인기있는 글"
            subtitle={
              isLoadingPopular
                ? "데이터를 불러오는 중..."
                : errorPopular
                  ? "데이터 로딩 실패 - 기본 데이터 표시 중"
                  : "지금 사람들은 유저들을 위한 바이블"
            }
            posts={popularPosts}
            layout="2x2-grid"
            showRanking={true}
            sectionType="popular"
          />

          {/* 다시 찾아보고 싶은 그루밍 섹션 - API 데이터 연동 */}
          <HorizontalScrollSection
            title="다시 찾아보고 싶은 그루밍"
            subtitle={
              isLoadingTopBookmarks
                ? "데이터를 불러오는 중..."
                : errorTopBookmarks
                  ? "데이터 로딩 실패 - 기본 데이터 표시 중"
                  : "북마크가 가장 많은 게시물"
            }
            posts={topBookmarksPosts}
            sectionType="topBookmarks"
          />

          {/* 그루밍 바이블 섹션 - API 데이터 연동 */}
          <PostSection
            title="그루밍 바이블"
            subtitle={
              isLoadingBible
                ? "데이터를 불러오는 중..."
                : errorBible
                  ? "데이터 로딩 실패 - 기본 데이터 표시 중"
                  : "좋아요가 가장 많은 게시물"
            }
            posts={biblePosts}
            layout="2x2-grid"
            showRanking={false}
            sectionType="bible"
          />
        </>
      )}

      {/* 그루밍 이야기일 때 컨텐츠 표시 */}
      {activeCategory === "grooming-story" && (
        <PostSection
          title="요즘 인기있는 글"
          subtitle={
            isLoadingGroomingStory
              ? "데이터를 불러오는 중..."
              : errorGroomingStory
                ? "데이터 로딩 실패"
                : "최신순으로 정렬된 게시물"
          }
          posts={groomingStoryPosts}
          layout="3-column"
          showRanking={false}
          sectionType="groomingStory"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => fetchNextPage()}
        />
      )}

      {/* 글쓰기 버튼 */}
      <div className="sticky bottom-10 z-50 ml-auto mr-0 mt-10 w-fit">
        <button
          onClick={() => {
            if (!user) {
              openSigninSelectModal();
            } else {
              router.push("/write");
            }
          }}
          className="relative h-[60px] w-[60px] cursor-pointer"
        >
          <div
            className="absolute bottom-0 left-0 h-[60px] w-[60px] rounded-full bg-[#1481fd]"
            style={{
              boxShadow: "0px 3px 6px 0px rgba(82, 180, 204, 0.6)",
            }}
          />
          <FiEdit className="absolute bottom-[17px] left-[17px] h-[26px] w-[26px] text-white" />
        </button>
      </div>
    </>
  );
}
