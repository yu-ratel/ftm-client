interface Props {
  title: string;
  children?: React.ReactNode;
  description?: string;
  isMain?: boolean;
}

const SectionHeader = ({ title, children, description, isMain }: Props) => {
  if (isMain) {
    return (
      <div className="flex flex-col gap-6 *:text-primary">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold">{title}</h1>
        </div>
        <div className="border-b border-stroke-primary" />
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 *:text-primary">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
        {description && <p className="text-lg text-secondary">{description}</p>}
      </div>
      <div className="border-b border-stroke-primary" />
    </div>
  );
};

export default SectionHeader;
