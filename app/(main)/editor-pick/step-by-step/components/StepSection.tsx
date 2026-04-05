"use client";

import Link from "next/link";
import OptimizedImage from "@/app/(main)/user-pick/components/OptimizedImage";

const PRODUCT_IMAGE = "/step-by-step/images/july-product-1.png";

interface StepSectionProps {
  id: string;
  month: string;
  title: string;
  tags: string[];
}

export default function StepSection({
  id,
  month,
  title,
  tags,
}: StepSectionProps) {
  return (
    <Link
      href={`/editor-pick/step-by-step/${id}`}
      className="flex flex-col gap-4 transition-opacity hover:opacity-80"
    >
      <div className="flex gap-3">
        {/* 큰 메인 이미지 카드 */}
        <div className="relative aspect-square w-[calc(48.5%-6px)] shrink-0 overflow-hidden rounded-xl bg-[#f5f5f7]">
          <OptimizedImage
            src={PRODUCT_IMAGE}
            alt={`${month}의 스텝`}
            fill
            objectFit="cover"
          />
          <div className="absolute left-[14px] top-[14px] z-10 rounded-xl bg-white px-3 py-2">
            <span className="text-base font-bold text-[#374254]">
              {month}의 스텝
            </span>
          </div>
        </div>

        {/* 2x2 작은 이미지 그리드 */}
        <div className="grid flex-1 grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl bg-[#f5f5f7]"
            >
              <OptimizedImage
                src={PRODUCT_IMAGE}
                alt={`상품 ${i + 1}`}
                fill
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 타이틀 + 태그 */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#374254]">{title}</h2>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-[#bcdbff] bg-white px-5 py-2 text-xs font-semibold text-[#1481fd]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
