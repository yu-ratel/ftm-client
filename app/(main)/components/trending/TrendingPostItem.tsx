import React from "react";

interface TrendingPostItemProps {
  num: number;
  title: string;
  year: string;
  commentCount: string;
  viewCount: string;
}

const TrendingPostItem: React.FC<TrendingPostItemProps> = ({
  num,
  title,
  year,
  commentCount,
  viewCount,
}) => {
  return (
    <li className="h-[45px] w-[248px]">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-[#e1e1e7]">
            <span className="font-['Pretendard-Medium',_sans-serif] text-sm font-medium leading-none text-[#374254]">
              {num}
            </span>
          </div>
          <span className="font-['Pretendard-Medium',_sans-serif] text-sm font-medium leading-none text-[#374254]">
            {title}
          </span>
        </div>
        <div className="h-6 w-6 rounded-[20px] bg-[#e1e1e7]"></div>
      </div>

      <div className="flex items-center pl-[32px]">
        <div className="mr-[19px] flex items-center">
          <div className="mr-2 h-4 w-4 rounded-lg bg-[#e1e1e7]"></div>
          <span className="font-['Pretendard-Light',_sans-serif] text-xs font-light leading-none text-[#374254]">
            {year}
          </span>
        </div>

        <div className="mr-[19px] flex items-center">
          <div className="mr-2 h-4 w-4 rounded-lg bg-[#e1e1e7]"></div>
          <span className="font-['Pretendard-Light',_sans-serif] text-xs font-light leading-none text-[#374254]">
            {commentCount}
          </span>
        </div>

        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-lg bg-[#e1e1e7]"></div>
          <span className="font-['Pretendard-Light',_sans-serif] text-xs font-light leading-none text-[#374254]">
            {viewCount}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TrendingPostItem;
