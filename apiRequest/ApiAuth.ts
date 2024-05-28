import store from "@/redux/store";
import http from "@/apiRequest/http";
import {loginUser} from "@/redux/slices/UserSlice";
import {IAccountRole} from "@/types";

export interface ICommonResponse {
   message: string;
   data: any;
}
export interface ILoginBody {
   email: string;
   password: string;
}

export interface ILoginResponse extends ICommonResponse {
   data: {
      access_token: string;
      refresh_token: string;
      role: number;
   };
}
interface IRefreshToken extends ICommonResponse {
   data: {
      new_access_token: string;
      new_refresh_token: string;
   };
}
interface IAccountBody {
   name: string;
   email: string;
   password: string;
   date_of_birth: string;
   gender: number;
}

export const path = {
   login: "/auth/login",
   refresh_token: "/auth/refresh-token",
   create: "/auth/register",
   logout: "/auth/logout",
};

export async function handleRefreshToken() {
   const refresh_token = store.getState().user.refresh_token;
   const res = await http.post<IRefreshToken>(path.refresh_token, {
      refresh_token,
   });
   if (res.status === 401) return null;
   store.dispatch(
      loginUser({
         ...store.getState().user,
         access_token: res.payload.data.new_access_token,
         refresh_token: res.payload.data.new_refresh_token,
      }),
   );
   return res.payload.data.new_access_token;
}

const ApiAuth = {
   login: (body: ILoginBody) => http.post<ILoginResponse>(path.login, body),

   auth: (body: {
      access_token: string;
      refresh_token: string;
      expiresAt: number;
   }) =>
      http.post("/api/auth", body, {
         baseUrl: "",
         credentials: "include",
      }),

   slideSessionFromNextClientToNextServer: () => {
      return http.post<{
         access_token: string;
         refresh_token: string;
         expiresAt: number;
      }>("/api/auth/slide-session", {}, {baseUrl: ""});
   },

   getNewTokenFromNextServerToServer: ({
      accessToken,
      refreshToken,
   }: {
      accessToken: string;
      refreshToken: string;
   }) => {
      return http.post<IRefreshToken>(
         path.refresh_token,
         {refresh_token: refreshToken},
         {headers: {Authorization: `Bearer ${accessToken}`}},
      );
   },

   logoutFromNextServerToNextServer: ({
      accessToken,
      refreshToken,
   }: {
      accessToken: string;
      refreshToken: string;
   }) => {
      return http.post<{message: string}>(
         path.logout,
         {refresh_token: refreshToken},
         {headers: {Authorization: `Bearer ${accessToken}`}},
      );
   },

   createAccount: async (body: IAccountBody) =>
      await http.post<any>(path.create, body),

   getUserRole: (): IAccountRole | undefined => {
      const {user} = store.getState();
      return user?.role;
   },
   getAuthToken: (): string | undefined => {
      const {user} = store.getState();
      return user?.access_token;
   },
   isLogin: function (): boolean {
      return !!ApiAuth.getAuthToken();
   },
};

export default ApiAuth;
