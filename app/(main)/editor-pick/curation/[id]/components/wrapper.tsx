import { CurationDetailType } from "../types";
import Image from "next/image";
import ContentSection from "./ContentSection";

export default function Wrapper({ data }: { data: CurationDetailType }) {
  const { date, title, paragraphs, mainImage, editorComment } = data;

  return (
    <section className="absolute mt-12 px-6 pb-20 sm:px-[36px] lg:mt-20 lg:px-0 lg:pr-20">
      <section className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-0">
        <div className="flex flex-col justify-between gap-5 lg:gap-0">
          <div className="flex justify-between">
            <h4>핏더맨 큐레이션</h4>
            <p>{date}</p>
          </div>
          <h3 className="text-2xl font-semibold lg:text-4xl">{title}</h3>
        </div>

        <div className="flex flex-col gap-2">
          {paragraphs.map((paragraph) => (
            <div
              key={paragraph.slogan}
              className="flex justify-between gap-1 lg:gap-6"
            >
              <strong>{paragraph.slogan}</strong>
              <p>{paragraph.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mt-9 h-[100px] sm:h-[392px]">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="rounded-[40px] object-cover"
        />
      </section>

      <ContentSection data={data} />

      <footer className="flex flex-col gap-6 bg-[#1481FD] px-16 py-12 text-lg text-white lg:flex-row lg:gap-12">
        <h4 className="shrink-0">에디터의 한 마디</h4>
        <div dangerouslySetInnerHTML={{ __html: editorComment }} />
      </footer>
    </section>
  );
}
