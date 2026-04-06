export type CurationCardVariant = "A" | "B";

export interface CurationCardType {
  id: number;
  image: string;
  title: string;
  date: string;
  source: string;
  category: string[];
  variant?: CurationCardVariant;
}
