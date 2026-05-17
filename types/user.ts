/**
 * 유저 정보 공통 인터페이스
 */
export interface UserInfo {
  id: number;
  nickname: string;
  profileImageUrl: string;
  normalLevelName: string | null;
  truthLevelName: string | null;
  loginTime: string;
  socialProvider?: "KAKAO";
}
