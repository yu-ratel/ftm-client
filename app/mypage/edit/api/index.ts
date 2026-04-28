import { authApi } from "@/lib/axios";
import { UserInfoResponse } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_PATH = "/api/users";

export const getUserInfo = async () => {
  const response = await authApi.get<UserInfoResponse>(
    `${BASE_PATH}/info/simple`
  );
  return response.data.data;
};

const userInfoUpdate = async (data: FormData) => {
  const response = await authApi.patch(`${BASE_PATH}/info`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userInfoUpdate,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });
};
