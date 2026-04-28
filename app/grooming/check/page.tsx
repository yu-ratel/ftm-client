import { getGroomingCheckList } from "./api";
import GroomingCheck from "./components/index";

export const dynamic = "force-dynamic";

const Page = async () => {
  const response = await getGroomingCheckList();

  return <GroomingCheck serverData={response} />;
};

export default Page;
