import React from "react";
import AccountManager from "@/module/account-manager";
import {cookies} from "next/headers";
import ApiUser from "@/apiRequest/ApiUser";

export default async function index() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("accessToken");
  const isAuthenticated = Boolean(access_token);
  const {payload} = await ApiUser.getFullUser();
  const accountList = payload?.data || [];
  return isAuthenticated && <AccountManager accountList={accountList} />;
}
