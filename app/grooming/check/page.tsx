import { getGroomingCheckList } from "./api";
import GroomingCheck from "./components";

const Page = async () => {
  const response = await getGroomingCheckList();
  const data = response.data;

  return <GroomingCheck serverData={data} />;
};

export default Page;
