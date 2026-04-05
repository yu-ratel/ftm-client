import StepSection from "./components/StepSection";
import { STEP_DATA } from "./data/steps";

export default function StepByStepPage() {
  return (
    <div className="flex flex-col gap-9 px-4 py-12">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-[15px]">
          👗
        </div>
        <h1 className="text-2xl font-bold text-[#374254]">스텝 바이 스텝</h1>
      </div>

      <div className="flex flex-col gap-9">
        {STEP_DATA.map((step) => (
          <StepSection
            key={step.id}
            id={step.id}
            month={step.month}
            title={step.title}
            tags={step.tags}
          />
        ))}
      </div>
    </div>
  );
}
