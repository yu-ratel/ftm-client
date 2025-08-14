"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../signup/api";
import { openAlert } from "@/utils/modal/OpenAlert";
import { openConfirm } from "@/utils/modal/OpenConfirm";
import SessionGuard from "@/components/guards/SessionGuard";
import { ROUTES } from "@/constants/routes";

export default function AccountDeleteClient() {
  const [deleteReason, setDeleteReason] = useState("");
  const router = useRouter();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      window.location.href = ROUTES.ROOT;
    },
    onError: (error) => {
      console.error("계정 삭제 실패:", error);
      openAlert(
        "계정 삭제 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
      );
    },
  });

  const handleDelete = () => {
    if (!deleteReason.trim()) {
      openAlert("삭제 이유를 입력해주세요.");
      return;
    }

    openConfirm(
      "정말로 계정을 삭제하시겠습니까?",
      () => {
        deleteUserMutation.mutate();
      },
      undefined,
      "삭제하기",
      "취소"
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <SessionGuard />
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* 데스크톱: 피그마 정확한 크기, 모바일: 패딩과 함께 조정 */}
        <div className="relative h-auto w-full max-w-[426px] md:h-[372px] md:w-[426px]">
          {/* 제목 */}
          <h1 className="mb-6 text-center text-xl font-semibold leading-6 text-black md:absolute md:left-[113px] md:top-0 md:mb-0 md:text-2xl">
            핏더맨 계정 삭제하기
          </h1>

          {/* 설명 텍스트 */}
          <p className="mb-8 text-center text-sm font-medium leading-[21px] text-[#374254] md:absolute md:left-0 md:top-[48px] md:mb-0 md:w-[426px]">
            계정을 삭제하시면 그동안 핏더맨에 올려주신 글과 정보가 모두
            삭제됩니다.
            <br />
            그루밍 지수 검사 내역은 계정 삭제 후 30일 내에 재가입 시 복구가
            가능합니다.
          </p>

          {/* 삭제 이유 라벨 */}
          <label className="mb-2 block text-sm font-medium leading-[14px] text-[#374254] md:absolute md:left-[17px] md:top-[162px] md:mb-0">
            어떤 이유로 삭제하시는지 알려주시겠어요?
          </label>

          {/* 입력 필드 */}
          <div className="mb-6 h-[38px] w-full rounded-[10px] border border-[#eaeaec] bg-[#f1f1f1] bg-opacity-50 md:absolute md:left-[17px] md:top-[186px] md:mb-0 md:w-[392px]">
            <input
              type="text"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="삭제 이유를 알려주세요"
              className="h-full w-full rounded-[10px] bg-transparent px-3 py-2 text-sm placeholder-[#c5c5c5] focus:outline-none"
              disabled={deleteUserMutation.isPending}
            />
          </div>

          {/* 삭제 버튼 */}
          <button
            onClick={handleDelete}
            disabled={!deleteReason.trim() || deleteUserMutation.isPending}
            className="mb-4 h-[38px] w-full rounded-xl bg-[#ff5b45] text-sm font-medium text-white transition-colors hover:bg-[#ff5b45]/90 disabled:cursor-not-allowed disabled:bg-gray-300 md:absolute md:left-[17px] md:top-[296px] md:mb-0 md:w-[392px]"
          >
            {deleteUserMutation.isPending ? "삭제 중..." : "삭제하기"}
          </button>

          {/* 뒤로 가기 버튼 */}
          <button
            onClick={handleGoBack}
            disabled={deleteUserMutation.isPending}
            className="w-full text-center text-sm font-medium text-[#374254] transition-colors hover:text-[#374254]/80 disabled:text-gray-400 md:absolute md:left-[187px] md:top-[358px] md:w-auto"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </>
  );
}
