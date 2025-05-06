import ResultView from "../components";

const Page = ({ params }: { params: { answers: string } }) => {
  let parsedAnswers = [];
  try {
    parsedAnswers = JSON.parse(decodeURIComponent(params.answers));
  } catch (e) {
    console.error(e);
    parsedAnswers = [];
  }

  return <ResultView answers={parsedAnswers} />;
};

export default Page;
