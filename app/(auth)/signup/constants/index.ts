import { Age } from "../types";

/**
 * 연령대 상수
 */
export const AGE = {
  TEENS: "TEENS",
  TWENTIES: "TWENTIES",
  THIRTIES: "THIRTIES",
  FORTIES: "FORTIES",
  FIFTIES: "FIFTIES",
} as const;

/**
 * 연령대 설명
 */
export const AGE_DESCRIPTION: Record<Age, string> = {
  TEENS: "10대",
  TWENTIES: "20대",
  THIRTIES: "30대",
  FORTIES: "40대",
  FIFTIES: "50대",
};
