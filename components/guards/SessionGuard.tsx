"use client";

import { useSessionValidityCheck } from "@/hooks/useSessionValidityCheck";
import { useLocalStorageWatcher } from "@/hooks/useLocalStorageWatcher";

/**
 * 세션 관리 컴포넌트
 * - 세션 유효성 검사
 * - 로컬스토리지 변경 감지
 */
const SessionGuard = () => {
  // 세션 유효성 검사 훅 사용
  useSessionValidityCheck();
  // 로컬스토리지 변경 감지 훅 사용
  useLocalStorageWatcher();

  return null;
};

export default SessionGuard;
