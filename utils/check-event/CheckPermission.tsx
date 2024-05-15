"use client";

import store from "@/redux/store";
import {IAccountRole} from "@/types";

export function CheckPermission(role?: number[]): boolean {
  if (role) {
    const data = store?.getState()?.user?.role;
    const check = role?.includes(data ?? IAccountRole.USER);
    return check;
  }
  return true;
}
