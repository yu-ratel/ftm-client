import { CurationDetailType } from "../../types";
import ImageWrapper from "./ImageWrapper";
import TextSection from "./TextSection";

export default function ContentSectionB({
  data,
}: {
  data: CurationDetailType;
}) {
  const { subImages, texts } = data;

  const [img01, img02, img03, img04, img05, img06] = subImages;
  const [text01, text02, text03, text04] = texts;

  return (
    <section className="mt-[120px] flex flex-col whitespace-pre-line">
      <section className="flex h-[319px] gap-12">
        <div className="flex flex-col gap-12 whitespace-pre-line">
          <TextSection
            title={text01.title}
            description={text01.description}
            className="!flex-row *:w-1/2"
          />
        </div>
      </section>

      <section className="mt-12 flex h-[618px] gap-12 *:w-1/2">
        <ImageWrapper src={img01} />
        <ImageWrapper src={img02} />
      </section>

      <section className="mt-12 flex h-[800px] gap-12 *:w-1/2">
        <ImageWrapper src={img03} />
        <TextSection title={text02.title} description={text02.description} />
      </section>

      <section className="my-40 flex flex-col gap-12">
        <div className="flex gap-12 *:w-1/2">
          <div className="flex h-[800px] flex-col justify-between">
            <div className="flex flex-col gap-12">
              <h3 className="text-2xl font-semibold">{text03.title}</h3>
              <p>{text03.description}</p>
            </div>
            <ImageWrapper src={img05} className="h-[400px]" />
          </div>
          <ImageWrapper src={img06} className="h-[800px]" />
        </div>
        <ImageWrapper src={img04} className="h-[640px]" />
        <TextSection
          title={text04.title}
          description={text04.description}
          className="!flex-row *:w-1/2"
        />
      </section>
    </section>
  );
}
