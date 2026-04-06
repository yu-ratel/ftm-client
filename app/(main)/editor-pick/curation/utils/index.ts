import { CurationCardType } from "../types";

export const buildCurationColumns = (
  cards: CurationCardType[]
): {
  leftColumn: CurationCardType[];
  rightColumn: CurationCardType[];
} => {
  const leftColumn: CurationCardType[] = [];
  const rightColumn: CurationCardType[] = [];

  for (let i = 0; i < cards.length; i += 2) {
    const row = Math.floor(i / 2);
    const isEvenRow = row % 2 === 0;

    const leftCard = cards[i];
    const rightCard = cards[i + 1];

    if (leftCard) {
      leftColumn.push({
        ...leftCard,
        variant: isEvenRow ? "A" : "B",
      });
    }

    if (rightCard) {
      rightColumn.push({
        ...rightCard,
        variant: isEvenRow ? "B" : "A",
      });
    }
  }

  return {
    leftColumn,
    rightColumn,
  };
};
