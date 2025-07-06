import { showModal } from "@/stores/ModalStore";
import ProductModalContainer from "@/app/(main)/write/components/ProductModalContainer";
import { Product } from "@/app/(main)/write/types";

export const openProductModal = (
  onProductSave: (product: Product) => void,
  initialProduct?: Product
) => {
  showModal({
    component: (
      <ProductModalContainer
        onProductSave={onProductSave}
        initialProduct={initialProduct}
      />
    ),
    containerType: "center",
    maxWidth: "548px",
  });
};
