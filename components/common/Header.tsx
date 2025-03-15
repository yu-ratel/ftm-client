import Link from "next/link";

const headerLinks = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "유저Pick",
    href: "/user-pick",
  },
  {
    label: "에디터Pick",
    href: "/editor-pick",
  },
  {
    label: "그루밍 지수 검사",
    href: "/grooming-test",
  },
];
const Header = () => {
  return (
    <header className="flex h-[64px] w-full items-center justify-between border-b-[1px] text-base">
      <section className="flex gap-2">
        <div>이미지</div>
        <Link href="/" className="font-medium">
          FIT THE MAN
        </Link>
      </section>
      <section className="flex w-[501px] justify-around font-bold">
        {headerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </section>
      <div></div>
    </header>
  );
};

export default Header;
