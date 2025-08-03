"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { showModal } from "@/stores/ModalStore";
import AlertModal from "@/components/modals/common/AlertModal";
import { openAlert } from "@/utils/modal/OpenAlert";
import { clearUser, getUser, setUser } from "@/stores/AuthStore";
import { AxiosError } from "axios";

const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 미들웨어에서 세션만료로 넘어 온 경우
  useEffect(() => {
    if (getUser()) {
      clearUser();
      console.log("SigninForm");
      openAlert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    }
  }, []);

  const signinMutation = useMutation({
    mutationFn: () => signin({ email, password }),
    onSuccess: (response) => {
      setUser(response.data);

      // 쿠키 상태 확인
      console.log("로그인 성공 후 쿠키 확인:");
      console.log("document.cookie:", document.cookie);
      console.log("SESSION 쿠키 존재:", document.cookie.includes("SESSION"));

      router.push(ROUTES.USER_PICK);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "로그인에 실패했습니다.";
      openAlert(errorMessage);
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      showModal({
        component: (
          <AlertModal
            message="이메일과 비밀번호를 입력해주세요."
            buttonText="확인"
          />
        ),
      });
      return;
    }

    signinMutation.mutate();
  };

  const handleSignup = () => {
    router.push(ROUTES.SIGNUP);
  };

  return (
    <>
      <div className="w-full max-w-[392px] space-y-5">
        {/* 이메일 입력 */}
        <div className="space-y-2">
          <label className="block text-[14px] font-medium text-black">
            이메일<span className="text-black">*</span>
          </label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[38px] w-full rounded-[10px] border border-input-border bg-input-bg px-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 패스워드 입력 */}
        <div className="space-y-2">
          <label className="block text-[14px] font-medium text-black">
            패스워드<span className="text-black">*</span>
          </label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[38px] w-full rounded-[10px] border border-input-border bg-input-bg px-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 w-full max-w-[392px] space-y-4">
        <button
          onClick={handleLogin}
          disabled={signinMutation.isPending}
          className="h-[38px] w-full rounded-[10px] bg-button-primary text-center font-medium text-black disabled:opacity-50"
        >
          로그인
        </button>
      </div>

      <div className="mt-4 flex w-full max-w-[392px] justify-between text-sm text-black">
        <button type="button" className="hover:underline">
          비밀번호 찾기
        </button>
        <button
          type="button"
          onClick={handleSignup}
          className="hover:underline"
        >
          회원가입 하러 가기
        </button>
      </div>
    </>
  );
};

export default SigninForm;
