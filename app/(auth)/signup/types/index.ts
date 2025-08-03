import { AGE } from "@/app/(auth)/signup/constants";

/**
 * 연령대 타입
 */
export type Age = keyof typeof AGE;
/**
 * 옵션 항목 인터페이스
 */
export interface OptionItem<T extends string = string> {
  value: T;
  description: string;
}

/**
 * 회원가입 요청 인터페이스
 */
export interface SignupRequest {
  email: string;
  password: string;
  age: Age; // 타입 안전성 보장
  hashtags: string[]; // 문자열 배열로 유연하게 처리
}

/**
 * 이메일 인증 요청 인터페이스
 */
export interface EmailAuthRequest {
  email: string;
}

/**
 * 이메일 인증 코드 확인 요청 인터페이스
 */
export interface EmailVerifyRequest {
  email: string;
  code: string;
}

/**
 * 회원가입 옵션 응답 인터페이스
 */
export interface SignupOptions {
  ages: OptionItem<Age>[]; // 연령대 옵션 목록
  hashtags: OptionItem<string>[]; // 해시태그 옵션 목록
}

/**
 * 이메일 중복 확인 응답 인터페이스
 */
export interface EmailDuplicationResponse {
  isDuplicated: boolean;
  // 기타 필요한 필드
}

/**
 * 이메일 인증 응답 인터페이스
 */
export interface EmailAuthResponse {
  isVerified: boolean;
  isRecoverable: boolean;
}

/**
 * 소셜 회원가입 응답 인터페이스
 */
export interface SocialSignupResponse {
  id: number;
  nickname: string;
  socialProvider: "KAKAO";
  profileImageUrl: string;
  mildLevelName: string | null;
  spicyLevelName: string | null;
  loginTime: string;
}

export interface RecoverUserResponse {
  userId: number;
}
