"use client";

import { useState, useEffect } from "react";
import SectionHeader from "../../components/SectionHeader";
import { userGroomingCheckList } from "../api";
import Card from "./Card";

const GroomingList = () => {
  const [historyList, setHistoryList] = useState<string[]>([]);

  useEffect(() => {
    userGroomingCheckList().then((res) => {
      const {
        data: { historyDates },
      } = res;
      setHistoryList(historyDates);
    });
  }, []);

  return (
    <>
      <SectionHeader
        title="그루밍 지수 분석"
        description="검사 결과는 최대 5개까지 등록됩니다."
      ></SectionHeader>
      <div className="mt-8 flex w-full flex-wrap justify-between gap-6">
        {historyList.map((history, index) => (
          <Card key={index} date={history} />
        ))}
      </div>
    </>
  );
};

export default GroomingList;
