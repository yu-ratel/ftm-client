import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SideCategoryItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  icon,
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
      <div className={twMerge("mr-3", !isActive && "text-secondary")}>
        {icon}
      </div>
      <span className={twMerge(!isActive && "text-secondary")}>{label}</span>
    </li>
  );
}
