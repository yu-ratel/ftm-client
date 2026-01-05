import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostLike } from "@/app/(main)/api/post";

interface UseLikeProps {
  postId: number;
  onSuccess?: (isCreated: boolean) => void;
  onError?: (error: Error) => void;
}

interface UseLikeReturn {
  handleLike: () => void;
  isLoading: boolean;
}

export const useLike = ({
  postId,
  onSuccess,
  onError,
}: UseLikeProps): UseLikeReturn => {
  const queryClient = useQueryClient();

  // 좋아요 생성/토글 mutation
  const createLikeMutation = useMutation({
    mutationFn: createPostLike,
    onSuccess: async (response) => {
      const isCreated = response.data.isCreated;

      // 게시글 상세 데이터 다시 가져오기
      await queryClient.invalidateQueries({
        queryKey: ["post", String(postId)],
      });

      onSuccess?.(isCreated);
    },
    onError: (error: Error) => {
      console.error("좋아요 처리 실패:", error);
      onError?.(error);
    },
  });

  const handleLike = () => {
    createLikeMutation.mutate(postId);
  };

  const isLoading = createLikeMutation.isPending;

  return {
    handleLike,
    isLoading,
  };
};
