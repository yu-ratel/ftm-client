import { showModal } from "@/stores/ModalStore";
import ProductModalContainer from "@/app/(main)/write/components/ProductModalContainer";
import { Product } from "@/app/(main)/write/types";

export const openProductModal = (
  onProductSave: (product: Product) => void,
  initialProduct?: Product,
  isEditMode: boolean = true
) => {
  showModal({
    component: (
      <ProductModalContainer
        onProductSave={onProductSave}
        initialProduct={initialProduct}
        isEditMode={isEditMode}
      />
    ),
    containerType: "center",
    maxWidth: "548px",
  });
};
