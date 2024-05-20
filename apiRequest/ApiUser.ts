import http from "@/apiRequest/http";

export interface IUserLogin {
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

const path = {
  getMe: "/users/me",
};

const ApiUser = {
  getMe: () => http.get<IGetMeResBody>(path.getMe),
};

export default ApiUser;
