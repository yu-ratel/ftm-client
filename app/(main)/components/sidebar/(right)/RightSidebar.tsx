"use client";
import { useState } from "react";
import SectionTitle from "../SectionTitle";
import TrendingItem from "../../trending/TrendingItem";
import Pagination from "../../../../../components/ui/Pagination";
import TrendingPostItem from "@/app/(main)/components/trending/TrendingPostItem";
import { useQuery } from "@tanstack/react-query";
import { getTrendingPosts, getTrendingUsers } from "@/app/(main)/api/post";

export default function RightSidebar() {
  const {
    data: trendingPostsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trendingPosts"],
    queryFn: getTrendingPosts,
  });

  const {
    data: trendingUsersData,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["trendingUsers"],
    queryFn: getTrendingUsers,
  });

  const [postsPage, setPostsPage] = useState(1);

  // 페이지네이션을 위한 데이터 슬라이싱
  const itemsPerPage = 5;
  const startIndex = (postsPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPagePosts = trendingPostsData?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((trendingPostsData?.length || 0) / itemsPerPage);

  return (
    <div className="mr-[18px] flex h-auto min-h-[558px] w-[324px] flex-col gap-8 p-4">
      {/* 트렌딩 픽더맨 섹션 */}
      <div className="w-[288px]">
        <SectionTitle title="트렌딩 핏더맨" />
        <div className="relative h-[232px] w-72 rounded-3xl bg-[#f5f5f7] p-6">
          <ul className="flex flex-col space-y-4">
            {isLoadingUsers ? (
              // 로딩 중일 때 스켈레톤 표시
              Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
                    <div className="ml-[22px] h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="h-6 w-6 animate-pulse rounded-[20px] bg-gray-200"></div>
                </li>
              ))
            ) : errorUsers ? (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-gray-500">
                  데이터를 불러올 수 없습니다
                </span>
              </div>
            ) : (
              trendingUsersData?.map((user) => (
                <TrendingItem
                  key={user.userId}
                  number={user.ranking}
                  title={user.userName}
                  profileImage={user.userImageUrl}
                />
              ))
            )}
          </ul>
        </div>
      </div>

      {/* 트렌딩 게시물 섹션 */}
      <div className="relative w-72">
        <SectionTitle title="트렌딩 게시물" />
        <div className="h-full w-full rounded-3xl bg-[#f5f5f7] p-5">
          <ul className="flex flex-col space-y-[38px]">
            {currentPagePosts.map((post) => (
              <TrendingPostItem
                key={post.postId}
                num={post.ranking}
                title={post.title}
                viewCount={post.viewCount.toString()}
                likeCount={post.likeCount.toString()}
                scrapCount={post.scrapCount.toString()}
                imageUrl={post.imageUrl}
              />
            ))}
          </ul>
          {/* 페이지네이션 - 데이터가 있을 때만 표시 */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={postsPage}
                totalPages={totalPages}
                onPageChange={setPostsPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
