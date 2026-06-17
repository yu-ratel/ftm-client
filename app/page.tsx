"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import PickLogo from "@/assets/home/svgs/pick_logo.svg";

export default function Page() {
  const router = useRouter();

  return (
    <main className="overflow-hidden">
      <section className="mx-auto flex w-full max-w-[1504px] flex-col items-center justify-center gap-8 px-6 pb-14 pt-10 md:max-w-[880px] md:gap-10 md:px-9 md:pb-20 md:pt-16 lg:max-w-[1504px] lg:gap-16 lg:px-20 lg:pb-48 lg:pt-36 xl:px-0">
        <h1 className="max-w-[1120px] text-center text-[42px] font-bold leading-[0.96] text-blue-500 sm:text-6xl md:text-7xl lg:text-[132px] xl:text-[150px]">
          Discover your New Appearance
        </h1>
        <section className="flex w-full max-w-[520px] flex-col gap-3 text-base md:max-w-none md:flex-row md:justify-center md:text-lg">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(ROUTES.GROOMING_CHECK)}
            className="w-full whitespace-nowrap px-4 text-sm sm:w-auto md:text-lg"
          >
            그루밍 지수 검사하러 가기
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="w-full whitespace-nowrap px-4 text-sm sm:w-auto md:text-lg"
          >
            핏더맨 로그인하러 가기
          </Button>
        </section>
      </section>

      <section className="mx-auto flex w-full max-w-[1504px] flex-col gap-[60px] px-6 py-16 md:max-w-[880px] md:gap-20 md:px-9 md:py-28 lg:max-w-[1504px] lg:gap-28 lg:px-20 lg:py-44 xl:px-0">
        <div className="grid gap-8 text-blue-500 md:gap-10 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:gap-24 xl:gap-[180px]">
          <h2 className="text-center text-xl font-bold leading-[140%] md:text-left lg:text-4xl">
            모든 남성들을 위한
            <br /> 라이프스타일 플랫폼
          </h2>
          <h3 className="flex flex-col gap-5 text-[17px] font-semibold leading-[150%] lg:text-lg">
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

        <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          <LifeStyleCard
            title="Insight"
            description={`트렌드 정보들을 통해, 남성 그루밍의 \n 기준과 방향성을 제시해드려요.`}
          />
          <LifeStyleCard
            title="Community"
            description={`혼자가 아닌 함께, 경험과 노하우를 \n 나누며 동기부여를 얻을 수 있어요.`}
            className="lg:-translate-y-9"
          />
          <LifeStyleCard
            title="Growth"
            description={`나의 자기관리 단계를 확인하고, \n 꾸준히 발전하는 경험을 해보세요.`}
          />
        </div>
      </section>

      <section className="bg-black py-16 text-white md:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1504px] gap-10 px-6 md:max-w-[880px] md:px-9 lg:min-w-[1800px] lg:max-w-[1920px] lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-20 lg:pl-40">
          <div className="flex flex-col items-center justify-center text-center md:text-left lg:items-start">
            <h3 className="max-w-80 text-2xl font-bold leading-[140%] lg:text-5xl">
              나의 그루밍 유형 알아보기
            </h3>
            <p className="pt-5 text-base font-normal leading-[150%] lg:pt-6 lg:text-lg">
              유형 테스트로 자기관리의
              <br /> 현주소를 확인해보세요.
            </p>
            <Button
              variant="primary"
              size="base"
              onClick={() => router.push(ROUTES.GROOMING_CHECK)}
              className="mt-8 w-fit font-bold lg:mt-20"
            >
              유형 확인하러 가기
            </Button>
          </div>

          <div className="-mx-6 overflow-hidden pl-20 md:mx-0 lg:pl-6">
            <div className="grid w-[690px] grid-cols-3 gap-4 md:w-full md:gap-5 lg:gap-10">
              <div className="h-[213px] rounded-[32px] bg-gray-400 lg:h-[593px] lg:rounded-[40px]" />
              <div className="h-[213px] rounded-[32px] bg-gray-400/80 lg:h-[593px] lg:rounded-[40px]" />
              <div className="h-[213px] rounded-[32px] bg-gray-400/60 lg:h-[593px] lg:rounded-[40px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1504px] gap-14 px-6 py-16 text-blue-500 md:max-w-[880px] md:px-9 lg:max-w-[1504px] lg:grid-cols-[minmax(0,1fr)_minmax(420px,665px)] lg:gap-24 lg:px-20 lg:py-52 xl:px-0">
        <div className="flex flex-col gap-12 lg:gap-24">
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
        <div className="h-[332px] w-full rounded-[40px] bg-gray-200 lg:h-[372px]" />
      </section>

      <footer className="flex min-h-72 flex-col gap-3 bg-blue-500/10 px-6 py-20 text-lg text-blue-500 md:px-9 lg:px-20 lg:text-4xl xl:px-[calc((100vw-1504px)/2)]">
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
      className={`flex aspect-[327/315] w-full flex-col items-start justify-end gap-5 rounded-[32px] bg-blue-500 px-6 py-8 text-white md:aspect-[456/618] md:px-7 md:py-9 lg:rounded-[40px] lg:px-9 lg:py-12 ${className}`}
    >
      <h3 className="text-lg font-bold lg:text-4xl">{title}</h3>
      <p className="whitespace-pre-line text-sm font-semibold leading-[150%] lg:text-base">
        {description}
      </p>
    </div>
  );
};
