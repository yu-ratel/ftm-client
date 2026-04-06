import { CurationDetailType } from "../types";
import Image from "next/image";

export default function Wrapper({ data }: { data: CurationDetailType }) {
  const { date, title, paragraphs, image, editorComment } = data;

  return (
    <section className="absolute mt-20 pr-20">
      <section className="flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <h4>핏더맨 큐레이션</h4>
            <p>{date}</p>
          </div>
          <h3 className="text-4xl font-semibold">{title}</h3>
        </div>

        <div className="flex flex-col gap-2">
          {paragraphs.map((paragraph) => (
            <div key={paragraph.slogan} className="flex justify-between gap-6">
              <strong>{paragraph.slogan}</strong>
              <p>{paragraph.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mt-9 h-[392px]">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-[40px] object-cover"
        />
      </section>

      <footer className="mt-40 flex gap-12 bg-[#1481FD] px-16 py-12 text-lg text-white">
        <h4 className="shrink-0">에디터의 한 마디</h4>
        <div dangerouslySetInnerHTML={{ __html: editorComment }} />
      </footer>
    </section>
  );
}
