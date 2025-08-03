import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  href: string;
}

const LinkButton = ({ title, href }: Props) => {
  return (
    <Link
      href={href}
      className="bg-button-gray-100 flex h-[100px] w-1/2 items-center justify-between rounded-xl pl-9 pr-4 text-lg font-semibold"
    >
      {title}
      <div className="bg-button-blue-400 flex size-[68px] items-center justify-center rounded-xl">
        <Image
          src="/grooming-test/svgs/result_login.svg"
          alt="globe"
          className="size-10"
          width={40}
          height={40}
        />
      </div>
    </Link>
  );
};

export default LinkButton;
