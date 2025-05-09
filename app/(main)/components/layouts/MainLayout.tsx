import React, { ReactNode } from "react";
import LeftSidebar from "../sidebar/(left)/LeftSidebar";
import RightSidebar from "../sidebar/(right)/RightSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1920px] justify-center px-4 sm:gap-x-4 md:gap-x-6 lg:justify-between lg:gap-x-10 xl:gap-x-14 2xl:gap-x-20">
      <div className="hidden w-[280px] shrink-0 sm:w-[300px] md:w-[324px] lg:block">
        <LeftSidebar />
      </div>

      <div className="w-full max-w-[808px] px-2 sm:px-4 md:px-6 lg:px-[45px] 2xl:max-w-[1224px]">
        {children}
      </div>

      <div className="hidden w-[280px] shrink-0 sm:w-[300px] md:w-[324px] lg:block">
        <RightSidebar />
      </div>
    </div>
  );
}
