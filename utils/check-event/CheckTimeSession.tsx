"use client";
import store, {useAppDispatch} from "@/redux/store";
import {useEffect} from "react";
import {differenceInMinutes} from "date-fns";
import ApiAuth from "@/apiRequest/ApiAuth";
import {loginUser} from "@/redux/slices/UserSlice";

export default function CheckTimeSession() {
  const {user} = store.getState();
  const dispatch = useAppDispatch();
  /**
   * Tự động refresh token sau mỗi 60 phút nếu thời gian hết hạn của token còn dưới 15 phút thì refresh token
   */
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const now = new Date();
        const expiresAt = new Date((user.expiresAt as number) * 1000);
        if (differenceInMinutes(expiresAt, now) < 15) {
          const res = await ApiAuth.slideSessionFromNextClientToNextServer();
          dispatch(
            loginUser({
              ...user,
              access_token: res.payload.access_token,
              refresh_token: res.payload.refresh_token,
              expiresAt: res.payload.expiresAt,
            }),
          );
        }
      },
      1000 * 60 * 60,
    );
    return () => clearInterval(interval);
  }, []);
  return null;
}
