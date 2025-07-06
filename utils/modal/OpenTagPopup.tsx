import { showModal } from "@/stores/ModalStore";
import TagPopupContainer from "@/app/(main)/write/components/TagPopupContainer";

export const openTagPopup = (
  currentTags: string[],
  onTagsApply: (tags: string[]) => void
) => {
  showModal({
    component: (
      <TagPopupContainer currentTags={currentTags} onTagsApply={onTagsApply} />
    ),
    isDimClick: true,
    containerType: "center",
    maxWidth: "548px",
  });
};
