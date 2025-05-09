import { FiSearch } from "react-icons/fi";
import Button from "@/components/ui/Button";
import SectionHeader from "../components/header/SectionHeader";

export default function UserPick() {
  return (
    <>
      <div className="mx-auto w-full max-w-[808px] px-2 sm:px-4 md:px-6 lg:px-[45px] 2xl:max-w-[1224px]">
        <SectionHeader
          title="유저 Pick"
          rightContent={
            <div className="flex items-center space-x-4">
              <Button variant="icon">
                <FiSearch className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="secondary">Filter+</Button>
            </div>
          }
        />
      </div>

      <div className="mx-auto mt-8 w-full max-w-[808px] px-2 sm:px-4 md:px-6 lg:px-[45px] 2xl:max-w-[1224px]">
        <h3 className="text-lg font-medium">인기있는 글</h3>
        <p className="mt-1 text-sm text-gray-500">
          지금 사람들이 유저들을 위한 바이블
        </p>
      </div>
    </>
  );
}
