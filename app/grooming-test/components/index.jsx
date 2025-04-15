import Image from "next/image";
import { LANDING_IMG, LANDING_TITLE, LANDING_DESCRIPTION } from "../constants";
import DefaultLandingAction from "./DefaultLandingAction";
import SignInLandingAction from "./SignInLandingAction";

// 동민님 코드 머지 후 로그인 분기 처리 예정

const LandingView = () => {
  return (
    <main className="flex">
      <section className="w-1/2 py-32 pl-36 font-normal text-blue-500">
        <h1 className="whitespace-pre-line text-[64px] leading-tight">
          {LANDING_TITLE}
        </h1>
        <p className="mt-6 text-xl">{LANDING_DESCRIPTION}</p>
        {/* <DefaultLandingAction /> */}
        <SignInLandingAction />
      </section>
      <section className="relative w-1/2">
        <div className="absolute inset-9">
          <Image
            src={LANDING_IMG}
            alt="grooming-test"
            fill
            className="rounded-[32px] object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default LandingView;
