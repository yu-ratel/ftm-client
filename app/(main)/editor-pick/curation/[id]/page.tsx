"use client";

import { useParams } from "next/navigation";
import { Wrapper } from "./components";
import { CURATION_DETAIL_MOCKS } from "./mock";
import { CurationDetailType } from "./types";

export default function CurationDetailPage() {
  const params = useParams();
  const data = CURATION_DETAIL_MOCKS[0] as CurationDetailType;
  const { id } = params;

  // TODO: 실제 데이터 연동 후 삭제
  if (Number(id) === 1) {
    const data = {
      ...CURATION_DETAIL_MOCKS[0],
      type: "A",
    } as CurationDetailType;

    return <Wrapper data={data} />;
  }

  if (Number(id) === 2) {
    const data = {
      ...CURATION_DETAIL_MOCKS[0],
      type: "B",
    } as CurationDetailType;

    return <Wrapper data={data} />;
  }

  if (Number(id) === 3) {
    const data = {
      ...CURATION_DETAIL_MOCKS[0],
      type: "C",
    } as CurationDetailType;

    return <Wrapper data={data} />;
  }
  return <Wrapper data={data} />;
}
