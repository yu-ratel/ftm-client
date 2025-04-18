import api, { authApi } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { SigninRequest, SigninResponse } from "../types";
import { clearUser } from "@/stores/AuthStore";

const BASE_PATH = "/api/auth";

/**
 * 일반 로그인 API
 */
export const signin = async (
  userData: SigninRequest
): Promise<ApiResponse<SigninResponse>> => {
  try {
    const response = await api.post<ApiResponse<SigninResponse>>(
      `${BASE_PATH}/login`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

/**
 * 카카오 로그인 API - 인증 필요
 */
export const kakaoLogin = async (code: string) => {
  const response = await authApi.post(`${BASE_PATH}/login/kakao`, {
    authorizationCode: code,
  });
  return response;
};

/**
 * 로그아웃 API
 */
export const signOut = async () => {
  try {
    await authApi.post(`${BASE_PATH}/logout`);
    clearUser();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
