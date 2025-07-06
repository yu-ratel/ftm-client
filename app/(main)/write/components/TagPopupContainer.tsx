import React, { useState } from "react";
import { useModalStore } from "@/stores/ModalStore";
import TagPopup from "./TagPopup";

interface TagPopupContainerProps {
  currentTags: string[];
  onTagsApply: (tags: string[]) => void;
}

const TagPopupContainer = ({
  currentTags,
  onTagsApply,
}: TagPopupContainerProps) => {
  const hideModal = useModalStore((state) => state.hideModal);
  const [selectedTags, setSelectedTags] = useState<string[]>(currentTags);

  const handleClose = () => {
    hideModal();
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleApply = () => {
    onTagsApply(selectedTags);
    hideModal();
  };

  return (
    <TagPopup
      isOpen={true}
      selectedTags={selectedTags}
      onClose={handleClose}
      onToggleTag={handleToggleTag}
      onApply={handleApply}
    />
  );
};

export default TagPopupContainer;
