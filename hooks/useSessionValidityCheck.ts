import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/AuthStore";
import { checkSessionValidity } from "@/app/(auth)/signin/api";
import { openAlert } from "@/utils/modal/OpenAlert";
import { useSignOut } from "@/app/(auth)/signin/hooks/useSignOut";

export const useSessionValidityCheck = () => {
  const { user } = useAuthStore((state) => state);
  const { mutate: logout } = useSignOut();

  const { data: isValid } = useQuery<boolean>({
    queryKey: ["sessionValidity"],
    queryFn: () => {
      // API 호출 전 쿠키 상태 확인
      console.log("세션 체크 전 쿠키 상태:");
      console.log("document.cookie:", document.cookie);
      console.log("SESSION 쿠키 존재:", document.cookie.includes("SESSION"));

      return checkSessionValidity();
    },
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
  });

  // TODO: 실제 세션 만료시 테스트 필요
  useEffect(() => {
    if (user && isValid === false) {
      console.log("세션이 무효하다고 판단됨 - 쿠키 확인:");
      console.log("document.cookie:", document.cookie);

      openAlert("로그인이 만료되었습니다. 다시 로그인해주세요.", () => {
        logout();
      });
    }
  }, [user, isValid]);
};
