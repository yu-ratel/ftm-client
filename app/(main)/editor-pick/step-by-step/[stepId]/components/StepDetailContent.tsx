import type { StepData } from "../../data/steps";
import ProductCard from "./ProductCard";

interface StepDetailContentProps {
  step: StepData;
}

export default function StepDetailContent({ step }: StepDetailContentProps) {
  return (
    <div className="flex flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold text-[#374254]">{step.title}</h1>

      <div className="flex flex-col gap-10">
        {step.products.map((product, index) => (
          <ProductCard
            key={product.id}
            index={index + 1}
            name={product.name}
            description={product.description}
            tags={index === 0 ? step.tags : undefined}
          />
        ))}
      </div>
    </div>
  );
}
