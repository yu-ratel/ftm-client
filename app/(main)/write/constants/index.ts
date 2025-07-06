import { ProductCategory } from "../types";

// 태그 데이터
export const availableTags = [
  "프레그런스",
  "스킨케어",
  "메이크업",
  "헤어케어",
  "바디케어",
  "면도",
  "향수",
  "클렌징",
  "보습",
  "자외선차단",
  "안티에이징",
  "트러블케어",
  "데일리",
  "여행",
  "데이트",
  "비즈니스",
  "캐주얼",
  "포멀",
  "초보자",
  "전문가",
  "민감성",
  "지성",
  "건성",
  "복합성",
  "아침루틴",
  "저녁루틴",
  "주말",
  "특별한날",
  "계절별",
  "트렌드",
];

// 상품 카테고리 데이터
export const productCategories: Record<string, ProductCategory> = {
  skincare: {
    label: "스킨케어",
    subcategories: ["클렌저", "토너", "세럼", "로션", "크림", "선크림"],
  },
  perfume: {
    label: "프래그런스",
    subcategories: [
      "향수",
      "바디미스트",
      "룸스프레이",
      "디퓨저",
      "캔들",
      "핸드크림",
    ],
  },
  health: {
    label: "건강",
    subcategories: [
      "영양제",
      "단백질",
      "비타민",
      "유산균",
      "오메가3",
      "헬스케어",
    ],
  },
  makeup: {
    label: "메이크업",
    subcategories: ["베이스", "아이", "립", "체크", "브러쉬", "클렌징"],
  },
  fashion: {
    label: "패션",
    subcategories: ["상의", "하의", "아우터", "신발", "가방", "액세서리"],
  },
  shaving: {
    label: "면도",
    subcategories: [
      "면도기",
      "쉐이빙폼",
      "애프터쉐이브",
      "면도날",
      "브러쉬",
      "오일",
    ],
  },
  hair: {
    label: "헤어 스타일링",
    subcategories: ["샴푸", "컨디셔너", "왁스", "젤", "스프레이", "트리트먼트"],
  },
  body: {
    label: "바디케어",
    subcategories: [
      "바디워시",
      "바디로션",
      "바디오일",
      "스크럽",
      "데오드란트",
      "풋케어",
    ],
  },
};
