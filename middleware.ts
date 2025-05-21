import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/constants/routes";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("SESSION")?.value;
  const { pathname } = request.nextUrl;

  // 1. 로그인 상태인데 signin 또는 signup 접근 시 유저픽으로 리다이렉트
  if (
    sessionCookie &&
    (pathname === ROUTES.SIGNIN || pathname === ROUTES.SIGNUP)
  ) {
    return NextResponse.redirect(new URL(ROUTES.USER_PICK, request.url));
  }

  // 2. 세션이 있는 경우 유효성 검사
  if (sessionCookie) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session/validity`,
        {
          method: "GET",
          headers: {
            cookie: `SESSION=${sessionCookie}`,
          },
        }
      );

      const { data } = await res.json();
      if (!data?.isValid) {
        return redirectToLogin(request);
      }
    } catch (error) {
      console.error("세션 유효성 확인 중 에러:", error);
      return redirectToLogin(request);
    }
  }

  return NextResponse.next();
}

// 세션 만료 시 로그인 페이지로 리다이렉트 및 쿠키 삭제
function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL(ROUTES.SIGNIN, request.url);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete("SESSION");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
