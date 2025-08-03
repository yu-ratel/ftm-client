import { cookies } from "next/headers";
import Image from "next/image";
import {
  LANDING_IMG,
  LANDING_TITLE,
  LANDING_DESCRIPTION,
  MOBILE_LANDING_TITLE,
} from "../constants";
import DefaultLandingAction from "./DefaultLandingAction";
import SignInLandingAction from "./SignInLandingAction";

const LandingView = () => {
  const cookieStore = cookies();
  const isLogin = cookieStore.get("SESSION");

  return (
    <main className="flex max-xl:justify-center">
      <section className="flex w-1/2 flex-col justify-between gap-16 py-32 pl-36 font-normal text-blue-500 max-xl:w-[704px] max-xl:pl-0 max-md:px-8 max-sm:items-center max-sm:justify-start max-sm:gap-10">
        <h1 className="whitespace-pre-line text-[64px] leading-tight max-md:text-[52px] max-sm:text-[32px]">
          <span className="max-md:hidden">{LANDING_TITLE}</span>
          <span className="hidden max-md:block">{MOBILE_LANDING_TITLE}</span>
          <p className="mt-6 text-xl">{LANDING_DESCRIPTION}</p>
        </h1>
        {isLogin ? <SignInLandingAction /> : <DefaultLandingAction />}
      </section>
      <section className="relative w-1/2 max-xl:hidden">
        <div className="absolute inset-9 max-xl:hidden">
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
