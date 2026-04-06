import CurationTmpImage from "@editorPick/assets/images/tmp.png";
import { CurationCardType } from "../curation/types";

const mockImg = CurationTmpImage.src;

export const CURATION_MAIN_MOCK: CurationCardType = {
  id: 1,
  title: "LESS IS MORE",
  date: "2025. 11. 24",
  source: "핏더맨 B",
  category: ["스킨케어", "패션"],
  image: mockImg,
};

export const CURATION_CARD_MOCKS: CurationCardType[] = [
  {
    id: 2,
    title: "남자 기초 화장품의 모든것",
    date: "2025. 11. 24",
    source: "핏더맨 A",
    category: ["프레그런스", "헤어 스타일링"],
    image: mockImg,
  },
  {
    id: 3,
    title: "남자 기초 화장품의 모든것",
    date: "2025. 11. 24",
    source: "핏더맨 B",
    category: ["프레그런스", "헤어 스타일링"],
    image: mockImg,
  },
  {
    id: 4,
    title: "남자 기초 화장품의 모든것",
    date: "2025. 11. 24",
    source: "핏더맨 A",
    category: ["프레그런스", "헤어 스타일링"],
    image: mockImg,
  },
  {
    id: 5,
    title: "남자 기초 화장품의 모든것",
    date: "2025. 11. 24",
    source: "핏더맨 B",
    category: ["프레그런스", "헤어 스타일링"],
    image: mockImg,
  },
  {
    id: 6,
    title: "남자 기초 화장품의 모든것",
    date: "2025. 11. 24",
    source: "핏더맨 B",
    category: ["프레그런스", "헤어 스타일링"],
    image: mockImg,
  },
  {
    id: 7,
    title: "남자 기초 화장품의 모든것",
    date: "2025. 11. 24",
    source: "핏더맨 B",
    category: ["프레그런스", "헤어 스타일링"],
    image: mockImg,
  },
];
