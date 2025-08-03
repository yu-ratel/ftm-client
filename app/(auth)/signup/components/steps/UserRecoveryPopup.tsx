import React from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { hideModal } from "@/stores/ModalStore";
import { useMutation } from "@tanstack/react-query";
import { recoverUser } from "../../api";

interface UserRecoveryPopupProps {
  email: string;
  nextStep: () => void;
}

const UserRecoveryPopup = ({ email, nextStep }: UserRecoveryPopupProps) => {
  const router = useRouter();

  const handleSignup = () => {
    nextStep();
    hideModal();
  };
  const mutation = useMutation({
    mutationFn: recoverUser,
    onSuccess: (response) => {
      console.log("recoverUser response!", response);
      hideModal();
      router.push(ROUTES.SIGNIN);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleRecover = () => {
    mutation.mutate(email);
    // hideModal();
    // router.push(ROUTES.SIGNIN);
  };

  return (
    <div className="w-full max-w-[600px] space-y-6 rounded-[16px] bg-black/50 bg-white px-6 py-8 text-center shadow-lg">
      {/* 지구본 영역 */}
      <div className="mx-auto h-[80px] w-[80px] rounded-full bg-gray-200" />

      {/* 텍스트 */}
      <p className="text-[14px] font-medium leading-[1.6] text-black">
        기존에 가입했던 이력이 있어요.
        <br />
        계정을 복구할까요?
      </p>

      <button
        onClick={handleRecover}
        className="h-[38px] w-full rounded-[8px] bg-[#1481fd] text-[14px] font-medium text-white transition hover:opacity-90"
      >
        계정 복구하기
      </button>

      <div>
        <button
          onClick={handleSignup}
          className="text-[13px] text-black hover:underline"
        >
          새로운 계정 만들기
        </button>
      </div>
    </div>
  );
};

export default UserRecoveryPopup;
