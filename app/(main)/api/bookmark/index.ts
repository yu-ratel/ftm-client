import { authApi } from "@/lib/axios";
import { ApiResponse } from "@/types/api";

const BASE_PATH = "/api/users/bookmarks";

export interface BookmarkRequest {
  postId: number;
}

/**
 * 북마크 생성 API
 */
export const createBookmark = async (postId: number): Promise<void> => {
  try {
    const response = await authApi.post<ApiResponse<null>>(BASE_PATH, {
      postId,
    });
    // data가 null로 오는 것이 정상이므로 status와 code만 확인
    if (response.data.status === 200) {
      console.log("북마크 생성 성공:", response.data.message);
    }
  } catch (error) {
    console.error("북마크 생성 실패:", error);
    throw error;
  }
};

/**
 * 북마크 삭제 API
 */
export const deleteBookmark = async (postId: number): Promise<void> => {
  try {
    const response = await authApi.delete<ApiResponse<null>>(BASE_PATH, {
      data: { postId },
    });
    // data가 null로 오는 것이 정상이므로 status와 code만 확인
    if (response.data.status === 200) {
      console.log("북마크 삭제 성공:", response.data.message);
    }
  } catch (error) {
    console.error("북마크 삭제 실패:", error);
    throw error;
  }
};
