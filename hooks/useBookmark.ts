import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createBookmark, deleteBookmark } from "@/app/(main)/api/bookmark";

interface UseBookmarkProps {
  initialBookmarked?: boolean;
  onSuccess?: (isBookmarked: boolean) => void;
  onError?: (error: Error) => void;
}

interface UseBookmarkReturn {
  isBookmarked: boolean;
  setIsBookmarked: (value: boolean) => void;
  handleBookmark: (postId: number) => void;
  isLoading: boolean;
}

export const useBookmark = ({
  initialBookmarked = false,
  onSuccess,
  onError,
}: UseBookmarkProps = {}): UseBookmarkReturn => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  // 북마크 생성 mutation
  const createBookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      setIsBookmarked(true);
      onSuccess?.(true);
    },
    onError: (error: Error) => {
      console.error("북마크 생성 실패:", error);
      onError?.(error);
    },
  });

  // 북마크 삭제 mutation
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      setIsBookmarked(false);
      onSuccess?.(false);
    },
    onError: (error: Error) => {
      console.error("북마크 삭제 실패:", error);
      onError?.(error);
    },
  });

  const handleBookmark = (postId: number) => {
    if (isBookmarked) {
      deleteBookmarkMutation.mutate(postId);
    } else {
      createBookmarkMutation.mutate(postId);
    }
  };

  const isLoading =
    createBookmarkMutation.isPending || deleteBookmarkMutation.isPending;

  return {
    isBookmarked,
    setIsBookmarked,
    handleBookmark,
    isLoading,
  };
};
