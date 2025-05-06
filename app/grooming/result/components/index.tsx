"use client";

import { useQuery } from "@tanstack/react-query";
import { createGroomingCheckResult } from "@/app/grooming/check/api";
import {
  GroomingCheckResultResponse,
  GroomingCheckResultGradesType,
  LevelType,
  GroomingCheckSelectedAnswerType,
} from "@/app/grooming/check/types";
import GradeCard from "./GradeCard";
import SignInRouteCard from "./SignInRouteCard";

const ResultView = ({
  answers,
}: {
  answers: GroomingCheckSelectedAnswerType[];
}) => {
  const { data, isLoading } = useQuery<GroomingCheckResultResponse>({
    queryKey: ["groomingResult"],
    queryFn: () => createGroomingCheckResult({ answers }),
  });

  const {
    grades = {} as GroomingCheckResultGradesType,
    level = {} as LevelType,
  } = data?.data || {};

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-full px-40 py-[74px] max-xl:px-8 max-lg:flex-col max-lg:items-center max-lg:gap-10 max-md:px-10 max-sm:px-4">
      <section className="flex flex-1 flex-col gap-6 *:w-[704px] max-lg:items-center max-md:*:w-full">
        <div className="h-[776px] rounded-[48px] bg-[#374254] max-md:h-auto max-md:pb-10">
          <div className="mt-4 h-[506px] w-[95%] place-self-center rounded-[32px] bg-white p-4 max-md:h-[280px]">
            mainImg
          </div>
          <div className="flex flex-col items-center gap-6 break-keep px-40 pt-10 text-center max-md:px-20">
            <h3 className="text-4xl text-white max-sm:text-[28px]">
              {level.spicyLevelName}
            </h3>
            <p className="text-xl text-[#AEC0DE] max-sm:text-sm">
              이제 막 걸음마를 떼기 시작한 새싹형이에요 꾸준히 관심을 갖는다면
              발전의 가능성이 충분한..
            </p>
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
          {Object.entries(grades).map(([key, grade]) => (
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
