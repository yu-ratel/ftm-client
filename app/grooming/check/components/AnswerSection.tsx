/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  answers: any[];
  onClickHandleAnswer: (groomingTestAnswerId: number) => void;
  selectedAnswers: any[];
  currentIndex: number;
}

const AnswerSection = ({
  answers,
  onClickHandleAnswer,
  selectedAnswers,
  currentIndex,
}: Props) => {
  return (
    <section className="flex max-h-[456px] flex-col gap-6 overflow-y-auto text-2xl *:w-[586px] *:content-center">
      {answers.map((item) => (
        <button
          onClick={() => onClickHandleAnswer(item.groomingTestAnswerId)}
          className={`${
            selectedAnswers[currentIndex]?.answerIds.includes(
              item.groomingTestAnswerId
            )
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          } min-h-24 flex-shrink-0 break-keep rounded-xl px-20`}
          key={item.groomingTestAnswerId}
        >
          {item.answer}
        </button>
      ))}
    </section>
  );
};

export default AnswerSection;
