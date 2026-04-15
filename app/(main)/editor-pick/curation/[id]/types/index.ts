export interface CurationDetailType {
  id: number;
  date: string;
  title: string;
  paragraphs: {
    slogan: string;
    description: string;
  }[];
  editorComment: string;
  mainImage: string;
  subImages: string[];
  texts: {
    title: string;
    description: string;
  }[];
  type: "A" | "B" | "C";
}
