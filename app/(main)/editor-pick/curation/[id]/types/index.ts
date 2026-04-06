export interface CurationDetailType {
  id: number;
  date: string;
  title: string;
  paragraphs: {
    slogan: string;
    description: string;
  }[];
  editorComment: string;
  image: string;
}
