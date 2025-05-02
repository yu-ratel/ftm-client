import { ApiResponse } from "@/types/api";

interface GroomingCheckType {
  groomingTestQuestionId: number;
  question: string;
  groomingCategory: string;
  answers: GroomingCheckAnswerType[];
}

interface GroomingCheckAnswerType {
  groomingTestAnswerId: number;
  answer: string;
}

type GroomingCheckResponse = ApiResponse<{
  data: {
    groomingTests: GroomingCheckType[];
    totalCount: number;
  };
}>;

interface GroomingCheckSelectedAnswerType {
  questionId: number;
  groomingCategory: string;
  answerIds: number[];
}

type GroomingCheckRequest = {
  answers: GroomingCheckAnswerType[];
};

export type {
  GroomingCheckResponse,
  GroomingCheckRequest,
  GroomingCheckSelectedAnswerType,
};
