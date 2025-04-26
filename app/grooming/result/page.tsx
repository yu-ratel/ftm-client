"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createGroomingCheckResult } from "../check/api";

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

  return <div>테스트 결과 페이지 {answers}</div>;
};

export default Page;
