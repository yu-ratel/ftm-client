"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { headerLinks } from "./data/item";
import { ROUTES } from "@/constants/routes";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="relative z-[50] flex h-[64px] w-full items-center justify-between border-b-[1px] border-stroke-primary bg-white px-9">
        {/* 로고 영역 */}
        <section className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-black/10" />
          <Link
            href={ROUTES.ROOT}
            className="text-base font-medium leading-4 text-blue-500"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            FITTHEMAN
          </Link>
        </section>

        {/* 네비게이션 영역 - lg 이상에서만 표시 */}
        <section className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-14 lg:flex">
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-bold leading-4 text-blue-500"
            >
              {link.label}
            </Link>
          ))}
        </section>

        {/* 오른쪽 영역 */}
        <div className="flex items-center lg:w-[138px]">
          {/* 햄버거 메뉴 - lg 미만에서만 표시 */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="flex h-6 w-6 items-center justify-center lg:hidden"
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6 text-blue-500" />
            ) : (
              <FiMenu className="h-6 w-6 text-blue-500" />
            )}
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};

export default Header;
