import Link from "next/link";
import { headerLinks } from "./data/item";
import { ROUTES } from "@/constants/routes";

const Header = () => {
  return (
    <header className="flex h-[64px] w-full items-center justify-between border-b-[1px] text-base">
      <section className="flex gap-2">
        <div>이미지</div>
        <Link href={ROUTES.ROOT} className="font-medium">
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
