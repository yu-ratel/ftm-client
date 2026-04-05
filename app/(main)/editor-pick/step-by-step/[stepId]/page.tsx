import { notFound } from "next/navigation";
import { STEP_DATA, getStepById } from "../data/steps";
import StepDetailContent from "./components/StepDetailContent";

interface StepDetailPageProps {
  params: Promise<{ stepId: string }>;
}

export function generateStaticParams() {
  return STEP_DATA.map((step) => ({ stepId: step.id }));
}

export default async function StepDetailPage({ params }: StepDetailPageProps) {
  const { stepId } = await params;
  const step = getStepById(stepId);

  if (!step) {
    notFound();
  }

  return <StepDetailContent step={step} />;
}
