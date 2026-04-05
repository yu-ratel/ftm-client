import SectionTitle from "../SectionTitle";

const CATEGORIES = [
  "스킨케어",
  "향수",
  "건강",
  "메이크업",
  "패션",
  "면도",
  "헤어\n스타일링",
  "바디케어",
] as const;

export default function CurationCategorySidebar() {
  return (
    <div className="mr-[18px] flex h-full w-[324px] flex-col items-center justify-center gap-2 p-4">
      <SectionTitle title="큐레이션 카테고리" />
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className="flex h-[140px] w-[140px] items-center justify-center rounded-3xl bg-[#f5f5f7] transition-colors hover:bg-[#e8e8ea]"
          >
            <span className="whitespace-pre-line text-center text-xl font-medium text-[#374254]">
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
