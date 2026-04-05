export interface StepProduct {
  id: number;
  name: string;
  description: string;
}

export interface StepData {
  id: string;
  month: string;
  title: string;
  tags: string[];
  products: StepProduct[];
}

export const STEP_DATA: StepData[] = [
  {
    id: "july-2025",
    month: "7월",
    title: "폭염 속 산뜻한 피부보습",
    tags: ["백지", "새싹", "꾸안꾸"],
    products: [
      {
        id: 1,
        name: "오브제 포어 제로 올인원",
        description:
          "복잡한 마음을 글로 풀어내고 싶은데 잘 안돼서 답답했던 적, 다들 한두 번씩은 있잖아요. 글쓰기가 멀고 어렵게만 느껴졌을 뉴니커를 위해 특별한 추천을 준비했어요. 창비의 '시로 채우는 내 마음 필사노트'예요. 이 노트는 50여 년간 우리나라 시단을 이끌어온 창비시선",
      },
      {
        id: 2,
        name: "라운드랩 자작나무 수분 크림",
        description:
          "복잡한 마음을 글로 풀어내고 싶은데 잘 안돼서 답답했던 적, 다들 한두 번씩은 있잖아요. 글쓰기가 멀고 어렵게만 느껴졌을 뉴니커를 위해 특별한 추천을 준비했어요. 창비의 '시로 채우는 내 마음 필사노트'예요. 이 노트는 50여 년간 우리나라 시단을 이끌어온 창비시선",
      },
    ],
  },
  {
    id: "june-2025",
    month: "6월",
    title: "여름용 기본 스킨케어 5종",
    tags: ["유망주", "인플루언서"],
    products: [
      {
        id: 1,
        name: "이니스프리 그린티 씨드 세럼",
        description:
          "복잡한 마음을 글로 풀어내고 싶은데 잘 안돼서 답답했던 적, 다들 한두 번씩은 있잖아요. 글쓰기가 멀고 어렵게만 느껴졌을 뉴니커를 위해 특별한 추천을 준비했어요. 창비의 '시로 채우는 내 마음 필사노트'예요. 이 노트는 50여 년간 우리나라 시단을 이끌어온 창비시선",
      },
      {
        id: 2,
        name: "닥터지 레드 블레미쉬 클리어 수딩 크림",
        description:
          "복잡한 마음을 글로 풀어내고 싶은데 잘 안돼서 답답했던 적, 다들 한두 번씩은 있잖아요. 글쓰기가 멀고 어렵게만 느껴졌을 뉴니커를 위해 특별한 추천을 준비했어요. 창비의 '시로 채우는 내 마음 필사노트'예요. 이 노트는 50여 년간 우리나라 시단을 이끌어온 창비시선",
      },
    ],
  },
];

export function getStepById(id: string): StepData | undefined {
  return STEP_DATA.find((step) => step.id === id);
}
