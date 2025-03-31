"use client";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import React, { useEffect } from "react";

const page = () => {
  // 카카오 로그인 테스트를 위한 임시 코드
  useEffect(() => {
    openSigninSelectModal();
  }, []);
  return <div>홈</div>;
};

export default page;
