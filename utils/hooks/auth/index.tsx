import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import ApiUser, {IParamsGetUser} from "@/apiRequest/ApiUser";
import ApiAuth from "@/apiRequest/ApiAuth";
import {notification} from "antd";

const useQueryGetMe = () => {
   return useQuery({
      queryKey: [QUERY_KEY.GET_DATA_USER_IN_USE],
      queryFn: () => ApiUser.getMe(),
   });
};
const useQueryGetFullUser = (params?: IParamsGetUser) => {
   return useQuery({
      queryKey: [QUERY_KEY.GET_FULL_USER, params],
      queryFn: async () => await ApiUser.getFullUser(params),
   });
};
const useQueryGetUserByUsername = (username?: string) => {
   return useQuery({
      queryKey: [QUERY_KEY.GET_USER_BY_USERNAME, username],
      queryFn: async () => await ApiUser.getUserByUsername(username as string),
      // Thực hiện khi username tồn tại
      enabled: !!username,
   });
};
const useCreateAccount = () => {
   return useMutation({
      mutationFn: ApiAuth.createAccount,
      onSuccess: () => {
         notification.success({
            message: "Tạo tài khoản thành công",
            duration: 3,
         });
      },
   });
};
const useUpdateAccount = () => {
   return useMutation({
      mutationFn: ApiUser.updateUser,
      onSuccess: () => {
         notification.success({
            message: "Sửa tài khoản thành công",
            duration: 3,
         });
      },
   });
};
const useDeleteAccount = () => {
   return useMutation({
      mutationFn: ApiUser.deleteUser,
      onSuccess: () => {
         notification.success({
            message: "Xoá thành công",
            duration: 3,
         });
      },
   });
};
const useChangePassword = () => {
   return useMutation({
      mutationFn: ApiAuth.changePassword,
      onSuccess: () => {
         notification.success({
            message: "Đổi mật khẩu thành công",
            duration: 3,
         });
      },
   });
};
export {
   useQueryGetMe,
   useQueryGetFullUser,
   useCreateAccount,
   useQueryGetUserByUsername,
   useUpdateAccount,
   useDeleteAccount,
   useChangePassword,
};
