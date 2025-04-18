import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/constants/routes";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }

    // 클라이언트 콜백 페이지로 리다이렉트하면서 code를 전달
    return NextResponse.redirect(
      new URL(`/callback/kakao?code=${code}`, request.url)
    );
  } catch (error) {
    console.error("Kakao callback error:", error);
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }
}
