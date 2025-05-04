import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { ROUTES } from "@/constants/routes";
import { openAlert } from "@/utils/modal/OpenAlert";
import { clearUser } from "@/stores/AuthStore";

// 비인증용 (쿠키 없음)
const api: AxiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// 인증용 (쿠키 포함)
export const authApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // rewrites를 통해 처리
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//
// ─── INTERCEPTORS ─────────────────────────────────────────────
//

const requestLogger = (config: InternalAxiosRequestConfig) => {
  console.log(`[axios] ${config.method?.toUpperCase()} ${config.url}`);
  console.log("baseUrl ===>", process.env.NEXT_PUBLIC_API_URL);
  return config;
};

const errorHandler = (error: AxiosError) => {
  const status = error.response?.status;

  if (status === 401) {
    // 세션 만료 시 알림 후 로그인 페이지로 이동
    if (typeof window !== "undefined") {
      clearUser();
      openAlert("로그인이 만료되었습니다. 다시 로그인해주세요.", () => {
        window.location.href = ROUTES.SIGNIN;
      });
    }
  }

  if (status === 500) {
    openAlert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }

  return Promise.reject(error);
};

// 비인증 인스턴스
api.interceptors.request.use(requestLogger);
api.interceptors.response.use((res) => res, errorHandler);

// 인증 인스턴스
authApi.interceptors.request.use(requestLogger);
authApi.interceptors.response.use((res) => res, errorHandler);

export default api;
