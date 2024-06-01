"use client";
import ServiceManagement from "@/module/service-management/service-management";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function Service() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <ServiceManagement />
  ) : (
    <Custom404 />
  );
}
