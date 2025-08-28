"use client";
import { useState, useEffect, useCallback } from "react";
import { FiUser, FiBookmark, FiList } from "react-icons/fi";
import SectionTitle from "../SectionTitle";
import SideCategoryItem from "./SideCategoryItem";
import ProfileCard from "./ProfileCard";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function LeftSidebar() {
  // 현재 경로에 따라 activeMenu 결정
  const pathname = usePathname();
  const router = useRouter();

  const getActiveMenuFromPath = useCallback(() => {
    if (pathname.includes("/user-pick/hash-tag")) return "해시태그 추천";
    if (pathname.includes("/user-pick")) return "그루밍 라운지";
    return "그루밍 라운지";
  }, [pathname]);

  const [activeMenu, setActiveMenu] = useState(getActiveMenuFromPath());

  // 경로 변경 시 activeMenu 업데이트
  useEffect(() => {
    setActiveMenu(getActiveMenuFromPath());
  }, [getActiveMenuFromPath]);

  const allMenuItems = [
    { id: "그루밍 라운지", icon: <FiUser />, label: "그루밍 라운지" },
    { id: "해시태그 추천", icon: <FiBookmark />, label: "해시태그 추천" },
    { id: "step-by-step", icon: <FiUser />, label: "Step by Step" },
    { id: "핏더맨 큐레이션", icon: <FiList />, label: "핏더맨 큐레이션" },
  ];

  const userPickMenuItems = [
    { id: "그루밍 라운지", icon: <FiUser />, label: "그루밍 라운지" },
    { id: "해시태그 추천", icon: <FiBookmark />, label: "해시태그 추천" },
  ];

  const menuItems = pathname.includes(ROUTES.USER_PICK)
    ? userPickMenuItems
    : allMenuItems;

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);

    // 해시태그 추천 클릭 시 user-pick 내 해시태그 페이지로 이동
    if (menuId === "해시태그 추천") {
      router.push(ROUTES.USER_PICK_HASH_TAG);
    }
    // 그루밍 라운지 클릭 시 user-pick 메인 페이지로 이동
    else if (menuId === "그루밍 라운지") {
      router.push(ROUTES.USER_PICK);
    }
  };

  return (
    <div className="ml-[18px] flex h-auto min-h-[558px] w-[324px] flex-col gap-[110px] p-4">
      <div className="min-h-[200px] w-[288px]">
        <SectionTitle title="마이 프로필" />
        <ProfileCard />
      </div>

      <nav>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <SideCategoryItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeMenu === item.id}
              onClick={() => handleMenuClick(item.id)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
