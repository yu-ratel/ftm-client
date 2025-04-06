"use client";

import React, { useState } from "react";
import { openAlert } from "@/utils/modal/OpenAlert";

interface PasswordStepProps {
  onPasswordSubmit: (password: string) => void;
  onPrevStep: () => void;
}

const PasswordStep = ({ onPasswordSubmit, onPrevStep }: PasswordStepProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setMessage("");
      setIsPasswordValid(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
      );
      setIsPasswordValid(false);
    } else {
      setMessage("사용 가능한 비밀번호입니다.");
      setIsPasswordValid(true);
    }
  };

  // 비밀번호 확인 핸들러
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password && newConfirmPassword && password !== newConfirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordValid(false);
    } else if (
      password &&
      newConfirmPassword &&
      password === newConfirmPassword
    ) {
      if (validatePassword(password)) {
        setMessage("비밀번호가 일치합니다.");
        setIsPasswordValid(true);
      }
    }
  };

  // 다음 단계로 이동
  const handleSubmit = () => {
    if (!password) {
      openAlert("비밀번호를 입력해주세요.");
      return;
    }

    if (!validatePassword(password)) {
      openAlert("비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    onPasswordSubmit(password);
  };

  return (
    <>
      {/* 이메일 입력 */}
      <div className="w-full max-w-[392px] space-y-2">
        <label className="block text-[14px] font-medium leading-[14px] text-black">
          패스워드<span className="text-black">*</span>
        </label>

        <div className="space-y-1">
          <input
            type="password"
            placeholder="영문과 숫자와 특수기호의 조합으로 8자이 이상이어야 합니다."
            value={password}
            onChange={handlePasswordChange}
            className="mb-1 h-[38px] w-full rounded-[10px] border border-input-border bg-input-bg px-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {message && (
            <p
              className={`ml-2 text-xs ${
                message.includes("사용 가능") || message.includes("일치합니다")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>

      {/* 인증 버튼들 */}
      <div className="mt-8 w-full max-w-[392px] space-y-4">
        <button
          onClick={handleSubmit}
          disabled={!isPasswordValid}
          className="h-[38px] w-full rounded-[10px] bg-button-primary text-center font-medium text-black"
        >
          다음단계
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

export default PasswordStep;
