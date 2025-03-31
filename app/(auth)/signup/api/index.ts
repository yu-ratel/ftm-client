import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  Age,
  EmailAuthResponse,
  EmailDuplicationResponse,
  SignupOptions,
  SignupRequest,
  SocialSignupResponse,
} from "../types";

const BASE_PATH = "/api/users";

/**
 * 회원가입 API
 */
export const signup = async (userData: SignupRequest): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(`${BASE_PATH}`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

/**
 * 회원가입 옵션 조회 API
 */
export const getSignupOptions = async (): Promise<
  ApiResponse<SignupOptions>
> => {
  try {
    const response = await api.get<ApiResponse<SignupOptions>>(
      `${BASE_PATH}/options`
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 옵션 조회 실패:", error);
    throw error;
  }
};

/**
 * 이메일 인증 요청 API
 */
export const sendEmailAuthentication = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${BASE_PATH}/email/authentication`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("이메일 인증 요청 실패:", error);
    throw error;
  }
};

/**
 * 이메일 중복 확인 API
 */
export const checkEmailDuplication = async (
  email: string
): Promise<ApiResponse<EmailDuplicationResponse>> => {
  try {
    const response = await api.get<ApiResponse<EmailDuplicationResponse>>(
      `${BASE_PATH}/email/duplication?email=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error) {
    console.error("이메일 중복 확인 실패:", error);
    throw error;
  }
};

/**
 * 이메일 인증 코드 확인 API
 */
export const verifyEmailCode = async (
  email: string,
  code: string
): Promise<ApiResponse<EmailAuthResponse>> => {
  try {
    const response = await api.post<ApiResponse<EmailAuthResponse>>(
      `${BASE_PATH}/email/authentication/code`,
      {
        email,
        code,
      }
    );
    return response.data;
  } catch (error) {
    console.error("이메일 인증 코드 확인 실패:", error);
    throw error;
  }
};

/**
 * 소셜 회원가입 API
 */
export const socialSignup = async (data: {
  age: Age;
  hashtags: string[];
}): Promise<ApiResponse<SocialSignupResponse>> => {
  const config = { withCredentials: true };
  const response = await api.post("/api/users/social", data, config);
  return response.data;
};
