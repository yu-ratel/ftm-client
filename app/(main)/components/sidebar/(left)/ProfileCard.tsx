"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/AuthStore";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import { ROUTES } from "@/constants/routes";
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
    <div className="flex h-[154px] w-72 flex-col justify-center gap-6 rounded-xl bg-[#f5f5f7] p-6">
      <section className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[#d9d9d9]" />
        <div>
          <h3 className="text-base font-bold leading-none text-black">
            {user?.nickname}
          </h3>
          <p className="text-sm leading-none text-black">
            {user?.mildLevelName}, @asvb1234
          </p>
        </div>
      </section>
      <Link href={ROUTES.MY_PAGE}>
        <Button variant="primary" size="sm" className="h-9 w-full rounded-lg">
          마이 페이지
        </Button>
      </Link>
    </div>
  );
};

export default ProfileCard;
