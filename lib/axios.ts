import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { ROUTES } from "@/constants/routes";
import { openAlert } from "@/utils/modal/OpenAlert";
import { clearUser } from "@/stores/AuthStore";
import { isServer } from "@/constants/environment";
import { ApiResponse } from "@/types/api";

// 비인증용 (쿠키 없음)
const api: AxiosInstance = axios.create({
  baseURL: isServer ? process.env.NEXT_PUBLIC_API_URL : "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// 인증용 (쿠키 포함)
export const authApi: AxiosInstance = axios.create({
  baseURL: isServer ? process.env.NEXT_PUBLIC_API_URL : "",
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

const errorHandler = async (error: AxiosError<ApiResponse>) => {
  const status = error.response?.data.status;
  const code = error.response?.data?.code;
  // 401발생 시 로컬스토리지만 지워주면 useLocalStorageWatcher가 처리?
  // TODO: 세션 만료 시 테스트 필요
  if (!isServer) {
    if (status === 401) {
      //로그인 인증에러 시 mutation에 에러를 넘김
      if (code === "E401_002") {
        return Promise.reject(error);
      }
      clearUser();
      console.log("errorHandler");
      await openAlert("로그인이 만료되었습니다. 다시 로그인해주세요.", () => {
        window.location.href = ROUTES.SIGNIN;
      });

      //  401 에러일 경우 Promise를 영원히 pending 상태로 만들어서 mutation에 에러를 안 넘긴다
      return new Promise(() => {});
    }

    if (status === 500) {
      openAlert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return new Promise(() => {});
    }
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
