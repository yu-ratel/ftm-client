"use client";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/AuthStore";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import React from "react";

const ProfileCard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;
  if (!isLoggedIn) {
    return (
      <div className="flex h-[154px] w-72 flex-col items-center justify-center rounded-xl bg-[#F5F5F7] p-4">
        <div className="mb-2 text-center text-sm">로그인하고</div>
        <div className="mb-4 text-center text-sm">맞춤 콘텐츠를 받아보세요</div>
        <Button
          variant="primary"
          size="sm"
          className="h-[38px] w-[138px]"
          onClick={() => openSigninSelectModal()}
        >
          핏더맨 시작하기
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-[154px] w-72 rounded-xl bg-[#f5f5f7]">
      <div className="absolute left-[25px] top-6 h-12 w-12 rounded-full bg-[#d9d9d9]" />
      <div className="absolute left-[85px] top-[29px] text-base font-bold leading-none text-black">
        {user?.nickname}
      </div>
      <div className="absolute left-[85px] top-[53px] text-sm leading-none text-black">
        {user?.mildLevelName}, @asvb1234
      </div>
      <div className="absolute left-6 top-[92px] flex h-[38px] w-[116px] items-center justify-center rounded-lg bg-[#1481fd]">
        <span className="text-sm font-semibold text-white">프로필</span>
      </div>
      <div className="absolute left-[148px] top-[92px] flex h-[38px] w-[116px] items-center justify-center rounded-lg bg-[#8cb0e7]">
        <span className="text-sm font-semibold text-white">기록</span>
      </div>
    </div>
  );
};

export default ProfileCard;
