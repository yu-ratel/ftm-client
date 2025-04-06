/**
 * API 응답 공통 인터페이스
 */
export interface ApiResponse<T = any> {
  status: number; // HTTP 상태
  code: string; // 커스텀 상태 코드
  message: string; // 응답 메시지
  data: T; // 응답 데이터 (제네릭으로 타입 지정 가능)
}
