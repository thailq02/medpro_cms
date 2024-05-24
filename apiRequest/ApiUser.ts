import http from "@/apiRequest/http";
import {IUpdateAccountForm} from "@/module/account-manager/modal-edit-account/form-config";
import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";

export interface IUserLogin extends ICommonAuditable {
  _id?: string;
  name?: string;
  email?: string;
  date_of_birth?: string;
  gender?: number;
  verify?: number;
  address?: string;
  username?: string;
  avatar?: string;
  role?: number;
  phone_number?: string;
  position?: number;
}
export interface IParamsGetUser {
  limit?: number;
  page?: number;
}

export interface IGetMeResBody {
  message: string;
  data: IUserLogin;
}
interface IGetUserResBody {
  message: string;
  data: IUserLogin;
}
export interface IGetFullUserResBody {
  message: string;
  data: IUserLogin[];
  meta: IMetaData;
}
interface IUpdateUser {
  username: string;
  body: IUpdateAccountForm;
}

const path = {
  getFullUser: "/users",
  getUserByUsername: "/users",
  getMe: "/users/me",
  updateUser: "/users",
  deleteUser: "/users",
};

const ApiUser = {
  getMe: () => http.get<IGetMeResBody>(path.getMe),

  getMeServer: (access_token: string) =>
    http.get<IGetMeResBody>(path.getMe, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),

  getFullUser: (params?: IParamsGetUser) =>
    http.get<IGetFullUserResBody>(path.getFullUser, {
      cache: "no-cache",
      params: params as CommonParams<IParamsGetUser>,
    }),

  getUserByUsername: async (username: string) =>
    await http.get<IGetUserResBody>(`${path.getUserByUsername}/${username}`, {
      cache: "no-cache",
    }),

  updateUser: async (data: IUpdateUser) =>
    await http.patch<IGetUserResBody>(
      `${path.updateUser}/${data.username}`,
      data.body,
    ),

  deleteUser: async (username: string) =>
    await http.delete<{message: string}>(`${path.deleteUser}/${username}`),
};

export default ApiUser;
