"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getGroomingCheckList } from "../api";
import { useRouter } from "next/navigation";

const GroomingCheck = ({ serverData }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["groomingCheck"],
    queryFn: () => getGroomingCheckList(),
    initialData: serverData,
  });
  const { data: totalData } = data;
  const { groomingTests = [], totalCount = 0 } = totalData || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const router = useRouter();
  const isDisabledNextCheck =
    selectedAnswers[currentIndex]?.answerIds.length === 0;

  useEffect(() => {
    if (totalCount > 0) {
      setSelectedAnswers(
        groomingTests.map((test) => {
          return {
            questionId: test.groomingTestQuestionId,
            groomingCategory: test.groomingCategory,
            answerIds: [],
          };
        })
      );
    }
  }, [data, totalCount, groomingTests]);

  if (isLoading || !groomingTests.length) return <div>Loading...</div>;

  const sortedGroomingTests = groomingTests.sort(
    (a, b) => a.groomingTestQuestionId - b.groomingTestQuestionId
  );

  const currentQuestion = sortedGroomingTests[currentIndex];

  const onClickHandleAnswer = (groomingTestAnswerId) => {
    if (
      selectedAnswers[currentIndex]?.answerIds.includes(groomingTestAnswerId)
    ) {
      setSelectedAnswers((prev) => {
        const newSelectedAnswers = [...prev];
        newSelectedAnswers[currentIndex] = prev[currentIndex].filter(
          (id) => id !== groomingTestAnswerId
        );
        return newSelectedAnswers;
      });
      return;
    }

    setSelectedAnswers((prev) => {
      const newSelectedAnswers = [...prev];
      newSelectedAnswers[currentIndex] = {
        ...prev[currentIndex],
        answerIds: [
          ...(prev[currentIndex]?.answerIds || []),
          groomingTestAnswerId,
        ],
      };
      return newSelectedAnswers;
    });
  };

  const onClickNextQuestion = () => {
    if (currentIndex === groomingTests.length - 1) {
      return onClickResult();
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const onClickPrevQuestion = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const onClickResult = () => {
    router.push(
      `/grooming/result?answers=${encodeURIComponent(JSON.stringify(selectedAnswers))}`
    );
  };

  return (
    <main className="flex flex-col items-center justify-between py-16 *:w-[586px] *:content-center *:rounded-xl *:text-center">
      <section className="flex h-56 flex-col items-center gap-5 bg-blue-100">
        <h3 className="mt-7 w-28 rounded-[16px] bg-blue-500 p-[8px_30px] text-white">
          Q. {currentQuestion.groomingTestQuestionId}
        </h3>
        <p className="w-full break-keep px-24 text-[28px] font-bold text-blue-500">
          {currentQuestion.question}
        </p>
        <p className="text-sm font-light"></p>
      </section>

      <section className="flex max-h-[456px] flex-col gap-6 overflow-y-auto text-2xl *:w-[586px] *:content-center">
        {currentQuestion.answers.map((item) => (
          <button
            onClick={() => onClickHandleAnswer(item.groomingTestAnswerId)}
            className={`${
              selectedAnswers[currentIndex]?.answerIds.includes(
                item.groomingTestAnswerId
              )
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            } min-h-24 flex-shrink-0 break-keep rounded-xl px-20`}
            key={item.groomingTestAnswerId}
          >
            {item.answer}
          </button>
        ))}
      </section>

      <section className="flex h-16 justify-between *:gap-4 *:rounded-xl">
        <button
          className={`${currentIndex === 0 ? "hidden" : ""} h-16 w-[49%] bg-gray-300`}
          onClick={onClickPrevQuestion}
        >
          이전
        </button>
        <button
          className={`${currentIndex === 0 ? "w-full" : "w-[49%]"} h-16 bg-blue-500 text-white ${
            isDisabledNextCheck
              ? "opacity-20"
              : "transition-opacity duration-500"
          }`}
          onClick={onClickNextQuestion}
          disabled={isDisabledNextCheck}
        >
          {currentIndex === groomingTests.length - 1 ? "결과 확인하기" : "다음"}
        </button>
      </section>
    </main>
  );
};

export default GroomingCheck;
