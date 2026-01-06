export const isServer = typeof window === "undefined";

/**
 * 환경에 따른 redirectKey 반환
 * local: localhost 환경
 * dev: dev 환경
 */
export const getRedirectKey = (): string => {
  if (isServer) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
      return "local";
    }
    if (apiUrl.includes("dev-api")) {
      return "dev";
    }
    return "dev"; // 기본값
  }

  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return "local";
    }
    if (origin.includes("dev") || origin.includes("ftm-client.vercel.app")) {
      return "dev";
    }
  }

  return "dev"; // 기본값
};
