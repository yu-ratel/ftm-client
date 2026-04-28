import { Select } from "@mantine/core";
import "@mantine/core/styles.css";
import RightButtonIcon from "../../public/common/svgs/right_button.svg";

interface Props {
  selectedOption: string;
  onSelect: (option: string) => void;
  placeholder: string;
  options: string[];
}

export default function SelectBox({
  selectedOption,
  onSelect,
  placeholder,
  options,
}: Props) {
  return (
    <Select
      value={selectedOption}
      onChange={(value) => onSelect(value ?? "")}
      placeholder={placeholder}
      data={options}
      rightSection={<RightButtonIcon />}
      rightSectionPointerEvents="none"
      classNames={{
        input:
          "!rounded-md border !border-gray-200 focus:outline-none focus:border-gray-200 !bg-gray-100/50 !py-2 !h-[38px]",
        option:
          "hover:bg-gray-50 data-[selected]:bg-[#FFEBDC] data-[selected]:text-[#ED7218]",
      }}
    />
  );
}
