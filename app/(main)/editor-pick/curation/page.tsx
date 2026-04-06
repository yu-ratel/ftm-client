import SectionHeader from "@/app/(main)/components/header/SectionHeader";
import { CURATION_MAIN_MOCK, CURATION_CARD_MOCKS } from "../mock";
import { MainCard, Card } from "./components";
import { buildCurationColumns } from "./utils";

export default function CurationPage() {
  const { leftColumn, rightColumn } = buildCurationColumns(CURATION_CARD_MOCKS);

  return (
    <section className="mt-12">
      <SectionHeader title="핏더맨 큐레이션" hasIcon />
      <MainCard data={CURATION_MAIN_MOCK} />
      <section className="mt-8 columns-1 gap-6 md:columns-2">
        {leftColumn.map((card) => (
          <Card key={card.id} data={card} />
        ))}
        {rightColumn.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </section>
    </section>
  );
}
