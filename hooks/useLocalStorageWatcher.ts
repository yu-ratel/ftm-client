import { useEffect } from "react";
import { getUser } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import { openAlert } from "@/utils/modal/OpenAlert";
import { isServer } from "@/constants/environment";
import { useSignOut } from "@/app/(auth)/signin/hooks/useSignOut";

/**
 * 로컬 스토리지 변경 감지 훅
 * - 로컬 스토리지의 사용자 정보가 변경되거나 삭제될 때 감지
 */
export const useLocalStorageWatcher = () => {
  const router = useRouter();
  const { mutate: logout } = useSignOut();

  useEffect(() => {
    if (isServer) return;

    // 초기 상태 확인
    const checkInitialState = () => {
      const user = getUser();
      const storedUserData = localStorage.getItem("userInfo");

      // Zustand 스토어에는 사용자가 있지만 로컬스토리지에는 없는 경우
      if (user && (!storedUserData || storedUserData === "undefined")) {
        handleInvalidSession();
      }
    };

    // 세션 무효화 처리
    const handleInvalidSession = () => {
      openAlert("로그인 정보가 변경되었습니다. 다시 로그인해주세요.", () =>
        logout()
      );
    };

    // 스토리지 이벤트 핸들러
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userInfo") {
        const user = getUser();

        // 스토어에는 유저가 있지만 로컬스토리지에서 삭제된 경우
        if (user && (!e.newValue || e.newValue === "undefined")) {
          handleInvalidSession();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    checkInitialState();

    // 클린업 함수
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);
};
