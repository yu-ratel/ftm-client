import AlertModal from "@/components/modals/common/AlertModal";
import SigninSelectModal from "@/components/modals/SigninSelectModal";
import { showModal } from "@/stores/ModalStore";

export const openSigninSelectModal = () => {
  showModal({
    component: <SigninSelectModal />,
  });
};
