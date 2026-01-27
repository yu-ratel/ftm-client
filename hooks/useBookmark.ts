import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteBookmark } from "@/app/(main)/api/bookmark";

interface UseBookmarkProps {
  onSuccess?: (isBookmarked: boolean) => void;
  onError?: (error: Error) => void;
}

interface UseBookmarkReturn {
  handleBookmark: (postId: number, currentBookmarked: boolean) => void;
  isLoading: boolean;
}

export const useBookmark = ({
  onSuccess,
  onError,
}: UseBookmarkProps = {}): UseBookmarkReturn => {
  const queryClient = useQueryClient();
  // 북마크 생성 mutation
  const createBookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
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
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onSuccess?.(false);
    },
    onError: (error: Error) => {
      console.error("북마크 삭제 실패:", error);
      onError?.(error);
    },
  });

  const handleBookmark = (postId: number, currentBookmarked: boolean) => {
    if (currentBookmarked) {
      deleteBookmarkMutation.mutate(postId);
    } else {
      createBookmarkMutation.mutate(postId);
    }
  };

  const isLoading =
    createBookmarkMutation.isPending || deleteBookmarkMutation.isPending;

  return {
    handleBookmark,
    isLoading,
  };
};
