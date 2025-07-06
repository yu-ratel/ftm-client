import React, { useState, useRef, useEffect } from "react";
import { useModalStore } from "@/stores/ModalStore";
import { Product } from "../types";
import ProductModal from "./ProductModal";
import { openAlert } from "@/utils/modal/OpenAlert";
import { productCategories } from "../constants";

interface ProductModalContainerProps {
  onProductSave: (product: Product) => void;
  initialProduct?: Product;
}

const ProductModalContainer = ({
  onProductSave,
  initialProduct,
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

  // Refs
  const productImageInputRef = useRef<HTMLInputElement>(null);

  // 초기 상품 데이터 설정
  useEffect(() => {
    if (initialProduct) {
      setCurrentProduct({
        brand: initialProduct.brand,
        title: initialProduct.title,
      });
      setProductImagePreview(initialProduct.img);

      // 태그가 있는 경우 메인 카테고리 찾기
      if (initialProduct.tags && initialProduct.tags.length > 0) {
        let foundMainCategory = "";
        let matchingSubCategories: string[] = [];

        // 각 메인 카테고리를 순회하면서 초기 태그들이 포함된 카테고리 찾기
        for (const [categoryKey, category] of Object.entries(
          productCategories
        )) {
          const matchingTags = initialProduct.tags.filter((tag) =>
            category.subcategories.includes(tag)
          );

          if (matchingTags.length > 0) {
            foundMainCategory = categoryKey;
            matchingSubCategories = matchingTags;
            break;
          }
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
  }, [initialProduct]);

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
    setSelectedMainCategory(categoryKey);
    setSelectedSubCategories([]);
  };

  const handleSubCategoryToggle = (subCategory: string) => {
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategory)) {
        return prev.filter((cat) => cat !== subCategory);
      } else {
        return [...prev, subCategory];
      }
    });
  };

  const handleProductChange = (updates: Partial<Product>) => {
    setCurrentProduct({ ...currentProduct, ...updates });
  };

  const handleSaveProduct = () => {
    if (!currentProduct.brand?.trim() || !currentProduct.title?.trim()) {
      openAlert("브랜드와 상품명을 입력해주세요.");
      return;
    }

    const allTags = [...selectedSubCategories];

    const newProduct: Product = {
      id: initialProduct?.id || Date.now(),
      img: productImagePreview || "/user-pick-test/images/example.png",
      brand: currentProduct.brand,
      title: currentProduct.title,
      tags: allTags,
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
      isViewOnly={!!initialProduct}
    />
  );
};

export default ProductModalContainer;
