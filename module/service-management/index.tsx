"use client";

import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";
import ServiceComponent from "@/module/service-management/service";

export default function ServiceManagement() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <ServiceComponent />
  ) : (
    <Custom404 />
  );
}
