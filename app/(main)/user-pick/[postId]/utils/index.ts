// 날짜 포맷팅 함수
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
};

// 이미지 URL 포맷팅 함수 - 프로토콜이 없으면 https:// 추가
export const formatImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";

  // 이미 절대 URL인 경우 그대로 반환
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // 상대 경로인 경우 그대로 반환 (/, ./ 등으로 시작)
  if (url.startsWith("/") || url.startsWith("./") || url.startsWith("../")) {
    return url;
  }

  // 도메인만 있는 경우 https:// 추가
  return `https://${url}`;
};
