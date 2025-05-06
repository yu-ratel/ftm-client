interface Props {
  currentIndex: number;
  isDisabledNextCheck: boolean;
  onClickPrevQuestion: () => void;
  onClickNextQuestion: () => void;
  lastNumber: number;
}

const NavSection = ({
  currentIndex,
  isDisabledNextCheck,
  onClickPrevQuestion,
  onClickNextQuestion,
  lastNumber,
}: Props) => {
  return (
    <section className="flex h-16 justify-between *:gap-4 *:rounded-xl">
      <button
        className={`${currentIndex === 0 ? "hidden" : ""} h-16 w-[49%] bg-gray-300 max-sm:h-14`}
        onClick={onClickPrevQuestion}
      >
        이전
      </button>
      <button
        className={`${currentIndex === 0 ? "w-full" : "w-[49%]"} h-16 bg-blue-500 text-white max-sm:h-14 ${
          isDisabledNextCheck ? "opacity-20" : "transition-opacity duration-500"
        }`}
        onClick={onClickNextQuestion}
        disabled={isDisabledNextCheck}
      >
        {currentIndex === lastNumber - 1 ? "결과 확인하기" : "다음"}
      </button>
    </section>
  );
};

export default NavSection;
