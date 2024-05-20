"use client";
import ApiAuth from "@/apiRequest/ApiAuth";
import {Login} from "@/module/login";
import {useRouter} from "next/navigation";
import React from "react";

export default function CheckLogin() {
  const router = useRouter();
  const isLogin = ApiAuth.isLogin();
  console.log("CheckLogin ~ isLogin", isLogin);
  if (!isLogin) {
    router.push("/login");
  } else {
    router.push("/");
  }
  return <Login />;
}
