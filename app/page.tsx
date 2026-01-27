"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import PickLogo from "@/assets/home/svgs/pick_logo.svg";

export default function Page() {
  const router = useRouter();

  return (
    <main className="*:px-6 *:lg:px-60">
      <section className="flex w-full flex-col items-center justify-center gap-28 pb-0 pt-10 lg:pb-60 lg:pt-48">
        <h1 className="text-center text-5xl font-bold text-blue-500 lg:text-[150px]">
          Discover your New Appearance
        </h1>
        <section className="flex flex-col gap-7 text-xl md:flex-row">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(ROUTES.GROOMING_CHECK)}
          >
            그루밍 지수 검사하러 가기
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(ROUTES.SIGNIN)}
          >
            핏더맨 로그인하러 가기
          </Button>
        </section>
      </section>

      <section className="flex flex-col gap-[60px] px-56 py-16 md:gap-28 md:py-44">
        <div className="flex flex-col items-center justify-center gap-12 text-blue-500 lg:flex-row lg:items-start lg:justify-start lg:gap-[180px]">
          <h2 className="text-center text-lg font-bold leading-[140%] md:text-left lg:text-4xl">
            모든 남성들을 위한
            <br /> 라이프스타일 플랫폼
          </h2>
          <h3 className="flex flex-col gap-5 text-[17px] font-semibold lg:text-lg">
            ‘처음 시작하는 사람도, 이미 자신만의 스타일을 가진 사람도 함께
            어울릴 수 있지 않을까?’
            <p className="font-normal leading-[160%]">
              그루밍은 이제 단순히 꾸미는 행위를 넘어 라이프스타일이자 자신을
              표현하는 새로운 언어가 되었습니다.
              <br className="hidden md:block" /> 핏더맨은 바로 그 지점에서
              출발했습니다. 경험을 나누며 서로에게 영감을 주는 열린 커뮤니티.
              이곳에서 <br className="hidden md:block" />
              그루밍은 개성을 잃지 않고 자신을 드러내는 가장 세련된 방법이
              됩니다.
            </p>
          </h3>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <LifeStyleCard
            title="Insight"
            description={`트렌드 정보들을 통해, 남성 그루밍의 \n 기준과 방향성을 제시해드려요.`}
          />
          <LifeStyleCard
            title="Community"
            description={`혼자가 아닌 함께, 경험과 노하우를 \n 나누며 동기부여를 얻을 수 있어요.`}
            className="relative bottom-0 *:lg:bottom-9"
          />
          <LifeStyleCard
            title="Growth"
            description={`나의 자기관리 단계를 확인하고, \n 꾸준히 발전하는 경험을 해보세요.`}
          />
        </div>
      </section>

      <section className="flex flex-col bg-black px-0 py-24 text-white lg:flex-row">
        <div className="mr-28 flex min-w-80 flex-col items-center justify-center text-center md:items-start md:text-left">
          <h3 className="max-w-80 text-lg font-bold leading-[140%] lg:text-5xl">
            나의 그루밍 유형 알아보기
          </h3>
          <p className="pt-6 text-lg font-normal leading-[150%] lg:text-lg">
            유형 테스트로 자기관리의
            <br /> 현주소를 확인해보세요.
          </p>
          <Button
            variant="primary"
            size="base"
            onClick={() => router.push(ROUTES.GROOMING_CHECK)}
            className="mt-20 w-fit font-bold"
          >
            유형 확인하러 가기
          </Button>
        </div>

        <div className="relative right-[100px] mt-10 flex min-w-[1490px] gap-5 overflow-x-hidden *:h-[213px] *:w-[170px] *:rounded-[40px] md:mt-0 lg:pl-0 *:lg:h-[593px] *:lg:w-[474px]">
          <div className="h-[212px] w-[170px] rounded-[40px] bg-gray-400 *:lg:h-[593px] *:lg:w-[474px]" />
          <div className="h-[212px] w-[170px] rounded-[40px] bg-gray-400/80 *:lg:h-[593px] *:lg:w-[474px]" />
          <div className="h-[212px] w-[170px] rounded-[40px] bg-gray-400/60 *:lg:h-[593px] *:lg:w-[474px]" />
        </div>
      </section>

      <section className="flex flex-col gap-20 py-16 text-blue-500 lg:flex-row lg:gap-52 lg:py-52">
        <div className="flex flex-col gap-14 lg:gap-24">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <PickLogo />
              <h3 className="text-lg font-bold lg:text-4xl"> 에디터 PICK</h3>
            </div>
            <p className="text-center text-lg font-medium md:text-left lg:text-lg">
              매거진으로 만나는 핏더맨의 트렌드 인사이트와 관리 팁.
              <br className="hidden md:block" /> 누구나 쉽게 시작할 수 있는
              그루밍 정보를 담았습니다.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <PickLogo />
              <h3 className="text-lg font-bold lg:text-4xl"> 유저 PICK</h3>
            </div>
            <p className="text-center text-lg font-medium md:text-left lg:text-lg">
              유저들의 관리 노하우를 공유하는 커뮤니티입니다.
              <br className="hidden md:block" /> 각자의 경험과 취향이 모여
              그루밍의 가능성을 확장해갑니다
            </p>
          </div>
        </div>
        <div className="h-[332px] w-[327px] rounded-[40px] bg-gray-200 lg:h-[372px] lg:w-[665px]" />
      </section>

      <footer className="flex h-72 flex-col gap-3 bg-blue-500/10 py-20 text-lg text-blue-500 lg:text-4xl">
        <h3 className="font-bold">
          그루밍에 대해 새로운 제안이 있다면, 언제든 연락주세요.
        </h3>
        <p className="font-normal">contact.us@fittheman.org</p>
      </footer>
    </main>
  );
}

const LifeStyleCard = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex h-[315px] w-[327px] flex-col items-start justify-end gap-5 rounded-[40px] bg-blue-500 px-9 py-12 text-white lg:h-[618px] lg:w-[456px] ${className}`}
    >
      <h3 className="text-lg font-bold lg:text-4xl">{title}</h3>
      <p className="whitespace-pre-line font-semibold">{description}</p>
    </div>
  );
};
