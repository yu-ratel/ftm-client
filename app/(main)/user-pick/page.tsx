"use client";
import { FiBookmark, FiThumbsUp, FiEdit } from "react-icons/fi";
import SectionHeader from "../components/header/SectionHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

const userPicks = [
  {
    id: 1,
    category: "라이프",
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    bookmarks: 0,
    views: 0,
  },
  {
    id: 2,
    category: "디자인",
    title: "퍼시스틴트 B2B 마케팅 전략: 3D 콘텐츠 세일즈로 리드를 확보...",
    image: "/user-pick-test/images/user_pick_sample.png",
    bookmarks: 0,
    views: 0,
  },
  {
    id: 3,
    category: "디자인",
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    bookmarks: 0,
    views: 0,
  },
  {
    id: 4,
    category: "디자인",
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    bookmarks: 0,
    views: 0,
  },
  {
    id: 5,
    category: "디자인",
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    bookmarks: 0,
    views: 0,
  },
  {
    id: 6,
    category: "디자인",
    title: "남자 기초 화장품의 모든 것",
    image: "/user-pick-test/images/user_pick_sample.png",
    bookmarks: 0,
    views: 0,
  },
];

export default function UserPick() {
  const router = useRouter();
  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-[808px] px-4">
        <SectionHeader title="유저 Pick" />
      </div>

      <div className="relative mx-auto mt-8 w-full max-w-[808px] px-4">
        <h3 className="text-lg font-medium">인기있는 글</h3>
        <p className="mt-1 text-sm text-gray-500">
          지금 사람들은 유저들을 위한 바이블
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
          {userPicks.map((pick) => (
            <div
              key={pick.id}
              className="relative mx-auto flex w-full flex-col overflow-hidden md:w-[392px]"
              onClick={() => router.push(`/user-pick/${pick.id}`)}
            >
              <div className="relative h-[264px] w-full overflow-hidden rounded-lg">
                <div className="absolute left-4 right-4 top-4 z-10 flex flex-row items-center justify-between">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffffff]">
                    <div className="flex items-center text-center text-2xl font-bold leading-[24px] text-[#374254]">
                      {pick.id}
                    </div>
                  </div>
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffffff]">
                    <FiBookmark className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
                <div className="relative h-full w-full">
                  <Image
                    src={pick.image}
                    alt="thumbnail"
                    fill
                    objectFit="cover"
                    sizes="(min-width: 768px) 392px, 100vw"
                  />
                </div>
              </div>

              <div className="pt-3">
                <div className="flex flex-col items-start justify-start gap-2">
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="text-sm leading-none text-[#6f7c90]">
                      핏더맨
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <FiThumbsUp className="h-4 w-4 text-[#6f7c90]" />
                        <span className="text-sm leading-none text-[#6f7c90]">
                          00
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiBookmark className="h-4 w-4 text-[#6f7c90]" />
                        <span className="text-sm leading-none text-[#6f7c90]">
                          00
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center">
                    <h2 className="text-lg font-semibold leading-normal text-[#374254]">
                      {pick.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <div className="flex h-6 items-center rounded-[6px] bg-[#e1e1e7] px-2">
                      <div className="text-xs font-medium leading-none text-[#374254]">
                        프레그런스
                      </div>
                    </div>
                    <div className="flex h-6 items-center rounded-[6px] bg-[#e1e1e7] px-2">
                      <div className="text-xs font-medium leading-none text-[#374254]">
                        향수
                      </div>
                    </div>
                    <div className="flex h-6 items-center rounded-[6px] bg-[#e1e1e7] px-2">
                      <div className="text-xs font-medium leading-none text-[#374254]">
                        헤어 스타일링
                      </div>
                    </div>
                    <div className="flex h-6 items-center rounded-[6px] bg-[#e1e1e7] px-2">
                      <div className="text-xs font-medium leading-none text-[#374254]">
                        헤어 스타일링
                      </div>
                    </div>
                    <div className="flex h-6 items-center rounded-[6px] bg-[#e1e1e7] px-2">
                      <div className="text-xs font-medium leading-none text-[#374254]">
                        헤어 스타일링
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </>
  );
}
