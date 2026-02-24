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
  const [isBelowSm, setIsBelowSm] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsBelowSm(window.innerWidth < 543);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="relative mx-auto mt-8 w-full max-w-[808px] px-4">
      <h3 className="text-xl font-bold text-[#374254]">{title}</h3>
      <p className="mt-1 text-base text-[#6f7c90]">{subtitle}</p>

      <div className="relative mt-6">
        {isBelowSm ? (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.image}
                author={post.author}
                likes={post.likes}
                bookmarks={post.bookmarks}
                tags={post.tags}
                size="small"
                isBookmarked={post.userBookmarkYn || false}
                sectionType={sectionType}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
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
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="w-[280px] flex-shrink-0"
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
                  isBookmarked={post.userBookmarkYn || false}
                  sectionType={sectionType}
                  priority={index < 3}
                />
              </div>
            ))}
          </ScrollContainer>
        )}
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
