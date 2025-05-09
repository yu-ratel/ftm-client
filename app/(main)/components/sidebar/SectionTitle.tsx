import React from "react";

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    // <div className="mb-2 flex items-center">
    //   <div className="mr-2 text-gray-600">{icon}</div>
    //   <h3 className="text-lg font-medium">{title}</h3>
    // </div>
    <div className="flex h-12 w-72 items-center pr-5">
      <div className="flex h-6 w-6 items-center justify-center rounded bg-[#f5f5f7]">
        {/* <img className="h-4 w-4" src="" alt={`${title} 아이콘`} /> */}
      </div>
      <div className="ml-3 text-base font-semibold tracking-[-0.02em] text-[#374254]">
        {title}
      </div>
    </div>
  );
}
