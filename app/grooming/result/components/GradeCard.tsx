import { GRADE_CATEGORY, GRADE_MAX_SCORE } from "../constants/index";

interface Props {
  category: string;
  grade: string;
  level: number;
}

const ScoreBar = ({ score }: { score: number }) => {
  return (
    <div className="flex h-14 w-full items-center justify-center gap-1 rounded-3xl px-6">
      {Array.from({ length: GRADE_MAX_SCORE }).map((_, index) => (
        <div
          key={index}
          className={`${index < score ? "bg-[#1481FD] shadow-[0_0_10px_1px_rgba(105,171,255,0.7)]" : "bg-[#D6DCE5]"} h-1 w-full rounded-[4px]`}
        />
      ))}
    </div>
  );
};

const GradeCard = ({ category, grade, level }: Props) => {
  return (
    <div className="flex flex-col items-center gap-8 rounded-3xl bg-[#F5F5F7] px-16 py-9 text-[#1481FD]">
      <h4 className="text-2xl">
        {GRADE_CATEGORY[category as keyof typeof GRADE_CATEGORY]}
      </h4>
      <h3 className="text-5xl">{grade}</h3>
      <div className="flex h-14 w-full items-center justify-center gap-1 rounded-3xl bg-[#E6EEFD] px-6">
        <ScoreBar score={level} />
      </div>
    </div>
  );
};

export default GradeCard;
