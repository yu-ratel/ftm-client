import Image from "next/image";
import { CurationCardType } from "../types";
import Link from "next/link";

export const MainCard = ({ data }: { data: CurationCardType }) => {
  const { id, image, title, date, source, category } = data;
  return (
    <Link
      href={`/editor-pick/curation/${id}`}
      className="transition-opacity duration-300 hover:opacity-80"
    >
      <figure className="relative my-7 flex h-96 w-full items-end justify-between overflow-hidden rounded-3xl p-4">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex gap-2">
            {category.map((item) => (
              <span
                key={item}
                className="rounded-md bg-[#E1E1E7] px-2 py-1.5 text-xs"
              >
                {item}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white">{date}</p>
        </div>

        <div className="relative z-10">
          <p className="text-white">{source}</p>
        </div>
      </figure>
    </Link>
  );
};
