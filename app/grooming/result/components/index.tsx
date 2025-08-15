"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createGroomingCheckResult,
  saveGroomingCheckResult,
} from "@/app/grooming/check/api";
import {
  GroomingCheckResultResponse,
  GroomingCheckResultGradesType,
  LevelType,
  GroomingCheckSelectedAnswerType,
} from "@/app/grooming/check/types";
import GradeCard from "./GradeCard";
import SignInRouteCard from "./SignInRouteCard";
import { UserInfo } from "@/types/user";

interface Props {
  saveData?: {
    grades: GroomingCheckResultGradesType;
    level: LevelType;
    scores: Record<string, number>;
  };
  answers?: GroomingCheckSelectedAnswerType[];
}

const ResultView = ({ saveData, answers }: Props) => {
  // 결과 조회
  const [detailData, setDetailData] = useState({
    grades: {} as GroomingCheckResultGradesType,
    level: {} as LevelType,
    scores: {} as Record<string, number>,
  });

  useEffect(() => {
    if (saveData) {
      setDetailData({
        grades: saveData.grades,
        level: saveData.level,
        scores: saveData.scores,
      });
    }
  }, [saveData]);

  // 결과 생성
  const { data, isLoading } = useQuery<GroomingCheckResultResponse>({
    queryKey: ["groomingResult"],
    queryFn: () => createGroomingCheckResult({ answers: answers || [] }),
    enabled: !!answers && answers.length > 0,
  });

  useEffect(() => {
    const isUser = localStorage.getItem("userInfo");

    if (isUser && data) {
      setDetailData(
        data.data || {
          grades: {} as GroomingCheckResultGradesType,
          level: {} as LevelType,
          scores: {} as Record<string, number>,
        }
      );

      const { state } = JSON.parse(isUser);
      const { user: userInfo } = state as { user: UserInfo };

      const saveRequestData = {
        userId: userInfo.id,
        groomingLevelId: data.data.level.groomingLevelId,
        totalScore: Object.values(data.data.scores).reduce(
          (acc, curr) => acc + curr,
          0
        ),
        results:
          answers?.map(({ questionId, answerIds }) => ({
            questionId,
            answerIds,
          })) || [],
      };

      saveGroomingCheckResult(saveRequestData).catch(console.error);
    }
  }, [answers]);

  // 추후 로딩 스피너 공통 컴포넌트 필요
  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1481FD] border-t-transparent" />
      </div>
    );

  return (
    <main className="flex h-full px-40 py-[74px] max-xl:px-8 max-lg:flex-col max-lg:items-center max-lg:gap-10 max-md:px-10 max-sm:px-4">
      <section className="flex flex-1 flex-col gap-6 *:w-[704px] max-lg:items-center max-md:w-full max-md:*:w-full">
        <div className="h-[776px] rounded-[48px] bg-[#374254] max-md:h-auto max-md:pb-10">
          <div className="mt-3 h-20 w-[95%] place-self-center rounded-[40px] bg-[#485B78] p-5"></div>
          <div className="mt-3 h-[440px] w-[95%] place-self-center rounded-[32px] bg-white p-4 max-md:h-[280px]">
            mainImg
          </div>

          <section className="my-8 flex flex-col items-center gap-6">
            <h1 className="text-[32px] font-bold text-white">그루밍 백지</h1>
            <p className="text-xl text-[#AEC0DE]">
              아직은 그루밍이 낯설고 어렵기만한 상태
            </p>
            <div className="rounded-lg bg-[#71819A] p-[8px_16px] text-white">
              그루밍 지수 재검사
            </div>
          </section>

          <div className="flex flex-col items-center gap-6 break-keep px-40 pt-10 text-center max-md:px-20">
            <h3 className="text-4xl text-white max-sm:text-[28px]">
              {detailData.level?.spicyLevelName}
            </h3>
          </div>
        </div>
        <div className="flex gap-4 text-white">
          <button className="h-[70px] w-full rounded-3xl bg-[#71819A]">
            그루밍 지수 재검사
          </button>
          <button className="h-[70px] w-full rounded-3xl bg-[#1481FD]">
            검사 결과 공유하기
          </button>
        </div>
      </section>

      <section className="flex-1 max-md:w-full">
        <div className="grid size-full grid-cols-2 gap-4">
          {Object.entries(
            answers ? data?.data.grades || {} : detailData.grades || {}
          ).map(([key, grade]) => (
            <GradeCard
              key={key}
              category={key}
              grade={grade.grade}
              level={grade.level}
            />
          ))}

          <SignInRouteCard />
        </div>
      </section>
    </main>
  );
};

export default ResultView;
