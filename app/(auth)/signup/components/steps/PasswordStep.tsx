"use client";

import React, { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PasswordStepProps {
  onPasswordSubmit: (password: string) => void;
  onPrevStep: () => void;
}

const PasswordStep = ({ onPasswordSubmit, onPrevStep }: PasswordStepProps) => {
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  // 입력창 스타일 동적 생성
  const getInputClassName = (isError: boolean) => {
    const baseStyle =
      "h-[38px] w-full rounded-[10px] border bg-input-bg px-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

    if (!isError) return `${baseStyle} border-input-border`;
    return `${baseStyle} border-red-error`;
  };

  // 버튼 스타일 동적 생성
  const getSubmitButtonClassName = () => {
    const baseStyle =
      "h-[38px] w-full rounded-[10px] text-center font-medium disabled:opacity-50";
    return password && confirmPassword && !message && !confirmMessage
      ? `${baseStyle} bg-blue-500 text-white`
      : `${baseStyle} bg-button-primary text-black`;
  };

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
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
      );
    } else {
      setMessage("");
    }

    // 비밀번호 확인 메시지 업데이트
    if (confirmPassword) {
      if (newPassword !== confirmPassword) {
        setConfirmMessage("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmMessage("");
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (!newConfirmPassword) {
      setConfirmMessage("");
      return;
    }

    if (password !== newConfirmPassword) {
      setConfirmMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmMessage("");
    }
  };

  // 다음 단계로 이동
  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      setMessage("비밀번호를 모두 입력해주세요.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    onPasswordSubmit(password);
  };

  return (
    <>
      <div className="w-full max-w-[392px] space-y-4">
        {/* 비밀번호 입력 */}
        <div className="space-y-2">
          <label className="block text-[14px] font-medium leading-[14px] text-black">
            비밀번호<span className="text-black">*</span>
          </label>
          <div>
            <input
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8자 이상"
              value={password}
              onChange={handlePasswordChange}
              className={getInputClassName(!!message)}
            />
            {message && (
              <p className="text-red-error ml-4 mt-1 text-xs">{message}</p>
            )}
          </div>
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className="space-y-2">
          <label className="block text-[14px] font-medium leading-[14px] text-black">
            비밀번호 확인<span className="text-black">*</span>
          </label>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={getInputClassName(!!confirmMessage)}
            />
            {confirmMessage && (
              <p className="text-red-error ml-4 mt-1 text-xs">
                {confirmMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="mt-8 w-full max-w-[392px] space-y-4">
        <button onClick={handleSubmit} className={getSubmitButtonClassName()}>
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
