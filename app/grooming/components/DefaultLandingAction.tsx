"use client";

import Link from "next/link";
import ActionButton from "@/public/grooming-test/svgs/landing_button.svg";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

const DefaultLandingAction = () => {
  return (
    <section className="flex flex-col gap-4 pr-32 max-xl:pr-0">
      <div className="flex h-52 gap-4 text-white *:w-1/2 *:rounded-[32px] *:p-6 max-sm:flex-col max-sm:*:w-full">
        <Link href={ROUTES.GROOMING_CHECK} className="relative bg-blue-500">
          <h3 className="text-2xl font-bold max-md:text-lg">
            그루밍 지수 검사
          </h3>
          <p className="text-sm font-light">나의 그루밍 지수를 측정해보세요!</p>
          <ActionButton className="absolute bottom-0 left-2 max-md:hidden" />
        </Link>
        <Button
          className="relative flex flex-col justify-start bg-blue-300 text-left"
          onClick={() => openSigninSelectModal()}
        >
          <h3 className="text-2xl font-bold max-md:text-lg">
            핏더맨 로그인 / 회원가입
          </h3>
          <p className="text-sm font-light">
            새롭게 추가된 소식들을 확인해보세요!
          </p>
          <ActionButton className="absolute bottom-0 left-2 max-md:hidden" />
        </Button>
      </div>

      <Link
        href={ROUTES.ROOT}
        className="flex h-24 w-full items-center justify-center rounded-3xl bg-gray-300 px-4 py-2 text-gray-400 max-sm:h-12 max-sm:w-full"
      >
        로그인 없이 둘러보기
      </Link>
    </section>
  );
};

export default DefaultLandingAction;
