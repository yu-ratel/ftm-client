"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getGroomingCheckList } from "../api";
import { useRouter } from "next/navigation";
import QuestionSection from "./QuestionSection";
import AnswerSection from "./AnswerSection";
import NavSection from "./NavSection";
import {
  GroomingCheckResponse,
  GroomingCheckSelectedAnswerType,
} from "../types";

//TODO: 서버 api 캐싱 관련 논의 (react query 사용)
const GroomingCheck = ({
  serverData,
}: {
  serverData: GroomingCheckResponse;
}) => {
  const { data, isLoading } = useQuery<GroomingCheckResponse>({
    queryKey: ["groomingCheck"],
    queryFn: () => getGroomingCheckList(),
    initialData: serverData,
  });

  const { groomingTests = [], totalCount = 0 } = data.data || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    GroomingCheckSelectedAnswerType[]
  >([]);
  const router = useRouter();
  const isDisabledNextCheck =
    selectedAnswers[currentIndex]?.answerIds.length === 0;
  const multiSelectIds = [1, 3, 8, 9, 14, 15, 17];

  useEffect(() => {
    if (totalCount > 0) {
      setSelectedAnswers(
        groomingTests.map((test) => ({
          questionId: test.groomingTestQuestionId,
          groomingCategory: test.groomingCategory,
          answerIds: [],
        }))
      );
    }
  }, [data, totalCount, groomingTests]);

  if (isLoading || !groomingTests.length) return <div>Loading...</div>;

  const sortedGroomingTests = groomingTests.sort(
    (a, b) => a.groomingTestQuestionId - b.groomingTestQuestionId
  );

  const currentQuestion = sortedGroomingTests[currentIndex];

  // 답변 선택 처리 함수
  const onClickHandleAnswer = (groomingTestAnswerId: number) => {
    // 중복답변 허용 질문이 아닌 경우
    if (!multiSelectIds.includes(currentQuestion.groomingTestQuestionId)) {
      setSelectedAnswers((prev) => {
        const newSelectedAnswers = [...prev];
        newSelectedAnswers[currentIndex] = {
          ...prev[currentIndex],
          answerIds: [groomingTestAnswerId],
        };
        return newSelectedAnswers;
      });
      return;
    }

    // 중복 답변인 경우
    if (
      selectedAnswers[currentIndex]?.answerIds.includes(groomingTestAnswerId)
    ) {
      setSelectedAnswers((prev) => {
        const newSelectedAnswers = [...prev];
        newSelectedAnswers[currentIndex] = {
          ...prev[currentIndex],
          answerIds: prev[currentIndex].answerIds.filter(
            (id: number) => id !== groomingTestAnswerId
          ),
        };
        return newSelectedAnswers;
      });
      return;
    }

    // 선택 답변 추가하는 경우
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
      `/grooming/result/${encodeURIComponent(JSON.stringify(selectedAnswers))}`
    );
  };

  return (
    <main className="flex flex-col items-center justify-between py-10 *:w-[586px] *:content-center *:rounded-xl *:text-center max-md:*:w-4/5 max-sm:justify-start max-sm:gap-9">
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
