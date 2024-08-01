"use client";
import ApiAuth from "@/apiRequest/ApiAuth";
import {Login} from "@/module/login";
import {useRouter} from "next/navigation";

export default function CheckLogin() {
  const router = useRouter();
  const isLogin = ApiAuth.isLogin();
  if (!isLogin) {
    router.push("/login");
  } else {
    router.push("/");
  }
  return <Login />;
}
