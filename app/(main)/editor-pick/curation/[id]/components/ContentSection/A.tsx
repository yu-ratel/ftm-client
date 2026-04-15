import { CurationDetailType } from "../../types";
import ImageWrapper from "./ImageWrapper";
import TextSection from "./TextSection";

export default function ContentSectionA({
  data,
}: {
  data: CurationDetailType;
}) {
  const { subImages, texts } = data;

  const [img01, img02, img03, img04, img05, img06] = subImages;
  const [text01, text02, text03, text04, text05, text06] = texts;

  return (
    <section className="mt-[120px] flex flex-col whitespace-pre-line">
      <section className="flex h-[800px] gap-12 *:w-1/2">
        <ImageWrapper src={img01} />
        <div className="flex flex-col gap-12">
          <TextSection title={text01.title} description={text01.description} />
          <TextSection title={text02.title} description={text02.description} />
        </div>
      </section>

      <section className="mt-12 flex h-[700px] gap-12 *:w-1/2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-12">
            <TextSection
              title={text03.title}
              description={text03.description}
            />
          </div>
          <ImageWrapper src={img02} className="h-[618px]" />
        </div>
        <div className="flex flex-col gap-6">
          <TextSection title={text04.title} description={text04.description} />
          <ImageWrapper src={img03} className="h-[618px]" />
        </div>
      </section>

      <section className="my-40 flex flex-col gap-12">
        <ImageWrapper src={img04} className="h-[640px]" />
        <div className="flex gap-12 *:w-1/2">
          <h3 className="text-2xl font-semibold">{text05.title}</h3>
          <div className="flex flex-col gap-12">
            <p>{text05.description}</p>
            <ImageWrapper src={img05} className="h-[400px]" />
          </div>
        </div>
        <div className="flex items-end gap-12 *:w-1/2">
          <ImageWrapper src={img06} className="h-[800px]" />
          <TextSection title={text06.title} description={text06.description} />
        </div>
      </section>
    </section>
  );
}
