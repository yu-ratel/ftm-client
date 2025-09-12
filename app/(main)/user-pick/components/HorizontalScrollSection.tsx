"use client";
import { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import PostCard from "./PostCard";
import { PostData } from "../types";

interface HorizontalScrollSectionProps {
  title: string;
  subtitle: string;
  posts: PostData[];
  sectionType?: "popular" | "bible" | "topBookmarks";
}

export default function HorizontalScrollSection({
  title,
  subtitle,
  posts,
  sectionType,
}: HorizontalScrollSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative mx-auto mt-8 w-full max-w-[808px] px-4">
      <h3 className="text-xl font-bold text-[#374254]">{title}</h3>
      <p className="mt-1 text-base text-[#6f7c90]">{subtitle}</p>

      <div className="relative mt-6">
        <ScrollContainer
          className="scroll-container flex cursor-grab overflow-x-auto"
          vertical={false}
          horizontal={true}
          hideScrollbars={true}
          activationDistance={10}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex-shrink-0"
              style={{
                width: isMobile ? "260px" : "280px",
              }}
            >
              <PostCard
                id={post.id}
                title={post.title}
                image={post.image}
                author={post.author}
                likes={post.likes}
                bookmarks={post.bookmarks}
                tags={post.tags}
                size="small"
                isBookmarked={post.isBookmarked || false}
                sectionType={sectionType}
              />
            </div>
          ))}
        </ScrollContainer>
      </div>

      <style jsx>{`
        .scroll-container {
          -webkit-overflow-scrolling: touch;
        }
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
