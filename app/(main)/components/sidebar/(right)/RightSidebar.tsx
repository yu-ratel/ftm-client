"use client";
import { useState } from "react";
import SectionTitle from "../SectionTitle";
import TrendingItem from "../../trending/TrendingItem";
import Pagination from "../../../../../components/ui/Pagination";
import TrendingPostItem from "@/app/(main)/components/trending/TrendingPostItem";

export default function RightSidebar() {
  const [postsPage, setPostsPage] = useState(1);

  const trendingItems = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    number: i + 1,
    title: "트렌딩 핏더맨",
  }));

  const trendingPosts = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    number: i + 1,
    title: "어떻게 해야 잘 입었다고 소문이...",
    stats: {
      year: "2025",
      count: "24",
      views: "434",
    },
  }));

  return (
    <div className="mr-[18px] flex h-auto min-h-[558px] w-[324px] flex-col gap-8 p-4">
      {/* 트렌딩 픽더맨 섹션 */}
      <div className="w-[288px]">
        <SectionTitle title="트렌딩핏더맨" />
        <div className="relative h-[232px] w-72 rounded-3xl bg-[#f5f5f7] p-6">
          <ul className="flex flex-col space-y-4">
            {trendingItems.map((item) => (
              <TrendingItem
                key={item.id}
                number={item.number}
                title={item.title}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* 트렌딩 게시물 섹션 */}
      {/* <div className="w-[288px]">
        <SectionTitle icon={<FiTrendingUp />} title="트렌딩 게시물" />
        <div className="relative w-72 rounded-3xl bg-[#f5f5f7] p-6">
          
          <Pagination
            currentPage={postsPage}
            totalPages={3}
            onPageChange={setPostsPage}
          />
        </div>
      </div> */}
      <div className="relative w-72">
        <SectionTitle title="트렌딩 게시물" />
        <div className="h-full w-full rounded-3xl bg-[#f5f5f7] p-5">
          <ul className="flex flex-col space-y-[38px]">
            {trendingPosts.map((post) => (
              <TrendingPostItem
                key={post.id}
                num={post.number}
                title={post.title}
                year={post.stats.year}
                commentCount={post.stats.count}
                viewCount={post.stats.views}
              />
            ))}
          </ul>
          <Pagination
            currentPage={postsPage}
            totalPages={3}
            onPageChange={setPostsPage}
          />
        </div>
      </div>
    </div>
  );
}
