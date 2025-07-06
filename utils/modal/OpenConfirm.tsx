import ConfirmModal from "@/components/modals/common/ConfirmModal";
import { showModal } from "@/stores/ModalStore";

export const openConfirm = (
  message: string,
  onConfirm?: () => void,
  onCancel?: () => void,
  confirmText?: string,
  cancelText?: string
) => {
  showModal({
    component: (
      <ConfirmModal
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    ),
  });
};
