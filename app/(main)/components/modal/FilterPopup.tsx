"use client";
import React, { useState } from "react";
import Image from "next/image";

interface FilterTag {
  id: string;
  label: string;
}

const categories: FilterTag[] = [
  { id: "skincare", label: "스킨케어" },
  { id: "perfume", label: "향수" },
  { id: "health", label: "건강" },
  { id: "makeup", label: "메이크업" },
  { id: "fashion", label: "패션" },
  { id: "shaving", label: "면도" },
  { id: "hair", label: "헤어 스타일링" },
  { id: "body", label: "바디 케어" },
];

const tags: FilterTag[] = [
  { id: "moisturizing", label: "피부 보습" },
  { id: "suncare", label: "선케어" },
  { id: "mask", label: "마스크팩" },
  { id: "cleansing", label: "클렌징" },
  { id: "supplement", label: "영양제" },
  { id: "protein", label: "보충제" },
  { id: "diet", label: "식단 관리" },
  { id: "exercise", label: "운동" },
  { id: "top", label: "상의" },
  { id: "bottom", label: "하의" },
  { id: "shoes", label: "신발" },
  { id: "bag", label: "가방" },
  { id: "accessories", label: "패션소품" },
  { id: "hairloss", label: "탈모 관리" },
  { id: "dyeing", label: "염색/펌" },
  { id: "waxing", label: "제모/왁싱" },
  { id: "deodorant", label: "데오드란트" },
];

interface FilterPopupProps {
  onClose: () => void;
  onApply: (selectedCategories: string[], selectedTags: string[]) => void;
}

export default function FilterPopup({ onClose, onApply }: FilterPopupProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div
      className="relative h-[575px] rounded-3xl bg-[#ffffff]"
      style={{ boxShadow: "0px 10px 25px 0px rgba(55, 66, 84, 0.14)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-8 pb-0">
        <h2 className="text-base font-medium leading-none text-[#374254]">
          필터
        </h2>
        <button onClick={onClose}>
          <Image
            src="/images/close.svg"
            alt="Close"
            width={24}
            height={24}
            className="overflow-visible"
          />
        </button>
      </div>

      {/* Categories Section */}
      <div className="px-8 pt-[45px]">
        <h3 className="text-sm font-medium leading-none text-[#374254]">
          카테고리
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`rounded-md border border-[transparent] px-3.5 py-2.5 text-sm font-medium leading-none transition-colors ${
                  isSelected
                    ? "bg-[#1481fd] text-white"
                    : "bg-[#ededf3] text-[#374254]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tags Section */}
      <div className="px-8 pt-[45px]">
        <h3 className="text-sm font-medium leading-none text-[#374254]">
          태그
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`rounded-md border border-[transparent] px-3.5 py-2.5 text-sm font-medium leading-none transition-colors ${
                  isSelected
                    ? "bg-[#1481fd] text-white"
                    : "bg-[#ededf3] text-[#374254]"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Apply Button */}
      <div className="absolute bottom-8 left-8 right-8">
        <button
          onClick={() => onApply(selectedCategories, selectedTags)}
          className="h-12 w-full rounded-xl bg-[#1481fd] text-base font-bold leading-normal text-white"
        >
          필터 적용하기
        </button>
      </div>
    </div>
  );
}
