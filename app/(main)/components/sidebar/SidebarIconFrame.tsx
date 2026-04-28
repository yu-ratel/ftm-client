import React, { ReactNode } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function SidebarFrameTileImage({ alt }: { alt: string }) {
  return (
    <Image
      src="/frame.png"
      alt={alt}
      width={16}
      height={16}
      className="h-4 w-4 object-contain"
    />
  );
}

interface SidebarIconFrameProps {
  children: ReactNode;
  className?: string;
}

export default function SidebarIconFrame({
  children,
  className,
}: SidebarIconFrameProps) {
  return (
    <div
      className={twMerge(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f5f5f7]",
        className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center [&_svg]:h-full [&_svg]:w-full">
        {children}
      </span>
    </div>
  );
}
