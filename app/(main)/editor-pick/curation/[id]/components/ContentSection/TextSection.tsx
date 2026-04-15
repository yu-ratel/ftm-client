interface Props {
  title: string;
  description: string;
  className?: string;
}

export default function TextSection({ title, description, className }: Props) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  );
}
