import AlertModal from "@/components/modals/common/AlertModal";
import { showModal } from "@/stores/ModalStore";

export const openAlert = (message: string, callback?: () => void) => {
  showModal({
    component: (
      <AlertModal message={message} buttonText="확인" onConfirm={callback} />
    ),
  });
};
