import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { kakaoLogin } from "@/app/(auth)/signin/api";
import { setUser } from "@/stores/AuthStore";

export async function GET(request: NextRequest) {
  try {
    // URL에서 인가 코드 추출
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      console.log("[Kakao Callback] No code provided");
      return redirect(ROUTES.HOME);
    }

    // 백엔드 카카오 로그인 API 호출
    const response = await kakaoLogin(code);

    // 202: 소셜 회원가입 필요
    if (response.status === 202) {
      const signupUrl = `${ROUTES.SIGNUP}?step=introduction&social=true`;

      const redirectResponse = NextResponse.redirect(
        new URL(signupUrl, request.url)
      );

      // axios response에서 Set-Cookie 헤더를 가져와서 redirect response에 포함
      const cookies = response.headers?.["set-cookie"];
      if (cookies) {
        cookies.forEach((cookie) => {
          redirectResponse.headers.append("Set-Cookie", cookie);
        });
      }

      return redirectResponse;
    }

    // 로그인 성공
    if (response.data) {
      setUser(response.data);
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }

    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  } catch (error: any) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }
}
