"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { openSigninSelectModal } from "@/utils/modal/OpenSigninSelectModal";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// 모바일 메뉴에 표시할 링크 목록 (홈 제외)
const mobileMenuLinks = [
  { label: "유저 Pick", href: ROUTES.USER_PICK },
  { label: "에디터 Pick", href: ROUTES.EDITOR_PICK },
  { label: "그루밍 지수 검사", href: ROUTES.GROOMING },
] as const;

// 스타일 상수
const styles = {
  overlay: {
    base: "fixed inset-0 z-[40] bg-black/50 transition-opacity duration-300 lg:hidden",
    open: "opacity-100",
    closed: "pointer-events-none opacity-0",
  },
  drawer: {
    base: "fixed right-0 top-0 z-[45] h-auto w-[600px] max-w-[90vw] rounded-tl-3xl bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden",
    open: "translate-x-0",
    closed: "translate-x-full",
  },
  container: "flex flex-col px-12 pb-10 pt-28",
  nav: "mb-10 flex flex-col gap-10",
  link: "text-base font-bold leading-4 text-blue-500 transition-colors hover:text-blue-300",
  buttonContainer: "flex flex-col gap-5",
  button: {
    base: "flex h-[52px] w-full items-center justify-center rounded-2xl text-base font-bold leading-4 text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]",
    login: "bg-blue-500 hover:bg-blue-600",
    signup: "bg-blue-300 hover:bg-blue-400",
  },
} as const;

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    openSigninSelectModal();
  };

  const handleSignup = () => {
    onClose();
    router.push(ROUTES.SIGNUP);
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`${styles.overlay.base} ${
          isOpen ? styles.overlay.open : styles.overlay.closed
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* 메뉴 드로어 */}
      <div
        className={`${styles.drawer.base} ${
          isOpen ? styles.drawer.open : styles.drawer.closed
        }`}
        aria-hidden={!isOpen}
      >
        <div className={styles.container}>
          {/* 메뉴 링크들 */}
          <nav className={styles.nav}>
            {mobileMenuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={styles.link}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 버튼들 */}
          <div className={styles.buttonContainer}>
            <button
              onClick={handleLogin}
              className={`${styles.button.base} ${styles.button.login}`}
            >
              로그인
            </button>
            <button
              onClick={handleSignup}
              className={`${styles.button.base} ${styles.button.signup}`}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
