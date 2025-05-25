"use client";
import { useState } from "react";
import { FiUser, FiBookmark, FiList } from "react-icons/fi";
import SectionTitle from "../SectionTitle";
import SideCategoryItem from "./SideCategoryItem";
import ProfileCard from "./ProfileCard";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function LeftSidebar() {
  const [activeMenu, setActiveMenu] = useState("유형별 추천");
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

  const menuItems =
    pathname === ROUTES.USER_PICK ? userPickMenuItems : allMenuItems;

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
              onClick={() => setActiveMenu(item.id)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
