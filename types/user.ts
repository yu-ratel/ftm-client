/**
 * 유저 정보 공통 인터페이스
 */
export interface UserInfo {
  id: number;
  nickname: string;
  profileImageUrl: string;
  mildLevelName: string | null;
  spicyLevelName: string | null;
  loginTime: string;
  socialProvider?: "KAKAO";
}
