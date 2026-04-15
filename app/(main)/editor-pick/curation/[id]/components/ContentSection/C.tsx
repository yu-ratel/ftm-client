import { CurationDetailType } from "../../types";
import ImageWrapper from "./ImageWrapper";
import TextSection from "./TextSection";

export default function ContentSectionC({
  data,
}: {
  data: CurationDetailType;
}) {
  const { subImages, texts } = data;

  const [img01, img02, img03, img04, img05, img06] = subImages;
  const [text01, text02, text03, text04, text05] = texts;

  return (
    <section className="mt-[120px] flex flex-col whitespace-pre-line">
      <ImageWrapper src={img01} className="h-[640px]" />
      <section className="mt-12 flex h-[203px] gap-12">
        <TextSection
          title={text01.title}
          description={text01.description}
          className="!flex-row !gap-12 *:w-1/2"
        />
      </section>

      <section className="mt-12 flex h-[800px] gap-12 *:w-1/2">
        <ImageWrapper src={img02} />
        <div className="flex flex-col gap-12">
          <ImageWrapper src={img03} className="h-[400px]" />
          <TextSection title={text02.title} description={text02.description} />
        </div>
      </section>

      <section className="my-40 flex flex-col gap-12">
        <section className="flex h-[618px] gap-12 *:w-1/2">
          <ImageWrapper src={img04} />
          <ImageWrapper src={img05} />
        </section>

        <section>
          <TextSection
            title={text03.title}
            description={text03.description}
            className="!flex-row !gap-12 *:w-1/2"
          />
          <section className="mt-12 flex items-end gap-12 *:w-1/2">
            <div className="flex flex-col gap-12">
              <TextSection
                title={text04.title}
                description={text04.description}
              />
              <TextSection
                title={text05.title}
                description={text05.description}
              />
            </div>
            <ImageWrapper src={img06} className="h-[800px]" />
          </section>
        </section>
      </section>
    </section>
  );
}
