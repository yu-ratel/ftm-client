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
  const [message, setMessage] = useState("");

  // 입력창 스타일 동적 생성
  const getInputClassName = () => {
    const baseStyle =
      "h-[38px] w-full rounded-[10px] border bg-input-bg px-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

    if (!message) return `${baseStyle} border-input-border`;
    if (message.includes("성공")) return `${baseStyle} border-green-500`;
    return `${baseStyle} border-red-error`;
  };

  // 버튼 스타일 동적 생성
  const getVerifyButtonClassName = () => {
    const baseStyle =
      "h-[38px] w-full rounded-[10px] text-center font-medium disabled:opacity-50";
    return code.length > 0
      ? `${baseStyle} bg-blue-500 text-white`
      : `${baseStyle} bg-button-primary text-black`;
  };

  // 인증 코드 확인 뮤테이션
  const verifyCodeMutation = useMutation({
    mutationFn: () => verifyEmailCode(email, code),
    onSuccess: (response) => {
      if (response.data.isVerified) {
        onVerificationSuccess();
      } else {
        setMessage("인증번호가 일치하지 않습니다.");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "인증 확인에 실패했습니다.";
      setMessage(errorMessage);
    },
  });

  // 인증번호 재전송 뮤테이션
  const resendAuthenticationMutation = useMutation({
    mutationFn: () => sendEmailAuthentication(email),
    onSuccess: () => {
      setMessage("인증번호가 재전송되었습니다.");
      setCode("");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "인증번호 재전송에 실패했습니다.";
      setMessage(errorMessage);
      setCode("");
    },
  });

  const handleVerifyCode = () => {
    if (!code) {
      setMessage("인증번호를 입력해주세요.");
      return;
    }
    verifyCodeMutation.mutate();
  };

  return (
    <>
      <div className="w-full max-w-[392px] space-y-2">
        <label className="block text-[14px] font-medium leading-[14px] text-black">
          메일로 전송된 인증 번호를 입력해주세요.
        </label>

        <input
          type="text"
          placeholder="인증 번호 입력하기"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={getInputClassName()}
        />

        <div className="flex items-center justify-between">
          <div className="flex-1">
            {message && (
              <p
                className={`ml-4 text-xs ${
                  message.includes("성공") ? "text-green-500" : "text-red-error"
                }`}
              >
                {message}
              </p>
            )}
          </div>
          <button
            onClick={() => resendAuthenticationMutation.mutate()}
            disabled={resendAuthenticationMutation.isPending}
            className="mt-[4px] h-[18px] rounded-[4px] bg-blue-100 px-[10px] py-[4px] text-[10px] font-normal leading-[10px] text-blue-500 disabled:opacity-50"
          >
            {resendAuthenticationMutation.isPending
              ? "전송 중..."
              : "인증 번호 재요청"}
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-[392px] space-y-4">
        <button
          onClick={handleVerifyCode}
          disabled={verifyCodeMutation.isPending}
          className={getVerifyButtonClassName()}
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
