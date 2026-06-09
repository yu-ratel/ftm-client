import { showModal } from "@/stores/ModalStore";
import ProductModalContainer from "@/app/(main)/write/components/ProductModalContainer";
import { Product } from "@/app/(main)/write/types";
import { CategoryData } from "@/app/(main)/types/PostType";

export const openProductModal = (
  onProductSave: (product: Product) => void,
  initialProduct?: Product,
  isEditMode: boolean = true,
  /**
   * 호출 페이지가 들고 있는 상품 해시태그 데이터.
   * 전달 시 모달이 자체 fetch 대신 이 데이터를 사용해 initialProduct.tags 매칭 일관성을 보장.
   */
  hashtagData?: CategoryData[]
) => {
  showModal({
    component: (
      <ProductModalContainer
        onProductSave={onProductSave}
        initialProduct={initialProduct}
        isEditMode={isEditMode}
        hashtagData={hashtagData}
      />
    ),
    containerType: "center",
    maxWidth: "548px",
  });
};
