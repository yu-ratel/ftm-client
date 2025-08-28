"use client";
import { FiEdit } from "react-icons/fi";
import SectionHeader from "../components/header/SectionHeader";
import PostSection from "./components/PostSection";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import { useRouter } from "next/navigation";

const bookmarkPicks = [
  {
    id: 1,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: ["프레그런스", "향수", "헤어 스타일링"],
  },
  {
    id: 2,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: ["프레그런스", "향수", "헤어 스타일링"],
  },
  {
    id: 3,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: ["프레그런스", "향수", "헤어 스타일링"],
  },
  {
    id: 4,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: ["프레그런스", "향수", "헤어 스타일링"],
  },
  {
    id: 5,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: ["프레그런스", "향수", "헤어 스타일링"],
  },
  {
    id: 6,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: ["프레그런스", "향수", "헤어 스타일링"],
  },
];

const groomingBiblePicks = [
  {
    id: 1,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
  },
  {
    id: 2,
    title: "퍼시스몰 B2B 마케팅 전략: 3D 설계 서비스로 리드를 확보...",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
  },
  {
    id: 3,
    title: "남자 기초 화장품의 모든것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
  },
  {
    id: 4,
    title: "퍼시스몰 B2B 마케팅 전략: 3D 설계 서비스로 리드를 확보...",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
  },
];

const trendingPicks = [
  {
    id: 1,
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: [
      "프레그런스",
      "향수",
      "헤어 스타일링",
      "헤어 스타일링",
      "헤어 스타일링",
    ],
  },
  {
    id: 2,
    title: "퍼시스틴트 B2B 마케팅 전략: 3D 콘텐츠 세일즈로 리드를 확보...",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: [
      "프레그런스",
      "향수",
      "헤어 스타일링",
      "헤어 스타일링",
      "헤어 스타일링",
    ],
  },
  {
    id: 3,
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: [
      "프레그런스",
      "향수",
      "헤어 스타일링",
      "헤어 스타일링",
      "헤어 스타일링",
    ],
  },
  {
    id: 4,
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    author: "핏더맨",
    likes: 0,
    bookmarks: 0,
    tags: [
      "프레그런스",
      "향수",
      "헤어 스타일링",
      "헤어 스타일링",
      "헤어 스타일링",
    ],
  },
];

export default function UserPick() {
  const router = useRouter();
  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-[808px] px-4">
        <SectionHeader title="그루밍 라운지" />
      </div>
      {/* 요즘 인기있는 글 섹션 */}
      <PostSection
        title="요즘 인기있는 글"
        subtitle="지금 사람들은 유저들을 위한 바이블"
        posts={trendingPicks}
        layout="2x2-grid"
        showRanking={true}
      />

      {/* 다시 찾아보고 싶은 그루밍 섹션 */}
      <HorizontalScrollSection
        title="다시 찾아보고 싶은 그루밍"
        subtitle="북마크 많은 게시물"
        posts={bookmarkPicks}
      />

      {/* 그루밍 바이블 섹션 */}
      <PostSection
        title="그루밍 바이블"
        subtitle="좋아요가 가장 많은 게시물"
        posts={groomingBiblePicks}
        layout="2x2-grid"
      />

      {/* 글쓰기 버튼 */}
      <div className="sticky bottom-10 z-50 ml-auto mr-0 mt-10 w-fit">
        <button
          onClick={() => router.push("/write")}
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
