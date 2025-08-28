"use client";
import PostCard from "./PostCard";

interface PostData {
  id: number;
  title: string;
  image: string;
  author: string;
  likes: number;
  bookmarks: number;
  tags?: string[];
}

interface PostSectionProps {
  title: string;
  subtitle: string;
  posts: PostData[];
  layout: "3-column" | "2x2-grid";
  showRanking?: boolean;
}

export default function PostSection({
  title,
  subtitle,
  posts,
  layout,
  showRanking = false,
}: PostSectionProps) {
  const gridClasses = {
    "3-column": "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3",
    "2x2-grid": "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2",
  };

  const cardSize = layout === "3-column" ? "small" : "large";

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
          />
        ))}
      </div>
    </div>
  );
}
