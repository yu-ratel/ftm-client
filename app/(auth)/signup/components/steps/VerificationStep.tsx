"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailCode, sendEmailAuthentication } from "../../api";
import { openAlert } from "@/utils/modal/OpenAlert";

interface VerificationStepProps {
  email: string;
  onVerificationSuccess: () => void;
  onPrevStep: () => void;
}

const VerificationStep = ({
  email,
  onVerificationSuccess,
  onPrevStep,
}: VerificationStepProps) => {
  const [code, setCode] = useState("");

  // 인증 코드 확인 뮤테이션
  const verifyCodeMutation = useMutation({
    mutationFn: () => verifyEmailCode(email, code),
    onSuccess: (response) => {
      if (response.data.isVerified) {
        onVerificationSuccess();
      } else {
        openAlert("인증번호가 일치하지 않습니다.");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "인증 확인에 실패했습니다.";
      openAlert(errorMessage);
    },
  });

  // 인증번호 재전송 뮤테이션
  const resendAuthenticationMutation = useMutation({
    mutationFn: () => sendEmailAuthentication(email),
    onSuccess: () => {
      openAlert("인증번호가 재전송되었습니다.");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "인증번호 재전송에 실패했습니다.";
      openAlert(errorMessage);
    },
  });

  const handleVerifyCode = () => {
    if (!code) {
      openAlert("인증번호를 입력해주세요.");
      return;
    }
    verifyCodeMutation.mutate();
  };

  const handleResendCode = () => {
    resendAuthenticationMutation.mutate();
  };

  return (
    <>
      {/* 인증 코드 입력 */}
      <div className="w-full max-w-[392px] space-y-2">
        <label className="block text-[14px] font-medium leading-[14px] text-black">
          메일로 전송된 인증 번호를 입력해주세요.
        </label>

        <input
          type="text"
          placeholder="인증 번호 입력하기"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-[38px] w-full rounded-[10px] border border-input-border bg-input-bg px-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="ml-4 text-xs text-[#9AABC5]">
              인증 번호를 받지 못하셨나요?
            </p>
          </div>
          <button
            onClick={handleResendCode}
            disabled={resendAuthenticationMutation.isPending}
            className="mt-[4px] h-[18px] rounded-[4px] bg-blue-100 px-[10px] py-[4px] text-[10px] font-normal leading-[10px] text-blue-500 disabled:opacity-50"
          >
            {resendAuthenticationMutation.isPending
              ? "전송 중..."
              : "인증 번호 재요청"}
          </button>
        </div>
      </div>

      {/* 인증 버튼들 */}
      <div className="mt-8 w-full max-w-[392px] space-y-4">
        <button
          onClick={handleVerifyCode}
          disabled={verifyCodeMutation.isPending}
          className="h-[38px] w-full rounded-[10px] bg-button-primary text-center font-medium text-black disabled:opacity-50"
        >
          {verifyCodeMutation.isPending ? "확인 중..." : "인증하기"}
        </button>
        <button
          onClick={onPrevStep}
          className="w-full text-center text-sm font-medium text-black hover:underline"
        >
          이전 단계로 돌아가기
        </button>
      </div>
    </>
  );
};

export default VerificationStep;
