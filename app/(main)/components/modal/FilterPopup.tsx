import React, { useState, useEffect } from "react";
import { getHashtags } from "../../api/post";
import { CategoryData } from "../../types/PostType";
import { openToast } from "@/utils/modal/OpenToast";

interface FilterTag {
  id: string;
  label: string;
}

/**
 * 적용 페이로드의 selectedTags 항목.
 * - 일반 해시태그: `apiIds`가 없거나 [id] (백엔드 enum name 1개)
 * - "전체" 가상 태그: `apiIds`에 expand 결과 (하위 해시태그가 있으면 그들의 name 배열,
 *   하위가 없는 경우(예: 향수)에는 상위 카테고리 name)
 */
export interface GroomingFilterSelectedTag {
  id: string;
  label: string;
  apiIds?: string[];
}

/** 필터 적용 시 부모에서 클라이언트 필터링에 사용 */
export type GroomingFilterApplyPayload = {
  selectedTags: GroomingFilterSelectedTag[];
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
  /**
   * 하위 태그 영역에 "전체" 옵션을 노출할지 여부.
   * - 게시글 작성/수정에서만 활성화 (그루밍 라운지 자체 필터는 비활성).
   * - 하위 태그가 없는 카테고리(예: 향수)는 카테고리 선택 시 자동 선택.
   */
  enableAllOption?: boolean;
}

const ALL_TAG_PREFIX = "__ALL__:";
const ALL_TAG_LABEL = "전체";
export const MAX_SELECTED_TAGS = 5;
export const MAX_SELECTED_TAGS_MESSAGE = `최대 ${MAX_SELECTED_TAGS}개까지 태그를 선택할 수 있어요.`;

const buildAllTagId = (categoryName: string) =>
  `${ALL_TAG_PREFIX}${categoryName}`;
const isAllTagId = (id: string) => id.startsWith(ALL_TAG_PREFIX);
const extractCategoryNameFromAllId = (id: string) =>
  id.slice(ALL_TAG_PREFIX.length);

/**
 * 적용된 selectedTags 를 팝업 내부 selectedTags 상태로 복원할 때,
 * 어떤 카테고리의 하위 해시태그가 "모두" 들어있다면 그것들을 단일 "전체" id 로 통합한다.
 * (적용 직후에는 expand 되어 부모로 전달되므로, 재오픈 시점에 다시 묶어줘야 "전체"가 활성 표시됨)
 */
function reconstructAllSelections(
  tagIds: string[],
  categoryData: CategoryData[]
): string[] {
  if (tagIds.length === 0) return [];
  const tagIdSet = new Set(tagIds);
  const consumed = new Set<string>();
  const result: string[] = [];

  categoryData.forEach((category) => {
    if (category.hashtags.length === 0) return;
    const hashtagNames = category.hashtags.map((h) => h.name);
    const allPresent = hashtagNames.every((name) => tagIdSet.has(name));
    if (!allPresent) return;
    result.push(buildAllTagId(category.category.name));
    hashtagNames.forEach((name) => consumed.add(name));
  });

  tagIds.forEach((id) => {
    if (!consumed.has(id)) result.push(id);
  });

  return result;
}

