"use client";
import { getUser } from "@/stores/AuthStore";
import { handleSignOut } from "@/utils/auth/handleSignOut";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    const user = getUser();
    if (!user) {
      openSigninSelectModal();
    }
  }, []);

  return (
    <>
      <div>홈</div>
      <button onClick={handleSignOut}>로그아웃 테스트</button>
    </>
  );
};

export default page;
