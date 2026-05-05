"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getPostDetail,
  getProductHashtags,
  updatePost,
  UpdatePostData,
  AddPostProduct,
  UpdatePostProduct,
} from "../../../api/post";
import { CategoryData, PostDetail } from "../../../types/PostType";
import { Product } from "../../../write/types";
import {
  TitleInput,
  TagManager,
  ActionButtons,
  ProductManager,
} from "../../../write/components";
import { openAlert } from "@/utils/modal/OpenAlert";
import { openConfirm } from "@/utils/modal/OpenConfirm";
import { openProductModal } from "@/utils/modal/OpenProductModal";
import { showModal, hideModal } from "@/stores/ModalStore";
import FilterPopup, {
  GroomingFilterApplyPayload,
} from "../../../components/modal/FilterPopup";
import { formatImageUrl } from "../utils";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import NotFoundState from "../components/NotFoundState";

interface PostEditPageProps {
  params: {
    postId: string;
  };
}

// ===== UTILS =====
function tagsMatch(
  a: { id: string; label: string }[],
  b: { id: string; label: string }[]
): boolean {
  if (a.length !== b.length) return false;
  const idsA = [...a].map((t) => t.id).sort();
  const idsB = [...b].map((t) => t.id).sort();
  return idsA.every((id, i) => id === idsB[i]);
}

function arraysEqualUnordered(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

/** FilterPopup은 getHashtags 기준 — 상품용 hashtagData와 불일치 시 복원용 폴백 */
function buildAppliedFilter(
  tags: { id: string; label: string }[],
  categoryData: CategoryData[]
): GroomingFilterApplyPayload | null {
  if (tags.length === 0) return null;

  const category =
    categoryData.find((item) =>
      tags.every((t) => item.hashtags.some((h) => h.name === t.id))
    ) ??
    categoryData.find((item) =>
      item.hashtags.some((h) => h.name === tags[0].id)
    );

  if (!category) {
    return {
      selectedTags: tags,
      categoryHashtagKeys: [],
      selectedCategoryName: null,
    };
  }

  return {
    selectedTags: tags,
    categoryHashtagKeys: Array.from(
      new Set(category.hashtags.flatMap((h) => [h.name, h.tag]))
    ),
    selectedCategoryName: category.category.name,
  };
}

/**
 * PostDetail.hashtags 를 폼 상태({id,label}[])로 변환.
 *
 * ⚠️ 백엔드 응답/요청 비대칭:
 *  - 응답: PostHashtag::getTag → 한국어 tag (예: "선케어")
 *  - 요청: PostHashtag enum name (예: "SUN_CARE")
 *  → 응답값을 tag 기준으로 매칭하여 enum name(id)으로 정규화한다.
 */
function hashtagsFromPost(
  hashtagTags: string[],
  categoryData: CategoryData[]
): { id: string; label: string }[] {
  return hashtagTags.map((tag) => {
    for (const category of categoryData) {
      const found = category.hashtags.find((h) => h.tag === tag);
      if (found) return { id: found.name, label: found.tag };
    }
    return { id: tag, label: tag };
  });
}

/**
 * 상품 hashtags(한국어 tag[])를 enum name[] 으로 변환.
 * 백엔드 PostProductResponse 가 ProductHashtag::getTag 로 응답하기 때문에 정규화 필수.
 */
function productTagsToNames(
  productTags: string[],
  categoryData: CategoryData[]
): string[] {
  return productTags.map((tag) => {
    for (const category of categoryData) {
      const found = category.hashtags.find((h) => h.tag === tag);
      if (found) return found.name;
    }
    return tag;
  });
}

/** 게시글 본문에 포함된 이미지 URL 정규화 (blob: → 실제 URL, 상대경로 → 절대경로) */
function normalizeContentImages(
  content: string | undefined,
  postImages: PostDetail["postImages"] | undefined
): string {
  if (!content) return "";

  let html = content;
  let imageIndex = 0;

  if (postImages && postImages.length > 0) {
    html = html.replace(/<img[^>]+src="(blob:[^"]+)"[^>]*>/g, (match) => {
      const actualUrl = postImages[imageIndex]?.imageUrl;
      if (actualUrl) {
        imageIndex++;
        return match.replace(
          /src="blob:[^"]+"/,
          `src="${formatImageUrl(actualUrl)}"`
        );
      }
      return match;
    });

    html = html.replace(/src="(blob:[^"]+)"/g, (match) => {
      const actualUrl = postImages[imageIndex]?.imageUrl;
      if (actualUrl) {
        imageIndex++;
        return `src="${formatImageUrl(actualUrl)}"`;
      }
      return match;
    });
  }

  html = html.replace(/<img[^>]+src="([^"]+)"[^>]*>/g, (match, src) => {
    if (!src.startsWith("blob:")) {
      return match.replace(src, formatImageUrl(src));
    }
    return match;
  });

  return html;
}

