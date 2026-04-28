import Button from "@/components/ui/Button";
import { HashTagInfo } from "../types";

interface Props {
  hashTagInfo: HashTagInfo;
  onSelect: React.Dispatch<React.SetStateAction<HashTagInfo[]>>;
}

export const EditInfoButton = ({ hashTagInfo, onSelect }: Props) => {
  const handleSelect = () => {
    onSelect((prev) => {
      return prev.map((tag) =>
        tag.value === hashTagInfo.value
          ? { ...tag, isSelected: !tag.isSelected }
          : tag
      );
    });
  };

  return (
    <div className="flex min-w-[392px] flex-col gap-2">
      <div className="relative flex items-center gap-2">
        <Button
          variant="input"
          type="button"
          size="md"
          className="text-left"
          onClick={handleSelect}
        >
          {hashTagInfo.description}
        </Button>
        <div
          className={`absolute right-3 size-4 rounded-full ${
            hashTagInfo.isSelected ? "bg-blue-500" : "bg-gray-200"
          }`}
        />
      </div>
    </div>
  );
};
