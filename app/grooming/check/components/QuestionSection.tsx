interface Props {
  questionNumber: number;
  question: string;
}

const QuestionSection = ({ questionNumber, question }: Props) => {
  return (
    <section className="flex h-auto flex-col items-center gap-5 bg-blue-100">
      <h3 className="mt-7 w-32 rounded-[16px] bg-blue-500 p-[8px_30px] text-2xl text-white">
        Q. {questionNumber}
      </h3>
      <p className="w-full break-keep px-24 text-[28px] font-bold text-blue-500 max-md:px-10 max-sm:text-lg">
        {question}
      </p>
      <p className="text-sm font-light"></p>
    </section>
  );
};

export default QuestionSection;
