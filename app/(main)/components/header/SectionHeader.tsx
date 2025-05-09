import React, { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  rightContent?: ReactNode;
}

export default function SectionHeader({
  title,
  description,
  rightContent,
}: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold text-[#374254]">{title}</h2>
        {rightContent && <div>{rightContent}</div>}
      </div>
      {description && (
        <p className="mt-1 text-sm text-[#9AABC5]">{description}</p>
      )}
    </div>
  );
}
