import { ApiResponse } from "@/types/api";
import { UserPickPost } from "../types";
import axios from "@/lib/axios";

/**
 * 유저픽 게시물 목록 API 응답 타입 (공통)
 */
export type UserPickPostsResponse = ApiResponse<UserPickPost[]>;

/**
 * 유저픽 인기 게시물 조회 API 함수
 * GET /api/posts/userpick/popular
 */
export const getUserPickPopularPosts =
  async (): Promise<UserPickPostsResponse> => {
    const response = await axios.get<UserPickPostsResponse>(
      "/api/posts/userpick/popular"
    );
    return response.data;
  };

/**
 * 유저픽 그루밍 바이블 조회 API 함수
 * GET /api/posts/userpick/bible
 */
export const getUserPickBiblePosts =
  async (): Promise<UserPickPostsResponse> => {
    const response = await axios.get<UserPickPostsResponse>(
      "/api/posts/userpick/bible"
    );
    return response.data;
  };

/**
 * 유저픽 북마크 많은 게시물 조회 API 함수
 * GET /api/posts/userpick/top-bookmarks
 */
export const getUserPickTopBookmarks =
  async (): Promise<UserPickPostsResponse> => {
    const response = await axios.get<UserPickPostsResponse>(
      "/api/posts/userpick/top-bookmarks"
    );
    return response.data;
  };

/**
 * 그루밍 이야기 게시물 조회 API 함수 (무한 스크롤)
 * GET /api/posts/userpick/all/latest
 */
export interface GroomingStoryParams {
  limit: number;
  lastCursor?: string;
}

export interface GroomingStoryResponse {
  data: UserPickPost[];
  nextCursorDateTime: string | null;
  hasNext: boolean;
}

export interface GroomingStoryApiResponse {
  status: number;
  code: string;
  message: string;
  data: GroomingStoryResponse;
}

export const getGroomingStoryPosts = async (
  params: GroomingStoryParams
): Promise<GroomingStoryApiResponse> => {
  const response = await axios.get<GroomingStoryApiResponse>(
    "/api/posts/userpick/all/latest",
    { params }
  );
  return response.data;
};
