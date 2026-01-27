"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PostDetail, PostProduct } from "../../../types/PostType";
import { formatImageUrl } from "../utils";
import { openProductModal } from "@/utils/modal/OpenProductModal";
import { Product } from "@/app/(main)/write/types";
import OptimizedImage from "../../components/OptimizedImage";
import {
  createProductLike,
  type ProductLikeResponse,
} from "@/app/(main)/api/post";
import { ApiResponse } from "@/types/api";

interface RecommendedProductsProps {
  postData: PostDetail;
}

const RecommendedProducts = ({ postData }: RecommendedProductsProps) => {
  const queryClient = useQueryClient();

  const productLikeMutation = useMutation({
    mutationFn: createProductLike,
    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["post", String(postData.postId)],
        });
      }
    },
    onError: (error: AxiosError<ApiResponse<ProductLikeResponse>>) => {
      console.error("상품 좋아요 실패:", error);
    },
  });

  const handleProductLike = (
    e: React.MouseEvent<HTMLButtonElement>,
    postProductId: number
  ) => {
    e.stopPropagation();
    productLikeMutation.mutate(postProductId);
  };

  const convertPostProductToProduct = (postProduct: PostProduct): Product => {
    return {
      id: postProduct.postProductId,
      img: formatImageUrl(postProduct.postProductImage.imageUrl),
      brand: postProduct.brand,
      title: postProduct.name,
      tags: postProduct.hashtags,
    };
  };

  const handleProductInfoClick = (
    e: React.MouseEvent,
    postProduct: PostProduct
  ) => {
    e.stopPropagation();
    const product = convertPostProductToProduct(postProduct);
    openProductModal(() => {}, product, false);
  };

  if (!postData.postProducts || postData.postProducts.length === 0) {
    return null;
  }
  console.log("postData.postProducts");

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-lg font-semibold">게시글에서 추천한 상품</h2>
      <hr className="mb-1 border-t border-gray-200" />
      <div className="flex flex-col divide-y">
        {Array.from(
          { length: Math.ceil(postData.postProducts.length / 2) },
          (_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col py-4 md:flex-row">
              {postData.postProducts
                .slice(rowIndex * 2, rowIndex * 2 + 2)
                .map((product, i) => {
                  const likeCount = product.recommendedCount ?? 0;
                  const isLiked = likeCount > 0;
                  return (
                    <div
                      key={product.postProductId}
                      className={`flex flex-1 items-center gap-4 ${i !== 0 ? "mt-3 border-t pt-3 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0" : ""} rounded-md border-gray-200 px-2`}
                    >
                      <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-lg">
                        <OptimizedImage
                          src={formatImageUrl(
                            product.postProductImage.imageUrl
                          )}
                          alt={product.name}
                          width={60}
                          height={60}
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <span className="text-xs font-bold text-[#374254]">
                          {product.brand}
                        </span>
                        <div className="truncate text-xs text-[#374254]">
                          {product.name}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {product.hashtags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-[#e1e1e7] px-2 py-1.5 text-[10px] font-medium leading-none text-[#374254]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleProductInfoClick(e, product)}
                          className="flex h-7 w-[68px] items-center justify-center rounded border border-[#eaeaec] bg-white text-xs font-medium leading-none text-[#374254] transition-colors hover:bg-[#f5f5f7]"
                        >
                          상품 정보
                        </button>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleProductLike(e, product.postProductId)
                          }
                          disabled={productLikeMutation.isPending}
                          className={`flex h-7 w-[68px] items-center justify-center gap-1 rounded border border-[#eaeaec] bg-white text-xs font-light leading-none transition-colors hover:bg-[#f5f5f7] ${
                            isLiked ? "text-[#1481FD]" : "text-[#374254]"
                          }`}
                        >
                          <svg
                            className="h-4 w-[18px]"
                            fill={isLiked ? "#1481FD" : "none"}
                            stroke={isLiked ? "#1481FD" : "currentColor"}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          <span>
                            {likeCount >= 1000
                              ? `${(likeCount / 1000).toFixed(1)}K`
                              : likeCount}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )
        )}
      </div>
      <hr className="mt-1 border-t border-gray-200" />
    </section>
  );
};

export default RecommendedProducts;
