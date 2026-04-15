import ContentSectionA from "./A";
import ContentSectionB from "./B";
import ContentSectionC from "./C";
import { CurationDetailType } from "../../types";

interface Props {
  data: CurationDetailType;
}

export default function ContentSection({ data }: Props) {
  const type = data.type;

  switch (type) {
    case "A":
      return <ContentSectionA data={data} />;
    case "B":
      return <ContentSectionB data={data} />;
    case "C":
      return <ContentSectionC data={data} />;
  }
}
