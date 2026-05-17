export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  id: number;
  nickname: string;
  profileImageUrl: string;
  normalLevelName: string | null;
  truthLevelName: string | null;
  loginTime: string;
}

export interface SessionValidityResponse {
  isValid: boolean;
}
