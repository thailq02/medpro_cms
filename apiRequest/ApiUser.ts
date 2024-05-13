import http from "@/apiRequest/http";

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  role: number;
}

const ApiUser = {
  login: (body: ILoginBody) => http.post<ILoginResponse>("/auth/login", body),
};

export default ApiUser;
