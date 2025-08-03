"use client";
import { useState } from "react";
import { FiUser, FiBookmark, FiList } from "react-icons/fi";
import SectionTitle from "../SectionTitle";
import SideCategoryItem from "./SideCategoryItem";
import ProfileCard from "./ProfileCard";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { deleteUser } from "@/app/(auth)/signup/api";

export default function LeftSidebar() {
  const [activeMenu, setActiveMenu] = useState("유형별 추천");
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();

  const allMenuItems = [
    { id: "유형별 추천", icon: <FiUser />, label: "유형별 추천" },
    { id: "해시태그 추천", icon: <FiBookmark />, label: "해시태그 추천" },
    { id: "step-by-step", icon: <FiUser />, label: "Step by Step" },
    { id: "핏더맨 큐레이션", icon: <FiList />, label: "핏더맨 큐레이션" },
  ];

  const userPickMenuItems = [
    { id: "유형별 추천", icon: <FiUser />, label: "유형별 추천" },
    { id: "해시태그 추천", icon: <FiBookmark />, label: "해시태그 추천" },
  ];

  const menuItems = pathname.includes(ROUTES.USER_PICK)
    ? userPickMenuItems
    : allMenuItems;

  const handleDeleteUser = async () => {
    if (!confirm("정말로 회원탈퇴를 진행하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteUser();
      alert("회원탈퇴가 완료되었습니다.");
      // 로그아웃 처리나 홈페이지로 리다이렉트
      window.location.href = "/";
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="ml-[18px] flex h-auto min-h-[558px] w-[324px] flex-col gap-[110px] p-4">
      <div className="min-h-[200px] w-[288px]">
        <SectionTitle title="마이 프로필" />
        <ProfileCard />

        {/* 테스트용 회원탈퇴 버튼 */}
        <div className="mt-4">
          <button
            onClick={handleDeleteUser}
            disabled={isDeleting}
            className="w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:bg-red-300"
          >
            {isDeleting ? "처리중..." : "회원탈퇴 (테스트)"}
          </button>
        </div>
      </div>

      <nav>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <SideCategoryItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeMenu === item.id}
              onClick={() => setActiveMenu(item.id)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
