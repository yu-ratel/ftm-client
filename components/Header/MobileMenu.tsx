"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/AuthStore";
import { useSignOut } from "@/app/(auth)/signin/hooks/useSignOut";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: logout } = useSignOut();
  const { user } = useAuthStore();
  const [expandedMenus, setExpandedMenus] = useState<{
    userPick: boolean;
    editorPick: boolean;
  }>({
    userPick: false,
    editorPick: false,
  });

  const toggleMenu = (menu: "userPick" | "editorPick") => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleNavigation = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-[40] bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* 메뉴 드로어 */}
      <div
        className={`fixed left-0 top-[64px] z-[45] h-auto w-full bg-white shadow-lg transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-6 px-9 py-8">
          {/* 홈 */}
          <Link
            href={ROUTES.ROOT}
            onClick={onClose}
            className={`text-xl font-bold leading-5 ${
              pathname === ROUTES.ROOT ? "text-[#1481fd]" : "text-[#374254]"
            }`}
          >
            홈
          </Link>

          {/* 유저 Pick (아코디언) */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => toggleMenu("userPick")}
              className={`flex items-center justify-between text-xl font-bold leading-5 ${
                pathname.includes(ROUTES.USER_PICK)
                  ? "text-[#1481fd]"
                  : "text-[#374254]"
              }`}
            >
              <span>유저 Pick</span>
              <FiChevronDown
                className={`h-6 w-6 transition-transform duration-200 ${
                  expandedMenus.userPick ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedMenus.userPick && (
              <div className="flex flex-col gap-3.5 pl-4">
                <button
                  onClick={() => handleNavigation(ROUTES.USER_PICK)}
                  className={`text-left text-base font-medium leading-4 ${
                    pathname === ROUTES.USER_PICK
                      ? "text-[#1481fd]"
                      : "text-[#374254]"
                  }`}
                >
                  그루밍 라운지
                </button>
                <button
                  onClick={() => handleNavigation("/user-pick/hash-tag")}
                  className={`text-left text-base font-medium leading-4 ${
                    pathname.includes("/user-pick/hash-tag")
                      ? "text-[#1481fd]"
                      : "text-[#374254]"
                  }`}
                >
                  해시태그 추천
                </button>
              </div>
            )}
          </div>

          {/* 에디터 Pick (아코디언) */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => toggleMenu("editorPick")}
              className={`flex items-center justify-between text-xl font-bold leading-5 ${
                pathname.includes(ROUTES.EDITOR_PICK)
                  ? "text-[#1481fd]"
                  : "text-[#374254]"
              }`}
            >
              <span>에디터 Pick</span>
              <FiChevronDown
                className={`h-6 w-6 transition-transform duration-200 ${
                  expandedMenus.editorPick ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedMenus.editorPick && (
              <div className="flex flex-col gap-3.5 pl-4">
                <button
                  onClick={() => handleNavigation(ROUTES.EDITOR_PICK)}
                  className={`text-left text-base font-medium leading-4 ${
                    pathname === ROUTES.EDITOR_PICK
                      ? "text-[#1481fd]"
                      : "text-[#374254]"
                  }`}
                >
                  핏더맨 큐레이션
                </button>
                <button
                  onClick={() => handleNavigation(ROUTES.EDITOR_PICK)}
                  className={`text-left text-base font-medium leading-4 ${
                    pathname === ROUTES.EDITOR_PICK
                      ? "text-[#1481fd]"
                      : "text-[#374254]"
                  }`}
                >
                  Step by Step
                </button>
              </div>
            )}
          </div>

          {/* 그루밍 지수 검사 */}
          <Link
            href={ROUTES.GROOMING}
            onClick={onClose}
            className={`text-xl font-bold leading-5 ${
              pathname.includes(ROUTES.GROOMING)
                ? "text-[#1481fd]"
                : "text-[#374254]"
            }`}
          >
            그루밍 지수 검사
          </Link>

          {/* 마이페이지 & 로그아웃 */}
          {user && (
            <div className="flex items-center justify-between pt-6">
              <Link
                href={ROUTES.MY_PAGE}
                onClick={onClose}
                className={`text-xl font-bold leading-5 ${
                  pathname.includes(ROUTES.MY_PAGE)
                    ? "text-[#1481fd]"
                    : "text-[#374254]"
                }`}
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="text-xl font-bold leading-5 text-[#374254]"
              >
                로그아웃
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
