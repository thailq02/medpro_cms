import http from "@/apiRequest/http";
import store from "@/redux/store";
import {IAccountRole} from "@/types";

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    role: number;
  };
}

const path = {
  login: "/auth/login",
};

const ApiUser = {
  login: (body: ILoginBody) => http.post<ILoginResponse>(path.login, body),

  getUserRole: (): IAccountRole | undefined => {
    const {user} = store.getState();
    return user?.role;
  },
  getAuthToken: (): string | undefined => {
    const {user} = store.getState();
    return user?.access_token;
  },
  isLogin: function (): boolean {
    return !!ApiUser.getAuthToken();
  },
};

export default ApiUser;
