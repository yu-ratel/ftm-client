import React from "react";

interface TitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const TitleInput = ({ title, onTitleChange }: TitleInputProps) => {
  return (
    <div className="border-b border-gray-100 px-6 pb-4 pt-6">
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full border-none bg-transparent text-2xl font-bold text-gray-900 placeholder-gray-400 outline-none"
      />
    </div>
  );
};

export default TitleInput;
