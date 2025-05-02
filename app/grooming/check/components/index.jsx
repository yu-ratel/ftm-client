"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getGroomingCheckList } from "../api";
import { useRouter } from "next/navigation";
import QuestionSection from "./QuestionSection";
import AnswerSection from "./AnswerSection";
import NavSection from "./NavSection";

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

  // 답변 선택 처리 함수
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
      <QuestionSection
        questionNumber={currentQuestion.groomingTestQuestionId}
        question={currentQuestion.question}
      />

      <AnswerSection
        answers={currentQuestion.answers}
        onClickHandleAnswer={onClickHandleAnswer}
        selectedAnswers={selectedAnswers}
        currentIndex={currentIndex}
      />

      <NavSection
        currentIndex={currentIndex}
        isDisabledNextCheck={isDisabledNextCheck}
        onClickPrevQuestion={onClickPrevQuestion}
        onClickNextQuestion={onClickNextQuestion}
        lastNumber={groomingTests.length}
      />
    </main>
  );
};

export default GroomingCheck;
