import ApiAuth from "@/apiRequest/ApiAuth";
import {AT_COOKIE_NAME, RT_COOKIE_NAME} from "@/apiRequest/common";
import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode";

export async function POST(request: Request) {
   const cookieStore = cookies();
   const access_token = cookieStore.get(AT_COOKIE_NAME);
   const refresh_token = cookieStore.get(RT_COOKIE_NAME);

   if (!access_token && !refresh_token) {
      return Response.json(
         {message: "Không nhận được access_token và refresh_token"},
         {status: 400},
      );
   }
   try {
      const res = await ApiAuth.getNewTokenFromNextServerToServer({
         accessToken: access_token?.value ?? "",
         refreshToken: refresh_token?.value ?? "",
      });
      const expiresAt = jwtDecode(res.payload?.data?.new_access_token).exp;

      cookies().set(RT_COOKIE_NAME, res.payload.data.new_refresh_token, {
         httpOnly: true,
         path: "/",
         secure: true,
         sameSite: "lax",
      });
      const expiredDate = new Date((expiresAt as number) * 1000).toUTCString();

      const data = {
         access_token: res.payload.data.new_access_token,
         refresh_token: res.payload.data.new_refresh_token,
         expiresAt,
      };

      return Response.json(data, {
         status: 200,
         headers: {
            "Set-Cookie": `accessToken=${data.access_token}; Path=/; HttpOnly; Expires=${expiredDate}; SameSite=Lax; Secure`,
         },
      });
   } catch (error) {
      console.log("error", error);
   }
}
