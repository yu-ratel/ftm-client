import React from "react";
import { twMerge } from "tailwind-merge";
import SidebarIconFrame, {
  SidebarFrameTileImage,
} from "../SidebarIconFrame";

interface SideCategoryItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  label,
  isActive = false,
  onClick,
}: SideCategoryItemProps) {
  return (
    <li
      className={twMerge(
        "flex h-[56px] w-[288px] cursor-pointer items-center p-3 px-4",
        isActive && "rounded-[20px] bg-[#F5F5F7] hover:bg-[#e0e0e0]"
      )}
      onClick={onClick}
    >
      <SidebarIconFrame className="mr-3">
        <SidebarFrameTileImage alt={`${label} 아이콘`} />
      </SidebarIconFrame>
      <span className={twMerge(!isActive && "text-secondary")}>{label}</span>
    </li>
  );
}
