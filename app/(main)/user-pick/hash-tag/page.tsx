"use client";

import React, { useState } from "react";

const HashTagPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("스킨케어");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([
    "스킨/토너",
    "로션",
    "클렌저",
  ]);

  const categories = [
    "패션",
    "스킨케어",
    "헤어스타일링",
    "바디케어",
    "메이크업",
    "면도",
    "프레그런스",
    "건강",
  ];

  const tags = [
    "스킨/토너",
    "로션",
    "크림",
    "마스크팩",
    "클렌저",
    "필링/스크럽",
    "선케어",
  ];

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      selected: false,
    },
    {
      id: 2,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      selected: false,
    },
    {
      id: 3,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      selected: false,
    },
    {
      id: 4,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      selected: false,
    },
  ]);

  // 실제로 선택된 상품이 있는지 확인
  const actuallyHasSelectedProduct = products.some(
    (product) => product.selected
  );

  const posts = [
    {
      id: 1,
      title: "추천 제품이 소개된 게시글 1 : 제품 추천 이유",
      author: "핏더맨",
      likes: "00",
      comments: "00",
      tags: ["프레그런스", "향수", "헤어 스타일링"],
      image: "/user-pick-test/images/example.png",
    },
    {
      id: 2,
      title: "추천 제품이 소개된 게시글 2 : 제품 추천 이유",
      author: "핏더맨",
      likes: "00",
      comments: "00",
      tags: ["프레그런스", "향수", "헤어 스타일링"],
      image: "/user-pick-test/images/example.png",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[811px] px-4 pt-8 sm:px-6 lg:px-0">
      {/* 메인 헤더 */}
      <div className="mb-[72px]">
        <div className="mb-[24px] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold leading-6 text-[#374254] sm:text-2xl">
            새싹형 해시태그 추천
          </h1>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-[#9aabc5] sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-[250px] border-0 border-b border-[#9aabc5] bg-transparent px-0 py-2 text-sm font-medium text-[#374254] placeholder-[#9aabc5] focus:border-[#374254] focus:outline-none sm:text-base"
            />
            <svg
              className="ml-2 h-5 w-5 text-[#9aabc5] sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>

        {/* 카테고리 네비게이션 - 위아래 선 포함 */}
        <div className="mb-[48px]">
          {/* 위쪽 선 */}
          <div className="mb-6 h-[1px] w-full bg-[#e1e1e7]" />

          <div className="relative">
            <div className="overflow-x-auto pb-6">
              <div className="flex gap-4 sm:gap-[58px]">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative flex-shrink-0 whitespace-nowrap text-center text-sm font-medium transition-colors sm:text-base ${
                      selectedCategory === category
                        ? "font-bold text-[#374254]"
                        : "text-[#9aabc5] hover:text-[#374254]"
                    }`}
                    style={{
                      minWidth:
                        index === 2 ? "83px" : index === 6 ? "70px" : "56px",
                    }}
                  >
                    {category}
                    {selectedCategory === category && (
                      <div className="absolute -bottom-6 left-0 right-0 z-10 h-[2px] bg-[#374254]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 아래쪽 경계선 - 카테고리 하단선과 겹침 - PC/모바일 모두 노출 */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] w-full bg-[#e1e1e7]" />
          </div>
        </div>
      </div>

      {/* 태그 필터 섹션 - 새로운 그룹화 구조 */}
      <div className="mb-[54px]">
        {/* 태그 컨테이너 그룹 */}
        <div className="mb-[28px]">
          {/* 태그 리스트 영역 - 모든 태그 기본 위치에서 색깔만 변경 */}
          <div className="flex flex-wrap gap-[12px]">
            {tags.map((tag) => (
              <div
                key={tag}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-base font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-[#586780] text-white hover:bg-[#4a5a70]"
                    : "bg-[#ededf3] text-[#374254] hover:bg-[#e0e0e6]"
                }`}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    // 선택 해제
                    setSelectedTags(
                      selectedTags.filter((selectedTag) => selectedTag !== tag)
                    );
                  } else {
                    // 선택 추가
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
              >
                {tag}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedTags.includes(tag)) {
                      // 선택 해제
                      setSelectedTags(
                        selectedTags.filter(
                          (selectedTag) => selectedTag !== tag
                        )
                      );
                    } else {
                      // 선택 추가
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                    selectedTags.includes(tag)
                      ? "hover:bg-[#3a4a60]"
                      : "hover:bg-[#d0d0d6]"
                  }`}
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 액션 버튼 그룹 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 왼쪽 액션 그룹: 재생성 버튼 + 선택된 태그들 */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ededf3] transition-colors hover:bg-[#e0e0e6]"
              onClick={() => {
                // 태그 재생성 로직 - 모든 태그를 미선택 상태로 초기화하고 새로운 추천 태그 생성
                setSelectedTags([]);
                // 실제로는 API 호출을 통해 새로운 태그들을 받아올 수 있음
                console.log("태그 재생성 - 모든 태그 초기화");
              }}
            >
              <svg
                className="h-4 w-4 text-[#58677f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            {/* 선택된 태그들 표시 영역 - 밝은 색으로 표시 */}
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <div
                  key={`selected-in-action-${tag}`}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#ededf3] px-3 py-1.5 text-sm font-medium text-[#374254] transition-colors hover:bg-[#e0e0e6] sm:px-4 sm:py-2 sm:text-base"
                  onClick={() => {
                    setSelectedTags(
                      selectedTags.filter((selectedTag) => selectedTag !== tag)
                    );
                  }}
                >
                  {tag}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTags(
                        selectedTags.filter(
                          (selectedTag) => selectedTag !== tag
                        )
                      );
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-[#d0d0d6]"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 액션 그룹: 태그 적용 버튼 */}
          <div className="flex items-center gap-4">
            <button
              className="h-9 w-full min-w-[108px] rounded-xl bg-[#1481fd] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0f72e8] sm:w-[108px] sm:text-base"
              onClick={() => {
                // 태그 적용 로직
                console.log("태그 적용:", selectedTags);
              }}
            >
              태그 적용
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 - 상품과 게시물을 가로로 배치 */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-[24px]">
        {/* 왼쪽: 상품 목록 */}
        <div className="w-full lg:w-[392px]">
          <h2 className="mb-6 text-lg font-bold leading-[18px] text-[#374254] lg:mb-[42px]">
            상품 목록
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-[24px]">
            {products.map((product, index) => (
              <div
                key={product.id}
                onClick={() => {
                  // 클릭된 상품을 선택된 상태로 변경 (다른 상품들은 선택 해제)
                  const updatedProducts = products.map((p, i) => ({
                    ...p,
                    selected: i === index,
                  }));
                  setProducts(updatedProducts);
                }}
                className={`relative h-[200px] w-full cursor-pointer rounded-xl p-3 transition-all duration-300 hover:shadow-lg sm:h-[220px] lg:h-[242px] lg:w-[184px] ${
                  product.selected
                    ? "bg-[#374254] shadow-md ring-2 ring-[#374254] ring-opacity-30"
                    : "bg-[#f5f5f7] hover:bg-[#f0f0f2]"
                }`}
              >
                {/* 상품 이미지 영역 */}
                <div
                  className={`mx-auto mb-3 flex h-[120px] w-[120px] items-center justify-center rounded-lg transition-all duration-300 sm:h-[140px] sm:w-[140px] lg:mb-[12px] lg:h-[160px] lg:w-[160px] ${
                    product.selected ? "bg-white shadow-inner" : "bg-white"
                  }`}
                >
                  <div
                    className={`flex h-[90px] w-[90px] items-center justify-center rounded-lg transition-all duration-300 sm:h-[110px] sm:w-[110px] lg:h-[125px] lg:w-[125px] ${
                      product.selected ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`text-xs transition-colors duration-300 sm:text-sm ${
                        product.selected ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      추천 제품 이미지
                    </span>
                  </div>
                </div>

                {/* 상품명 */}
                <h3
                  className={`mb-2 px-[6px] text-sm font-bold leading-4 transition-colors duration-300 sm:text-base lg:mb-[10px] ${
                    product.selected ? "text-white" : "text-[#96a1b1]"
                  }`}
                >
                  {product.name}
                </h3>

                {/* 상품 설명 */}
                <p
                  className={`px-[6px] text-xs leading-3 transition-colors duration-300 ${
                    product.selected ? "text-gray-300" : "text-[#96a1b1]"
                  }`}
                >
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 조건부 렌더링 */}
        <div className="flex-1">
          {actuallyHasSelectedProduct ? (
            /* 상품이 선택된 경우: 게시물 피드 */
            <>
              <div className="mb-4 flex items-center justify-end gap-4 lg:mb-[24px] lg:gap-[18px]">
                <button className="text-sm font-medium text-[#374254] sm:text-base">
                  최신순
                </button>
                <button className="text-sm font-medium text-[#374254] sm:text-base">
                  인기순
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6 lg:space-y-[24px]">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                  >
                    {/* 게시물 이미지 컨테이너 */}
                    <div className="relative h-[160px] w-full sm:h-[180px] lg:h-[191px]">
                      {/* 실제 이미지 배경 */}
                      <div
                        className="h-full w-full rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200"
                        style={{
                          backgroundImage: `url(${post.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>

                      {/* 북마크 버튼 - 정확한 위치와 스타일 */}
                      <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg sm:right-3 sm:top-3 sm:h-10 sm:w-10 sm:rounded-xl">
                        <svg
                          className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* 게시물 정보 섹션 */}
                    <div className="p-3 sm:p-4">
                      {/* 메타 정보 줄: 작성자 + 상호작용 */}
                      <div className="mb-2 flex items-center justify-between sm:mb-3">
                        <div className="flex items-center gap-2">
                          {/* 작성자 프로필 */}
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 sm:h-6 sm:w-6">
                            <span className="text-xs font-semibold text-white">
                              {post.author.charAt(0)}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-[#6f7c90] sm:text-sm">
                            {post.author}
                          </span>
                        </div>

                        {/* 좋아요/댓글 통계 */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-3 w-3 text-red-400 sm:h-4 sm:w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs text-[#6f7c90] sm:text-sm">
                              {post.likes}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-3 w-3 text-blue-400 sm:h-4 sm:w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span className="text-xs text-[#6f7c90] sm:text-sm">
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 게시물 제목 */}
                      <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-tight text-[#374254] sm:mb-3 sm:text-lg">
                        {post.title}
                      </h3>

                      {/* 태그들 */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-[#f0f0f2] px-2 py-0.5 text-xs font-medium text-[#374254] transition-colors hover:bg-[#e1e1e7] sm:px-3 sm:py-1"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* 상품이 선택되지 않은 경우: 선택 안내 */
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="relative mb-[22px] flex h-[104px] w-[104px] items-center justify-center rounded-[17px] bg-[#f5f5f7]">
                  {/* 첫 번째 폴리곤 (뒤쪽) */}
                  <div
                    className="absolute h-[131px] w-[131px] rounded-[10px] bg-[#eaeaec]"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                    }}
                  />
                  {/* 두 번째 폴리곤 (앞쪽) */}
                  <div
                    className="absolute h-[131px] w-[131px] translate-y-[-13px] rounded-[10px] bg-[#e1e1e7]"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                    }}
                  />
                </div>
                <p className="text-base font-normal leading-[22px] text-[#9aabc5]">
                  제품을 선택해주세요
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashTagPage;
