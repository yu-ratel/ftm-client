import Link from "next/link";
import LoginButton from "@/public/grooming-test/svgs/landing_button.svg";

const DefaultLandingAction = () => {
  return (
    <section className="mt-20 flex flex-col gap-4 pr-32">
      <div className="flex h-52 gap-4 text-white *:w-1/2 *:rounded-[32px] *:p-6">
        <Link href="/grooming/check" className="relative bg-blue-500">
          <h3 className="text-2xl font-bold">그루밍 지수 검사</h3>
          <p className="text-sm font-light">나의 그루밍 지수를 측정해보세요!</p>
          <LoginButton className="absolute bottom-0 left-2" />
        </Link>
        <Link href="signup" className="relative bg-blue-300">
          <h3 className="text-2xl font-bold">핏더맨 로그인 / 회원가입</h3>
          <p className="text-sm font-light">
            새롭게 추가된 소식들을 확인해보세요!
          </p>
          <LoginButton className="absolute bottom-0 left-2" />
        </Link>
      </div>

      <Link
        href="/"
        className="flex h-24 w-full items-center justify-center rounded-3xl bg-gray-300 px-4 py-2 text-gray-400"
      >
        로그인 없이 둘러보기
      </Link>
    </section>
  );
};

export default DefaultLandingAction;
