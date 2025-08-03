import { authApi } from "@/lib/axios";
const BASE_PATH = "/api/grooming/tests/histories";

const userGroomingResultDetail = async (date: string) => {
  try {
    const response = await authApi.get(`${BASE_PATH}/detail?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("그루밍 결과 조회 실패:", error);
    throw error;
  }
};

export { userGroomingResultDetail };
