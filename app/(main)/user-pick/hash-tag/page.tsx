"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProductHashtags,
  createProductLike,
  getProductsByHashtags,
  ProductByHashtag,
} from "@/app/(main)/api/post";
import { HashtagsResponse, CategoryData } from "@/app/(main)/types/PostType";
import { ApiResponse } from "@/types/api";
import { openToast } from "@/utils/modal/OpenToast";
import OptimizedImage from "../components/OptimizedImage";

const HashTagPage = () => {
  const router = useRouter();
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

  // 선택된 카테고리의 태그 목록 추출 (name과 tag 모두 저장)
  const tags =
    hashtagsData?.results
      .find((item: CategoryData) => item.category.name === selectedCategory)
      ?.hashtags.map((hashtag) => ({
        name: hashtag.name,
        tag: hashtag.tag,
      })) || [];

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // 카테고리 변경 시 선택된 태그 초기화
    setSelectedTags([]);
  };

  const handleToggleTag = (tagName: string) => {
    setSelectedTags((prevSelected) => {
      // 이미 선택된 태그면 제거
      if (prevSelected.includes(tagName)) {
        return prevSelected.filter((selectedTag) => selectedTag !== tagName);
      }

      // 3개 이상 선택 시 토스트 팝업 노출
      if (prevSelected.length >= 3) {
        openToast(
          "www.fittheman.com 내용:",
          "최대 3개까지 태그를 선택할 수 있어요."
        );
        return prevSelected;
      }

      // 3개 미만이면 추가
      return [...prevSelected, tagName];
    });
  };

  const handleRemoveTag = (tagName: string) => {
    setSelectedTags((prevSelected) =>
      prevSelected.filter((selectedTag) => selectedTag !== tagName)
    );
  };

  // 상품 데이터 타입 정의
  interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    liked: boolean;
    likeCount: number;
    productId: number;
    postId: number;
  }

  const [products, setProducts] = useState<Product[]>([]);

  // 해시태그로 상품 목록 조회 (최초 진입 시 빈 배열로 자동 호출)
  const { data: productsData, refetch: refetchProducts } = useQuery({
    queryKey: ["productsByHashtags", selectedTags],
    queryFn: async () => {
      // 빈 배열이어도 API 호출 (전체 상품 최신순 반환)
      const response = await getProductsByHashtags({
        hashTagList: selectedTags,
      });
      return response.data;
    },
    enabled: false, // 자동 호출 비활성화
  });

  // 최초 진입 시 전체 상품 조회
  useEffect(() => {
    refetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API 응답 데이터를 products state로 변환
  useEffect(() => {
    if (productsData?.data) {
      const transformedProducts: Product[] = productsData.data.map(
        (item: ProductByHashtag) => ({
          id: item.productId,
          productId: item.productId,
          postId: item.postId,
          name: item.productName,
          description: item.brand || "",
          image: item.productImage.startsWith("http")
            ? item.productImage
            : `https://${item.productImage}`,
          liked: item.likeYn,
          likeCount: item.recommendedCount,
        })
      );
      setProducts(transformedProducts);
    }
  }, [productsData]);

  // 상품 좋아요 mutation
  const productLikeMutation = useMutation({
    mutationFn: createProductLike,
    onSuccess: (response, productId) => {
      if (response.status === 200) {
        // isCreated: true면 좋아요 생성, false면 좋아요 취소
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === productId
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

  // 태그 적용 버튼 클릭 핸들러
  const handleApplyTags = () => {
    refetchProducts();
  };

  // 상품 카드 클릭 핸들러
  const handleProductClick = (postId: number) => {
    router.push(`/user-pick/${postId}`);
  };

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
                {tags.map((tagItem) => {
                  const isSelected = selectedTags.includes(tagItem.name);
                  return (
                    <button
                      key={tagItem.name}
                      onClick={() => handleToggleTag(tagItem.name)}
                      className={`flex h-[42px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-white px-4 text-sm leading-[14px] transition-colors ${
                        isSelected
                          ? "border border-[#bcdbff] font-semibold text-[#1481fd]"
                          : "border-0 font-medium text-[#374254] hover:text-[#1481fd]"
                      }`}
                    >
                      {tagItem.tag}
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

                {selectedTags.map((tagName) => {
                  // 선택된 태그의 tag 값을 찾기 위해 전체 해시태그 데이터에서 검색
                  const tagItem = hashtagsData?.results
                    .flatMap((item) => item.hashtags)
                    .find((hashtag) => hashtag.name === tagName);
                  return (
                    <div
                      key={`selected-${tagName}`}
                      className="flex h-[42px] items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium leading-[14px] text-[#374254] shadow-[0_8px_20px_rgba(55,66,84,0.08)]"
                    >
                      {tagItem?.tag || tagName}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tagName)}
                        className="text-xs font-semibold text-[#9aabc5] transition-colors hover:text-[#58677f]"
                        aria-label={`${tagItem?.tag || tagName} 제거`}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="h-[42px] w-[120px] rounded-lg bg-[#1481fd] text-sm font-medium text-white shadow-[0_10px_24px_rgba(20,129,253,0.18)] transition-colors hover:bg-[#0f72e8]"
                onClick={handleApplyTags}
              >
                태그 적용
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 메인 콘텐츠 - 상품 목록만 표시 */}
      <div className="w-full">
        <h2 className="mb-2 text-lg font-bold leading-[18px] text-[#374254]">
          추천받은 상품
        </h2>
        <span className="mb-6 block text-sm font-normal text-[#6F7C90] lg:mb-[42px]">
          처음 시작하는 유저들을 위한 바이블
        </span>

        {products.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-[#6F7C90]">
              {selectedTags.length === 0
                ? "태그를 선택하고 적용 버튼을 눌러주세요"
                : "해당 태그로 검색된 상품이 없습니다"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.postId)}
                className="relative w-full max-w-[194px] cursor-pointer rounded-xl border border-transparent bg-[#f5f5f7] p-3 transition-all duration-300 hover:border-[#bcdbff] hover:shadow-lg"
              >
                {/* 상품 이미지 영역 */}
                <div className="relative mx-auto mb-3 h-[170px] w-[170px] overflow-hidden rounded-lg bg-white transition-all duration-300">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    fill
                    objectFit="cover"
                  />
                </div>

                {/* 상품명 */}
                <h3 className="mb-[2px] text-sm font-semibold leading-[14px] text-[#96a1b1] transition-colors duration-300">
                  {product.name}
                </h3>

                {/* 상품 설명 */}
                <p className="mb-2 text-xs leading-[12px] text-[#96a1b1] transition-colors duration-300">
                  {product.description}
                </p>

                {/* 하단 버튼 영역 - 항상 표시 */}
                <div className="mt-2 flex items-center gap-[4px]">
                  {/* 상품 정보 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // 상품 정보 클릭 핸들러
                    }}
                    className="flex h-8 w-[108px] items-center justify-center rounded-[4px] border border-[#eaeaec] bg-white text-xs font-medium leading-[12px] text-[#374254] transition-colors hover:bg-[#f5f5f7]"
                  >
                    상품 정보
                  </button>

                  {/* 좋아요 버튼 */}
                  <button
                    onClick={(e) => handleProductLike(e, product.productId)}
                    disabled={productLikeMutation.isPending}
                    className={`flex h-8 w-[58px] items-center justify-center gap-1.5 rounded-[4px] border border-[#eaeaec] bg-white text-xs font-light leading-[12px] transition-colors ${
                      product.liked
                        ? "text-[#1481FD] hover:bg-[#f5f5f7]"
                        : "text-[#374254] hover:bg-[#f5f5f7]"
                    } `}
                  >
                    <svg
                      className="h-4 w-4"
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
        )}
      </div>
    </div>
  );
};

export default HashTagPage;
