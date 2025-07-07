import React, { RefObject } from "react";
import Image from "next/image";
import { Product } from "../types";
import { CategoryData, Hashtag } from "../../types/PostType";

interface ProductModalProps {
  isOpen: boolean;
  currentProduct: Partial<Product>;
  productImagePreview: string;
  selectedMainCategory: string;
  selectedSubCategories: string[];
  hashtagData: CategoryData[];
  isLoading: boolean;
  onClose: () => void;
  onSaveProduct: () => void;
  onProductChange: (updates: Partial<Product>) => void;
  onImageUpload: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDrop: (e: React.DragEvent) => void;
  onImageDragOver: (e: React.DragEvent) => void;
  onMainCategorySelect: (categoryKey: string) => void;
  onSubCategoryToggle: (subCategory: string) => void;
  productImageInputRef: RefObject<HTMLInputElement>;
  isViewOnly?: boolean;
}

const ProductModal = ({
  isOpen,
  currentProduct,
  productImagePreview,
  selectedMainCategory,
  selectedSubCategories,
  hashtagData,
  isLoading,
  onClose,
  onSaveProduct,
  onProductChange,
  onImageUpload,
  onImageChange,
  onImageDrop,
  onImageDragOver,
  onMainCategorySelect,
  onSubCategoryToggle,
  productImageInputRef,
  isViewOnly,
}: ProductModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="relative max-h-[90vh] w-full max-w-[548px] overflow-y-auto rounded-3xl bg-white shadow-2xl md:h-[580px] md:overflow-y-visible">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="flex h-full flex-col p-6 md:p-10">
        {/* Content */}
        <div className="flex flex-1 flex-col gap-6 md:flex-row">
          {/* Left Side - Image Upload */}
          <div className="flex flex-col gap-2 md:w-[228px]">
            <label className="text-sm font-medium text-[#374254]">
              상품 이미지
            </label>
            <div
              onClick={!isViewOnly ? onImageUpload : undefined}
              onDrop={!isViewOnly ? onImageDrop : undefined}
              onDragOver={!isViewOnly ? onImageDragOver : undefined}
              className={`relative flex h-[180px] w-full flex-col items-center justify-center rounded-[10px] border border-dashed border-[#e1e1e7] bg-[#f5f5f7] transition-colors md:h-[228px] ${
                !isViewOnly
                  ? "cursor-pointer hover:bg-gray-100"
                  : "cursor-default"
              }`}
            >
              {productImagePreview ? (
                <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                  <Image
                    src={productImagePreview}
                    alt="상품 이미지"
                    fill
                    objectFit="cover"
                  />
                </div>
              ) : (
                <>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9aabc5"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="mt-2 text-center text-[10px] leading-[140%] text-[#9aabc5]">
                    이미지를 드래그하거나
                    <br />
                    파일을 업로드 해주세요
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Categories */}
          <div className="flex flex-col gap-2 md:w-[228px]">
            <label className="text-sm font-medium text-[#374254]">태그*</label>
            <div className="h-[180px] overflow-hidden md:h-[228px]">
              <div className="flex h-full rounded-[10px] bg-[#f5f5f7]">
                {/* Main Categories */}
                <div className="tag-scroll flex w-1/2 flex-col overflow-y-auto">
                  <div className="flex flex-col gap-1 p-3.5">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="text-xs text-gray-500">로딩 중...</div>
                      </div>
                    ) : (
                      hashtagData.map((categoryData) => (
                        <button
                          key={categoryData.category.name}
                          onClick={
                            !isViewOnly
                              ? () =>
                                  onMainCategorySelect(
                                    categoryData.category.name
                                  )
                              : undefined
                          }
                          disabled={isViewOnly}
                          className={`flex-shrink-0 rounded-md px-3.5 py-2.5 text-xs font-medium transition-colors ${
                            selectedMainCategory === categoryData.category.name
                              ? "bg-[#1481fd] text-white"
                              : "bg-white text-[#374254]"
                          } ${
                            selectedMainCategory !==
                              categoryData.category.name && !isViewOnly
                              ? "hover:bg-gray-100"
                              : ""
                          } ${isViewOnly ? "cursor-default" : ""}`}
                        >
                          {categoryData.category.label}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="my-3.5 w-0.5 flex-shrink-0 bg-[#e1e1e7]"></div>

                {/* Sub Categories */}
                <div className="tag-scroll flex w-1/2 flex-col overflow-y-auto">
                  <div className="flex flex-col gap-1 p-3.5">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="text-xs text-gray-500">로딩 중...</div>
                      </div>
                    ) : (
                      selectedMainCategory &&
                      hashtagData
                        .find(
                          (data) => data.category.name === selectedMainCategory
                        )
                        ?.hashtags.map((hashtag: Hashtag) => (
                          <button
                            key={hashtag.name}
                            onClick={
                              !isViewOnly
                                ? () => onSubCategoryToggle(hashtag.tag)
                                : undefined
                            }
                            disabled={isViewOnly}
                            className={`flex-shrink-0 rounded-md px-3.5 py-2.5 text-xs font-medium transition-colors ${
                              selectedSubCategories.includes(hashtag.tag)
                                ? "bg-[#1481fd] text-white"
                                : "bg-white text-[#374254]"
                            } ${
                              !selectedSubCategories.includes(hashtag.tag) &&
                              !isViewOnly
                                ? "hover:bg-gray-100"
                                : ""
                            } ${isViewOnly ? "cursor-default" : ""}`}
                          >
                            {hashtag.tag}
                          </button>
                        ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Brand and Product Name */}
        <div className="mt-6 space-y-4">
          {/* Brand Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374254]">
              브랜드*
            </label>
            <input
              type="text"
              value={currentProduct.brand || ""}
              onChange={
                !isViewOnly
                  ? (e) => onProductChange({ brand: e.target.value })
                  : undefined
              }
              placeholder="브랜드명을 입력해주세요"
              readOnly={isViewOnly}
              className={`h-[38px] w-full rounded-[10px] border border-solid border-[#eaeaec] bg-[#f5f5f7] px-3 text-sm outline-none ${
                !isViewOnly
                  ? "focus:border-[#1481fd] focus:bg-white"
                  : "cursor-default opacity-75"
              }`}
            />
          </div>

          {/* Product Name Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374254]">
              상품명*
            </label>
            <input
              type="text"
              value={currentProduct.title || ""}
              onChange={
                !isViewOnly
                  ? (e) => onProductChange({ title: e.target.value })
                  : undefined
              }
              placeholder="상품명을 입력해주세요"
              readOnly={isViewOnly}
              className={`h-[38px] w-full rounded-[10px] border border-solid border-[#eaeaec] bg-[#f5f5f7] px-3 text-sm outline-none ${
                !isViewOnly
                  ? "focus:border-[#1481fd] focus:bg-white"
                  : "cursor-default opacity-75"
              }`}
            />
          </div>
        </div>

        {/* Submit Button */}
        {!isViewOnly && (
          <div className="mt-6">
            <button
              onClick={onSaveProduct}
              className="h-12 w-full rounded-xl bg-[#1481fd] text-base font-bold text-white transition-colors hover:bg-blue-600"
            >
              추천 상품 등록하기
            </button>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={productImageInputRef}
        onChange={onImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProductModal;
