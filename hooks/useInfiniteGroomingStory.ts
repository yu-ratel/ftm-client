import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getGroomingStoryPosts,
  GroomingStoryParams,
} from "@/app/(main)/user-pick/api";

interface UseInfiniteGroomingStoryProps {
  limit?: number;
  enabled?: boolean;
}

export const useInfiniteGroomingStory = ({
  limit = 10,
  enabled = true,
}: UseInfiniteGroomingStoryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ["groomingStoryPosts", limit],
    queryFn: ({ pageParam }) => {
      const params: GroomingStoryParams = {
        limit,
        ...(pageParam && { lastCursor: pageParam }),
      };
      return getGroomingStoryPosts(params);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext && lastPage.data.nextCursorDateTime) {
        return lastPage.data.nextCursorDateTime;
      }
      return undefined;
    },
    initialPageParam: undefined as string | undefined,
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