export default function FilterPopup({
  onClose,
  onApply,
  appliedFilter = null,
  enableAllOption = false,
}: FilterPopupProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<FilterTag[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 선택된 카테고리의 태그들을 필터링 ("전체" 옵션 활성화 시 맨 앞에 추가)
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

    const baseTags = categoryInfo.hashtags.map((hashtag) => ({
      id: hashtag.name,
      label: hashtag.tag,
    }));

    if (!enableAllOption) {
      return baseTags;
    }

    return [
      { id: buildAllTagId(categoryInfo.category.name), label: ALL_TAG_LABEL },
      ...baseTags,
    ];
  };

  const filteredTags = getFilteredTags();

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const data = await getHashtags();
        const { results } = data;

        setCategoryData(results);

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

    const restoredIds = appliedFilter.selectedTags.map((t) => t.id);
    // enableAllOption 사용 시: 적용 시 expand 되었던 하위 태그 모음을 다시 "전체" id 로 통합
    setSelectedTags(
      enableAllOption
        ? reconstructAllSelections(restoredIds, categoryData)
        : restoredIds
    );
  }, [loading, appliedFilter, enableAllOption, categoryData]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategory((prev) => {
      const isClosingSame = prev === categoryId;
      const next = isClosingSame ? "" : categoryId;

      // 상위 카테고리를 토글로 "해제"할 때, 해당 카테고리에 속한 선택 태그
      // (개별 하위 태그 + "전체" 가상 태그)들도 함께 해제하여
      // "카테고리 해제 = 그 카테고리 필터 해제" 라는 사용자 기대 동작을 보장한다.
      // 다른 카테고리에서 선택된 태그들은 누적 선택을 위해 그대로 유지.
      if (isClosingSame) {
        const categoryInfo = categoryData.find(
          (item) => item.category.name === categoryId
        );
        if (categoryInfo) {
          const idsToRemove = new Set<string>([
            ...categoryInfo.hashtags.map((h) => h.name),
            buildAllTagId(categoryId),
          ]);
          setSelectedTags((prevTags) =>
            prevTags.filter((id) => !idsToRemove.has(id))
          );
        }
      }

      return next;
    });
  };

  /**
   * 선택 태그의 "유효 개수"를 계산한다.
   * - 일반 태그: 1개
   * - "전체"(하위 있음): 그 카테고리의 하위 해시태그 개수
   * - "전체"(하위 없음, 예: 향수): 1개 (API로 카테고리 name 1개 전송)
   */
  const getEffectiveCount = (ids: string[]): number => {
    let count = 0;
    ids.forEach((id) => {
      if (!isAllTagId(id)) {
        count += 1;
        return;
      }
      const categoryName = extractCategoryNameFromAllId(id);
      const targetCategory = categoryData.find(
        (item) => item.category.name === categoryName
      );
      count +=
        targetCategory && targetCategory.hashtags.length > 0
          ? targetCategory.hashtags.length
          : 1;
    });
    return count;
  };

  const toggleTag = (tagId: string) => {
    // 해제는 항상 허용 (개수 제한과 무관)
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
      return;
    }

    let next: string[];

    if (isAllTagId(tagId)) {
      // "전체" 선택 시 같은 카테고리의 일반 태그들은 제거 (상호 배타)
      const targetCategoryName = extractCategoryNameFromAllId(tagId);
      const targetCategory = categoryData.find(
        (item) => item.category.name === targetCategoryName
      );
      const siblingHashtagNames = new Set(
        targetCategory?.hashtags.map((h) => h.name) ?? []
      );
      next = [
        ...selectedTags.filter((id) => !siblingHashtagNames.has(id)),
        tagId,
      ];
    } else {
      // 일반 태그 선택 시, 같은 카테고리의 "전체"가 있으면 제거 (상호 배타)
      const owningCategory = categoryData.find((item) =>
        item.hashtags.some((h) => h.name === tagId)
      );
      if (owningCategory) {
        const owningAllId = buildAllTagId(owningCategory.category.name);
        next = [...selectedTags.filter((id) => id !== owningAllId), tagId];
      } else {
        next = [...selectedTags, tagId];
      }
    }

    // "전체" 는 expand 후의 실제 태그 수로 카운트한다.
    if (getEffectiveCount(next) > MAX_SELECTED_TAGS) {
      openToast("www.fittheman.com 내용:", MAX_SELECTED_TAGS_MESSAGE);
      return;
    }

    setSelectedTags(next);
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

    // 선택된 태그가 여러 카테고리에 걸쳐 있을 수 있으므로 전 카테고리에서 라벨을 조회한다
    const hashtagLabelMap = new Map<string, string>();
    categoryData.forEach((item) => {
      item.hashtags.forEach((h) => {
        hashtagLabelMap.set(h.name, h.tag);
      });
    });

    // "전체" 처리 정책 (TagManager 노출 + API 전송 일관성):
    //  - 하위 태그가 있는 카테고리: 모든 하위 태그를 칩으로 펼쳐서 노출 (id=hashtag.name)
    //  - 하위 태그가 없는 카테고리(예: 향수): 상위 카테고리 라벨 1개 칩으로 노출 (apiIds=[categoryName])
    const selectedTagObjects: GroomingFilterSelectedTag[] = [];
    const pushUnique = (tag: GroomingFilterSelectedTag) => {
      if (!selectedTagObjects.some((t) => t.id === tag.id)) {
        selectedTagObjects.push(tag);
      }
    };

    selectedTags.forEach((tagId) => {
      if (isAllTagId(tagId)) {
        const categoryName = extractCategoryNameFromAllId(tagId);
        const targetCategory = categoryData.find(
          (item) => item.category.name === categoryName
        );

        if (targetCategory && targetCategory.hashtags.length > 0) {
          // 하위 태그 expand
          targetCategory.hashtags.forEach((h) => {
            pushUnique({ id: h.name, label: h.tag });
          });
          return;
        }

        // 하위 태그 없음 → 카테고리 라벨 칩 1개 (API는 카테고리 name 1개로 전송)
        pushUnique({
          id: tagId,
          label: targetCategory?.category.label ?? categoryName,
          apiIds: [categoryName],
        });
        return;
      }

      pushUnique({
        id: tagId,
        label: hashtagLabelMap.get(tagId) ?? tagId,
      });
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
