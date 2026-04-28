import React, { useState, useEffect } from "react";
import { getHashtags } from "../../api/post";
import { CategoryData } from "../../types/PostType";

interface FilterTag {
  id: string;
  label: string;
}

/** 필터 적용 시 부모에서 클라이언트 필터링에 사용 */
export type GroomingFilterApplyPayload = {
  selectedTags: { id: string; label: string }[];
  /** 카테고리만 선택한 경우: 해당 카테고리 해시태그 name·tag 전부 */
  categoryHashtagKeys: string[];
  /** 팝업 재오픈 시 선택 UI 복원용 (category.name) */
  selectedCategoryName: string | null;
};

interface FilterPopupProps {
  onClose: () => void;
  onApply: (payload: GroomingFilterApplyPayload) => void;
  /** 적용 중인 필터 — 팝업을 다시 열었을 때 선택 상태 복원 */
  appliedFilter?: GroomingFilterApplyPayload | null;
}

export default function FilterPopup({
  onClose,
  onApply,
  appliedFilter = null,
}: FilterPopupProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<FilterTag[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 선택된 카테고리의 태그들을 필터링
  const getFilteredTags = (): FilterTag[] => {
    if (!selectedCategory) {
      return [];
    }

    const categoryInfo = categoryData.find(
      (item) => item.category.name === selectedCategory
    );
    if (!categoryInfo) {
      return [];
    }

    return categoryInfo.hashtags.map((hashtag) => ({
      id: hashtag.name,
      label: hashtag.tag,
    }));
  };

  const filteredTags = getFilteredTags();

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const data = await getHashtags();
        const { results } = data;

        // 원본 카테고리 데이터 저장
        setCategoryData(results);

        // 카테고리 데이터 변환
        const categoryData: FilterTag[] = results.map((item) => ({
          id: item.category.name,
          label: item.category.label,
        }));

        setCategories(categoryData);
      } catch (error) {
        console.error("필터 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!appliedFilter) {
      setSelectedCategory("");
      setSelectedTags([]);
      return;
    }

    setSelectedCategory(appliedFilter.selectedCategoryName ?? "");
    setSelectedTags(appliedFilter.selectedTags.map((t) => t.id));
  }, [loading, appliedFilter]);

  const toggleCategory = (categoryId: string) => {
    // 같은 카테고리 클릭 시 선택 해제, 다른 카테고리 클릭 시 선택
    if (selectedCategory === categoryId) {
      setSelectedCategory("");
      setSelectedTags([]);
    } else {
      setSelectedCategory(categoryId);
      setSelectedTags([]);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleApply = () => {
    const categoryInfo = selectedCategory
      ? categoryData.find((item) => item.category.name === selectedCategory)
      : undefined;
    const categoryHashtagKeys = categoryInfo
      ? Array.from(
          new Set(categoryInfo.hashtags.flatMap((h) => [h.name, h.tag]))
        )
      : [];

    const selectedTagObjects = selectedTags.map((tagId) => {
      const tag = filteredTags.find((t) => t.id === tagId);
      return tag
        ? { id: tag.id, label: tag.label }
        : { id: tagId, label: tagId };
    });

    onApply({
      selectedTags: selectedTagObjects,
      categoryHashtagKeys,
      selectedCategoryName: selectedCategory || null,
    });
  };

  if (loading) {
    return (
      <div
        className="relative flex h-[575px] items-center justify-center rounded-3xl bg-[#ffffff]"
        style={{ boxShadow: "0px 10px 25px 0px rgba(55, 66, 84, 0.14)" }}
      >
        <div className="text-[#374254]">로딩 중...</div>
      </div>
    );
  }

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
        <button onClick={onClose} className="p-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#374254"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#374254"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Categories Section */}
      <div className="px-8 pt-[45px]">
        <h3 className="text-sm font-medium leading-none text-[#374254]">
          카테고리
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
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
        <div className="mt-4 flex min-h-[40px] flex-wrap gap-2">
          {!selectedCategory ? (
            <div className="py-2 text-sm text-[#9ca3af]">
              카테고리를 선택하면 관련 태그가 표시됩니다
            </div>
          ) : filteredTags.length === 0 ? (
            <div className="py-2 text-sm text-[#9ca3af]">
              선택한 카테고리에 해당하는 태그가 없습니다
            </div>
          ) : (
            filteredTags.map((tag) => {
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
            })
          )}
        </div>
      </div>

      {/* Apply Button */}
      <div className="absolute bottom-8 left-8 right-8">
        <button
          onClick={handleApply}
          className="h-12 w-full rounded-xl bg-[#1481fd] text-base font-bold leading-normal text-white"
        >
          필터 적용하기
        </button>
      </div>
    </div>
  );
}
