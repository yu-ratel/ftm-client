import Link from "next/link";
import Button from "@/components/ui/Button";
import { ROUTE_CARD_TEXT } from "../constants/index";
import DefaultIcon from "@/public/grooming-test/svgs/result_default.svg";
import LoginIcon from "@/public/grooming-test/svgs/result_login.svg";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";
import { ROUTES } from "@/constants/routes";

const SignInRouteCard = () => {
  const isLogin = true;
  const type = isLogin ? "login" : "default";

  const card = {
    login: {
      icon: <LoginIcon />,
      text: ROUTE_CARD_TEXT.signIn,
    },
    default: {
      icon: <DefaultIcon />,
      text: ROUTE_CARD_TEXT.default,
      href: ROUTES.ROOT,
    },
  };

  return type === "default" ? (
    <Link
      href={card[type].href}
      className="flex flex-col items-center gap-8 whitespace-pre-line rounded-3xl bg-[#1481FD] px-16 py-9 text-center text-2xl text-white max-md:px-10 max-md:text-lg max-sm:px-2"
    >
      {card[type].icon}
      {card[type].text}
    </Link>
  ) : (
    <Button
      className="flex flex-col items-center gap-8 whitespace-pre-line rounded-3xl bg-[#1481FD] px-16 py-9 text-center text-2xl text-white max-md:px-10 max-md:text-lg max-sm:px-2"
      onClick={() => openSigninSelectModal()}
    >
      {card[type].icon}
      {card[type].text}
    </Button>
  );
};

export default SignInRouteCard;
