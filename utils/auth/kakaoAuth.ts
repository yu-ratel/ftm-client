const KAKAO_AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const initiateKakaoLogin = () => {
  if (!KAKAO_AUTH_URL || !KAKAO_CLIENT_ID || !REDIRECT_URI) {
    throw new Error("환경변수 undefined 에러");
  }
  console.log("window.location.origin", window.location.origin);
  const params = {
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: `${window.location.origin}${REDIRECT_URI}`,
    response_type: "code",
  };

  const queryString = new URLSearchParams(params).toString();
  const authUrl = `${KAKAO_AUTH_URL}?${queryString}`;

  window.location.href = authUrl;
};
