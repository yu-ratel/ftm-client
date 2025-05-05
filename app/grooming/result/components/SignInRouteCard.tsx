import Link from "next/link";
import { ROUTE_CARD_TEXT } from "../constants/index";
import DefaultIcon from "@/public/grooming-test/svgs/result_default.svg";
import LoginIcon from "@/public/grooming-test/svgs/result_login.svg";

const SignInRouteCard = () => {
  const isLogin = true;
  const type = isLogin ? "login" : "default";

  const card = {
    login: {
      icon: <LoginIcon />,
      text: ROUTE_CARD_TEXT.signIn,
      href: "/",
    },
    default: {
      icon: <DefaultIcon />,
      text: ROUTE_CARD_TEXT.default,
      href: "/",
    },
  };

  return (
    <Link
      href={card[type].href}
      className="flex flex-col items-center gap-8 whitespace-pre-line rounded-3xl bg-[#1481FD] px-16 py-9 text-center text-2xl text-white"
    >
      {card[type].icon}
      {card[type].text}
    </Link>
  );
};

export default SignInRouteCard;
