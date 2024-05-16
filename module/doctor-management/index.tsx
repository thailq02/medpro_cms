"use client";

import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";
import DoctorComponent from "@/module/doctor-management/doctor";

export default function DoctorManagement() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <DoctorComponent />
  ) : (
    <Custom404 />
  );
}
