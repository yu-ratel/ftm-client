import api, { authApi } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { TrendingPost, PostDetail, TrendingUser } from "../../types/PostType";

const BASE_PATH = "/api/posts";

/**
 * 트렌딩 게시물 조회 API
 */
export const getTrendingPosts = async (): Promise<TrendingPost[]> => {
  try {
    const response = await api.get<ApiResponse<TrendingPost[]>>(
      `${BASE_PATH}/trend`
    );
    return response.data.data;
  } catch (error) {
    console.error("트렌딩 게시물 조회 실패:", error);
    throw error;
  }
};

/**
 * 트렌딩 핏더맨 조회 API
 */
export const getTrendingUsers = async (): Promise<TrendingUser[]> => {
  try {
    const response = await api.get<ApiResponse<TrendingUser[]>>(
      `${BASE_PATH}/trend/users`
    );
    return response.data.data;
  } catch (error) {
    console.error("트렌딩 핏더맨 조회 실패:", error);
    throw error;
  }
};

/**
 * 게시글 상세 조회 API
 */
export const getPostDetail = async (
  postId: string | number
): Promise<PostDetail> => {
  try {
    const response = await api.get<ApiResponse<PostDetail>>(
      `${BASE_PATH}/${postId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("게시글 상세 조회 실패:", error);
    throw error;
  }
};

/**
 * 게시글 작성 API
 */
export interface CreatePostProduct {
  imageIndex: number; // 상품 이미지와 매핑된 인덱스 (1부터 시작, 이미지를 등록하지 않은 상품이라면 -1 지정)
  name: string; // 상품 이름
  brand?: string; // 상품 브랜드
  hashtags?: string[]; // 상품 해시태그 목록
}

export interface CreatePostData {
  title: string; // 게시글 제목
  groomingCategory: string; // 게시글 그루밍 분야
  hashtags?: string[]; // 게시글 해시태그 목록
  content: string; // 게시글 내용
  products?: CreatePostProduct[]; // 게시글에 포함된 상품 목록
  postImageFiles?: File[]; // 게시글 이미지 파일 리스트
  productImageFiles?: File[]; // 상품 이미지 파일 리스트
}

export interface CreatePostResponse {
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export const createPost = async (
  postData: CreatePostData
): Promise<ApiResponse<CreatePostResponse>> => {
  try {
    const formData = new FormData();

    // JSON 데이터를 'data' part에 문자열로 추가
    const jsonData = {
      title: postData.title,
      groomingCategory: postData.groomingCategory,
      hashtags: postData.hashtags,
      content: postData.content,
      products: postData.products,
    };
    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });
    formData.append("data", jsonBlob);
    // 게시글 이미지 파일들 추가
    if (postData.postImageFiles) {
      postData.postImageFiles.forEach((image) => {
        formData.append("postImageFiles", image);
      });
    }

    // 상품 이미지 파일들 추가
    if (postData.productImageFiles) {
      postData.productImageFiles.forEach((image) => {
        formData.append("productImageFiles", image);
      });
    }

    const response = await authApi.post<ApiResponse<CreatePostResponse>>(
      `${BASE_PATH}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    throw error;
  }
};
