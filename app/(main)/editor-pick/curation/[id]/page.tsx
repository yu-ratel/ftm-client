"use client";

import { useParams } from "next/navigation";
import { Wrapper } from "./components";
import { CURATION_DETAIL_MOCK } from "./mock";
import { CurationDetailType } from "./types";

export default function CurationDetailPage() {
  const params = useParams();
  const data = CURATION_DETAIL_MOCK as CurationDetailType;
  const { id } = params;

  // TODO: 실제 데이터 연동 후 삭제
  if (Number(id) === 1) {
    const data = {
      ...CURATION_DETAIL_MOCK,
      type: "A",
    } as CurationDetailType;

    return <Wrapper data={data} />;
  }

  if (Number(id) === 2) {
    const data = {
      ...CURATION_DETAIL_MOCK,
      type: "B",
    } as CurationDetailType;

    return <Wrapper data={data} />;
  }

  if (Number(id) === 3) {
    const data = {
      ...CURATION_DETAIL_MOCK,
      type: "C",
    } as CurationDetailType;

    return <Wrapper data={data} />;
  }
  return <Wrapper data={data} />;
}
