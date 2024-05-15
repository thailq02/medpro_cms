"use client";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import AccountManagerComponent from "@/module/account-manager/account-manager";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function AccountManager() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <AccountManagerComponent />
  ) : (
    <Custom404 />
  );
}
