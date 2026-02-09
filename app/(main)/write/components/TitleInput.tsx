import React from "react";

interface TitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const TitleInput = ({ title, onTitleChange }: TitleInputProps) => {
  return (
    <div className="flex h-12 items-center rounded-lg border border-[#e1e1e7] bg-white px-4">
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full border-none bg-transparent text-base font-medium text-gray-900 placeholder-[#9aabc5] outline-none"
      />
    </div>
  );
};

export default TitleInput;
