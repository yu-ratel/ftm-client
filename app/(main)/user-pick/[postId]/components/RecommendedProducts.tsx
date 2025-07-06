import React from "react";
import Image from "next/image";
import { PostDetail, PostProduct } from "../../../types/PostType";
import { formatImageUrl } from "../utils";
import { openProductModal } from "@/utils/modal/OpenProductModal";
import { Product } from "@/app/(main)/write/types";

interface RecommendedProductsProps {
  postData: PostDetail;
}

const RecommendedProducts = ({ postData }: RecommendedProductsProps) => {
  if (!postData.postProducts || postData.postProducts.length === 0) {
    return null;
  }

  // PostProduct를 Product로 변환하는 함수
  const convertPostProductToProduct = (postProduct: PostProduct): Product => {
    return {
      id: postProduct.postProductId,
      img: formatImageUrl(postProduct.postProductImage.imageUrl),
      brand: postProduct.brand,
      title: postProduct.name,
      tags: postProduct.hashTags,
    };
  };

  // 상품 클릭 핸들러
  const handleProductClick = (postProduct: PostProduct) => {
    const product = convertPostProductToProduct(postProduct);
    openProductModal(() => {
      // 추천 상품 보기에서는 실제 저장 동작이 필요 없으므로 빈 함수
    }, product);
  };

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-lg font-semibold">게시글에서 추천한 상품</h2>
      <hr className="mb-1 border-t border-gray-200" />
      <div className="flex flex-col divide-y">
        {/* 상품을 2개씩 그룹으로 나누어 표시 */}
        {Array.from(
          { length: Math.ceil(postData.postProducts.length / 2) },
          (_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col py-4 md:flex-row">
              {postData.postProducts
                .slice(rowIndex * 2, rowIndex * 2 + 2)
                .map((product, i) => (
                  <div
                    key={product.postProductId}
                    className={`flex flex-1 items-center gap-4 ${i !== 0 ? "mt-3 border-t pt-3 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0" : ""} cursor-pointer rounded-md border-gray-200 px-2 transition-colors hover:bg-gray-50`}
                    onClick={() => handleProductClick(product)}
                  >
                    <Image
                      src={formatImageUrl(product.postProductImage.imageUrl)}
                      alt={product.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-md object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <span className="text-xs font-bold text-[#374254]">
                        {product.brand}
                      </span>
                      <div className="truncate text-sm">{product.name}</div>
                      <div className="mt-2 flex gap-1">
                        {product.hashTags.map((tag: string) => (
                          <div
                            key={tag}
                            className="relative flex flex-row items-center justify-center gap-3 rounded-md border border-solid border-[transparent] bg-[#e1e1e7] pb-1.5 pl-2 pr-2 pt-1.5"
                          >
                            <div className="relative text-left font-['Pretendard-Medium',_sans-serif] text-[10px] font-medium leading-none text-[#374254]">
                              {tag}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )
        )}
      </div>
      <hr className="mt-1 border-t border-gray-200" />
    </section>
  );
};

export default RecommendedProducts;
