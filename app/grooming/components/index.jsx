import { cookies } from "next/headers";
import Image from "next/image";
import { LANDING_IMG, LANDING_TITLE, LANDING_DESCRIPTION } from "../constants";
import DefaultLandingAction from "./DefaultLandingAction";
import SignInLandingAction from "./SignInLandingAction";

const LandingView = () => {
  const cookieStore = cookies();
  const isLogin = cookieStore.get("SESSION");

  return (
    <main className="flex">
      <section className="flex w-1/2 flex-col justify-between py-32 pl-36 font-normal text-blue-500">
        <h1 className="whitespace-pre-line text-[64px] leading-tight">
          {LANDING_TITLE}
          <p className="mt-6 text-xl">{LANDING_DESCRIPTION}</p>
        </h1>
        {isLogin ? <SignInLandingAction /> : <DefaultLandingAction />}
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
