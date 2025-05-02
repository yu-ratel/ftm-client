interface Props {
  questionNumber: number;
  question: string;
}

const QuestionSection = ({ questionNumber, question }: Props) => {
  return (
    <section className="flex h-56 flex-col items-center gap-5 bg-blue-100">
      <h3 className="mt-7 w-28 rounded-[16px] bg-blue-500 p-[8px_30px] text-white">
        Q. {questionNumber}
      </h3>
      <p className="w-full break-keep px-24 text-[28px] font-bold text-blue-500">
        {question}
      </p>
      <p className="text-sm font-light"></p>
    </section>
  );
};

export default QuestionSection;
