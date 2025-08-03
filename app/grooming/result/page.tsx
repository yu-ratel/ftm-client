"use client";

import { useEffect, useState } from "react";
import ResultView from "./components";
import { userGroomingResultDetail } from "./api";
import {
  GroomingCheckResultGradesType,
  LevelType,
  GroomingCheckSelectedAnswerType,
} from "@/app/grooming/check/types";

const Page = ({
  searchParams,
}: {
  searchParams: { date: string; answers: string };
}) => {
  const { date, answers } = searchParams;
  const [resultDetails, setResultDetails] = useState<
    GroomingCheckSelectedAnswerType[]
  >([]);
  const [saveData, setSaveData] = useState<{
    grades: GroomingCheckResultGradesType;
    level: LevelType;
    scores: Record<string, number>;
  }>();

  // 결과 조회
  useEffect(() => {
    if (date) {
      userGroomingResultDetail(date).then((res) => {
        setSaveData({
          grades: res.data.grades,
          level: res.data.level,
          scores: res.data.scores,
        });
      });
    }
  }, [date]);

  // 결과 생성 - answers가 바뀔 때만 상태 업데이트
  useEffect(() => {
    if (answers) {
      try {
        setResultDetails(JSON.parse(decodeURIComponent(answers)));
      } catch (e) {
        console.error(e);
        setResultDetails([]);
      }
    }
  }, [answers]);

  return date ? (
    <ResultView saveData={saveData} />
  ) : (
    <ResultView answers={resultDetails} />
  );
};

export default Page;
