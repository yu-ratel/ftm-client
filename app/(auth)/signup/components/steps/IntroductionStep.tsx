"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSignupOptions, signup, socialSignup } from "../../api";
import { Age, SignupRequest } from "../../types";
import { openAlert } from "@/utils/modal/OpenAlert";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { AGE } from "../../constants";
import { setUser } from "@/stores/AuthStore";

interface IntroductionStepProps {
  email: string;
  password: string;
  isSocial?: boolean;
  onPrevStep: () => void;
}

const IntroductionStep = ({
  email,
  password,
  isSocial = false,
  onPrevStep,
}: IntroductionStepProps) => {
  const router = useRouter();

  const [selectedAge, setSelectedAge] = useState<Age>(AGE.TEENS);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  // 회원가입 옵션 조회
  const { data: signupOptions } = useQuery({
    queryKey: ["signupOptions"],
    queryFn: () => getSignupOptions(),
  });

  // 일반 회원가입 mutation
  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: () => {
      openAlert("회원가입이 완료되었습니다!", () => {
        router.push(ROUTES.SIGNIN);
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      openAlert(errorMessage);
    },
  });

  // 소셜 회원가입 mutation
  const socialSignupMutation = useMutation({
    mutationFn: (data: { age: Age; hashtags: string[] }) => socialSignup(data),
    onSuccess: (response) => {
      setUser(response.data);

      router.push(ROUTES.HOME);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      openAlert(errorMessage);
    },
  });

  const toggleHashtag = (value: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (!selectedAge) {
      openAlert("연령대를 선택해주세요.");
      return;
    }

    if (selectedHashtags.length === 0) {
      openAlert("관심사를 1개 이상 선택해주세요.");
      return;
    }

    if (isSocial) {
      // 소셜 회원가입
      socialSignupMutation.mutate({
        age: selectedAge,
        hashtags: selectedHashtags,
      });
    } else {
      // 일반 회원가입
      const signupData: SignupRequest = {
        email,
        password,
        age: selectedAge,
        hashtags: selectedHashtags,
      };
      signupMutation.mutate(signupData);
    }
  };

  // 버튼 스타일 동적 생성
  const getSubmitButtonClassName = () => {
    const baseStyle =
      "h-[38px] w-full rounded-[10px] text-center font-medium text-black disabled:opacity-50";
    return selectedHashtags.length > 0
      ? `${baseStyle} bg-blue-500 text-white`
      : `${baseStyle} bg-button-primary`;
  };

  return (
    <>
      <h2 className="mb-8 text-[24px] font-semibold text-black">
        간단한 소개를 해주세요.
      </h2>

      <div className="w-full max-w-[392px] space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-black">
            연령대
          </label>
          <div className="relative">
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value as Age)}
              className="h-[38px] w-full rounded-[10px] border border-[#EAEAEC] bg-[#F6F6F6] px-4 text-sm focus:outline-none"
            >
              {signupOptions?.data.ages.map((age) => (
                <option key={age.value} value={age.value}>
                  {age.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            나의 그루밍 관심
          </label>
          <div className="grid grid-cols-2 gap-2">
            {signupOptions?.data.hashtags.map((hashtag) => (
              <button
                key={hashtag.value}
                onClick={() => toggleHashtag(hashtag.value)}
                className="flex w-full items-center justify-between rounded-[12px] border border-[#EAEAEC] bg-[#F6F6F6] px-4 py-2 text-sm"
              >
                {hashtag.description}
                <span
                  className={`h-4 w-4 rounded-full transition-colors ${
                    selectedHashtags.includes(hashtag.value)
                      ? "bg-blue-500"
                      : "bg-[#E0E0E0]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleSubmit}
            disabled={signupMutation.isPending}
            className={getSubmitButtonClassName()}
          >
            완료
          </button>
          <button
            onClick={onPrevStep}
            className="w-full text-center text-sm font-medium text-black hover:underline"
          >
            이전 단계로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
};

export default IntroductionStep;
