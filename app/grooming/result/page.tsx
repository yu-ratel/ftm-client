"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createGroomingCheckResult } from "../check/api";
import GradeCard from "./components/GradeCard";
import SignInRouteCard from "./components/SignInRouteCard";

const Page = () => {
  const searchParams = useSearchParams();
  const answers = searchParams.get("answers");
  const parsedAnswers = JSON.parse(answers || "[]");

  console.log({ submissions: parsedAnswers });

  const { data: testResult, isLoading } = useQuery({
    queryKey: ["groomingResult"],
    queryFn: () => createGroomingCheckResult(parsedAnswers),
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(testResult);

  return (
    <main className="flex h-full px-40 py-[74px]">
      <section className="flex flex-1 flex-col gap-6 *:w-[704px]">
        <div className="h-[776px] rounded-[48px] bg-[#374254]">
          <div className="mt-4 h-[506px] w-[672px] place-self-center rounded-[32px] bg-white p-4">
            mainImg
          </div>
          <div className="flex flex-col items-center gap-6 break-keep px-40 pt-10 text-center">
            <h3 className="text-4xl text-white">새싹형</h3>
            <p className="text-xl text-[#AEC0DE]">
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

      <section className="flex-1">
        <div className="grid size-full grid-cols-2 gap-4">
          <GradeCard />
          <GradeCard />
          <GradeCard />
          <GradeCard />
          <GradeCard />
          <SignInRouteCard />
        </div>
      </section>
    </main>
  );
};

export default Page;

//