/** HTML 문자열에서 <img src=""> 값들을 추출 */
function extractImageSrcs(html: string): string[] {
  const result: string[] = [];
  const regex = /<img[^>]+src="([^"]+)"[^>]*>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    result.push(match[1]);
  }
  return result;
}

// ===== ORIGINAL SNAPSHOT =====
interface OriginalProductSnapshot {
  id: number; // postProductId
  brand: string;
  title: string;
  tags: string[]; // hashtag name[]
  imageId?: number; // postProductImageId
}

interface OriginalSnapshot {
  title: string;
  hashtagIds: string[];
  content: string; // 정규화된 초기 HTML
  postImages: { id: number; url: string }[];
  productMap: Map<number, OriginalProductSnapshot>;
}

const TiptapEditor = dynamic(
  () => import("../../../write2/components/TiptapEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="px-6 py-4">
        <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200"></div>
        <div className="mt-4 h-96 w-full animate-pulse rounded-xl bg-gray-200"></div>
      </div>
    ),
  }
) as React.ComponentType<{
  onContentChange: (content: string) => void;
  onImagesChange: (images: File[]) => void;
  initialContent?: string;
}>;

const PostEditPage = ({ params }: PostEditPageProps) => {
  const { postId } = params;
  const router = useRouter();

  // ===== DATA FETCHING =====
  const {
    data: postData,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery<PostDetail>({
    queryKey: ["post", postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });

  // ===== STATE =====
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState<{ id: string; label: string }[]>([]);
  const [tagFilterSnapshot, setTagFilterSnapshot] =
    useState<GroomingFilterApplyPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postImages, setPostImages] = useState<File[]>([]);
  const [editorContent, setEditorContent] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [hashtagData, setHashtagData] = useState<CategoryData[]>([]);
  const [isHashtagDataReady, setIsHashtagDataReady] = useState(false);
  const [isFormHydrated, setIsFormHydrated] = useState(false);

  /** 초기 스냅샷 (저장 시 dirty checking 기준) */
  const originalRef = useRef<OriginalSnapshot | null>(null);
  /** content origin은 Tiptap 정규화 후 첫 emit 값으로 보정해야 정확한 dirty checking 가능 */
  const isContentOriginSyncedRef = useRef(false);

  // ===== INITIAL CONTENT =====
  const initialContent = useMemo(
    () => normalizeContentImages(postData?.content, postData?.postImages),
    [postData?.content, postData?.postImages]
  );

  // ===== EFFECTS =====
  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const response = await getProductHashtags();
        setHashtagData(response.results);
      } catch (error) {
        console.error("Failed to fetch hashtags:", error);
      } finally {
        setIsHashtagDataReady(true);
      }
    };

    fetchHashtags();
  }, []);

  // 게시글 데이터 + 해시태그 데이터 모두 준비되면 폼 상태 + 스냅샷 주입
  useEffect(() => {
    if (!postData || !isHashtagDataReady || isFormHydrated) return;

    setTitle(postData.title);

    const hydratedHashtags = hashtagsFromPost(postData.hashtags, hashtagData);
    setHashtags(hydratedHashtags);

    const initialProducts: Product[] = postData.postProducts.map((p) => ({
      id: p.postProductId,
      img: formatImageUrl(p.postProductImage?.imageUrl),
      brand: p.brand,
      title: p.name,
      tags: productTagsToNames(p.hashtags, hashtagData),
      originalImageId: p.postProductImage?.postProductImageId,
    }));
    setProducts(initialProducts);

    const productMap = new Map<number, OriginalProductSnapshot>();
    postData.postProducts.forEach((p) => {
      productMap.set(p.postProductId, {
        id: p.postProductId,
        brand: p.brand,
        title: p.name,
        tags: productTagsToNames(p.hashtags, hashtagData),
        imageId: p.postProductImage?.postProductImageId,
      });
    });

    originalRef.current = {
      title: postData.title,
      hashtagIds: hydratedHashtags.map((t) => t.id),
      content: initialContent,
      postImages: postData.postImages.map((img) => ({
        id: img.postImageId,
        url: formatImageUrl(img.imageUrl),
      })),
      productMap,
    };

    setIsFormHydrated(true);
  }, [
    postData,
    hashtagData,
    isHashtagDataReady,
    isFormHydrated,
    initialContent,
  ]);

  // ===== DIRTY CHECKING & PAYLOAD BUILD =====
  const buildUpdatePayload = (): UpdatePostData | null => {
    const original = originalRef.current;
    if (!original) return null;
    console.log("original", original);
    const payload: UpdatePostData = {};

    // 1) title
    if (title !== original.title) {
      payload.title = title;
    }

    // 2) hashtags
    const currentHashtagIds = hashtags.map((t) => t.id);
    if (!arraysEqualUnordered(currentHashtagIds, original.hashtagIds)) {
      payload.hashtags = currentHashtagIds;
    }

    // 3) content
    if (editorContent !== original.content) {
      payload.content = editorContent;
    }

    // 4) deletePostImageIds — 본문에서 사라진 기존 이미지 ID 수집
    const remainingSrcs = new Set(extractImageSrcs(editorContent));
    const deletedPostImageIds = original.postImages
      .filter((img) => !remainingSrcs.has(img.url))
      .map((img) => img.id);
    if (deletedPostImageIds.length > 0) {
      payload.deletePostImageIds = deletedPostImageIds;
    }

    // 5) postImageFiles — 새로 업로드된 파일 (TiptapEditor가 관리)
    if (postImages.length > 0) {
      payload.postImageFiles = postImages;
    }

    // 6) products: 신규 / 수정 / 삭제 분류
    const originalIdSet = new Set(original.productMap.keys());
    const currentIdSet = new Set(products.map((p) => p.id));

    // 6-1) 새로 추가된 상품 이미지 파일들 (imageIndex 매핑용)
    const productImageFiles = products
      .map((p) => p.imageFile)
      .filter((f): f is File => f !== undefined);

    const findImageIndex = (file?: File): number =>
      file ? productImageFiles.findIndex((f) => f === file) + 1 : -1;

    // 6-2) addProducts: originalIdSet 에 없는 상품
    const addProducts: AddPostProduct[] = products
      .filter((p) => !originalIdSet.has(p.id))
      .map((p) => ({
        imageIndex: findImageIndex(p.imageFile),
        name: p.title,
        brand: p.brand,
        hashtags: p.tags,
      }));
    if (addProducts.length > 0) {
      payload.addProducts = addProducts;
    }

    // 6-3) updateProducts: originalIdSet 에 있고 변경 사항 있는 상품만
    const updateProducts: UpdatePostProduct[] = [];
    for (const p of products) {
      if (!originalIdSet.has(p.id)) continue;
      const orig = original.productMap.get(p.id)!;

      const hasNewImage = !!p.imageFile;
      const hasOriginalImage = orig.imageId !== undefined;

      const changedName = p.title !== orig.title;
      const changedBrand = (p.brand || "") !== (orig.brand || "");
      const changedTags = !arraysEqualUnordered(p.tags, orig.tags);
      const changedImage = hasNewImage; // 새 이미지 업로드 = 변경

      if (!changedName && !changedBrand && !changedTags && !changedImage) {
        continue; // 변경 없음
      }

      const item: UpdatePostProduct = {
        id: p.id,
        imageIndex: hasNewImage ? findImageIndex(p.imageFile) : -1,
      };
      if (changedName) item.name = p.title;
      if (changedBrand) item.brand = p.brand;
      if (changedTags) item.hashtags = p.tags;
      if (changedImage && hasOriginalImage) {
        item.deleteProductImageId = orig.imageId;
      }

      updateProducts.push(item);
    }
    if (updateProducts.length > 0) {
      payload.updateProducts = updateProducts;
    }

    // 6-4) deleteProductIds: originalIdSet 에 있지만 currentIdSet 에 없는 상품
    const deleteProductIds: number[] = [];
    originalIdSet.forEach((id) => {
      if (!currentIdSet.has(id)) deleteProductIds.push(id);
    });
    if (deleteProductIds.length > 0) {
      payload.deleteProductIds = deleteProductIds;
    }

    // 6-5) productImageFiles
    if (productImageFiles.length > 0) {
      payload.productImageFiles = productImageFiles;
    }
    console.log("payload", payload);
    return payload;
  };

  // ===== FORM HANDLERS =====
  const handleSave = async () => {
    if (!title.trim()) {
      openAlert("제목을 입력해주세요.");
      return;
    }

    // TiptapEditor 초기 콘텐츠 주입 전 상태에서 저장하면 빈 본문으로 덮어쓸 위험 → 차단
    if (!isContentOriginSyncedRef.current) {
      openAlert("에디터 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const payload = buildUpdatePayload();
    if (!payload) return;

    // 변경 사항이 전혀 없는 경우
    if (Object.keys(payload).length === 0) {
      router.push(`/user-pick/${postId}`);
      return;
    }

    try {
      setIsSubmitting(true);
      await updatePost(postId, payload);
      router.push(`/user-pick/${postId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      openAlert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== TAG HANDLERS =====
  const handleOpenTagPopup = () => {
    const appliedFilter =
      hashtags.length > 0 &&
      tagFilterSnapshot &&
      tagsMatch(hashtags, tagFilterSnapshot.selectedTags)
        ? tagFilterSnapshot
        : buildAppliedFilter(hashtags, hashtagData);

    showModal({
      component: (
        <FilterPopup
          appliedFilter={appliedFilter}
          onClose={() => hideModal()}
          onApply={(payload) => {
            setHashtags(payload.selectedTags);
            if (
              payload.selectedTags.length === 0 &&
              payload.categoryHashtagKeys.length === 0
            ) {
              setTagFilterSnapshot(null);
            } else {
              setTagFilterSnapshot(payload);
            }
            hideModal();
          }}
        />
      ),
      containerType: "center",
    });
  };

  const removeTag = (tagToRemove: string) => {
    setHashtags((prev) => prev.filter((tag) => tag.label !== tagToRemove));
    setTagFilterSnapshot((snap) => {
      if (!snap) return null;
      const nextTags = snap.selectedTags.filter((t) => t.label !== tagToRemove);
      if (nextTags.length === 0) return null;
      return { ...snap, selectedTags: nextTags };
    });
  };

  // ===== PRODUCT HANDLERS =====
  const handleAddProduct = () => {
    openProductModal((product: Product) => {
      setProducts((prev) => [...prev, product]);
    });
  };

  const handleEditProduct = (productToEdit: Product) => {
    openProductModal((updatedProduct: Product) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productToEdit.id
            ? {
                ...updatedProduct,
                id: productToEdit.id,
                originalImageId: productToEdit.originalImageId,
              }
            : p
        )
      );
    }, productToEdit);
  };

  const handleDeleteProduct = (productToDelete: Product) => {
    openConfirm(`"${productToDelete.title}" 상품을 삭제하시겠습니까?`, () => {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    });
  };

  // ===== EDITOR HANDLERS =====
  const handleContentChange = (content: string) => {
    setEditorContent(content);
    // 첫 호출 = 초기 콘텐츠 주입 직후 (TiptapEditor가 setContent 후 즉시 emit)
    // → Tiptap이 정규화한 HTML을 기준으로 content origin을 보정하여 dirty checking 정확도 확보
    if (!isContentOriginSyncedRef.current && originalRef.current) {
      originalRef.current.content = content;
      isContentOriginSyncedRef.current = true;
    }
  };

  const handleImagesChange = (images: File[]) => {
    setPostImages(images);
  };

  // ===== RENDER =====
  if (isPostLoading || !isHashtagDataReady) {
    return <LoadingState />;
  }

  if (postError) {
    return <ErrorState error={postError as Error} />;
  }

  if (!postData) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4">
        <TitleInput title={title} onTitleChange={setTitle} />

        <TagManager
          hashtags={hashtags}
          onOpenTagPopup={handleOpenTagPopup}
          onRemoveTag={removeTag}
        />

        <TiptapEditor
          onContentChange={handleContentChange}
          onImagesChange={handleImagesChange}
          initialContent={initialContent}
        />

        <ProductManager
          products={products}
          hashtagData={hashtagData}
          onOpenProductModal={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />

        <ActionButtons isSubmitting={isSubmitting} onSave={handleSave} />
      </div>
    </div>
  );
};

export default PostEditPage;
