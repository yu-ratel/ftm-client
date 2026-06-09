import React, { useState, useRef, useEffect } from "react";
import { useModalStore } from "@/stores/ModalStore";
import { Product } from "../types";
import { CategoryData } from "../../types/PostType";
import ProductModal from "./ProductModal";
import { openAlert } from "@/utils/modal/OpenAlert";
import { openToast } from "@/utils/modal/OpenToast";
import { getProductHashtags } from "../../api/post";
import {
  MAX_SELECTED_TAGS,
  MAX_SELECTED_TAGS_MESSAGE,
} from "../../components/modal/FilterPopup";

interface ProductModalContainerProps {
  onProductSave: (product: Product) => void;
  initialProduct?: Product;
  isEditMode?: boolean;
  /**
   * 호출 페이지가 보유한 상품 해시태그 데이터를 그대로 주입.
   * - 페이지의 변환(예: productTagsToNames) 기준 데이터와 동일해야
   *   initialProduct.tags(enum name) 매칭이 어긋나지 않음.
   * - 미전달 시 자체 fetch (이전 동작 유지)
   */
  hashtagData?: CategoryData[];
}

const ProductModalContainer = ({
  onProductSave,
  initialProduct,
  isEditMode = true,
  hashtagData: externalHashtagData,
}: ProductModalContainerProps) => {
  const hideModal = useModalStore((state) => state.hideModal);

  // Product states
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>("");

  // Product category states
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("");
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );

  // API 데이터 상태 (외부 주입 우선, 없을 때만 자체 fetch)
  const hasExternalHashtagData =
    externalHashtagData !== undefined && externalHashtagData.length > 0;
  const [internalHashtagData, setInternalHashtagData] = useState<
    CategoryData[]
  >([]);
  const [isLoading, setIsLoading] = useState(!hasExternalHashtagData);
  const hashtagData = hasExternalHashtagData
    ? externalHashtagData
    : internalHashtagData;

  // Refs
  const productImageInputRef = useRef<HTMLInputElement>(null);

  // API 데이터 로드 (외부 주입 시 skip)
  useEffect(() => {
    if (hasExternalHashtagData) {
      setIsLoading(false);
      return;
    }

    const fetchHashtags = async () => {
      try {
        setIsLoading(true);
        const response = await getProductHashtags();
        setInternalHashtagData(response.results);
      } catch (error) {
        console.error("Failed to fetch hashtags:", error);
        openAlert("카테고리 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHashtags();
  }, [hasExternalHashtagData]);

  // 초기 상품 데이터 설정
  useEffect(() => {
    if (initialProduct) {
      setCurrentProduct({
        brand: initialProduct.brand,
        title: initialProduct.title,
      });
      setProductImagePreview(initialProduct.img);

      // 태그가 있는 경우 메인 카테고리 찾기
      if (
        initialProduct.tags &&
        initialProduct.tags.length > 0 &&
        hashtagData.length > 0
      ) {
        // 작성 시 카테고리를 전환하며 누적 선택이 가능하므로(`handleMainCategorySelect`),
        // 복원 시에도 모든 카테고리를 순회하여 매칭되는 하위 태그를 모두 누적한다.
        // selectedMainCategory 는 단일 값이라 첫 매칭 카테고리를 기본 active 로 둔다.
        let foundMainCategory = "";
        const matchingSubCategories: string[] = [];

        for (const categoryData of hashtagData) {
          // name(enum) / tag(한국어) 둘 다 확인하여 매칭
          const matchingHashtags = categoryData.hashtags.filter(
            (hashtag) =>
              initialProduct.tags.includes(hashtag.name) ||
              initialProduct.tags.includes(hashtag.tag)
          );

          if (matchingHashtags.length === 0) continue;

          if (!foundMainCategory) {
            foundMainCategory = categoryData.category.name;
          }
          matchingHashtags.forEach((hashtag) => {
            if (!matchingSubCategories.includes(hashtag.tag)) {
              matchingSubCategories.push(hashtag.tag);
            }
          });
        }

        if (foundMainCategory) {
          setSelectedMainCategory(foundMainCategory);
          setSelectedSubCategories(matchingSubCategories);
        } else {
          // 메인 카테고리를 찾지 못한 경우 그냥 태그만 설정
          setSelectedSubCategories(initialProduct.tags);
        }
      }
    }
  }, [initialProduct, hashtagData]);

  const handleClose = () => {
    // Reset all states
    setCurrentProduct({});
    setProductImage(null);
    setProductImagePreview("");
    setSelectedMainCategory("");
    setSelectedSubCategories([]);
    hideModal();
  };

  const handleProductImageUpload = () => {
    productImageInputRef.current?.click();
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProductImage(file);
      setProductImagePreview(URL.createObjectURL(file));
    }
    if (productImageInputRef.current) {
      productImageInputRef.current.value = "";
    }
  };

  const handleProductImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      setProductImage(imageFile);
      setProductImagePreview(URL.createObjectURL(imageFile));
    } else {
      openAlert("이미지 파일만 업로드할 수 있습니다.");
    }
  };

  const handleProductImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMainCategorySelect = (categoryKey: string) => {
    // 상위 카테고리를 변경해도 이전에 선택한 하위 태그들은 유지한다.
    // (FilterPopup 과 동일하게 누적 선택 가능)
    setSelectedMainCategory(categoryKey);
  };

  const handleSubCategoryToggle = (subCategory: string) => {
    // 해제는 항상 허용 (개수 제한과 무관)
    if (selectedSubCategories.includes(subCategory)) {
      setSelectedSubCategories(
        selectedSubCategories.filter((cat) => cat !== subCategory)
      );
      return;
    }

    if (selectedSubCategories.length >= MAX_SELECTED_TAGS) {
      openToast("www.fittheman.com 내용:", MAX_SELECTED_TAGS_MESSAGE);
      return;
    }

    setSelectedSubCategories([...selectedSubCategories, subCategory]);
  };

  const handleProductChange = (updates: Partial<Product>) => {
    setCurrentProduct({ ...currentProduct, ...updates });
  };

  const handleSaveProduct = () => {
    if (!currentProduct.brand?.trim() || !currentProduct.title?.trim()) {
      openAlert("브랜드와 상품명을 입력해주세요.");
      return;
    }

    // 선택된 서브카테고리를 name 값으로 변환
    const selectedHashtagNames: string[] = [];
    for (const categoryData of hashtagData) {
      for (const hashtag of categoryData.hashtags) {
        if (selectedSubCategories.includes(hashtag.tag)) {
          selectedHashtagNames.push(hashtag.name);
        }
      }
    }

    const newProduct: Product = {
      id: initialProduct?.id || Date.now(),
      img: productImagePreview || "/user-pick-test/images/example.png",
      brand: currentProduct.brand,
      title: currentProduct.title,
      tags: selectedHashtagNames,
      imageFile: productImage || undefined,
    };

    onProductSave(newProduct);
    handleClose();
  };

  return (
    <ProductModal
      isOpen={true}
      currentProduct={currentProduct}
      productImagePreview={productImagePreview}
      selectedMainCategory={selectedMainCategory}
      selectedSubCategories={selectedSubCategories}
      hashtagData={hashtagData}
      isLoading={isLoading}
      onClose={handleClose}
      onSaveProduct={handleSaveProduct}
      onProductChange={handleProductChange}
      onImageUpload={handleProductImageUpload}
      onImageChange={handleProductImageChange}
      onImageDrop={handleProductImageDrop}
      onImageDragOver={handleProductImageDragOver}
      onMainCategorySelect={handleMainCategorySelect}
      onSubCategoryToggle={handleSubCategoryToggle}
      productImageInputRef={productImageInputRef}
      isViewOnly={!isEditMode}
    />
  );
};

export default ProductModalContainer;
