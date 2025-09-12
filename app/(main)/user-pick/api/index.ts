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
