import { signOut } from "@/app/(auth)/signin/api";
import { isServer } from "@/constants/environment";
import { ROUTES } from "@/constants/routes";
import { clearUser } from "@/stores/AuthStore";

/**
 * 로그아웃 처리 후 루트로 리다이렉트
 */
export const handleSignOut = async () => {
  try {
    await signOut();
    clearUser();

    if (!isServer) {
      window.location.href = ROUTES.ROOT;
    }
  } catch (error) {
    console.error("로그아웃 처리 중 에러:", error);
  }
};
