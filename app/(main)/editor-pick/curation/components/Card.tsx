import Link from "next/link";
import Image from "next/image";
import { CurationCardType, CurationCardVariant } from "../types";

const imageRatioClassName: Record<CurationCardVariant, string> = {
  A: "h-[498px]",
  B: "h-[370px]",
};

export const Card = ({ data }: { data: CurationCardType }) => {
  const { id, image, title, date, source, category, variant = "A" } = data;
  return (
    <Link
      href={`/editor-pick/curation/${id}`}
      className="mb-12 block break-inside-avoid transition-opacity duration-300 hover:opacity-80"
    >
      <figure className="flex flex-col gap-4">
        <div
          className={`relative w-full overflow-hidden rounded-3xl ${imageRatioClassName[variant]}`}
        >
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <section className="flex flex-col gap-2">
          <div className="flex gap-2">
            {category.map((item) => (
              <span
                key={item}
                className="rounded-md bg-[#E1E1E7] px-2 py-1 text-xs text-[#374254]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="line-clamp-2 text-2xl font-semibold text-[#374254]">
                {title}
              </h3>
              <p className="text-sm text-[#6F7C90]">{date}</p>
            </div>
            <p className="shrink-0 text-sm text-[#6F7C90]">{source}</p>
          </div>
        </section>
      </figure>
    </Link>
  );
};
