import { useMutation } from "@tanstack/react-query";
import { signOut } from "../api";
import { clearUser } from "@/stores/AuthStore";
import { ROUTES } from "@/constants/routes";
import { isServer } from "@/constants/environment";

/**
 * 로그아웃 처리를 위한 커스텀 훅
 * @param onSuccess 로그아웃 성공 후 실행할 콜백 함수 (옵션)
 */
export const useSignOut = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // 로그아웃 성공 시 사용자 정보 초기화
      clearUser();

      // 콜백이 있다면 실행
      if (onSuccess) {
        onSuccess();
      } else if (!isServer) {
        window.location.href = ROUTES.SIGNIN;
      }
    },
    onError: (error) => {
      console.error("로그아웃 처리 중 에러:", error);
      clearUser();
      if (!isServer) {
        window.location.href = ROUTES.SIGNIN;
      }
    },
  });
};
