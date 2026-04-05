"use client";

import OptimizedImage from "@/app/(main)/user-pick/components/OptimizedImage";

const PRODUCT_IMAGE = "/step-by-step/images/july-product-1.png";

interface ProductCardProps {
  index: number;
  name: string;
  description: string;
  tags?: string[];
}

export default function ProductCard({
  index,
  name,
  description,
  tags,
}: ProductCardProps) {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div className="flex flex-col gap-4">
      {/* 상품 이미지 */}
      <div className="relative h-[549px] w-full overflow-hidden rounded-3xl bg-[#f5f5f7]">
        <OptimizedImage
          src={PRODUCT_IMAGE}
          alt={name}
          fill
          objectFit="contain"
        />
        {tags && tags.length > 0 && (
          <div className="absolute bottom-5 right-5 z-10 flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[#bcdbff] bg-white px-5 py-[9px] text-sm font-semibold text-[#1481fd]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 상품명 */}
      <h2 className="text-xl font-bold leading-[30px] text-[#374254]">
        {formattedIndex}. &nbsp;{name}
      </h2>

      {/* 상품 설명 */}
      <p className="text-base leading-[25.6px] text-[#374254]">{description}</p>
    </div>
  );
}
