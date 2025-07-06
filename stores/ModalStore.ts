import { ModalType } from "@/types/modal";
import { create } from "zustand";

interface ModalState {
  modalList: ModalType[];
  showModal: (options: {
    component: React.ReactNode;
    container?: React.ElementType;
    isDimClick?: boolean;
    containerType?: "default" | "bottom" | "center";
    maxWidth?: string;
  }) => void;
  hideModal: () => void;
  clearModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalList: [],
  showModal: ({
    component,
    container,
    isDimClick = true,
    containerType = "default",
    maxWidth,
  }) =>
    set((state) => ({
      modalList: [
        ...state.modalList,
        {
          modal: component,
          container,
          isDimClick,
          containerType,
          maxWidth,
        },
      ],
    })),
  hideModal: () =>
    set((state) => ({
      modalList: state.modalList.slice(0, -1),
    })),
  clearModal: () => set({ modalList: [] }),
}));

export const showModal = useModalStore.getState().showModal;
export const hideModal = useModalStore.getState().hideModal;
export const clearModal = useModalStore.getState().clearModal;
