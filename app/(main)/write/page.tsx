"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createPost, CreatePostData, getProductHashtags } from "../api/post";
import { useRouter } from "next/navigation";
import { Product } from "./types";
import { CategoryData } from "../types/PostType";
import {
  TitleInput,
  TagManager,
  ActionButtons,
  ProductManager,
} from "./components";
import { openAlert } from "@/utils/modal/OpenAlert";
import { openConfirm } from "@/utils/modal/OpenConfirm";
import { openProductModal } from "@/utils/modal/OpenProductModal";
import { showModal, hideModal } from "@/stores/ModalStore";
import FilterPopup from "../components/modal/FilterPopup";

// 동적 import로 에디터 관련 컴포넌트와 훅들을 클라이언트에서만 로드
const EditorComponent = dynamic(() => import("./components/EditorComponent"), {
  ssr: false,
  loading: () => (
    <div className="px-6 py-4">
      <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200"></div>
      <div className="mt-4 h-96 w-full animate-pulse rounded-xl bg-gray-200"></div>
    </div>
  ),
}) as React.ComponentType<{
  onContentChange: (content: unknown) => void;
  onImagesChange: (images: File[]) => void;
}>;

const WritePage = () => {
  const router = useRouter();

  // ===== STATE MANAGEMENT =====
  // Form states
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState<{ id: string; label: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postImages, setPostImages] = useState<File[]>([]);
  const [editorContent, setEditorContent] = useState<unknown>(null);

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
      const content = editorContent;

      // 상품 이미지 파일들을 배열로 수집
      const productImageFiles = products
        .map((product) => product.imageFile)
        .filter((file): file is File => file !== undefined);

      const postData: CreatePostData = {
        title,
        // groomingCategory: "BEAUTY", // 기본 카테고리로 설정
        hashtags: hashtags.map((tag) => tag.id), // id 값만 전송
        content: JSON.stringify(content),
        postImageFiles: postImages,
        products: products.map((product) => {
          // 해당 상품의 이미지 파일이 productImageFiles 배열에서 몇 번째 인덱스인지 찾기
          const imageIndex = product.imageFile
            ? productImageFiles.findIndex(
                (file) => file === product.imageFile
              ) + 1 // 1부터 시작
            : -1; // 이미지가 없는 경우 -1
          return {
            imageIndex,
            name: product.title,
            brand: product.brand,
            hashtags: product.tags,
          };
        }),
        productImageFiles, // 상품 이미지 파일들 배열
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

  // const handleCancel = () => {
  //   openConfirm("작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", () => {
  //     router.back();
  //   });
  // };

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
            // selectedTags는 이제 id와 label 객체 배열로 전달됨
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
  const handleContentChange = (content: unknown) => {
    setEditorContent(content);
  };

  const handleImagesChange = (images: File[]) => {
    setPostImages(images);
  };

  // ===== RENDER =====
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white">
          <TitleInput title={title} onTitleChange={setTitle} />

          <TagManager
            hashtags={hashtags}
            onOpenTagPopup={handleOpenTagPopup}
            onRemoveTag={removeTag}
          />

          <EditorComponent
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

          <ActionButtons
            isSubmitting={isSubmitting}
            // onCancel={handleCancel}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default WritePage;
