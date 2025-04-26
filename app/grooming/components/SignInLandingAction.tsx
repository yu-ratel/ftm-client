import Link from "next/link";

const DefaultLandingAction = () => {
  return (
    <section className="mt-52 flex flex-col gap-4 pr-32">
      <Link
        href="/"
        className="h-24 w-full content-center self-center rounded-3xl bg-blue-500 px-4 py-2 text-center text-2xl text-white"
      >
        그루밍지수 재검사 하러가기
      </Link>
      <Link
        href="/"
        className="h-24 w-full content-center self-center rounded-3xl bg-gray-300 px-4 py-2 text-center text-2xl text-gray-400"
      >
        로그인 없이 둘러보기
      </Link>
    </section>
  );
};

export default DefaultLandingAction;
