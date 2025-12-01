"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { getProductHashtags, createProductLike } from "@/app/(main)/api/post";
import { HashtagsResponse, CategoryData } from "@/app/(main)/types/PostType";
import { ApiResponse } from "@/types/api";

const HashTagPage = () => {
  const [hashtagsData, setHashtagsData] = useState<HashtagsResponse | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // API에서 해시태그 데이터 가져오기
  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const data = await getProductHashtags();
        setHashtagsData(data);
        // 최초 진입 시 카테고리 미선택 상태 유지
      } catch (error) {
        console.error("해시태그 데이터 로딩 실패:", error);
      }
    };

    fetchHashtags();
  }, []);

  // 카테고리 목록 추출 (name과 label을 함께 저장)
  const categories =
    hashtagsData?.results.map((item: CategoryData) => ({
      name: item.category.name,
      label: item.category.label,
    })) || [];

  // 선택된 카테고리의 태그 목록 추출
  const tags =
    hashtagsData?.results
      .find((item: CategoryData) => item.category.name === selectedCategory)
      ?.hashtags.map((hashtag) => hashtag.tag) || [];

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // 카테고리 변경 시 선택된 태그 초기화
    setSelectedTags([]);
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelected, tag]
    );
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prevSelected) =>
      prevSelected.filter((selectedTag) => selectedTag !== tag)
    );
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      image: "/user-pick-test/images/user_pick_sample.png",
      selected: false,
      liked: false,
      likeCount: 6800,
    },
    {
      id: 2,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      image: "/user-pick-test/images/user_pick_sample.png",
      selected: false,
      liked: false,
      likeCount: 6800,
    },
    {
      id: 3,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      image: "/user-pick-test/images/user_pick_sample.png",
      selected: false,
      liked: false,
      likeCount: 6800,
    },
    {
      id: 4,
      name: "추천 제품명",
      description: "제품 정보, 제품 상세, 제품",
      image: "/user-pick-test/images/user_pick_sample.png",
      selected: false,
      liked: false,
      likeCount: 6800,
    },
  ]);

  // 상품 좋아요 mutation
  const productLikeMutation = useMutation({
    mutationFn: createProductLike,
    onSuccess: (response, productId) => {
      if (response.status === 200) {
        // isCreated: true면 좋아요 생성, false면 좋아요 취소
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  liked: response.data.isCreated,
                  likeCount: response.data.isCreated
                    ? product.likeCount + 1
                    : Math.max(0, product.likeCount - 1),
                }
              : product
          )
        );
      }
    },
    onError: (error: AxiosError<ApiResponse>) => {
      console.error("상품 좋아요 실패:", error);
      // 404 에러 처리
      if (error.response?.status === 404) {
        alert("요청한 상품을 찾을 수 없습니다.");
      } else {
        alert("좋아요 처리 중 오류가 발생했습니다.");
      }
    },
  });

  // 상품 좋아요 핸들러
  const handleProductLike = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.stopPropagation();
    productLikeMutation.mutate(productId);
  };

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
            해시태그 추천
          </h1>
        </div>

        {/* 카테고리 & 태그 필터 - Figma 스타일 적용 */}
        <div className="mb-[54px] overflow-hidden rounded-2xl bg-[#f5f5f7] shadow-[0_10px_24px_rgba(55,66,84,0.08)]">
          {/* 1. 카테고리 네비게이션 */}
          <div className="">
            <div className="flex w-full flex-nowrap items-center gap-1 px-[6px] py-[5px] sm:gap-1 sm:px-[6px]">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`flex h-[42px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-white px-4 text-sm leading-[14px] transition-colors ${
                      isSelected
                        ? "border border-[#bcdbff] font-semibold text-[#1481fd]"
                        : "border-0 font-medium text-[#374254] hover:text-[#1481fd]"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}

              <button
                type="button"
                className="ml-auto flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg bg-white text-[#9aabc5] transition-colors hover:text-[#1481fd]"
                aria-label="카테고리 검색"
              >
                <svg
                  className="h-[18px] w-[18px]"
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
              </button>
            </div>
          </div>

          {/* 2. 태그 리스트 - 카테고리가 선택되었을 때만 표시 */}
          {selectedCategory && (
            <div className="">
              <div className="flex w-full flex-nowrap items-center gap-1 px-[6px] py-[5px] sm:gap-1 sm:px-[6px]">
                {tags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className={`flex h-[42px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-white px-4 text-sm leading-[14px] transition-colors ${
                        isSelected
                          ? "border border-[#bcdbff] font-semibold text-[#1481fd]"
                          : "border-0 font-medium text-[#374254] hover:text-[#1481fd]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. 액션 영역 - 선택된 태그가 있을 때만 표시 */}
          {selectedTags.length > 0 && (
            <div className="flex flex-col gap-1 px-[6px] py-[5px] sm:flex-row sm:items-center sm:justify-between sm:px-[6px]">
              <div className="flex flex-wrap items-center gap-[12px]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTags([]);
                    console.log("태그 재생성 - 모든 태그 초기화");
                  }}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-white text-[#58677f] shadow-[0_8px_20px_rgba(55,66,84,0.08)] transition-colors hover:text-[#1481fd]"
                  aria-label="태그 재생성"
                >
                  <svg
                    className="h-5 w-5"
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

                {selectedTags.map((tag) => (
                  <div
                    key={`selected-${tag}`}
                    className="flex h-[42px] items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium leading-[14px] text-[#374254] shadow-[0_8px_20px_rgba(55,66,84,0.08)]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-xs font-semibold text-[#9aabc5] transition-colors hover:text-[#58677f]"
                      aria-label={`${tag} 제거`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                disabled={selectedTags.length === 0}
                className={`h-[42px] w-[120px] rounded-lg text-sm font-medium text-white transition-colors ${
                  selectedTags.length === 0
                    ? "cursor-not-allowed bg-[#e1e1e7]"
                    : "bg-[#1481fd] shadow-[0_10px_24px_rgba(20,129,253,0.18)] hover:bg-[#0f72e8]"
                }`}
                onClick={() => {
                  if (selectedTags.length > 0) {
                    console.log("태그 적용:", selectedTags);
                  }
                }}
              >
                태그 적용
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 메인 콘텐츠 - 상품과 게시물을 가로로 배치 */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-[24px]">
        {/* 왼쪽: 상품 목록 */}
        <div className="w-full lg:w-[392px]">
          <h2 className="mb-2 text-lg font-bold leading-[18px] text-[#374254]">
            추천받은 상품
          </h2>
          <span className="mb-6 block text-sm font-normal text-[#6F7C90] lg:mb-[42px]">
            처음 시작하는 유저들을 위한 바이블
          </span>

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
                className={`relative w-full cursor-pointer rounded-xl border p-3 transition-all duration-300 hover:shadow-lg lg:w-[184px] ${
                  product.selected
                    ? "border-[#bcdbff] bg-[#f5f5f7]"
                    : "border-transparent bg-[#f5f5f7] hover:bg-[#f0f0f2]"
                }`}
              >
                {/* 상품 이미지 영역 */}
                <div className="relative mx-auto mb-3 h-[120px] w-[120px] overflow-hidden rounded-lg bg-white transition-all duration-300 sm:h-[140px] sm:w-[140px] lg:mb-[12px] lg:h-[160px] lg:w-[160px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 상품명 */}
                <h3
                  className={`mb-1 px-[6px] text-sm font-semibold leading-[14px] transition-colors duration-300 sm:text-base lg:mb-[2px] ${
                    product.selected ? "text-[#1481fd]" : "text-[#96a1b1]"
                  }`}
                >
                  {product.name}
                </h3>

                {/* 상품 설명 */}
                <p
                  className={`mb-2 px-[6px] text-xs leading-[12px] transition-colors duration-300 ${
                    product.selected ? "text-[#1481fd]" : "text-[#96a1b1]"
                  }`}
                >
                  {product.description}
                </p>

                {/* 하단 버튼 영역 - 항상 표시 */}
                <div className="mt-2 flex items-center justify-between gap-1 px-[6px]">
                  {/* 상품 정보 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // 상품 정보 클릭 핸들러
                    }}
                    className="flex h-8 items-center justify-center rounded-[4px] border border-[#eaeaec] bg-white px-3 text-xs font-medium leading-[12px] text-[#374254] transition-colors hover:bg-[#f5f5f7]"
                  >
                    상품 정보
                  </button>

                  {/* 좋아요 버튼 */}
                  <button
                    onClick={(e) => handleProductLike(e, product.id)}
                    disabled={productLikeMutation.isPending}
                    className={`flex h-8 items-center justify-center gap-1.5 rounded-[4px] border border-[#eaeaec] bg-white px-2 text-xs font-light leading-[12px] transition-colors ${
                      product.liked
                        ? "text-[#1481FD] hover:bg-[#f5f5f7]"
                        : "text-[#374254] hover:bg-[#f5f5f7]"
                    } `}
                  >
                    <svg
                      className="h-4 w-[16px]"
                      fill={product.liked ? "#1481FD" : "none"}
                      stroke={product.liked ? "#1481FD" : "currentColor"}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className={product.liked ? "text-[#1481FD]" : ""}>
                      {product.likeCount >= 1000
                        ? `${(product.likeCount / 1000).toFixed(1)}K`
                        : product.likeCount}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 조건부 렌더링 */}
        <div className="flex-1">
          {actuallyHasSelectedProduct ? (
            /* 상품이 선택된 경우: 게시물 피드 */
            <>
              <div className="mb-6 lg:mb-[42px]">
                {/* 왼쪽 제목과 span 높이 맞추기 위한 공간 */}
                <div className="h-[18px]"></div>
                <div className="mt-2 h-5"></div>
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
            <div className="flex min-h-full flex-1 items-center justify-center">
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
