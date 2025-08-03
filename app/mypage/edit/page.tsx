"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import SectionHeader from "../components/SectionHeader";

interface EditInfoBarProps {
  title?: string;
  placeholder?: string;
  value?: string;
}

interface EditInfoButtonProps {
  category: string;
}

//TODO: children 형식으로 바꿔 dropdown 형식으로 바꿔주기
const EditInfoBar = ({ title, placeholder, value }: EditInfoBarProps) => {
  return (
    <div className="flex min-w-[392px] flex-col gap-2">
      <h3>{title}</h3>
      <input
        type="text"
        className="w-full rounded-md border border-gray-200 bg-gray-100/50 p-2"
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

const EditInfoButton = ({ category }: EditInfoButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex min-w-[392px] flex-col gap-2">
      <div className="relative flex items-center gap-2">
        <Button
          variant="input"
          size="md"
          className="text-left"
          onClick={() => setIsSelected(!isSelected)}
        >
          {category}
        </Button>
        <div
          className={`absolute right-3 size-4 rounded-full ${
            isSelected ? "bg-blue-500" : "bg-gray-200"
          }`}
        />
      </div>
    </div>
  );
};

const groomingInterestList = [
  "스킨케어",
  "향수",
  "건강",
  "메이크업",
  "패션",
  "면도",
  "헤어 스타일링",
  "바디케어",
];

const Page = () => {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader title="회원정보 수정" />
      <section>
        <div className="flex gap-5">
          <div className="size-20 rounded-full bg-gray-200" />
          <h3 className="text-sm leading-6">
            프로필 사진 변경
            <p className="text-gray-500">
              10MB 이하 PNG, JPG, SVG를 올려주세요.
            </p>
            <Button className="mt-1 w-44 rounded-[10px]">사진 업로드</Button>
          </h3>
        </div>
      </section>

      <section className="text-sm">
        {/* main section */}
        <div className="grid grid-cols-2 gap-x-12">
          <EditInfoBar
            title="유저네임*"
            placeholder="핏더맨이 부여한 유저네임*"
          />
          <EditInfoBar title="연령대" placeholder="20대" />
        </div>

        {/* sub section */}
        <div className="mt-6">
          <h3>나의 구르밍 관심</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {groomingInterestList.map((interest) => (
              <EditInfoButton key={interest} category={interest} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-center text-sm">
        <Button className="w-44 rounded-[10px]">저장하기</Button>
      </section>
    </div>
  );
};

export default Page;
