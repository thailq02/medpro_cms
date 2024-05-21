import http, {ICommonAuditable} from "@/apiRequest/http";
import {IUpdateAccountForm} from "@/module/account-manager/modal-edit-account/form-config";

export interface IUserLogin extends ICommonAuditable {
  _id?: string;
  name?: string;
  email?: string;
  date_of_birth?: string;
  gender?: number;
  created_at?: string;
  updated_at?: string;
  verify?: number;
  address?: string;
  username?: string;
  avatar?: string;
  role?: number;
  phone_number?: string;
  position?: number;
}
interface IGetMeResBody {
  message: string;
  data: IUserLogin;
}
interface IGetUserResBody {
  message: string;
  data: IUserLogin;
}
interface IGetFullUserResBody {
  message: string;
  data: IUserLogin[];
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
};

const ApiUser = {
  getMe: () => http.get<IGetMeResBody>(path.getMe),

  getFullUser: async () =>
    await http.get<IGetFullUserResBody>(path.getFullUser),

  getUserByUsername: async (username: string) =>
    await http.get<IGetUserResBody>(`${path.getUserByUsername}/${username}`, {
      cache: "no-cache",
    }),

  updateUser: async (data: IUpdateUser) =>
    await http.patch<IGetUserResBody>(
      `${path.updateUser}/${data.username}`,
      data.body,
    ),
};

export default ApiUser;
