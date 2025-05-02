import api from "@/lib/axios";
import { GroomingCheckResponse, GroomingCheckRequest } from "../types";
const BASE_PATH = "/api/grooming/tests";

const getGroomingCheckList = async () => {
  const response = await api.get<GroomingCheckResponse>(BASE_PATH);
  return response.data;
};

// const saveGroomingCheckResult = async (data: GroomingCheckResult) => {
//   const response = await api.post(`${BASE_PATH}/save`, data);
//   return response.data;
// };

const createGroomingCheckResult = async (data: GroomingCheckRequest) => {
  const response = await api.post(`${BASE_PATH}/submission`, {
    submissions: data,
  });
  return response.data;
};

// const getIsGroomingCheck = async () => {
//   const response = await api.get(`${BASE_PATH}/availability`);
//   return response.data;
// };

// const getGroomingCheckHistory = async () => {
//   const response = await api.get(`${BASE_PATH}/history`);
//   return response.data;
// };

// const getGroomingCheckHistoryDetail = async (id: string) => {
//   const response = await api.get(`${BASE_PATH}/history/${id}`);
//   return response.data;
// };

export { getGroomingCheckList, createGroomingCheckResult };
