"use client";

import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";
import HospitalComponent from "@/module/hospital-management/hospital";

export default function HospitalManagement() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <HospitalComponent />
  ) : (
    <Custom404 />
  );
}
