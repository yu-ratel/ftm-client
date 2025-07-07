import React from "react";
import Image from "next/image";
import { Product } from "../types";
import { CategoryData } from "../../types/PostType";

interface ProductManagerProps {
  products: Product[];
  hashtagData: CategoryData[];
  onOpenProductModal: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

const ProductManager = ({
  products,
  hashtagData,
  onOpenProductModal,
  onEditProduct,
  onDeleteProduct,
}: ProductManagerProps) => {
  // name값을 tag값으로 변환하는 함수
  const convertNameToTag = (name: string): string => {
    for (const categoryData of hashtagData) {
      const hashtag = categoryData.hashtags.find((h) => h.name === name);
      if (hashtag) {
        return hashtag.tag;
      }
    }
    return name; // 매칭되지 않으면 원래 값 반환
  };
  return (
    <section className="mx-6 mt-8">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg">게시글에서 추천한 상품</h2>
      </div>
      <hr className="mb-1 border-t border-gray-200" />

      <div className="flex flex-col divide-y">
        {Array.from(
          { length: Math.ceil((products.length + 1) / 2) },
          (_, row) => (
            <div key={row} className="flex flex-col py-4 md:flex-row">
              {[0, 1].map((colIndex) => {
                const productIndex = row * 2 + colIndex;
                const product = products[productIndex];
                const isAddButton = productIndex === products.length;

                if (!product && !isAddButton) {
                  return (
                    <div
                      key={colIndex}
                      className={`flex flex-1 items-center gap-4 ${colIndex !== 0 ? "mt-3 border-t pt-3 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0" : ""} border-gray-200 px-2`}
                    ></div>
                  );
                }

                if (isAddButton) {
                  return (
                    <div
                      key="add-button"
                      className={`flex flex-1 items-center gap-4 ${colIndex !== 0 ? "mt-3 border-t pt-3 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0" : ""} border-gray-200 px-2`}
                    >
                      <button
                        onClick={onOpenProductModal}
                        className="h-[60px] w-full rounded-[12px] border border-[#E1E1E7] bg-[#F5F5F7] text-sm font-medium text-gray-600 transition-colors hover:text-gray-800"
                      >
                        등록하기
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={product.id}
                    className={`flex flex-1 items-center gap-4 ${colIndex !== 0 ? "mt-3 border-t pt-3 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0" : ""} border-gray-200 px-2`}
                  >
                    <div className="relative flex w-full items-center gap-4">
                      <button
                        onClick={() => onEditProduct(product)}
                        className="flex flex-1 items-center gap-4 text-left transition-opacity hover:opacity-70"
                      >
                        <Image
                          src={product.img}
                          alt={product.title}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-md object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <span className="text-xs font-bold text-[#374254]">
                            {product.brand}
                          </span>
                          <div className="truncate text-sm">
                            {product.title}
                          </div>
                          <div className="mt-2 flex gap-1">
                            {product.tags.map((tag: string) => (
                              <div
                                key={tag}
                                className="relative flex flex-row items-center justify-center gap-3 rounded-md border border-solid border-[transparent] bg-[#e1e1e7] pb-1.5 pl-2 pr-2 pt-1.5"
                              >
                                <div className="relative text-left font-['Pretendard-Medium',_sans-serif] text-[10px] font-medium leading-none text-[#374254]">
                                  {convertNameToTag(tag)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </button>

                      {/* 삭제 버튼 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProduct(product);
                        }}
                        className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#1481fd] text-white opacity-100 transition-opacity hover:opacity-70"
                        title="상품 삭제"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
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

export default ProductManager;
