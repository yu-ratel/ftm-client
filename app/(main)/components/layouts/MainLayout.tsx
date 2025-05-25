import React, { ReactNode } from "react";
import LeftSidebar from "../sidebar/(left)/LeftSidebar";
import RightSidebar from "../sidebar/(right)/RightSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1920px] justify-center px-4">
      <div className="hidden w-[324px] shrink-0 lg:block">
        <LeftSidebar />
      </div>

      <div className="mx-auto w-full max-w-[808px]">{children}</div>

      <div className="hidden w-[324px] shrink-0 lg:block">
        <RightSidebar />
      </div>
    </div>
  );
}
