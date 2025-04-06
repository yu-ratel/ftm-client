"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkEmailDuplication, sendEmailAuthentication } from "../../api";
import { openAlert } from "@/utils/modal/OpenAlert";
import { useRouter } from "next/navigation";

interface EmailStepProps {
  email: string;
  onEmailSubmit: (email: string) => void;
}

const EmailStep = ({ email, onEmailSubmit }: EmailStepProps) => {
  const router = useRouter();

  const [inputEmail, setInputEmail] = useState(email);
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 이메일 중복 확인 뮤테이션
  const checkDuplicationMutation = useMutation({
    mutationFn: (email: string) => checkEmailDuplication(email),
    onSuccess: (data) => {
      if (data.data.isDuplicated) {
        setMessage("이미 사용 중인 이메일입니다.");
        setIsEmailValid(false);
      } else {
        setMessage("사용 가능한 이메일입니다.");
        setIsEmailValid(true);
      }
    },
    onError: (error: any) => {
      setMessage(
        error.response?.data?.message || "이메일 중복 확인에 실패했습니다."
      );
      setIsEmailValid(false);
      openAlert("이메일 중복 확인에 실패했습니다.");
    },
  });

  // 이메일 인증 요청 뮤테이션
  const sendAuthenticationMutation = useMutation({
    mutationFn: (email: string) => sendEmailAuthentication(email),
    onSuccess: () => {
      openAlert("메일로 인증번호가 전송되었습니다!", () =>
        onEmailSubmit(inputEmail)
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "이메일 인증 요청에 실패했습니다.";
      openAlert(errorMessage);
    },
  });

  // 이메일 중복 확인 핸들러
  const handleCheckDuplication = () => {
    if (!inputEmail) {
      setMessage("이메일을 입력해주세요.");
      return;
    }

    if (!validateEmail(inputEmail)) {
      setMessage("유효한 이메일 형식이 아닙니다.");
      return;
    }

    checkDuplicationMutation.mutate(inputEmail);
  };

  // 이메일 인증 요청 핸들러
  const handleSendAuthentication = () => {
    if (!isEmailValid) {
      setMessage("먼저 이메일 중복 확인을 해주세요.");
      return;
    }
    sendAuthenticationMutation.mutate(inputEmail);
  };

  // 입력창 스타일 동적 생성
  const getInputClassName = () => {
    const baseStyle =
      "h-[38px] w-full rounded-[10px] border bg-input-bg px-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

    if (!message) return `${baseStyle} border-input-border`;
    if (message.includes("사용 가능")) return `${baseStyle} border-green-500`;
    return `${baseStyle} border-red-error`;
  };

  // 버튼 스타일 동적 생성
  const getAuthButtonClassName = () => {
    const baseStyle = "h-[38px] w-full rounded-[10px] text-center font-medium";
    return isEmailValid
      ? `${baseStyle} bg-blue-500 text-white`
      : `${baseStyle} bg-button-primary text-black`;
  };

  return (
    <>
      {/* 이메일 입력 */}
      <div className="w-full max-w-[392px] space-y-2">
        {/* 라벨 */}
        <label className="block text-[14px] font-medium leading-[14px] text-black">
          이메일<span className="text-black">*</span>
        </label>

        {/* 입력창 */}
        <input
          type="email"
          placeholder="이메일 입력"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          className={getInputClassName()}
        />

        {/* 버튼과 메시지를 나란히 배치 */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {message && (
              <p
                className={`ml-4 text-xs ${
                  message.includes("사용 가능")
                    ? "text-green-500"
                    : "text-red-error"
                }`}
              >
                {message}
              </p>
            )}
          </div>
          <button
            onClick={handleCheckDuplication}
            disabled={checkDuplicationMutation.isPending}
            className="mt-[4px] h-[18px] rounded-[4px] bg-blue-100 px-[10px] py-[4px] text-[10px] font-normal leading-[10px] text-blue-500"
          >
            메일 중복확인
          </button>
        </div>
      </div>

      {/* 인증 버튼들 */}
      <div className="mt-8 w-full max-w-[392px] space-y-4">
        <button
          onClick={handleSendAuthentication}
          className={getAuthButtonClassName()}
        >
          메일 인증하기
        </button>
        <button
          className="w-full text-center text-sm font-medium text-black hover:underline"
          onClick={() => router.back()}
        >
          이전 단계로 돌아가기
        </button>
      </div>
    </>
  );
};

export default EmailStep;
