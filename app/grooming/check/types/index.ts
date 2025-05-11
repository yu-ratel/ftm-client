import { ApiResponse } from "@/types/api";

interface GroomingCheckAnswerType {
  groomingTestAnswerId: number;
  answer: string;
}
interface GroomingCheckType {
  groomingTestQuestionId: number;
  question: string;
  groomingCategory: string;
  answers: GroomingCheckAnswerType[];
}

type GroomingCheckResponse = ApiResponse<{
  groomingTests: GroomingCheckType[];
  totalCount: number;
}>;

interface GroomingCheckSelectedAnswerType {
  questionId: number;
  groomingCategory: string;
  answerIds: number[];
}

type GroomingCheckRequest = {
  answers: GroomingCheckSelectedAnswerType[];
};

interface GradeType {
  grade: string;
  level: number;
}

type GroomingCheckResultGradesType = Record<
  "beauty" | "fashion" | "hair" | "hygiene" | "workout",
  GradeType
>;

interface LevelType {
  groomingLevelId: number;
  mildLevelName: string;
  spicyLevelName: string;
}

type GroomingCheckResultResponse = ApiResponse<{
  grades: GroomingCheckResultGradesType;
  level: LevelType;
  scores: Record<string, number>;
}>;

export type {
  GroomingCheckAnswerType,
  GroomingCheckResponse,
  GroomingCheckRequest,
  GroomingCheckSelectedAnswerType,
  GroomingCheckResultGradesType,
  LevelType,
  GroomingCheckResultResponse,
};
