import { useEffect, useRef } from "react";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";

const DEFAULT_VIEWPORT_RATIO = 0.45;

interface UseSigninPromptOnScrollOptions {
  /** 스크롤 임계값 = 뷰포트 높이 × 이 비율 (기본 0.45) */
  viewportRatio?: number;
}

/**
 * 비로그인(isGuest)일 때만, 창 스크롤이 일정 이상이면 로그인 선택 모달을 1회 노출합니다.
 */
export function useSigninPromptOnScroll(
  isGuest: boolean,
  options?: UseSigninPromptOnScrollOptions
) {
  const viewportRatio = options?.viewportRatio ?? DEFAULT_VIEWPORT_RATIO;
  const hasShownModal = useRef(false);

  useEffect(() => {
    if (!isGuest) {
      hasShownModal.current = false;
      return;
    }

    const tryOpenModal = () => {
      if (hasShownModal.current) return;
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const threshold = window.innerHeight * viewportRatio;
      if (scrollY < threshold) return;
      hasShownModal.current = true;
      openSigninSelectModal();
    };

    window.addEventListener("scroll", tryOpenModal, { passive: true });
    tryOpenModal();

    return () => window.removeEventListener("scroll", tryOpenModal);
  }, [isGuest, viewportRatio]);
}
