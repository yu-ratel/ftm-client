import { authApi } from "@/lib/axios";
const BASE_PATH = "/api/grooming/tests";

const userGroomingCheckList = async () => {
  try {
    const response = await authApi.get(`${BASE_PATH}/histories`);
    return response.data;
  } catch (error) {
    console.error("그루밍 체크리스트 조회 실패:", error);
    throw error;
  }
};

export { userGroomingCheckList };

//타입 지정해야함
