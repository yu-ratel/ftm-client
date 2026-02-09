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
    <section className="mt-8">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg">추천 상품</h2>
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
                    <div className="flex w-full items-center gap-4">
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={60}
                        height={60}
                        className="h-[60px] w-[60px] shrink-0 rounded-lg object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <span className="text-xs font-bold text-[#374254]">
                          {product.brand}
                        </span>
                        <div className="truncate text-xs text-[#374254]">
                          {product.title}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {product.tags.map((tag: string) => (
                            <div
                              key={tag}
                              className="flex items-center justify-center rounded-[6px] bg-[#e1e1e7] px-2 py-1.5"
                            >
                              <span className="text-[10px] font-medium leading-none text-[#374254]">
                                {convertNameToTag(tag)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 수정 / 등록 취소 버튼 */}
                      <div className="flex shrink-0 flex-col gap-1">
                        <button
                          onClick={() => onEditProduct(product)}
                          className="flex h-7 w-[68px] items-center justify-center rounded border border-[#eaeaec] bg-white text-xs font-medium text-[#374254] transition-colors hover:bg-[#f5f5f7]"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product)}
                          className="flex h-7 w-[68px] items-center justify-center rounded border border-[#eaeaec] bg-white text-xs font-medium text-[#374254] transition-colors hover:bg-[#f5f5f7]"
                        >
                          등록 취소
                        </button>
                      </div>
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
