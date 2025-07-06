import React from "react";
import Image from "next/image";
import { formatImageUrl } from "../../user-pick/[postId]/utils";

interface TrendingPostItemProps {
  num: number;
  title: string;
  viewCount: string;
  likeCount: string;
  scrapCount: string;
  imageUrl: string;
}

const TrendingPostItem: React.FC<TrendingPostItemProps> = ({
  num,
  title,
  viewCount,
  likeCount,
  scrapCount,
  imageUrl,
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
        <div className="h-6 w-6 overflow-hidden rounded-[20px]">
          <Image
            src={formatImageUrl(imageUrl)}
            alt={title}
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center pl-[32px]">
        <div className="mr-[19px] flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-[#374254]"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="font-['Pretendard-Light',_sans-serif] text-xs font-light leading-none text-[#374254]">
            {viewCount}
          </span>
        </div>

        <div className="mr-[19px] flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-[#374254]"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="font-['Pretendard-Light',_sans-serif] text-xs font-light leading-none text-[#374254]">
            {likeCount}
          </span>
        </div>

        <div className="flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-[#374254]"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span className="font-['Pretendard-Light',_sans-serif] text-xs font-light leading-none text-[#374254]">
            {scrapCount}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TrendingPostItem;
