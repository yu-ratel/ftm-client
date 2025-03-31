import React from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { hideModal } from "@/stores/ModalStore";
import { initiateKakaoLogin } from "@/utils/auth/kakaoAuth";

const SigninSelectModal = () => {
  const router = useRouter();

  const handleKakaoLogin = () => {
    initiateKakaoLogin();
  };

  const handleEmailLogin = () => {
    hideModal();
    router.push(ROUTES.SIGNIN);
  };

  const handleSignup = () => {
    hideModal();
    router.push(ROUTES.SIGNUP);
  };

  return (
    <div className="w-full max-w-[600px] space-y-6 rounded-[16px] bg-black/50 bg-white px-6 py-8 text-center shadow-lg">
      {/* 지구본 영역 */}
      <div className="mx-auto h-[80px] w-[80px] rounded-full bg-gray-200" />

      {/* 텍스트 */}
      <p className="text-[14px] font-medium leading-[1.6] text-black">
        핏더맨에 합류해 더욱 다양한
        <br />
        맞춤 추천을 받아보세요
      </p>

      {/* 카카오 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="h-[38px] w-full rounded-[8px] bg-[#FEE500] text-[14px] font-medium text-black transition hover:opacity-90"
      >
        카카오로 계정으로 로그인
      </button>

      {/* 이메일 로그인 버튼 */}
      <button
        onClick={handleEmailLogin}
        className="h-[38px] w-full rounded-[8px] bg-[#ECECEC] text-[14px] font-medium text-black transition hover:bg-gray-300"
      >
        이메일로 로그인
      </button>

      {/* 회원가입 이동 */}
      <div>
        <button
          onClick={handleSignup}
          className="text-[13px] text-black hover:underline"
        >
          회원가입 하러 가기
        </button>
      </div>
    </div>
  );
};

export default SigninSelectModal;
