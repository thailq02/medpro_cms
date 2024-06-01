"use client";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import AccountManager from "@/module/account-manager/account-management";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function Account() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <AccountManager />
  ) : (
    <Custom404 />
  );
}
