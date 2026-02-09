"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createPost, CreatePostData, getProductHashtags } from "../api/post";
import { useRouter } from "next/navigation";
import { Product } from "../write/types";
import { CategoryData } from "../types/PostType";
import {
  TitleInput,
  TagManager,
  ActionButtons,
  ProductManager,
} from "../write/components";
import { openAlert } from "@/utils/modal/OpenAlert";
import { openConfirm } from "@/utils/modal/OpenConfirm";
import { openProductModal } from "@/utils/modal/OpenProductModal";
import { showModal, hideModal } from "@/stores/ModalStore";
import FilterPopup from "../components/modal/FilterPopup";

// 동적 import로 에디터 관련 컴포넌트를 클라이언트에서만 로드
const TiptapEditor = dynamic(() => import("./components/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="px-6 py-4">
      <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200"></div>
      <div className="mt-4 h-96 w-full animate-pulse rounded-xl bg-gray-200"></div>
    </div>
  ),
}) as React.ComponentType<{
  onContentChange: (content: string) => void;
  onImagesChange: (images: File[]) => void;
}>;

const Write2Page = () => {
  const router = useRouter();

  // ===== STATE MANAGEMENT =====
  // Form states
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState<{ id: string; label: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postImages, setPostImages] = useState<File[]>([]);
  const [editorContent, setEditorContent] = useState<string>("");

  // Product states
  const [products, setProducts] = useState<Product[]>([]);

  // Hashtag data state
  const [hashtagData, setHashtagData] = useState<CategoryData[]>([]);

  // ===== EFFECTS =====
  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const response = await getProductHashtags();
        setHashtagData(response.results);
      } catch (error) {
        console.error("Failed to fetch hashtags:", error);
      }
    };

    fetchHashtags();
  }, []);

  // ===== FORM HANDLERS =====
  const handleSave = async () => {
    if (!title.trim()) {
      openAlert("제목을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 상품 이미지 파일들을 배열로 수집
      const productImageFiles = products
        .map((product) => product.imageFile)
        .filter((file): file is File => file !== undefined);

      const postData: CreatePostData = {
        title,
        hashtags: hashtags.map((tag) => tag.id),
        content: editorContent, // HTML 문자열 그대로 전송
        postImageFiles: postImages,
        products: products.map((product) => {
          const imageIndex = product.imageFile
            ? productImageFiles.findIndex(
                (file) => file === product.imageFile
              ) + 1
            : -1;
          return {
            imageIndex,
            name: product.title,
            brand: product.brand,
            hashtags: product.tags,
          };
        }),
        productImageFiles,
      };

      console.log("postData", postData);

      await createPost(postData);
      router.push("/user-pick");
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      openAlert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== TAG HANDLERS =====
  const handleOpenTagPopup = () => {
    showModal({
      component: (
        <FilterPopup
          onClose={() => hideModal()}
          onApply={(
            selectedCategories: string[],
            selectedTags: { id: string; label: string }[]
          ) => {
            setHashtags(selectedTags);
            hideModal();
          }}
        />
      ),
      containerType: "center",
    });
  };

  const removeTag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((tag) => tag.label !== tagToRemove));
  };

  // ===== PRODUCT HANDLERS =====
  const handleAddProduct = () => {
    openProductModal((product: Product) => {
      setProducts((prevProducts) => [...prevProducts, product]);
    });
  };

  const handleEditProduct = (productToEdit: Product) => {
    openProductModal((updatedProduct: Product) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productToEdit.id ? updatedProduct : product
        )
      );
    }, productToEdit);
  };

  const handleDeleteProduct = (productToDelete: Product) => {
    openConfirm(`"${productToDelete.title}" 상품을 삭제하시겠습니까?`, () => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete.id)
      );
    });
  };

  // ===== EDITOR HANDLERS =====
  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  const handleImagesChange = (images: File[]) => {
    setPostImages(images);
  };

  // ===== RENDER =====
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

export default Write2Page;
