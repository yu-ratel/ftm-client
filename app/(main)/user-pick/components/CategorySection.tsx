"use client";

import { useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { showModal, hideModal } from "@/stores/ModalStore";
import FilterPopup from "../../components/modal/FilterPopup";

interface CategorySectionProps {
  className?: string;
  onCategoryChange?: (category: CategoryTab) => void;
  onSortChange?: (sortOption: SortOption) => void;
}

export type CategoryTab = "grooming-award" | "grooming-story";
export type SortOption = "latest" | "popular";

export default function CategorySection({
  className = "",
  onCategoryChange,
  onSortChange,
}: CategorySectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<CategoryTab>("grooming-award");
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  const handleCategoryChange = (category: CategoryTab) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
    onSortChange?.(sort);
  };

  const handleFilterClick = () => {
    showModal({
      component: (
        <FilterPopup
          onClose={hideModal}
          onApply={(categories, tags) => {
            console.log({ categories, tags });
            hideModal();
          }}
        />
      ),
    });
  };

  return (
    <div className={`mx-auto w-full max-w-[808px] px-4 ${className}`}>
      {/* 카테고리 탭 + 정렬/필터 섹션 */}
      <div className="flex items-center gap-4">
        {/* 카테고리 탭 - 피그마 크기에 맞게 조정 */}
        <div className="flex rounded-lg bg-[#f5f5f7] p-1.5">
          <button
            onClick={() => handleCategoryChange("grooming-award")}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeCategory === "grooming-award"
                ? "bg-white text-[#374254]"
                : "text-[#9aabc5]"
            }`}
            style={{ width: "117px", height: "42px" }}
          >
            그루밍 어워드
          </button>
          <button
            onClick={() => handleCategoryChange("grooming-story")}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeCategory === "grooming-story"
                ? "bg-white text-[#374254]"
                : "text-[#9aabc5]"
            }`}
            style={{ width: "117px", height: "42px" }}
          >
            그루밍 이야기
          </button>
        </div>

        {/* 오른쪽 영역: 정렬 옵션 + 필터 버튼 */}
        <div className="ml-auto flex items-center gap-4">
          {/* 정렬 옵션 (그루밍 이야기일 때만 표시) - 필터 버튼 왼쪽에 위치 */}
          {activeCategory === "grooming-story" && (
            <div className="flex rounded-lg bg-[#f5f5f7] p-1.5">
              <button
                onClick={() => handleSortChange("latest")}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  sortOption === "latest"
                    ? "bg-white text-[#374254]"
                    : "text-[#9aabc5]"
                }`}
                style={{ width: "77px", height: "42px" }}
              >
                최신순
              </button>
              <button
                onClick={() => handleSortChange("popular")}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  sortOption === "popular"
                    ? "bg-white text-[#374254]"
                    : "text-[#9aabc5]"
                }`}
                style={{ width: "77px", height: "42px" }}
              >
                인기순
              </button>
            </div>
          )}

          {/* 필터 버튼 - 가장 오른쪽에 위치 */}
          <button
            className="flex h-[54px] w-[54px] items-center justify-center rounded-lg bg-[#f5f5f7] transition-colors hover:bg-[#e1e1e7]"
            onClick={handleFilterClick}
          >
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-white">
              <HiAdjustmentsHorizontal className="h-[18px] w-[18px] text-[#374254]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
